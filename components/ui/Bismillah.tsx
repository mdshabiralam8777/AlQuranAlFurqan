/**
 * Bismillah — renders بِسْمِ ٱللَّـٰهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
 * Shown at the start of every Surah except Surah 9 (At-Tawbah).
 *
 * Uses the Uthmanic Hafs font for authentic calligraphic rendering.
 * Framed by a subtle IslamicDivider above and below.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import { IslamicDivider } from '@/components/ui/IslamicDivider';
import { useAppTheme } from '@/context/ThemeContext';
import { Spacing } from '@/constants/spacing';

interface BismillahProps {
  /** Font size override — scales with user's Arabic font preference */
  fontSize?: number;
}

// The Bismillah in Unicode Arabic — works with KFGQPC Uthmanic Hafs font
const BISMILLAH_TEXT = 'بِسْمِ ٱللَّـٰهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ';

export function Bismillah({ fontSize = 26 }: BismillahProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <IslamicDivider color={colors.gold} />

      <View style={styles.textWrapper}>
        <ThemedText
          role="arabic"
          fontSize={fontSize}
          style={styles.text}
          color={colors.textArabic}
          accessibilityLabel="Bismillah ir-Rahman ir-Raheem"
          accessibilityRole="text"
        >
          {BISMILLAH_TEXT}
        </ThemedText>
      </View>

      <IslamicDivider color={colors.gold} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.md,
  },
  textWrapper: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
