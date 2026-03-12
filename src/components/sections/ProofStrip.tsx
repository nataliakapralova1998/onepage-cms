import { useTranslations } from "next-intl";

interface Stat {
  value: string;
  label: string;
}

interface ProofStripProps {
  stats?: Stat[];
}

export default function ProofStrip({ stats }: ProofStripProps) {
  const t = useTranslations("proofStrip");

  const statKeys = ["cost", "speed", "edits", "skills"] as const;

  const items: Stat[] = stats ?? statKeys.map((key) => ({
    value: t(`${key}.value`),
    label: t(`${key}.label`),
  }));

  return (
    <>
      <hr className="border-border" />
      <div className="flex items-center justify-center flex-wrap gap-y-6 gap-x-0 py-8 px-6">
        {items.map((stat, index) => (
          <div key={stat.label} className="flex items-center">
            <div className="flex flex-col items-center gap-1 px-8">
              <span className="font-serif text-2xl font-light tracking-tight text-primary">
                {stat.value}
              </span>
              <span className="text-xs text-muted text-center">{stat.label}</span>
            </div>
            {index < items.length - 1 && (
              <div className="w-px h-8 bg-border" />
            )}
          </div>
        ))}
      </div>
      <hr className="border-border" />
    </>
  );
}