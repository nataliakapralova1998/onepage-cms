import { cn } from "@/lib/utils";
import Link from "next/link";

type TextProps = {
  children: React.ReactNode;
  className?: string;
};

// ── EYEBROW ────────────────────────────────────────────────
export function Eyebrow({ children, className }: TextProps) {
  return (
    <p className={cn("text-[0.68rem] font-medium tracking-widest uppercase text-muted", className)}>
      {children}
    </p>
  );
}

// ── HEADING ────────────────────────────────────────────────
type HeadingProps = TextProps & {
  as?: "h1" | "h2" | "h3" | "h4";
};

const headingSizes = {
  h1: "text-[2.1rem]",
  h2: "text-[1.6rem]",
  h3: "text-[1.2rem]",
  h4: "text-[1rem]",
};

export function Heading({ children, as: Tag = "h1", className }: HeadingProps) {
  return (
    <Tag className={cn("font-serif font-light tracking-tight leading-tight text-primary", headingSizes[Tag], className)}>
      {children}
    </Tag>
  );
}

// ── BODY ───────────────────────────────────────────────────
export function Body({ children, className }: TextProps) {
  return (
    <p className={cn("text-sm font-light text-muted leading-relaxed", className)}>
      {children}
    </p>
  );
}

// ── CAPTION ────────────────────────────────────────────────
export function Caption({ children, className }: TextProps) {
  return (
    <p className={cn("text-[0.68rem] text-muted leading-relaxed", className)}>
      {children}
    </p>
  );
}

// ── INLINE LINK ────────────────────────────────────────────
type InlineLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function InlineLink({ href, children }: InlineLinkProps) {
  return (
    <Link href={href} className="text-primary underline underline-offset-2 hover:opacity-70 transition-opacity">
      {children}
    </Link>
  );
}