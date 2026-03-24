import { Icon, type IconProps } from "@iconify/react";

type SolarName = string;

const iconMap: Record<string, SolarName> = {
  AlertTriangle: "solar:danger-triangle-bold-duotone",
  ArrowLeft: "solar:arrow-left-bold-duotone",
  ArrowRight: "solar:arrow-right-bold-duotone",
  Award: "solar:medal-ribbons-star-bold-duotone",
  Bell: "solar:bell-bold-duotone",
  BookOpen: "solar:book-2-bold-duotone",
  Briefcase: "solar:bag-2-bold-duotone",
  Building2: "solar:buildings-2-bold-duotone",
  Check: "solar:check-circle-bold-duotone",
  CheckCircle: "solar:check-circle-bold-duotone",
  CheckCircle2: "solar:check-circle-bold-duotone",
  ChevronDown: "solar:alt-arrow-down-bold-duotone",
  ChevronLeft: "solar:alt-arrow-left-bold-duotone",
  ChevronRight: "solar:alt-arrow-right-bold-duotone",
  ChevronUp: "solar:alt-arrow-up-bold-duotone",
  Circle: "solar:add-circle-bold-duotone",
  Clock: "solar:clock-circle-bold-duotone",
  CloudSun: "solar:cloud-sun-2-bold-duotone",
  Copy: "solar:copy-bold-duotone",
  Crown: "solar:crown-bold-duotone",
  DollarSign: "solar:dollar-bold-duotone",
  Dot: "solar:menu-dots-bold-duotone",
  Download: "solar:download-bold-duotone",
  Droplets: "solar:cloud-waterdrop-bold-duotone",
  ExternalLink: "solar:link-bold-duotone",
  Eye: "solar:eye-bold-duotone",
  Factory: "solar:buildings-3-bold-duotone",
  FileText: "solar:file-text-bold-duotone",
  Flame: "solar:flame-bold-duotone",
  FlaskConical: "solar:test-tube-bold-duotone",
  Gift: "solar:gift-bold-duotone",
  GitBranch: "solar:branching-paths-up-bold-duotone",
  Globe: "solar:earth-bold-duotone",
  GraduationCap: "solar:square-academic-cap-2-bold-duotone",
  GripVertical: "solar:menu-dots-bold-duotone",
  Handshake: "solar:hand-heart-bold-duotone",
  Heart: "solar:heart-bold-duotone",
  HelpCircle: "solar:help-bold-duotone",
  Home: "solar:home-2-bold-duotone",
  Info: "solar:info-circle-bold-duotone",
  Languages: "solar:earth-bold-duotone",
  LayoutDashboard: "solar:widget-2-bold-duotone",
  Leaf: "solar:leaf-bold-duotone",
  Lightbulb: "solar:lightbulb-bold-duotone",
  Loader2: "solar:refresh-circle-bold-duotone",
  Lock: "solar:lock-keyhole-bold-duotone",
  LogOut: "solar:logout-2-bold-duotone",
  Mail: "solar:mailbox-bold-duotone",
  MapPin: "solar:pin-bold-duotone",
  Medal: "solar:medal-ribbon-star-bold-duotone",
  Menu: "solar:hamburger-menu-bold-duotone",
  Minus: "solar:minus-circle-bold-duotone",
  MoreHorizontal: "solar:menu-dots-bold-duotone",
  Network: "solar:shield-network-bold-duotone",
  Package: "solar:box-bold-duotone",
  PanelLeft: "solar:widget-2-bold-duotone",
  Pencil: "solar:pen-bold-duotone",
  PieChart: "solar:pie-chart-2-bold-duotone",
  Play: "solar:play-bold-duotone",
  Plus: "solar:add-circle-bold-duotone",
  Recycle: "solar:refresh-bold-duotone",
  RefreshCw: "solar:refresh-circle-bold-duotone",
  Rocket: "solar:rocket-bold-duotone",
  RotateCcw: "solar:undo-left-round-bold-duotone",
  Scale: "solar:scale-bold-duotone",
  Search: "solar:magnifier-bold-duotone",
  Shield: "solar:shield-bold-duotone",
  Settings: "solar:settings-bold-duotone",
  Sparkles: "solar:stars-bold-duotone",
  Star: "solar:star-bold-duotone",
  Tag: "solar:tag-bold-duotone",
  Target: "solar:target-bold-duotone",
  ThermometerSun: "solar:cloud-sun-2-bold-duotone",
  Trash2: "solar:trash-bin-2-bold-duotone",
  TrendingUp: "solar:chart-bold-duotone",
  Trophy: "solar:cup-first-bold-duotone",
  Truck: "solar:truck-bold-duotone",
  User: "solar:user-bold-duotone",
  UserPlus: "solar:user-plus-bold-duotone",
  Users: "solar:users-group-rounded-bold-duotone",
  Video: "solar:video-frame-2-bold-duotone",
  X: "solar:close-square-bold-duotone",
  XCircle: "solar:close-circle-bold-duotone",
  Zap: "solar:bolt-circle-bold-duotone",
};

