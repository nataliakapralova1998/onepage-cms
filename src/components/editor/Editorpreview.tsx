"use client";

import { cn } from "@/lib/utils";
import { PALETTES } from "@/lib/palettes";

import type { Block, PageTheme } from "@/lib/types";
import ContactPreview from "./blocks/contact/ContactPreview";
import HeroPreview from "./blocks/hero/HeroPreview";
import LinksPreview from "./blocks/links/LinksPreview";
import TextImagePreview from "./blocks/text-image/TextImagePreview";
import PreviewBlock from "./PreviewBlock";

type DeviceType = "desktop" | "tablet" | "mobile";

type EditorPreviewProps = {
  slug: string;
  blocks: Block[];
  theme: PageTheme;
  device: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
};

const devices: { type: DeviceType; label: string }[] = [
  { type: "desktop", label: "Desktop" },
  { type: "tablet", label: "Tablet" },
  { type: "mobile", label: "Mobile" },
];

const frameWidths: Record<DeviceType, string> = {
  desktop: "w-full",
  tablet:  "max-w-[600px]",
  mobile:  "max-w-[375px]",
};

export default function EditorPreview({ slug, blocks, theme, device, onDeviceChange }: EditorPreviewProps) {
  const palette = PALETTES[theme.palette];

  // Changing this key re-mounts the block list, re-triggering all animations
  const animationKey = `${theme.palette}-${theme.buttonStyle}-${theme.headingFont}-${device}`;

  return (
    <main className="flex flex-col bg-[#f0f0f0] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background">
        <div className="flex items-center gap-1">
          {devices.map((item) => (
            <button
              key={item.type}
              type="button"
              onClick={() => onDeviceChange(item.type)}
              className={cn(
                "px-3 py-1 text-xs rounded-full transition-all cursor-pointer border",
                device === item.type
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted border-border hover:border-primary hover:text-primary",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted">slugpage.com/{slug}</span>
      </div>

      <div className="flex-1 flex items-start justify-center p-6 overflow-auto">
        <div className={cn("w-full transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]", frameWidths[device])}>
          <div className="border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-secondary">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="flex-1 mx-3 bg-background border border-border rounded-full px-3 py-1 text-xs text-muted text-center">
                slugpage.com/{slug}
              </div>
            </div>

            <div key={animationKey} style={{ backgroundColor: palette.bg }}>
              {(blocks ?? []).map((block, index) => {
                switch (block.type) {
                  case "hero":
                    return (
                      <PreviewBlock key={block.id} index={index}>
                        <HeroPreview block={block} theme={theme} />
                      </PreviewBlock>
                    );
                  case "text-image":
                    return (
                      <PreviewBlock key={block.id} index={index}>
                        <TextImagePreview block={block} theme={theme} />
                      </PreviewBlock>
                    );
                  case "links":
                    return (
                      <PreviewBlock key={block.id} index={index}>
                        <LinksPreview block={block} theme={theme} />
                      </PreviewBlock>
                    );
                  case "contact":
                    return (
                      <PreviewBlock key={block.id} index={index}>
                        <ContactPreview block={block} theme={theme} />
                      </PreviewBlock>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}