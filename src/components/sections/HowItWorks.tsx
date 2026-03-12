import { useTranslations } from "next-intl";
import SectionLabel from "@/components/shared/SectionLabel";

interface Step {
  num: string;
  title: string;
  desc: string;
}

interface HowItWorksProps {
  label?: string;
  steps?: Step[];
}

export default function HowItWorks({ label, steps }: HowItWorksProps) {
  const t = useTranslations("howItWorks");

  const stepKeys = ["pickSlug", "buildPage", "goLive"] as const;

  const items: Step[] = steps ?? stepKeys.map((key) => ({
    num: t(`${key}.num`),
    title: t(`${key}.title`),
    desc: t(`${key}.desc`),
  }));

  return (
    <section id="how" className="max-w-240 mx-auto px-6 md:px-12 py-20 md:py-24">
      <SectionLabel>{label ?? t("label")}</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        {items.map((step) => (
          <div key={step.num}>
            <div className="font-serif text-sm font-light text-muted mb-5">
              {step.num}
            </div>
            <div className="font-serif text-xl font-light tracking-tight text-primary mb-3 leading-snug">
              {step.title}
            </div>
            <p className="text-sm font-light text-muted leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}