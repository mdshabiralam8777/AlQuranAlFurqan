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
 * Renders the classical ornate verse end marker inline with Arabic text: ﴿١٢٣﴾
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
}

const styles = StyleSheet.create({
  marker: {
    fontFamily: FontFamily.amiri,
    fontSize: FontSize.lg,
    // MUST match the parent Text's lineHeight (LINE_HEIGHT in MushafPage)
    // to prevent inconsistent line heights when a marker wraps solo onto a line.
    lineHeight: 48,
  },
});
