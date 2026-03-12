import { cn } from "@/lib/utils";

export default function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-xs font-medium tracking-widest uppercase text-muted mb-12", className)}>
      {children}
    </p>
  );
}