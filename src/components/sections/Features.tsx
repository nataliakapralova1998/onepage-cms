import { useTranslations } from "next-intl";
import SectionLabel from "@/components/shared/SectionLabel";

interface Feature {
  title: string;
  desc: string;
}

interface FeaturesProps {
  label?: string;
  features?: Feature[];
}

export default function Features({ label, features }: FeaturesProps) {
  const t = useTranslations("features");

  const featureKeys = [
    "instantPublishing",
    "memorableUrl",
    "editAnytime",
    "mobileReady",
  ] as const;

  const items: Feature[] = features ?? featureKeys.map((key) => ({
    title: t(`${key}.title`),
    desc: t(`${key}.desc`),
  }));

  return (
    <section id="features" className="bg-surface border-y border-border">
      <div className="max-w-240 mx-auto px-6 md:px-12 py-20 md:py-24">
        <SectionLabel>{label ?? t("label")}</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 border-l border-t border-border">
          {items.map((feature) => (
            <div
              key={feature.title}
              className="p-8 md:p-10 border-r border-b border-border hover:bg-background transition-colors"
            >
              <div className="font-serif text-lg font-light tracking-tight text-primary mb-2.5">
                {feature.title}
              </div>
              <p className="text-sm font-light text-muted leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}