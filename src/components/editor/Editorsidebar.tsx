import { Caption } from "@/components/styling/Typography";
import type { Block, HeroBlock, ContactBlock, TextImageBlock, LinksBlock, PageTheme } from "@/lib/types";
import ContactFields from "./blocks/contact/ContactFields";
import HeroFields from "./blocks/hero/HeroFields";
import LinksFields from "./blocks/links/LinksFields";
import TextImageFields from "./blocks/text-image/Textimagefields";
import StylePanel from "./Stylepanel";
import Section from "./Section";



type EditorSidebarProps = {
  blocks: Block[];
  theme: PageTheme;
  slug: string;
  styleSectionLabel: string;
  paletteSectionLabel: string;
  fontSectionLabel: string;
  buttonSectionLabel: string;
  heroSectionLabel: string;
  headlineLabel: string;
  subtextLabel: string;
  ctaTextLabel: string;
  ctaHrefLabel: string;
  ctaHrefPlaceholder: string;
  textImageSectionLabel: string;
  layoutLabel: string;
  headingLabel: string;
  imageLabel: string;
  uploadLabel: string;
  linksSectionLabel: string;
  linksStyleLabel: string;
  contactSectionLabel: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  copyLinkLabel: string;
  onThemeChange: (field: keyof PageTheme, value: string) => void;
  onBlockChange: (id: string, field: string, value: string) => void;
  onItemChange: (blockId: string, itemId: string, field: "label" | "href", value: string) => void;
  onCopyLink: () => void;
};

export default function EditorSidebar({
  blocks,
  theme,
  slug,
  styleSectionLabel,
  paletteSectionLabel,
  fontSectionLabel,
  buttonSectionLabel,
  heroSectionLabel,
  headlineLabel,
  subtextLabel,
  ctaTextLabel,
  ctaHrefLabel,
  ctaHrefPlaceholder,
  textImageSectionLabel,
  layoutLabel,
  headingLabel,
  imageLabel,
  uploadLabel,
  linksSectionLabel,
  linksStyleLabel,
  contactSectionLabel,
  emailLabel,
  emailPlaceholder,
  phoneLabel,
  phonePlaceholder,
  copyLinkLabel,
  onThemeChange,
  onBlockChange,
  onItemChange,
  onCopyLink,
}: EditorSidebarProps) {
  return (
    <aside className="flex flex-col border-r border-border bg-surface overflow-y-auto">
      <div className="flex-1">
        <Section title={styleSectionLabel}>
          <StylePanel
            theme={theme}
            paletteLabel={paletteSectionLabel}
            fontLabel={fontSectionLabel}
            buttonLabel={buttonSectionLabel}
            onChange={onThemeChange}
          />
        </Section>

        {(blocks ?? []).map((block) => {
          switch (block.type) {
            case "hero":
              return (
                <Section key={block.id} title={heroSectionLabel}>
                  <HeroFields
                    block={block as HeroBlock}
                    headlineLabel={headlineLabel}
                    subtextLabel={subtextLabel}
                    ctaTextLabel={ctaTextLabel}
                    ctaHrefLabel={ctaHrefLabel}
                    ctaHrefPlaceholder={ctaHrefPlaceholder}
                    onChange={onBlockChange}
                  />
                </Section>
              );
            case "text-image":
              return (
                <Section key={block.id} title={textImageSectionLabel}>
                  <TextImageFields
                    block={block as TextImageBlock}
                    headingLabel={headingLabel}
                    textLabel={subtextLabel}
                    imageLabel={imageLabel}
                    uploadLabel={uploadLabel}
                    layoutLabel={layoutLabel}
                    onChange={onBlockChange}
                  />
                </Section>
              );
            case "links":
              return (
                <Section key={block.id} title={linksSectionLabel}>
                  <LinksFields
                    block={block as LinksBlock}
                    styleLabel={linksStyleLabel}
                    onChange={onBlockChange}
                    onItemChange={onItemChange}
                  />
                </Section>
              );
            case "contact":
              return (
                <Section key={block.id} title={contactSectionLabel}>
                  <ContactFields
                    block={block as ContactBlock}
                    emailLabel={emailLabel}
                    phoneLabel={phoneLabel}
                    emailPlaceholder={emailPlaceholder}
                    phonePlaceholder={phonePlaceholder}
                    onChange={onBlockChange}
                  />
                </Section>
              );
            default:
              return null;
          }
        })}
      </div>

      <div className="px-4 py-3 border-t border-border flex items-center justify-between">
        <Caption>slugpage.com/{slug}</Caption>
        <button
          type="button"
          onClick={onCopyLink}
          className="text-xs text-muted hover:text-primary transition-colors cursor-pointer bg-transparent border-none"
        >
          {copyLinkLabel}
        </button>
      </div>
    </aside>
  );
}