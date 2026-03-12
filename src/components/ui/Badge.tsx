import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center gap-2 bg-secondary border border-border rounded-full px-4 py-1.5 text-xs font-medium text-muted",
      className
    )}>
      {children}
    </span>
  );
}