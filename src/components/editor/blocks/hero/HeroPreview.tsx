import type { HeroBlock, PageTheme } from "@/lib/types";
import { PALETTES, BUTTON_RADIUS } from "@/lib/palettes";

type HeroPreviewProps = {
  block: HeroBlock;
  theme: PageTheme;
};

export default function HeroPreview({ block, theme }: HeroPreviewProps) {
  const palette = PALETTES[theme.palette];
  const radius = BUTTON_RADIUS[theme.buttonStyle];
  const isOutline = theme.buttonStyle === "outline";

  const words = block.headline.split(" ");
  const lastWord = words.pop();
  const firstWords = words.join(" ");

  return (
    <div className="px-10 py-14 text-center" style={{ backgroundColor: palette.bg }}>
      <h1
        className="text-3xl font-light tracking-tight leading-tight mb-4"
        style={{ fontFamily: `'${theme.headingFont}', serif`, color: palette.text }}
      >
        {firstWords && <span>{firstWords} </span>}
        <em>{lastWord}</em>
      </h1>
      <p className="text-sm leading-relaxed mb-8 max-w-xs mx-auto" style={{ color: palette.muted }}>
        {block.subtext}
      </p>
      {block.ctaText && (
        <div
          className="inline-block text-sm font-medium px-6 py-3"
          style={{
            borderRadius: radius,
            background: isOutline ? "transparent" : palette.primary,
            color: isOutline ? palette.primary : palette.bg,
            border: isOutline ? `2px solid ${palette.primary}` : "none",
          }}
        >
          {block.ctaText}
        </div>
      )}
    </div>
  );
}