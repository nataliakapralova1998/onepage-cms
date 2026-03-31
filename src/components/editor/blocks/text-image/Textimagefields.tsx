import FormField from "@/components/ui/FormField";
import { Stack } from "@/components/styling/Layout";
import type { TextImageBlock, TextImageVariant } from "@/lib/types";

const SUBTEXT_ID = "ti-text";

const variants: { value: TextImageVariant; label: string }[] = [
  { value: "img-left", label: "Image left" },
  { value: "img-right", label: "Image right" },
  { value: "stacked", label: "Stacked" },
];

type TextImageFieldsProps = {
  block: TextImageBlock;
  headingLabel: string;
  textLabel: string;
  imageLabel: string;
  uploadLabel: string;
  layoutLabel: string;
  onChange: (id: string, field: keyof Omit<TextImageBlock, "id" | "type">, value: string) => void;
};

export default function TextImageFields({
  block,
  headingLabel,
  textLabel,
  imageLabel,
  uploadLabel,
  layoutLabel,
  onChange,
}: TextImageFieldsProps) {
  return (
    <Stack gap={3}>
      <div>
        <p className="text-xs font-medium text-primary mb-2">{layoutLabel}</p>
        <div className="grid grid-cols-3 gap-1.5">
          {variants.map((variant) => (
            <button
              key={variant.value}
              type="button"
              onClick={() => onChange(block.id, "variant", variant.value)}
              className={`border rounded-lg py-1.5 text-[10px] transition-all cursor-pointer ${
                block.variant === variant.value
                  ? "border-primary text-primary font-medium"
                  : "border-border text-muted hover:border-muted"
              }`}
            >
              {variant.label}
            </button>
          ))}
        </div>
      </div>

      <FormField
        label={headingLabel}
        value={block.heading}
        onChange={(value) => onChange(block.id, "heading", value)}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor={SUBTEXT_ID} className="text-xs font-medium text-primary">{textLabel}</label>
        <textarea
          id={SUBTEXT_ID}
          value={block.text}
          onChange={(event) => onChange(block.id, "text", event.target.value)}
          rows={3}
          className="w-full border border-border rounded-lg px-4 py-3 text-sm font-light text-primary bg-background outline-none transition-all focus:border-primary focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)] resize-none"
        />
      </div>

      <div>
        <p className="text-xs font-medium text-primary mb-1.5">{imageLabel}</p>
        <div className="w-full h-16 border border-dashed border-border rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
          <span className="text-xs text-muted">{uploadLabel}</span>
        </div>
      </div>
    </Stack>
  );
}