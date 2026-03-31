import type { PaletteName } from "@/lib/types";

export type PaletteDefinition = {
  name: PaletteName;
  label: string;
  bg: string;
  primary: string;
  text: string;
  muted: string;
};

export const PALETTES: Record<PaletteName, PaletteDefinition> = {
  noir: {
    name: "noir",
    label: "Noir",
    bg: "#ffffff",
    primary: "#111111",
    text: "#111111",
    muted: "#666666",
  },
  cream: {
    name: "cream",
    label: "Cream",
    bg: "#fdf8f0",
    primary: "#1a1a1a",
    text: "#1a1a1a",
    muted: "#7a6a5a",
  },
  midnight: {
    name: "midnight",
    label: "Midnight",
    bg: "#0f0f0f",
    primary: "#e8e8e8",
    text: "#e8e8e8",
    muted: "#888888",
  },
  forest: {
    name: "forest",
    label: "Forest",
    bg: "#1a2e1a",
    primary: "#e8f5e8",
    text: "#e8f5e8",
    muted: "#7a9a7a",
  },
  ocean: {
    name: "ocean",
    label: "Ocean",
    bg: "#0c1f3f",
    primary: "#e8f0fe",
    text: "#e8f0fe",
    muted: "#7a9ac0",
  },
  blush: {
    name: "blush",
    label: "Blush",
    bg: "#fef0f0",
    primary: "#2d1a1a",
    text: "#2d1a1a",
    muted: "#9a6a6a",
  },
};

export const BUTTON_RADIUS: Record<string, string> = {
  pill: "9999px",
  rounded: "8px",
  square: "0px",
  outline: "9999px",
};
