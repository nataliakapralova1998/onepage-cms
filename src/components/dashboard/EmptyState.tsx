import Button from "@/components/ui/Button";
import { Heading, Body } from "@/components/styling/Typography";
import { Stack } from "@/components/styling/Layout";
import { Diamond } from "lucide-react";

type EmptyStateProps = {
  title: React.ReactNode;
  subtitle: string;
  buttonLabel: string;
  onCta: () => void;
};

export default function EmptyState({ title, subtitle, buttonLabel, onCta }: EmptyStateProps) {
  return (
    <div className="text-center py-20 px-6 border border-dashed border-border rounded-xl">
      <Stack gap={3} className="items-center">
        <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-muted text-lg">
         <Diamond />
        </div>
        <Stack gap={1} className="items-center">
          <Heading as="h2">{title}</Heading>
          <Body>{subtitle}</Body>
        </Stack>
        <Button onClick={onCta} className="mt-2">
          {buttonLabel}
        </Button>
      </Stack>
    </div>
  );
}