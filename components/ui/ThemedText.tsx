/**
 * ThemedText — theme-aware text primitive.
 * Drop-in replacement for the Expo scaffold ThemedText.
 * Supports Arabic script role which applies the Uthmanic font + RTL alignment.
 */

import { StyleSheet, Text, type TextProps } from "react-native";

import {
  ARABIC_LINE_HEIGHT_RATIO,
  ArabicFontSizes,
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
} from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";

export type TextRole =
  | "body"
  | "bodyMedium"
  | "bodySemiBold"
  | "caption"
  | "label"
  | "subtitle"
  | "title"
  | "heading"
  | "arabic" // Arabic Quran text (Uthmanic Hafs, large, RTL)
  | "arabicSmall" // Arabic UI labels  (Amiri, smaller)
  | "surahName" // Surah name header (Amiri Bold)
  | "translation" // Translation text  (Inter, slightly smaller)
  | "verseNumber" // Verse badge label (Amiri, small)
  | "link";

export type ThemedTextProps = Omit<TextProps, "role"> & {
  role?: TextRole;
  /** Override color directly */
  color?: string;
  /** Font size override — mostly for Arabic where user can scale */
  fontSize?: number;
};

export function ThemedText({
  role = "body",
  style,
  color,
  fontSize,
  ...rest
}: ThemedTextProps) {
  const { colors } = useAppTheme();

  const resolvedColor =
    color ??
    (role === "arabic" || role === "surahName" || role === "verseNumber"
      ? colors.textArabic
      : role === "caption" || role === "label"
        ? colors.textSecondary
        : role === "link"
          ? colors.gold
          : colors.textPrimary);

  return (
    <Text
      style={[
        styles[role],
        { color: resolvedColor },
        fontSize
          ? {
              fontSize,
              lineHeight:
                role === "arabic"
                  ? fontSize * ARABIC_LINE_HEIGHT_RATIO
                  : undefined,
            }
          : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  body: {
    fontFamily: FontFamily.inter,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * LineHeight.normal,
    fontWeight: FontWeight.regular,
  },
  bodyMedium: {
    fontFamily: FontFamily.interMedium,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * LineHeight.normal,
    fontWeight: FontWeight.medium,
  },
  bodySemiBold: {
    fontFamily: FontFamily.interSemiBold,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * LineHeight.normal,
    fontWeight: FontWeight.semibold,
  },
  caption: {
    fontFamily: FontFamily.inter,
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * LineHeight.normal,
    fontWeight: FontWeight.regular,
  },
  label: {
    fontFamily: FontFamily.interMedium,
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * LineHeight.normal,
    fontWeight: FontWeight.medium,
  },
  subtitle: {
    fontFamily: FontFamily.interSemiBold,
    fontSize: FontSize.md,
    lineHeight: FontSize.md * LineHeight.normal,
    fontWeight: FontWeight.semibold,
  },
  title: {
    fontFamily: FontFamily.interBold,
    fontSize: FontSize.xl,
    lineHeight: FontSize.xl * LineHeight.tight,
    fontWeight: FontWeight.bold,
  },
  heading: {
    fontFamily: FontFamily.interBold,
    fontSize: FontSize.xxxl,
    lineHeight: FontSize.xxxl * LineHeight.tight,
    fontWeight: FontWeight.bold,
  },
  arabic: {
    fontFamily: FontFamily.quranArabic,
    fontSize: ArabicFontSizes.md,
    lineHeight: ArabicFontSizes.md * ARABIC_LINE_HEIGHT_RATIO,
    textAlign: "right",
    writingDirection: "rtl",
    fontWeight: FontWeight.regular,
  },
  arabicSmall: {
    fontFamily: FontFamily.amiri,
    fontSize: FontSize.md,
    lineHeight: FontSize.md * ARABIC_LINE_HEIGHT_RATIO,
    textAlign: "right",
    writingDirection: "rtl",
    fontWeight: FontWeight.regular,
  },
  surahName: {
    fontFamily: FontFamily.amiriBold,
    fontSize: FontSize.xxl,
    lineHeight: FontSize.xxl * ARABIC_LINE_HEIGHT_RATIO,
    textAlign: "center",
    fontWeight: FontWeight.bold,
  },
  translation: {
    fontFamily: FontFamily.inter,
    fontSize: FontSize.sm + 1,
    lineHeight: (FontSize.sm + 1) * LineHeight.relaxed,
    fontWeight: FontWeight.regular,
  },
  verseNumber: {
    fontFamily: FontFamily.amiri,
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * LineHeight.normal,
    textAlign: "center",
    fontWeight: FontWeight.regular,
  },
  link: {
    fontFamily: FontFamily.inter,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * LineHeight.normal,
    fontWeight: FontWeight.medium,
    textDecorationLine: "underline",
  },
});
