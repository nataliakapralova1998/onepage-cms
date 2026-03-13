import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?:boolean;
};

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  disabled,
  className,
}: ButtonProps) {
  const base = "inline-flex items-center gap-2 rounded-full font-medium cursor-pointer transition-all duration-150";

  const variants = {
    primary: "bg-primary text-primary-foreground hover:opacity-70",
    secondary: "bg-transparent text-primary border border-border hover:border-primary",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-5 py-2 text-sm",
    lg: "px-8 py-3.5 text-sm",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) return <Link href={href} className={classes}>{children}</Link>;
  return <button disabled={disabled} type="button" onClick={onClick} className={classes}>{children}</button>;
}