export type AvailabilityStatus = "idle" | "checking" | "available" | "taken";

export type Screen = "signup" | "check";

export type PageStatus = "draft" | "published";

// ── THEME ────────────────────────────────────────────────────
export type PaletteName = "noir" | "cream" | "midnight" | "forest" | "ocean" | "blush";

export type ButtonStyle = "pill" | "rounded" | "square" | "outline";

export type HeadingFont = "Fraunces" | "Geist" | "Playfair Display" | "DM Serif Display";

export type PageTheme = {
  palette: PaletteName;
  headingFont: HeadingFont;
  buttonStyle: ButtonStyle;
};

// ── BLOCKS ───────────────────────────────────────────────────
export type HeroBlock = {
  id: string;
  type: "hero";
  headline: string;
  subtext: string;
  ctaText: string;
  ctaHref: string;
};

export type TextImageVariant = "img-left" | "img-right" | "stacked";

export type TextImageBlock = {
  id: string;
  type: "text-image";
  variant: TextImageVariant;
  heading: string;
  text: string;
  imageUrl: string;
};

export type LinksVariant = "list" | "pills";

export type LinkItem = {
  id: string;
  label: string;
  href: string;
};

export type LinksBlock = {
  id: string;
  type: "links";
  variant: LinksVariant;
  items: LinkItem[];
};

export type ContactBlock = {
  id: string;
  type: "contact";
  email: string;
  phone: string;
};

export type Block = HeroBlock | TextImageBlock | LinksBlock | ContactBlock;

// ── PAGE ─────────────────────────────────────────────────────
export type PageData = {
  slug: string;
  title: string;
  status: PageStatus;
  theme: PageTheme;
  blocks: Block[];
};