import FormField from "@/components/ui/FormField";
import { Stack } from "@/components/styling/Layout";
import type { ContactBlock } from "@/lib/types";

type ContactFieldsProps = {
  block: ContactBlock;
  emailLabel: string;
  phoneLabel: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  onChange: (id: string, field: keyof Omit<ContactBlock, "id" | "type">, value: string) => void;
};

export default function ContactFields({
  block,
  emailLabel,
  phoneLabel,
  emailPlaceholder,
  phonePlaceholder,
  onChange,
}: ContactFieldsProps) {
  return (
    <Stack gap={3}>
      <FormField
        label={emailLabel}
        type="email"
        value={block.email}
        placeholder={emailPlaceholder}
        onChange={(value) => onChange(block.id, "email", value)}
      />
      <FormField
        label={phoneLabel}
        type="tel"
        value={block.phone}
        placeholder={phonePlaceholder}
        onChange={(value) => onChange(block.id, "phone", value)}
      />
    </Stack>
  );
}