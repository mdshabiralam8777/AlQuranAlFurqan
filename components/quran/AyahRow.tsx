/**
 * AyahRow — the primary verse rendering component.
 * Displays Arabic text, optional translation, and an action bar.
 *
 * Features:
 *  - Animated highlight when the verse is currently playing
 *  - Tap → shows action bar (Play, Bookmark, Copy, Share, Note, Tafsir)
 *  - Long-press → triggers multi-select mode (handled by parent)
 *  - Supports Arabic-only, translation, and word-by-word view modes
 *
 * Props:
 *  - verse:         the verse data object
 *  - isPlaying:     highlights this row during audio playback
 *  - showTranslation: show/hide translation text
 *  - isBookmarked:  controls bookmark icon state
 *  - onPlay / onBookmark / onNote / onShare → action callbacks
 */

import React, { useCallback, useState } from "react";
import { Pressable, Share, StyleSheet, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { ThemedText } from "@/components/ui/ThemedText";
import { Spacing } from "@/constants/spacing";
import {
  ARABIC_LINE_HEIGHT_RATIO,
  ArabicFontSizes,
  BorderRadius,
} from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";

export interface VerseData {
  id: number;
  verseKey: string; // e.g. "2:255"
  textUthmani: string;
  translationText?: string;
  isSajdah?: boolean;
}

type ViewMode = "arabic" | "translation" | "wordByWord";

interface AyahRowProps {
  verse: VerseData;
  arabicFontSize?: number;
  isPlaying?: boolean;
  isBookmarked?: boolean;
  showTranslation?: boolean;
  viewMode?: ViewMode;
  onPlay?: (verse: VerseData) => void;
  onBookmark?: (verse: VerseData) => void;
  onNote?: (verse: VerseData) => void;
  onTafsir?: (verse: VerseData) => void;
}

export function AyahRow({
  verse,
  arabicFontSize = ArabicFontSizes.md,
  isPlaying = false,
  isBookmarked = false,
  showTranslation = true,
  viewMode = "translation",
  onPlay,
  onBookmark,
  onNote,
  onTafsir,
}: AyahRowProps) {
  const { colors } = useAppTheme();
  const [showActions, setShowActions] = useState(false);

  // Animated highlight for the currently playing verse
  const playProgress = useSharedValue(isPlaying ? 1 : 0);
  React.useEffect(() => {
    playProgress.value = withTiming(isPlaying ? 1 : 0, { duration: 300 });
  }, [isPlaying, playProgress]);

  const animatedBg = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      playProgress.value,
      [0, 1],
      [colors.bgPrimary, colors.highlight],
    ),
  }));

  // Bookmark pulse animation
  const bookmarkScale = useSharedValue(1);
  const handleBookmark = useCallback(() => {
    bookmarkScale.value = withSequence(
      withTiming(1.35, { duration: 120 }),
      withDelay(80, withTiming(1, { duration: 150 })),
    );
    onBookmark?.(verse);
  }, [verse, onBookmark, bookmarkScale]);

  const bookmarkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bookmarkScale.value }],
  }));

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message: `${verse.textUthmani}\n\n${verse.translationText ?? ""}\n\n— Quran ${verse.verseKey}`,
      });
    } catch {
      // silently ignore share cancel
    }
  }, [verse]);

  const toggleActions = useCallback(() => setShowActions((v) => !v), []);

  return (
    <Pressable
      onPress={toggleActions}
      onLongPress={() => onPlay?.(verse)}
      accessibilityLabel={`Verse ${verse.verseKey}: ${verse.textUthmani}. ${verse.translationText ?? ""}`}
      accessibilityRole="button"
    >
      <Animated.View
        style={[
          styles.container,
          animatedBg,
          { borderBottomColor: colors.separator },
        ]}
      >
        {/* Verse Key Badge */}
        <View style={styles.verseKeyRow}>
          <View
            style={[
              styles.verseKeyBadge,
              { backgroundColor: colors.gold + "18" },
            ]}
          >
            <ThemedText
              role="caption"
              color={colors.gold}
              style={styles.verseKeyText}
            >
              {verse.verseKey}
            </ThemedText>
          </View>

          {/* Sajdah indicator */}
          {verse.isSajdah && (
            <View
              style={[
                styles.sajdahBadge,
                { backgroundColor: colors.gold + "25" },
              ]}
            >
              <ThemedText role="caption" color={colors.gold}>
                ۩ Sajdah
              </ThemedText>
            </View>
          )}
        </View>

        {/* Arabic text */}
        <ThemedText
          role="arabic"
          fontSize={arabicFontSize}
          style={[
            styles.arabicText,
            { lineHeight: arabicFontSize * ARABIC_LINE_HEIGHT_RATIO },
          ]}
          color={colors.textArabic}
        >
          {verse.textUthmani}
        </ThemedText>

        {/* Translation */}
        {(showTranslation || viewMode === "translation") &&
        verse.translationText ? (
          <View
            style={[
              styles.translationContainer,
              { borderTopColor: colors.separator },
            ]}
          >
            <ThemedText role="translation" color={colors.textSecondary}>
              {verse.translationText}
            </ThemedText>
          </View>
        ) : null}

        {/* Action bar — shown on tap */}
        {showActions && (
          <View
            style={[styles.actionBar, { borderTopColor: colors.separator }]}
          >
            {/* Play */}
            <Pressable
              style={styles.actionBtn}
              onPress={() => onPlay?.(verse)}
              accessibilityLabel="Play verse"
            >
              <IconSymbol name="play.fill" size={16} color={colors.gold} />
              <ThemedText
                role="caption"
                color={colors.gold}
                style={styles.actionLabel}
              >
                Play
              </ThemedText>
            </Pressable>

            {/* Bookmark */}
            <Animated.View style={bookmarkStyle}>
              <Pressable
                style={styles.actionBtn}
                onPress={handleBookmark}
                accessibilityLabel={
                  isBookmarked ? "Remove bookmark" : "Bookmark verse"
                }
              >
                <IconSymbol
                  name={isBookmarked ? "bookmark.fill" : "bookmark"}
                  size={16}
                  color={colors.gold}
                />
                <ThemedText
                  role="caption"
                  color={colors.gold}
                  style={styles.actionLabel}
                >
                  {isBookmarked ? "Saved" : "Save"}
                </ThemedText>
              </Pressable>
            </Animated.View>

            {/* Share */}
            <Pressable
              style={styles.actionBtn}
              onPress={handleShare}
              accessibilityLabel="Share verse"
            >
              <IconSymbol
                name="square.and.arrow.up"
                size={16}
                color={colors.textSecondary}
              />
              <ThemedText
                role="caption"
                color={colors.textSecondary}
                style={styles.actionLabel}
              >
                Share
              </ThemedText>
            </Pressable>

            {/* Note */}
            <Pressable
              style={styles.actionBtn}
              onPress={() => onNote?.(verse)}
              accessibilityLabel="Add note"
            >
              <IconSymbol
                name="square.and.pencil"
                size={16}
                color={colors.textSecondary}
              />
              <ThemedText
                role="caption"
                color={colors.textSecondary}
                style={styles.actionLabel}
              >
                Note
              </ThemedText>
            </Pressable>

            {/* Tafsir */}
            <Pressable
              style={styles.actionBtn}
              onPress={() => onTafsir?.(verse)}
              accessibilityLabel="View Tafsir"
            >
              <IconSymbol name="book" size={16} color={colors.textSecondary} />
              <ThemedText
                role="caption"
                color={colors.textSecondary}
                style={styles.actionLabel}
              >
                Tafsir
              </ThemedText>
            </Pressable>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  verseKeyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  verseKeyBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  verseKeyText: {
    fontWeight: "600",
    fontSize: 12,
  },
  sajdahBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  arabicText: {
    textAlign: "right",
    writingDirection: "rtl",
    marginBottom: Spacing.sm,
  },
  translationContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  actionBar: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    gap: Spacing.xs,
    flexWrap: "wrap",
  },
  actionBtn: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    minHeight: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  actionLabel: {
    marginLeft: 6,
  },
});
