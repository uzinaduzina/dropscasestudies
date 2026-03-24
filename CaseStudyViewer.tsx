import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useBadgeSystem } from "@/hooks/useBadgeSystem";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Clock,
  Award,
  CheckCircle,
  BookOpen,
  Droplets,
  Recycle,
  GraduationCap,
  Building2,
  Leaf,
  Target,
  Users,
  Lightbulb,
} from "@/lib/solar-icons";
import dropsLogo from "@/assets/drops-logo.png";

interface CaseStudy {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  content: string | null;
  icon: string | null;
  gradient_from: string | null;
  gradient_to: string | null;
  category_color: string | null;
  read_time_minutes: number | null;
  points: number | null;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Droplets: Droplets,
  Recycle: Recycle,
  GraduationCap: GraduationCap,
  BookOpen: BookOpen,
  Building2: Building2,
  Leaf: Leaf,
  Target: Target,
  Users: Users,
  Lightbulb: Lightbulb,
};

export default function CaseStudyViewer() {
  const { caseStudyId } = useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { onCaseStudyComplete } = useBadgeSystem();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [completing, setCompleting] = useState(false);

  // No auth redirect - case studies are publicly viewable

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchCaseStudy = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("id", caseStudyId)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        navigate("/dashboard");
        return;
      }
      setCaseStudy(data);
    } catch (error) {
      console.error("Error fetching case study:", error);
      toast({
        title: "Error",
        description: "Failed to load case study.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [caseStudyId, navigate, toast]);

  const checkCompletion = useCallback(async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from("user_case_study_progress")
      .select("completed")
      .eq("user_id", user.id)
      .eq("case_study_id", caseStudyId)
      .maybeSingle();
    
    if (data?.completed) {
      setIsCompleted(true);
    }
  }, [caseStudyId, user]);

  useEffect(() => {
    if (caseStudyId) {
      fetchCaseStudy();
      if (user) {
        checkCompletion();
      }
    }
  }, [caseStudyId, user, fetchCaseStudy, checkCompletion]);

  const handleComplete = async () => {
    if (!user || !caseStudy || isCompleted) return;

    setCompleting(true);
    try {
      // Use server-side RPC function to complete case study securely
      const result = await onCaseStudyComplete(caseStudy.id);

      if (result?.success) {
        setIsCompleted(true);
        toast({
          title: "Case Study Completed! 🎉",
          description: `You earned ${result.points_awarded} points!`,
        });
      } else {
        throw new Error("Failed to complete case study");
      }
    } catch (error) {
      console.error("Error completing case study:", error);
      toast({
        title: "Error",
        description: "Failed to mark as completed.",
        variant: "destructive",
      });
    } finally {
      setCompleting(false);
    }
  };

  const getGradientClass = () => {
    const from = caseStudy?.gradient_from || "forest";
    const to = caseStudy?.gradient_to || "teal";
    return `bg-gradient-to-br from-${from} to-${to}`;
  };

  const IconComponent = caseStudy?.icon ? iconMap[caseStudy.icon] || BookOpen : BookOpen;

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading case study...</p>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return null;
  }

  // Parse markdown content
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, index) => {
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-foreground">
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-foreground">
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("- **")) {
        const match = line.match(/- \*\*(.+?)\*\*: (.+)/);
        if (match) {
          return (
            <div key={index} className="flex gap-2 mb-2">
              <span className="text-primary">•</span>
              <p>
                <strong className="text-foreground">{match[1]}:</strong>{" "}
                <span className="text-muted-foreground">{match[2]}</span>
              </p>
            </div>
          );
        }
      }
      if (line.startsWith("- ")) {
        return (
          <div key={index} className="flex gap-2 mb-2">
            <span className="text-primary">•</span>
            <p className="text-muted-foreground">{line.replace("- ", "")}</p>
          </div>
        );
      }
      if (line.trim() === "") {
        return <div key={index} className="h-2" />;
      }
      return (
        <p key={index} className="text-muted-foreground mb-4 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="bg-background border-b border-border sticky top-1 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <a href="/" className="flex items-center gap-2">
              <img src={dropsLogo} alt="DROPS" className="h-8" />
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{caseStudy.read_time_minutes || 15} min read</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-forest">
              <Award className="w-4 h-4" />
              <span>+{caseStudy.points || 0} pts</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className={`${getGradientClass()} text-primary-foreground py-16`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                {caseStudy.category || "Case Study"}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black uppercase mb-4">
              {caseStudy.title}
            </h1>
            <p className="text-lg opacity-90">
              {caseStudy.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
                <div className={`p-4 rounded-xl ${getGradientClass()} text-primary-foreground`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Case Study</p>
                  <h2 className="text-xl font-bold">{caseStudy.title}</h2>
                </div>
              </div>

              {/* Render content */}
              <div className="prose prose-lg max-w-none">
                {caseStudy.content ? renderContent(caseStudy.content) : (
                  <p className="text-muted-foreground">No content available.</p>
                )}
              </div>

              {/* Completion Section */}
              <div className="mt-12 pt-8 border-t border-border">
                {isCompleted ? (
                  <div className="flex items-center justify-center gap-3 p-6 bg-forest/10 rounded-xl">
                    <CheckCircle className="w-8 h-8 text-forest" />
                    <div>
                      <p className="font-bold text-forest">Completed!</p>
                      <p className="text-sm text-muted-foreground">
                        You earned {caseStudy.points || 0} points for this case study.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">
                      Finished reading? Mark this case study as complete to earn points!
                    </p>
                    <Button
                      size="lg"
                      onClick={handleComplete}
                      disabled={completing || scrollProgress < 80}
                      className="bg-forest hover:bg-forest/90"
                    >
                      {completing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Completing...
                        </>
                      ) : scrollProgress < 80 ? (
                        <>
                          <BookOpen className="w-4 h-4 mr-2" />
                          Read to unlock ({Math.round(scrollProgress)}% read)
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark as Complete (+{caseStudy.points || 0} pts)
                        </>
                      )}
                    </Button>
                    {scrollProgress < 80 && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Scroll to read at least 80% of the content to unlock completion
                      </p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Back to Dashboard */}
          <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}