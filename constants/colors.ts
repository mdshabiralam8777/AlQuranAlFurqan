/**
 * Al Quran Al Furqan — Design Token: Colors
 * Three themes: light (warm cream), dark, amoled (true black)
 */

export const Palette = {
  // Gold (Islamic accent)
  gold: '#C5963A',
  goldLight: '#F2DFA0',
  goldDark: '#D4A84B',
  goldSubtle: '#3D2E0D',

  // Green (primary actions)
  green: '#1A6B3C',
  greenDark: '#2E9E5B',

  // Neutrals — light
  cream: '#FFFDF5',
  creamSecondary: '#F5F0E8',
  white: '#FFFFFF',
  separator: '#E5DDD0',

  // Neutrals — dark
  black: '#0D0D0D',
  darkSecondary: '#1A1A1A',
  darkElevated: '#242424',
  darkSeparator: '#2E2E2E',
  amoled: '#000000',

  // Text
  textDark: '#1A1A1A',
  textMid: '#6B6B6B',
  textLight: '#F0EDE6',
  textMuted: '#999999',

  // Functional
  highlight: '#FFF3C4',  // playing verse — light
  highlightDark: '#3D3010', // playing verse — dark
  error: '#CC3333',
  success: '#1A6B3C',
} as const;

export const Colors = {
  light: {
    // Backgrounds
    bgPrimary: Palette.cream,
    bgSecondary: Palette.creamSecondary,
    bgElevated: Palette.white,

    // Text
    textPrimary: Palette.textDark,
    textSecondary: Palette.textMid,
    textArabic: Palette.textDark,

    // Accents
    gold: Palette.gold,
    goldLight: Palette.goldLight,
    green: Palette.green,

    // Decorative
    border: Palette.gold,
    separator: Palette.separator,
    highlight: Palette.highlight,

    // Navigation
    tabIconDefault: '#9BA1A6',
    tabIconSelected: Palette.green,
    tint: Palette.green,
    icon: '#687076',

    // Status bar
    statusBar: 'dark' as const,
  },
  dark: {
    bgPrimary: Palette.black,
    bgSecondary: Palette.darkSecondary,
    bgElevated: Palette.darkElevated,

    textPrimary: Palette.textLight,
    textSecondary: Palette.textMuted,
    textArabic: Palette.textLight,

    gold: Palette.goldDark,
    goldLight: Palette.goldSubtle,
    green: Palette.greenDark,

    border: Palette.goldDark,
    separator: Palette.darkSeparator,
    highlight: Palette.highlightDark,

    tabIconDefault: '#9BA1A6',
    tabIconSelected: Palette.greenDark,
    tint: Palette.greenDark,
    icon: '#9BA1A6',

    statusBar: 'light' as const,
  },
  amoled: {
    bgPrimary: Palette.amoled,
    bgSecondary: '#0A0A0A',
    bgElevated: '#111111',

    textPrimary: Palette.textLight,
    textSecondary: Palette.textMuted,
    textArabic: Palette.textLight,

    gold: Palette.goldDark,
    goldLight: Palette.goldSubtle,
    green: Palette.greenDark,

    border: Palette.goldDark,
    separator: '#1A1A1A',
    highlight: '#2A2000',

    tabIconDefault: '#9BA1A6',
    tabIconSelected: Palette.greenDark,
    tint: Palette.greenDark,
    icon: '#9BA1A6',

    statusBar: 'light' as const,
  },
} as const;

export type ThemeMode = keyof typeof Colors;
export type ColorTokens = typeof Colors.light;
