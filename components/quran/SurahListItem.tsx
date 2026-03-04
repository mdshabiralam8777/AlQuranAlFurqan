/**
 * SurahListItem — a single row in the Surah list.
 *
 * Layout (LTR view, adapts to RTL):
 *   [Number Badge]  [English Name & Meta]  [Arabic Name] [Play Shortcut]
 */

import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { ThemedText } from "@/components/ui/ThemedText";
import { Spacing, TouchTarget } from "@/constants/spacing";
import { useAppTheme } from "@/context/ThemeContext";

export interface SurahListItemProps {
  surahNumber: number;
  nameArabic: string;
  nameEnglish: string;
  nameTransliteration: string;
  versesCount: number;
  revelationType: "Meccan" | "Medinan";
}

export function SurahListItem({
  surahNumber,
  nameArabic,
  nameEnglish,
  nameTransliteration,
  versesCount,
  revelationType,
}: SurahListItemProps) {
  const { colors } = useAppTheme();
  const router = useRouter();

  const handlePress = () => {
    router.push(`/surah/${surahNumber}`);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        {
          borderBottomColor: colors.separator,
          backgroundColor: pressed ? colors.bgSecondary : colors.bgPrimary,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Surah ${surahNumber}, ${nameTransliteration}, ${versesCount} verses`}
    >
      {/* Number badge (Octagonal/Star shape) */}
      <View style={[styles.badgeContainer, { borderColor: colors.gold }]}>
        <View style={styles.numberWrapper}>
          <ThemedText role="verseNumber" color={colors.textPrimary}>
            {surahNumber}
          </ThemedText>
        </View>
      </View>

      {/* Surah Details (Left/Center) */}
      <View style={styles.contentContainer}>
        <ThemedText role="subtitle" color={colors.textPrimary}>
          {nameTransliteration}
        </ThemedText>

        <View style={styles.metaContainer}>
          <ThemedText role="caption" color={colors.textSecondary}>
            {revelationType}
          </ThemedText>
          <View
            style={[styles.dot, { backgroundColor: colors.textSecondary }]}
          />
          <ThemedText role="caption" color={colors.textSecondary}>
            {versesCount} Ayahs
          </ThemedText>
        </View>
      </View>

      {/* Right Side: Arabic Name & Play Shortcut */}
      <View style={styles.rightContainer}>
        <ThemedText role="arabicSmall" color={colors.gold}>
          {nameArabic}
        </ThemedText>

        <Pressable
          style={[styles.playButton, { backgroundColor: colors.bgSecondary }]}
          hitSlop={10}
        >
          <IconSymbol name="play.fill" size={12} color={colors.gold} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    minHeight: TouchTarget.min,
  },
  badgeContainer: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  numberWrapper: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.xs,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: Spacing.sm,
  },
  rightContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  playButton: {
    marginTop: Spacing.sm,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});
