import React from "react";
import { StyleSheet, Text } from "react-native";

import { FontFamily, FontSize } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";

interface InlineVerseMarkerProps {
  verseNumber: number;
  /** Called when the verse marker is tapped (e.g. for bookmarking) */
  onPress?: (verseNumber: number) => void;
  /** Whether this verse is currently bookmarked — changes the marker color */
  isBookmarked?: boolean;
  /** When true, omits trailing space to prevent empty line wrapping */
  isLastOnPage?: boolean;
}

/**
 * Renders the classical ornate verse end marker inline with Arabic text.
 * Tappable when `onPress` is provided (used for bookmarking in Mushaf mode).
 */
export function InlineVerseMarker({
  verseNumber,
  onPress,
  isBookmarked,
  isLastOnPage,
}: InlineVerseMarkerProps) {
  const { colors } = useAppTheme();

  // Convert standard digits to Arabic-Indic digits
  // e.g. "123" -> "١٢٣"
  const arabicNumber = verseNumber
    .toString()
    .replace(/\d/g, (d) => String.fromCharCode(d.charCodeAt(0) + 1584));

  // --- Previous Implementation (Classic Brackets) ---
  /*
  return (
    <Text
      style={[
        styles.marker,
        {
          color: isBookmarked ? colors.gold : colors.gold,
          backgroundColor: isBookmarked ? colors.gold + "25" : "transparent",
          borderRadius: 4,
          overflow: "hidden",
        },
      ]}
      onPress={onPress ? () => onPress(verseNumber) : undefined}
      suppressHighlighting={false}
    >
      {isLastOnPage ? `﴿${arabicNumber}﴾` : ` ﴿${arabicNumber}﴾ `}
    </Text>
  );
  */

  // --- New Implementation (Ornate Symbol ۝ ) ---
  // We use the Arabic End of Ayah symbol U+06DD (۝) combined with the number.
  // Note: U+06DD is an enclosing mark in some fonts, but often renders best
  // when placed sequence-wise. If the font doesn't enclose it, using a stylized
  // flower/star like ۞ or just styling a custom badge looks more premium.
  // Let's use a beautiful composite approach for a premium aesthetic.

  return (
    <Text
      style={[
        styles.marker,
        {
          color: isBookmarked ? colors.tint : colors.gold,
          backgroundColor: isBookmarked ? colors.gold + "15" : "transparent",
          borderRadius: 20, // More rounded for the new badge look
          overflow: "hidden",
        },
      ]}
      onPress={onPress ? () => onPress(verseNumber) : undefined}
      suppressHighlighting={false}
    >
      {/* 
        Using purely Arabic aesthetic text: 
        The classic End of Ayah symbol: ۝ 
        Alternatively, a stylized inner padding approach to make the number pop 
      */}
      {isLastOnPage ? ` ۝${arabicNumber} ` : `  ۝${arabicNumber}  `}
    </Text>
  );
}

const styles = StyleSheet.create({
  marker: {
    fontFamily: FontFamily.amiri,
    fontSize: FontSize.xl, // Slightly larger for the new symbol
    // MUST match the parent Text's lineHeight (LINE_HEIGHT in MushafPage)
    // to prevent inconsistent line heights when a marker wraps solo onto a line.
    lineHeight: 48,
  },
});
