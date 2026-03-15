import Link from "next/link";
import { useTranslations } from "next-intl";

type AuthNavbarProps = {
  hint?: string;
  linkLabel?: string;
  linkHref?: string;
};

export default function AuthNavbar({
  hint,
  linkLabel,
  linkHref = "/login",
}: AuthNavbarProps) {
  const t = useTranslations("authNavbar");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-15 border-b border-border bg-background/90 backdrop-blur-md">
      <Link href="/" className="font-serif text-lg tracking-tight text-primary">
        SlugPage
      </Link>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted hidden sm:block">
          {hint ?? t("hint")}
        </span>
        <Link
          href={linkHref}
          className="text-sm font-medium text-primary px-4 py-1.5 border border-border rounded-full transition-colors hover:border-primary"
        >
          {linkLabel ?? t("linkLabel")}
        </Link>
      </div>
    </nav>
  );
}