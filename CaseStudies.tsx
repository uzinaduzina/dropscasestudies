import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, MapPin, Tag, ChevronRight } from "@/lib/solar-icons";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { CountryContour } from "@/components/CountryContours";

interface CaseStudy {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  gradient_from: string | null;
  gradient_to: string | null;
}

// Map case study titles to countries
const caseStudyCountries: Record<string, string> = {
  "Warka Tower: Harvesting Water from Air": "Ethiopia",
  "Rifò: Circular Fashion Revolution": "Italy",
  "Flipped Learning in Adult Education": "Spain",
  "Matematica Live: Interactive TEAL Platform": "Italy",
};

const categories = [
  "All",
  "Water Management",
  "Circular Economy",
  "Education Innovation",
  "Digital Learning",
];

export function CaseStudies() {
  const navigate = useNavigate();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from("case_studies")
        .select("id, title, category, description, gradient_from, gradient_to")
        .eq("is_active", true)
        .order("order_index", { ascending: true });

      if (error) throw error;
      if (data) setCaseStudies(data);
    } catch (error) {
      console.error("Error fetching case studies:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCaseStudies = selectedCategory === "All"
    ? caseStudies
    : caseStudies.filter(cs => cs.category === selectedCategory);

  const getCountry = (title: string): string => {
    return caseStudyCountries[title] || "Italy";
  };

  return (
    <section id="case-studies" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ocean/10 text-ocean text-sm font-medium mb-6">
              <Tag className="w-4 h-4" />
              <span>Real-World Learning</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-4 text-black">
              LEARN FROM CASE STUDIES
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore real scenarios of successful sustainability transitions 
              from across Europe and beyond. Each case study includes reflection questions and practical takeaways.
            </p>
          </div>
          <Button variant="secondary" size="lg" onClick={() => {
            setSelectedCategory("All");
            document.getElementById("case-studies")?.scrollIntoView({ behavior: "smooth" });
          }}>
            Browse All Case Studies
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                selectedCategory === category
                  ? "bg-ocean text-primary-foreground"
                  : "bg-background text-foreground hover:bg-ocean/10 hover:text-ocean border border-border"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredCaseStudies.map((study, index) => {
              const country = getCountry(study.title);
              
              return (
                <Card
                  key={study.id}
                  variant="module"
                  className="overflow-hidden group animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(`/case-study/${study.id}`)}
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Country Contour Background */}
                    <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
                      <CountryContour country={country} />
                      <div className="absolute bottom-4 left-4 sm:bottom-auto sm:top-4 flex items-center gap-2 text-xs font-medium text-primary-foreground z-10">
                        <MapPin className="w-3 h-3" />
                        {country}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="sm:w-3/5 p-6">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-ocean/10 text-ocean rounded-full mb-3">
                        {study.category || "Case Study"}
                      </span>
                      <CardTitle className="text-lg mb-2 group-hover:text-ocean transition-colors line-clamp-2">
                        {study.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 mb-4">
                        {study.description}
                      </CardDescription>
                      <Button variant="ghost" size="sm" className="group-hover:text-ocean">
                        Read Case Study
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {!loading && filteredCaseStudies.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No case studies found for this category.
          </p>
        )}
      </div>
    </section>
  );
}