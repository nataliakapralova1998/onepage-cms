import FormField from "@/components/ui/FormField";
import { Stack } from "@/components/styling/Layout";
import type { HeroBlock } from "@/lib/types";

const SUBTEXT_ID = "hero-subtext";

type HeroFieldsProps = {
  block: HeroBlock;
  headlineLabel: string;
  subtextLabel: string;
  ctaTextLabel: string;
  ctaHrefLabel: string;
  ctaHrefPlaceholder: string;
  onChange: (id: string, field: keyof Omit<HeroBlock, "id" | "type">, value: string) => void;
};

export default function HeroFields({
  block,
  headlineLabel,
  subtextLabel,
  ctaTextLabel,
  ctaHrefLabel,
  ctaHrefPlaceholder,
  onChange,
}: HeroFieldsProps) {
  return (
    <Stack gap={3}>
      <FormField
        label={headlineLabel}
        value={block.headline}
        onChange={(value) => onChange(block.id, "headline", value)}
      />
      <div className="flex flex-col gap-1.5">
        <label htmlFor={SUBTEXT_ID} className="text-xs font-medium text-primary">
          {subtextLabel}
        </label>
        <textarea
          id={SUBTEXT_ID}
          value={block.subtext}
          onChange={(event) => onChange(block.id, "subtext", event.target.value)}
          rows={3}
          className="w-full border border-border rounded-lg px-4 py-3 text-sm font-light text-primary bg-background outline-none transition-all placeholder:text-muted/50 focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)] resize-none"
        />
      </div>
      <FormField
        label={ctaTextLabel}
        value={block.ctaText}
        onChange={(value) => onChange(block.id, "ctaText", value)}
      />
      <FormField
        label={ctaHrefLabel}
        value={block.ctaHref}
        placeholder={ctaHrefPlaceholder}
        onChange={(value) => onChange(block.id, "ctaHref", value)}
      />
    </Stack>
  );
}