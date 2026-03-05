import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import { IslamicBorder } from "@/assets/svgs/IslamicBorder";
import { Bismillah, ThemedText } from "@/components/ui";
import { Spacing } from "@/constants/spacing";
import { useAppTheme } from "@/context/ThemeContext";
import { Verse } from "@/services/quranApi";
import { InlineVerseMarker } from "./InlineVerseMarker";

/** Matches the lineHeight in inlineText style — single source of truth */
const LINE_HEIGHT = 48;

/** Upper-bound of lines per page — the excess is clipped away */
const MAX_LINES = 30;

interface MushafPageProps {
  pageNumber: number;
  verses: Verse[];
  showBismillah?: boolean;
  /** Called when a verse marker is tapped (for bookmarking) */
  onVersePress?: (verse: Verse) => void;
  /** Set of bookmarked verse keys for visual indicator */
  bookmarkedVerseKeys?: Set<string>;
}

/**
 * Generates a tall block of repeating horizontal lines.
 * The parent clips it to the height of the actual text content.
 */
function LinedBackground({
  lineHeight,
  color,
  count,
}: {
  lineHeight: number;
  color: string;
  count: number;
}) {
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { opacity: 0.3, height: count * lineHeight },
      ]}
      pointerEvents="none"
    >
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          style={{
            height: lineHeight,
            borderBottomWidth: 1,
            borderBottomColor: color,
            width: "100%",
          }}
        />
      ))}
    </View>
  );
}

/**
 * Renders a full page of Quranic verses flowing continuously (inline).
 */
export function MushafPage({
  pageNumber,
  verses,
  showBismillah,
  onVersePress,
  bookmarkedVerseKeys,
}: MushafPageProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.pageContainer}>
      <IslamicBorder padding={Spacing.lg} style={styles.borderWrapper}>
        {showBismillah && (
          <View style={styles.bismillahWrapper}>
            <Bismillah />
          </View>
        )}

        {/* Lined Background Layer — overflow: hidden clips the lines
            to the natural height of the text flow below. */}
        <View style={styles.contentArea}>
          <LinedBackground
            lineHeight={LINE_HEIGHT}
            color={colors.textSecondary}
            count={MAX_LINES}
          />

          {/* We use a single wrapper Text node so all child Text nodes flow continuously inline */}
          <Text style={[styles.textFlow, { textAlign: "justify" }]}>
            {verses.map((verse, index) => {
              let verseText = (
                verse.text_uthmani ||
                verse.text_imlaei ||
                ""
              ).trim();

              // For Surah Al-Fatihah, Verse 1 *is* the Bismillah.
              // Since we already show the SVG Bismillah at the top, we remove the Arabic text copy
              // from the verse flow, but we STILL render its verse marker ﴿١﴾.
              if (showBismillah && verse.verse_number === 1) {
                const bismillahUthmani =
                  "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ";
                const bismillahImlaei =
                  "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";

                verseText = verseText
                  .replace(bismillahUthmani, "")
                  .replace(bismillahImlaei, "")
                  .trim();
              }

              const isLastVerse = index === verses.length - 1;

              return (
                <React.Fragment key={verse.verse_key}>
                  <ThemedText role="arabic" style={styles.inlineText}>
                    {verseText}
                  </ThemedText>
                  <InlineVerseMarker
                    verseNumber={verse.verse_number}
                    onPress={
                      onVersePress ? () => onVersePress(verse) : undefined
                    }
                    isBookmarked={bookmarkedVerseKeys?.has(verse.verse_key)}
                    isLastOnPage={isLastVerse}
                  />
                  {!isLastVerse && (
                    <ThemedText role="arabic" style={styles.inlineText}>
                      {" "}
                    </ThemedText>
                  )}
                </React.Fragment>
              );
            })}
          </Text>
        </View>
      </IslamicBorder>

      {/* Subtle page indicator at the bottom center */}
      <ThemedText role="caption" style={styles.pageIndicator}>
        {pageNumber}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  borderWrapper: {
    // default view behavior
  },
  contentArea: {
    position: "relative",
    overflow: "hidden",
  },
  textFlow: {
    writingDirection: "rtl",
    // Prevent Android's extra top/bottom font padding from inflating height
    ...(Platform.OS === "android" ? { includeFontPadding: false } : {}),
  },
  inlineText: {
    // Override default role="arabic" to be larger and more legible for the Mushaf view
    fontSize: 28,
    lineHeight: LINE_HEIGHT,
  },
  pageIndicator: {
    textAlign: "center",
    marginTop: Spacing.sm,
    opacity: 0.6,
  },
  bismillahWrapper: {
    alignItems: "center",
    marginBottom: Spacing.xxl,
    marginTop: Spacing.md,
  },
});
