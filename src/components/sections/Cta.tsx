import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/shared/SectionLabel";

interface CtaSectionProps {
  label?: string;
  title?: string;
  subtitle?: string;
  cta?: string;
  ctaHref?: string;
}

export default function CtaSection({
  label,
  title,
  subtitle,
  cta,
  ctaHref = "/signup",
}: CtaSectionProps) {
  const t = useTranslations("cta");

  return (
    <section className="text-center max-w-240 mx-auto px-6 md:px-12 py-24 md:py-32">
      <SectionLabel className="justify-center flex text-success">
        {label ?? t("label")}
      </SectionLabel>
      <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light tracking-tight leading-tight text-primary mb-4">
        {title ??
          t.rich("title", {
            em: (chunks) => <em>{chunks}</em>,
            br: () => <br />,
            success: (chunks) => <span className="text-success">{chunks}</span>,
          })}
      </h2>
      <p className="text-base font-light text-muted mb-10 leading-relaxed">
        {subtitle ?? t("subtitle")}
      </p>
      <Button href={ctaHref} size="lg">
        {cta ?? t("cta")}
      </Button>
    </section>
  );
}