const fallback = "solar:widget-2-bold-duotone";

type SolarIconProps = Omit<IconProps, "icon">;

function createIcon(name: string) {
  const icon = iconMap[name] || fallback;
  return function SolarIcon(props: SolarIconProps) {
    return <Icon icon={icon} {...props} />;
  };
}

// Export components matching previous Lucide names
export const AlertTriangle = createIcon("AlertTriangle");
export const ArrowLeft = createIcon("ArrowLeft");
export const ArrowRight = createIcon("ArrowRight");
export const Award = createIcon("Award");
export const Bell = createIcon("Bell");
export const BookOpen = createIcon("BookOpen");
export const Briefcase = createIcon("Briefcase");
export const Building2 = createIcon("Building2");
export const Check = createIcon("Check");
export const CheckCircle = createIcon("CheckCircle");
export const CheckCircle2 = createIcon("CheckCircle2");
export const ChevronDown = createIcon("ChevronDown");
export const ChevronLeft = createIcon("ChevronLeft");
export const ChevronRight = createIcon("ChevronRight");
export const ChevronUp = createIcon("ChevronUp");
export const Circle = createIcon("Circle");
export const Clock = createIcon("Clock");
export const CloudSun = createIcon("CloudSun");
export const Copy = createIcon("Copy");
export const Crown = createIcon("Crown");
export const DollarSign = createIcon("DollarSign");
export const Dot = createIcon("Dot");
export const Download = createIcon("Download");
export const Droplets = createIcon("Droplets");
export const ExternalLink = createIcon("ExternalLink");
export const Eye = createIcon("Eye");
export const Factory = createIcon("Factory");
export const FileText = createIcon("FileText");
export const Flame = createIcon("Flame");
export const FlaskConical = createIcon("FlaskConical");
export const Gift = createIcon("Gift");
export const GitBranch = createIcon("GitBranch");
export const Globe = createIcon("Globe");
export const GraduationCap = createIcon("GraduationCap");
export const GripVertical = createIcon("GripVertical");
export const Handshake = createIcon("Handshake");
export const Heart = createIcon("Heart");
export const HelpCircle = createIcon("HelpCircle");
export const Home = createIcon("Home");
export const Info = createIcon("Info");
export const Languages = createIcon("Languages");
export const LayoutDashboard = createIcon("LayoutDashboard");
export const Leaf = createIcon("Leaf");
export const Lightbulb = createIcon("Lightbulb");
export const Loader2 = createIcon("Loader2");
export const Lock = createIcon("Lock");
export const LogOut = createIcon("LogOut");
export const Mail = createIcon("Mail");
export const MapPin = createIcon("MapPin");
export const Medal = createIcon("Medal");
export const Menu = createIcon("Menu");
export const Minus = createIcon("Minus");
export const MoreHorizontal = createIcon("MoreHorizontal");
export const Network = createIcon("Network");
export const Package = createIcon("Package");
export const PanelLeft = createIcon("PanelLeft");
export const Pencil = createIcon("Pencil");
export const PieChart = createIcon("PieChart");
export const Play = createIcon("Play");
export const Plus = createIcon("Plus");
export const Recycle = createIcon("Recycle");
export const RefreshCw = createIcon("RefreshCw");
export const Rocket = createIcon("Rocket");
export const RotateCcw = createIcon("RotateCcw");
export const Scale = createIcon("Scale");
export const Search = createIcon("Search");
export const Settings = createIcon("Settings");
export const Shield = createIcon("Shield");
export const Sparkles = createIcon("Sparkles");
export const Star = createIcon("Star");
export const Tag = createIcon("Tag");
export const Target = createIcon("Target");
export const ThermometerSun = createIcon("ThermometerSun");
export const Trash2 = createIcon("Trash2");
export const TrendingUp = createIcon("TrendingUp");
export const Trophy = createIcon("Trophy");
export const Truck = createIcon("Truck");
export const User = createIcon("User");
export const UserPlus = createIcon("UserPlus");
export const Users = createIcon("Users");
export const Video = createIcon("Video");
export const X = createIcon("X");
export const XCircle = createIcon("XCircle");
export const Zap = createIcon("Zap");
