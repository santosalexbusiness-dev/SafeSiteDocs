import {
  BookOpenCheck,
  MessagesSquare,
  HardHat,
  ClipboardList,
  GraduationCap,
  ListChecks,
  FileWarning,
  Siren,
  FlaskConical,
  Lock,
  MoveDown,
  Construction,
  Zap,
  ThermometerSun,
  UserCheck,
  Building2,
  Home,
  Wind,
  Wrench,
  Hammer,
  Trees,
  Layers,
  Paintbrush,
  Building,
  Clock,
  Sparkles,
  FolderKanban,
  Users,
  Lightbulb,
  UserPlus,
  ShieldCheck,
  Search,
  FolderCog,
  PackageCheck,
  LibraryBig,
  FileSearch,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps the string icon names stored in /data to real lucide components.
 * Keeps data files framework-agnostic (just names) while the UI resolves them.
 */
const registry: Record<string, LucideIcon> = {
  BookOpenCheck,
  MessagesSquare,
  HardHat,
  ClipboardList,
  GraduationCap,
  ListChecks,
  FileWarning,
  Siren,
  FlaskConical,
  Lock,
  MoveDown,
  Construction,
  Zap,
  ThermometerSun,
  UserCheck,
  Building2,
  Home,
  Wind,
  Wrench,
  Hammer,
  Trees,
  Layers,
  Paintbrush,
  Building,
  Clock,
  Sparkles,
  FolderKanban,
  Users,
  Lightbulb,
  UserPlus,
  ShieldCheck,
  Search,
  FolderCog,
  PackageCheck,
  LibraryBig,
  FileSearch,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = registry[name] ?? HelpCircle;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
