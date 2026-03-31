import { cn } from "@/lib/utils";
import type { LinksBlock, PageTheme } from "@/lib/types";
import { PALETTES, BUTTON_RADIUS } from "@/lib/palettes";

type LinksPreviewProps = {
  block: LinksBlock;
  theme: PageTheme;
};

export default function LinksPreview({ block, theme }: LinksPreviewProps) {
  const palette = PALETTES[theme.palette];
  const radius = BUTTON_RADIUS[theme.buttonStyle];

  return (
    <div
      className={cn(
        "px-10 py-7 border-t border-black/5",
        block.variant === "pills" ? "flex flex-wrap justify-center gap-2" : "flex flex-col gap-2",
      )}
      style={{ backgroundColor: palette.bg }}
    >
      {block.items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "text-center border text-sm font-medium",
            block.variant === "pills" ? "px-4 py-1.5 text-xs" : "px-4 py-2.5 w-full",
          )}
          style={{
            borderRadius: radius,
            borderColor: palette.primary,
            color: palette.primary,
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}