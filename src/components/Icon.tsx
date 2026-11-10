import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Circle,
  CircleAlert,
  Download,
  ListFilter,
  Map as MapIcon,
  MapPin,
  Menu,
  Minus,
  Plus,
  Search,
  Store,
  TriangleAlert,
  X,
  type LucideIcon,
} from "lucide-react";

const icons = {
  placeholder: Circle,
  filters: ListFilter,
  search: Search,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  "chevron-up": ChevronUp,
  "chevron-down": ChevronDown,
  hamburger: Menu,
  close: X,
  pin: MapPin,
  map: MapIcon,
  store: Store,
  download: Download,
  "alert-triangle": TriangleAlert,
  "alert-circle": CircleAlert,
  plus: Plus,
  minus: Minus,
  checkmark: Check,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;
export type IconSize = 16 | 24;

const strokeWidthBySize: Record<IconSize, number> = {
  16: 1.25,
  24: 1.75,
};

type IconProps = {
  name: IconName;
  size?: IconSize;
  label?: string;
  className?: string;
};

export function Icon({ name, size = 24, label, className }: IconProps) {
  const LucideGlyph = icons[name];

  return (
    <LucideGlyph
      size={size}
      strokeWidth={strokeWidthBySize[size]}
      nonScalingStroke
      className={className}
      {...(label ? { role: "img", "aria-label": label } : {})}
    />
  );
}
