/**
 * Al Quran Al Furqan — Design Token: Spacing
 * Base unit: 4dp
 */

export const Spacing = {
  /** 2dp */
  xxs: 2,
  /** 4dp */
  xs: 4,
  /** 8dp */
  sm: 8,
  /** 12dp */
  md: 12,
  /** 16dp — screen horizontal padding */
  lg: 16,
  /** 20dp */
  xl: 20,
  /** 24dp */
  xxl: 24,
  /** 32dp */
  xxxl: 32,
  /** 48dp */
  huge: 48,
} as const;

export const BorderRadius = {
  /** Verse number badge, circular */
  full: 9999,
  /** Bottom sheet (top corners) */
  sheet: 24,
  /** Cards */
  card: 12,
  /** Buttons */
  button: 8,
  /** Chips/tags */
  chip: 6,
  /** Small elements */
  sm: 4,
} as const;

/** Minimum touch target area (Apple HIG / Material) */
export const TouchTarget = {
  min: 44,
} as const;

/** Tab bar + mini player height offset — accounts for safe area */
export const Layout = {
  tabBarHeight: 64,
  miniPlayerHeight: 64,
  screenPaddingH: Spacing.lg,
  surahHeaderHeight: 120,
} as const;
