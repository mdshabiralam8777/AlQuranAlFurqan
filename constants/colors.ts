/**
 * Al Quran Al Furqan — Design Token: Colors
 * Midnight Navy (#0A192F) + Gold (#C5A059) aesthetic.
 * Three themes: light (warm ivory), dark (midnight navy), amoled (true black)
 */

export const Palette = {
  // Navy (Brand Primary)
  navy: "#0A192F",
  navyLight: "#112240",
  navyMid: "#1D3557",
  navySurface: "#233554",

  // Gold (Accent)
  gold: "#C5A059",
  goldLight: "#D4B87A",
  goldSubtle: "#3D2E0D",
  goldMuted: "#A88B4A",

  // Ivory / Cream (Light mode surfaces)
  ivory: "#FAF9F6",
  ivorySecondary: "#F4F2E9",
  white: "#FFFFFF",

  // Dark / AMOLED surfaces
  amoled: "#000000",
  amoledSurface: "#0A0A0A",
  amoledElevated: "#111111",

  // Text
  textDark: "#1C1C1C",
  textMid: "#424242",
  textLight: "#FAF9F6",
  textMuted: "#9CA3AF",
  textArabicLight: "#000000", // Max contrast for Arabic in light mode

  // Separators
  separatorLight: "#E5DDD0",
  separatorDark: "#233554",
  separatorAmoled: "#1A1A1A",

  // Functional states
  highlight: "#FFF3C4", // playing verse — light
  highlightDark: "#3D3010", // playing verse — dark
  highlightAmoled: "#2A2000",
  error: "#CC3333",
  success: "#2E7D32",
} as const;

export const Colors = {
  light: {
    // Backgrounds
    bgPrimary: Palette.ivory,
    bgSecondary: Palette.ivorySecondary,
    bgElevated: Palette.white,

    // Text
    textPrimary: Palette.textDark,
    textSecondary: Palette.textMid,
    textArabic: Palette.textArabicLight,

    // Accents
    gold: Palette.gold,
    goldLight: Palette.goldLight,

    // Brand — always Navy regardless of theme
    navyPrimary: Palette.navy,

    // Decorative
    border: Palette.gold,
    separator: Palette.separatorLight,
    highlight: Palette.highlight,

    // Navigation
    tabIconDefault: Palette.textMuted,
    tabIconSelected: Palette.gold,
    tint: Palette.gold,
    icon: "#687076",

    // Status bar
    statusBar: "dark" as const,
  },
  dark: {
    bgPrimary: Palette.navy,
    bgSecondary: Palette.navyLight,
    bgElevated: Palette.navySurface,

    textPrimary: Palette.textLight,
    textSecondary: Palette.textMuted,
    textArabic: Palette.textLight,

    gold: Palette.goldLight,
    goldLight: Palette.goldSubtle,

    navyPrimary: Palette.navy,

    border: Palette.goldLight,
    separator: Palette.separatorDark,
    highlight: Palette.highlightDark,

    tabIconDefault: Palette.textMuted,
    tabIconSelected: Palette.gold,
    tint: Palette.gold,
    icon: "#9BA1A6",

    statusBar: "light" as const,
  },
  amoled: {
    bgPrimary: Palette.amoled,
    bgSecondary: Palette.amoledSurface,
    bgElevated: Palette.amoledElevated,

    textPrimary: Palette.textLight,
    textSecondary: Palette.textMuted,
    textArabic: Palette.textLight,

    gold: Palette.goldLight,
    goldLight: Palette.goldSubtle,

    navyPrimary: Palette.navy,

    border: Palette.goldLight,
    separator: Palette.separatorAmoled,
    highlight: Palette.highlightAmoled,

    tabIconDefault: "#9BA1A6",
    tabIconSelected: Palette.gold,
    tint: Palette.gold,
    icon: "#9BA1A6",

    statusBar: "light" as const,
  },
} as const;

export type ThemeMode = keyof typeof Colors;
export type ColorTokens = typeof Colors.light;
