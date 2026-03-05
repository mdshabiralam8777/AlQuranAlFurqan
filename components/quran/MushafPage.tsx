import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { IslamicBorder } from "@/assets/svgs/IslamicBorder";
import { Bismillah, ThemedText } from "@/components/ui";
import { Spacing } from "@/constants/spacing";
import { Verse } from "@/services/quranApi";
import { InlineVerseMarker } from "./InlineVerseMarker";

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
 * Renders a full page of Quranic verses flowing continuously (inline).
 */
export function MushafPage({
  pageNumber,
  verses,
  showBismillah,
  onVersePress,
  bookmarkedVerseKeys,
}: MushafPageProps) {
  return (
    <View style={styles.pageContainer}>
      <IslamicBorder padding={Spacing.lg} style={styles.borderWrapper}>
        {showBismillah && (
          <View style={styles.bismillahWrapper}>
            <Bismillah />
          </View>
        )}
        {/* We use a single wrapper Text node so all child Text nodes flow continuously inline */}
        <Text style={[styles.textFlow, { textAlign: "justify" }]}>
          {verses.map((verse) => {
            let verseText = verse.text_uthmani || verse.text_imlaei || "";

            // For Surah Al-Fatihah, Verse 1 *is* the Bismillah.
            // Since we already show the SVG Bismillah at the top, we remove the Arabic text copy
            // from the verse flow, but we STILL render its verse marker ﴿١﴾.
            if (showBismillah && verse.verse_number === 1) {
              const bismillahUthmani =
                "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ";
              const bismillahImlaei = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";

              verseText = verseText
                .replace(bismillahUthmani, "")
                .replace(bismillahImlaei, "")
                .trim();
            }

            return (
              <React.Fragment key={verse.verse_key}>
                <ThemedText role="arabic" style={styles.inlineText}>
                  {verseText}
                </ThemedText>
                <InlineVerseMarker
                  verseNumber={verse.verse_number}
                  onPress={onVersePress ? () => onVersePress(verse) : undefined}
                  isBookmarked={bookmarkedVerseKeys?.has(verse.verse_key)}
                />
                <ThemedText role="arabic" style={styles.inlineText}>
                  {" "}
                </ThemedText>
              </React.Fragment>
            );
          })}
        </Text>

        {/* Subtle page indicator at the bottom left */}
        <ThemedText role="caption" style={styles.pageIndicator}>
          {pageNumber}
        </ThemedText>
      </IslamicBorder>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.md,
  },
  borderWrapper: {
    flex: 1,
  },
  textFlow: {
    writingDirection: "rtl",
  },
  inlineText: {
    // Override default role="arabic" to be larger and more legible for the Mushaf view
    fontSize: 28,
    lineHeight: 48, // Golden ratio approx for Arabic fonts
  },
  pageIndicator: {
    textAlign: "left",
    marginTop: Spacing.xxl,
    opacity: 0.6,
  },
  bismillahWrapper: {
    alignItems: "center",
    marginBottom: Spacing.xxl,
    marginTop: Spacing.md,
  },
});
