/**
 * SurahListItem — a single row in the Surah list.
 *
 * Layout (LTR view, adapts to RTL):
 *   [Number Badge]  [Arabic Name]         [English + Āyāt count]
 *                   [Transliteration]     [Meccan/Medinan chip]
 */

import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import { useAppTheme } from '@/context/ThemeContext';
import { Spacing, BorderRadius, TouchTarget } from '@/constants/spacing';

export interface SurahListItemProps {
  surahNumber: number;
  nameArabic: string;
  nameEnglish: string;
  nameTransliteration: string;
  versesCount: number;
  revelationType: 'Meccan' | 'Medinan';
  onPress: () => void;
}

export function SurahListItem({
  surahNumber,
  nameArabic,
  nameEnglish,
  nameTransliteration,
  versesCount,
  revelationType,
  onPress,
}: SurahListItemProps) {
  const { colors } = useAppTheme();

  const revelationColor = revelationType === 'Meccan' ? '#8B5E3C' : colors.green;

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: colors.goldLight }}
      style={({ pressed }) => [
        styles.container,
        { borderBottomColor: colors.separator },
        pressed && { opacity: 0.75 },
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Surah ${surahNumber}, ${nameTransliteration}, ${versesCount} verses`}
    >
      {/* Number badge */}
      <View style={[styles.badge, { borderColor: colors.gold, backgroundColor: colors.bgSecondary }]}>
        <ThemedText role="verseNumber" color={colors.gold}>
          {surahNumber}
        </ThemedText>
      </View>

      {/* Center: Arabic name + transliteration */}
      <View style={styles.center}>
        <ThemedText role="arabicSmall" color={colors.textArabic} numberOfLines={1}>
          {nameArabic}
        </ThemedText>
        <ThemedText role="caption" color={colors.textSecondary} numberOfLines={1}>
          {nameTransliteration}
        </ThemedText>
      </View>

      {/* Right: English name + meta */}
      <View style={styles.right}>
        <ThemedText role="bodyMedium" color={colors.textPrimary} numberOfLines={1} style={styles.englishName}>
          {nameEnglish}
        </ThemedText>
        <View style={styles.metaRow}>
          <ThemedText role="caption" color={colors.textSecondary}>
            {versesCount} Āyāt
          </ThemedText>
          <View style={[styles.revDot, { backgroundColor: revelationColor }]} />
          <ThemedText role="caption" color={revelationColor}>
            {revelationType}
          </ThemedText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    minHeight: TouchTarget.min,
    gap: Spacing.md,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  center: {
    flex: 1,
    alignItems: 'flex-end', // Arabic is RTL — right-align
    gap: Spacing.xxs,
  },
  right: {
    alignItems: 'flex-end',
    minWidth: 80,
    gap: Spacing.xxs,
  },
  englishName: {
    textAlign: 'right',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    justifyContent: 'flex-end',
  },
  revDot: {
    width: 5,
    height: 5,
    borderRadius: BorderRadius.full,
  },
});
