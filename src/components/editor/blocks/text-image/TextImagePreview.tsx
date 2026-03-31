import { cn } from "@/lib/utils";
import type { TextImageBlock, PageTheme } from "@/lib/types";
import { PALETTES } from "@/lib/palettes";

type TextImagePreviewProps = {
  block: TextImageBlock;
  theme: PageTheme;
};

export default function TextImagePreview({ block, theme }: TextImagePreviewProps) {
  const palette = PALETTES[theme.palette];

  return (
    <div
      className={cn(
        "px-10 py-8 flex gap-6 items-center border-t border-black/5",
        block.variant === "img-right" && "flex-row-reverse",
        block.variant === "stacked" && "flex-col",
      )}
      style={{ backgroundColor: palette.bg }}
    >
      <div
        className={cn(
          "bg-black/8 rounded-lg flex-shrink-0",
          block.variant === "stacked" ? "w-full h-24" : "w-28 h-20",
        )}
        style={{
          backgroundImage: block.imageUrl ? `url(${block.imageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div>
        <h2
          className="text-lg font-light tracking-tight mb-2"
          style={{ fontFamily: `'${theme.headingFont}', serif`, color: palette.text }}
        >
          {block.heading}
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: palette.muted }}>
          {block.text}
        </p>
      </div>
    </div>
  );
}