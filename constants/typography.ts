/**
 * Al Quran Al Furqan — Design Token: Typography
 *
 * Fonts:
 *  - Arabic Quran text: 'KFGQPC-Uthmanic-Hafs'  (loaded via expo-font)
 *  - Arabic headings:   'Amiri-Bold'             (loaded via expo-font)
 *  - UI / translations: 'Inter'                  (loaded via expo-font)
 */

export const FontFamily = {
  /** Used for all Quranic Arabic text and Bismillah */
  quranArabic: 'KFGQPC-Uthmanic-Hafs',
  /** Used for Surah name headers in Arabic */
  amiri: 'Amiri',
  amiriBold: 'Amiri-Bold',
  /** Used for all UI labels, translations, and English text */
  inter: 'Inter',
  interMedium: 'Inter-Medium',
  interSemiBold: 'Inter-SemiBold',
  interBold: 'Inter-Bold',
} as const;

/** Arabic font size steps — user can pick one from FontSizeStep */
export const ArabicFontSizes = {
  xs: 18,
  sm: 21,
  md: 26,   // default
  lg: 30,
  xl: 36,
} as const;

export type FontSizeStep = keyof typeof ArabicFontSizes;

/** Arabic line-height multiplier — critical for Tashkeel (diacritics) */
export const ARABIC_LINE_HEIGHT_RATIO = 2.2;

/** UI Typography Scale */
export const FontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  xxl: 28,
  xxxl: 32,
} as const;

export const LineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
} as const;
