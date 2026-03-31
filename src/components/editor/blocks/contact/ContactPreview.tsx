import type { ContactBlock, PageTheme } from "@/lib/types";
import { PALETTES } from "@/lib/palettes";

type ContactPreviewProps = {
  block: ContactBlock;
  theme: PageTheme;
};

export default function ContactPreview({ block, theme }: ContactPreviewProps) {
  const palette = PALETTES[theme.palette];

  return (
    <div
      className="px-10 py-8 text-center flex flex-col gap-1.5 border-t border-black/5"
      style={{ backgroundColor: palette.bg }}
    >
      {block.email && (
        <span className="text-sm underline underline-offset-2" style={{ color: palette.primary }}>
          {block.email}
        </span>
      )}
      {block.phone && (
        <span className="text-sm" style={{ color: palette.muted }}>
          {block.phone}
        </span>
      )}
    </div>
  );
}