import { useTranslations } from "next-intl";

type AvailabilityStatus = "idle" | "checking" | "available" | "taken";

type SlugStatusPillProps = {
  slug: string;
  status: AvailabilityStatus;
};

export default function SlugStatusPill({ slug, status }: SlugStatusPillProps) {
  const t = useTranslations("slugStatus");

  return (
    <div className="inline-flex items-center gap-1.5 bg-secondary border border-border rounded-full px-3 py-1.5 text-xs">
      <div className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_5px_rgba(34,197,94,0.6)]" />
      <span className="text-muted">slugpage.com/</span>
      <span className="font-medium text-primary">{slug}</span>
      {status === "available" && <span className="text-muted">{t("available")}</span>}
      {status === "taken" && <span className="text-error">{t("taken")}</span>}
      {status === "checking" && <span className="text-muted">{t("checking")}</span>}
    </div>
  );
}