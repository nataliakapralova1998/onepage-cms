import { cn } from "@/lib/utils";

import type { PageTheme, ButtonStyle, HeadingFont } from "@/lib/types";
import { PALETTES } from "@/lib/palettes";

const HEADING_FONTS: { value: HeadingFont; label: string; style: React.CSSProperties }[] = [
  { value: "Fraunces",        label: "Fraunces",  style: { fontFamily: "'Fraunces', serif", fontStyle: "italic" } },
  { value: "Geist",           label: "Geist",     style: { fontFamily: "'Geist', sans-serif" } },
  { value: "Playfair Display",label: "Playfair",  style: { fontFamily: "'Playfair Display', serif", fontStyle: "italic" } },
  { value: "DM Serif Display",label: "DM Serif",  style: { fontFamily: "'DM Serif Display', serif" } },
];

const BUTTON_STYLES: { value: ButtonStyle; label: string; radius: string; outline?: boolean }[] = [
  { value: "pill",    label: "Pill",    radius: "9999px" },
  { value: "rounded", label: "Rounded", radius: "8px" },
  { value: "square",  label: "Square",  radius: "0px" },
  { value: "outline", label: "Outline", radius: "9999px", outline: true },
];

type StylePanelProps = {
  theme: PageTheme;
  paletteLabel: string;
  fontLabel: string;
  buttonLabel: string;
  onChange: (field: keyof PageTheme, value: string) => void;
};

export default function StylePanel({
  theme,
  paletteLabel,
  fontLabel,
  buttonLabel,
  onChange,
}: StylePanelProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs font-medium text-primary mb-2">{paletteLabel}</p>
        <div className="grid grid-cols-3 gap-1.5">
          {Object.values(PALETTES).map((palette) => (
            <button
              key={palette.name}
              type="button"
              onClick={() => onChange("palette", palette.name)}
              className={cn(
                "border rounded-lg overflow-hidden transition-all cursor-pointer",
                theme.palette === palette.name ? "border-primary border-[1.5px]" : "border-border hover:border-muted",
              )}
            >
              <div className="flex h-7">
                <div className="flex-1" style={{ background: palette.bg }} />
                <div className="w-2.5" style={{ background: palette.primary }} />
              </div>
              <p className={cn("text-[9px] py-1 text-center", theme.palette === palette.name ? "text-primary font-medium" : "text-muted")}>
                {palette.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-primary mb-2">{fontLabel}</p>
        <div className="grid grid-cols-2 gap-1.5">
          {HEADING_FONTS.map((font) => (
            <button
              key={font.value}
              type="button"
              onClick={() => onChange("headingFont", font.value)}
              className={cn(
                "border rounded-lg h-11 flex items-center justify-center transition-all cursor-pointer",
                theme.headingFont === font.value ? "border-primary border-[1.5px]" : "border-border hover:border-muted",
              )}
            >
              <span className="text-sm text-primary" style={font.style}>{font.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-primary mb-2">{buttonLabel}</p>
        <div className="grid grid-cols-2 gap-1.5">
          {BUTTON_STYLES.map((style) => (
            <button
              key={style.value}
              type="button"
              onClick={() => onChange("buttonStyle", style.value)}
              className={cn(
                "border rounded-lg h-10 flex items-center justify-center transition-all cursor-pointer",
                theme.buttonStyle === style.value ? "border-primary border-[1.5px]" : "border-border hover:border-muted",
              )}
            >
              <span
                className="text-[10px] font-medium px-3 py-1"
                style={{
                  borderRadius: style.radius,
                  background: style.outline ? "transparent" : "#111",
                  color: style.outline ? "#111" : "white",
                  border: style.outline ? "1.5px solid #111" : "none",
                }}
              >
                {style.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}