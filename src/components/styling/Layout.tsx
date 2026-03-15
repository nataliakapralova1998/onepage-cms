import { cn } from "@/lib/utils";

type ChildrenProps = {
  children: React.ReactNode;
  className?: string;
};

// ── CONTAINER ──────────────────────────────────────────────
type ContainerProps = ChildrenProps & {
  size?: "sm" | "md" | "lg" | "xl" | "full";
};

const containerSizes = {
  sm: "max-w-sm",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
  full: "max-w-full",
};

export function Container({ children, size = "xl", className }: ContainerProps) {
  return (
    <div className={cn("w-full mx-auto px-6 md:px-12", containerSizes[size], className)}>
      {children}
    </div>
  );
}

// ── STACK ──────────────────────────────────────────────────
type StackProps = ChildrenProps & {
  gap?: 1 | 2 | 3 | 4 | 6 | 8 | 10 | 12 | 16;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  direction?: "row" | "col";
  wrap?: boolean;
};

const gapMap = {
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  16: "gap-16",
};

const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

const justifyMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

export function Stack({
  children,
  gap = 4,
  align = "stretch",
  justify = "start",
  direction = "col",
  wrap = false,
  className,
}: StackProps) {
  return (
    <div
      className={cn(
        "flex",
        direction === "col" ? "flex-col" : "flex-row",
        gapMap[gap],
        alignMap[align],
        justifyMap[justify],
        wrap && "flex-wrap",
        className
      )}
    >
      {children}
    </div>
  );
}

// ── GRID ───────────────────────────────────────────────────
type GridProps = ChildrenProps & {
  cols?: 1 | 2 | 3 | 4;
  gap?: 1 | 2 | 3 | 4 | 6 | 8 | 10 | 12 | 16;
};

const colMap = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

export function Grid({ children, cols = 2, gap = 6, className }: GridProps) {
  return (
    <div className={cn("grid", colMap[cols], gapMap[gap], className)}>
      {children}
    </div>
  );
}