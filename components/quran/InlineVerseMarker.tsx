import React from "react";
import { StyleSheet, Text } from "react-native";

import { FontFamily, FontSize, LineHeight } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";

interface InlineVerseMarkerProps {
  verseNumber: number;
}

/**
 * Renders the classical ornate verse end marker inline with Arabic text: ﴿١٢٣﴾
 */
export function InlineVerseMarker({ verseNumber }: InlineVerseMarkerProps) {
  const { colors } = useAppTheme();

  // Convert standard digits to Arabic-Indic digits
  // e.g. "123" -> "١٢٣"
  const arabicNumber = verseNumber
    .toString()
    .replace(/\d/g, (d) => String.fromCharCode(d.charCodeAt(0) + 1584));

  return (
    <Text style={[styles.marker, { color: colors.gold }]}>
      {` ﴿${arabicNumber}﴾ `}
    </Text>
  );
}

const styles = StyleSheet.create({
  marker: {
    fontFamily: FontFamily.amiri, // Or whatever font has the best ﴿ ﴾ symbols
    fontSize: FontSize.lg,
    lineHeight: FontSize.lg * LineHeight.normal,
  },
});
