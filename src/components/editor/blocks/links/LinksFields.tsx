import FormField from "@/components/ui/FormField";
import { Stack } from "@/components/styling/Layout";
import type { LinksBlock, LinksVariant } from "@/lib/types";

const variants: { value: LinksVariant; label: string }[] = [
  { value: "list", label: "List" },
  { value: "pills", label: "Pills" },
];

type LinksFieldsProps = {
  block: LinksBlock;
  styleLabel: string;
  onChange: (id: string, field: string, value: string) => void;
  onItemChange: (blockId: string, itemId: string, field: "label" | "href", value: string) => void;
};

export default function LinksFields({
  block,
  styleLabel,
  onChange,
  onItemChange,
}: LinksFieldsProps) {
  return (
    <Stack gap={3}>
      <div>
        <p className="text-xs font-medium text-primary mb-2">{styleLabel}</p>
        <div className="grid grid-cols-2 gap-1.5">
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

      {block.items.map((item, index) => (
        <FormField
          key={item.id}
          label={`Link ${index + 1}`}
          value={item.label}
          placeholder="Label"
          onChange={(value) => onItemChange(block.id, item.id, "label", value)}
        />
      ))}
    </Stack>
  );
}