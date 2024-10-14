export interface SectionProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | any;
  className?: string;
  columns?: "default" | "secondary";
  gap?: "default" | "secondary";
  paddingX?: "default" | "none" | "right" | "left";
  paddingTop?: "default" | "none" | any;
  paddingBottom?: "default" | "none" | any;
  id?: string;
  ref?: any;
  data?: any;
  tag?: React.ElementType;
}
