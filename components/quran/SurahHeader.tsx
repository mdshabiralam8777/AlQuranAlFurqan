/**
 * SurahHeader — the decorative banner shown at the top of each Surah reading screen.
 * Wraps surah metadata inside an IslamicBorder frame.
 *
 * Layout:
 *   [IslamicBorder]
 *     Arabic name (large, centered)
 *     English name + transliteration
 *     ◆ Revelation type  •  114 Āyāt  •  Juz X
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

import { IslamicBorder } from '@/components/ui/IslamicBorder';
import { ThemedText } from '@/components/ui/ThemedText';
import { useAppTheme } from '@/context/ThemeContext';
import { Spacing } from '@/constants/spacing';

export interface SurahHeaderProps {
  surahNumber: number;
  nameArabic: string;
  nameEnglish: string;
  nameTransliteration: string;
  versesCount: number;
  revelationType: 'Meccan' | 'Medinan';
  juzStart: number;
  juzEnd?: number;
}

export function SurahHeader({
  surahNumber,
  nameArabic,
  nameEnglish,
  nameTransliteration,
  versesCount,
  revelationType,
  juzStart,
  juzEnd,
}: SurahHeaderProps) {
  const { colors } = useAppTheme();

  const juzLabel = juzEnd && juzEnd !== juzStart
    ? `Juz ${juzStart}–${juzEnd}`
    : `Juz ${juzStart}`;

  const revelationColor = revelationType === 'Meccan' ? '#8B5E3C' : colors.green;

  return (
    <IslamicBorder style={styles.borderWrapper} padding={Spacing.xl}>
      {/* Surah number label */}
      <ThemedText role="label" style={styles.numberLabel} color={colors.textSecondary}>
        Surah {surahNumber}
      </ThemedText>

      {/* Arabic Surah name */}
      <ThemedText
        role="surahName"
        style={styles.arabicName}
        color={colors.textArabic}
        accessibilityLabel={nameTransliteration}
      >
        {nameArabic}
      </ThemedText>

      {/* Transliteration */}
      <ThemedText role="subtitle" style={styles.transliteration} color={colors.textPrimary}>
        {nameTransliteration}
      </ThemedText>

      {/* English name */}
      <ThemedText role="caption" style={styles.englishName} color={colors.textSecondary}>
        {nameEnglish}
      </ThemedText>

      {/* Meta row */}
      <View style={styles.metaRow}>
        <View style={[styles.revChip, { borderColor: revelationColor }]}>
          <ThemedText role="label" color={revelationColor} style={styles.revLabel}>
            {revelationType}
          </ThemedText>
        </View>
        <ThemedText role="caption" color={colors.textSecondary} style={styles.metaDot}>·</ThemedText>
        <ThemedText role="caption" color={colors.textSecondary}>
          {versesCount} Āyāt
        </ThemedText>
        <ThemedText role="caption" color={colors.textSecondary} style={styles.metaDot}>·</ThemedText>
        <ThemedText role="caption" color={colors.textSecondary}>
          {juzLabel}
        </ThemedText>
      </View>
    </IslamicBorder>
  );
}

const styles = StyleSheet.create({
  borderWrapper: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    alignItems: 'center',
  },
  numberLabel: {
    marginBottom: Spacing.xs,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  arabicName: {
    marginBottom: Spacing.xs,
  },
  transliteration: {
    marginBottom: Spacing.xxs,
    textAlign: 'center',
  },
  englishName: {
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  metaDot: {
    marginHorizontal: Spacing.xs,
  },
  revChip: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  revLabel: {
    fontSize: 11,
  },
});
