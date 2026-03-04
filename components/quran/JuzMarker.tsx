/**
 * JuzMarker — inline Juz break label inserted into the Āyah FlashList.
 * Pinned flush to the right margin with a gold left accent line.
 *
 * Renders: |  ── جزء ٢ ──
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useAppTheme } from '@/context/ThemeContext';
import { Spacing } from '@/constants/spacing';

interface JuzMarkerProps {
  juzNumber: number;
}

// Convert Arabic-Indic numerals for display
function toArabicNumeral(n: number): string {
  return n
    .toString()
    .split('')
    .map((d) => String.fromCharCode(0x0660 + parseInt(d, 10)))
    .join('');
}

export function JuzMarker({ juzNumber }: JuzMarkerProps) {
  const { colors } = useAppTheme();

  return (
    <ThemedView layer="primary" style={styles.container}>
      <View style={styles.inner}>
        {/* Accent bar */}
        <View style={[styles.accent, { backgroundColor: colors.gold }]} />

        {/* Juz label in Arabic */}
        <View style={[styles.pill, { backgroundColor: colors.goldLight, borderColor: colors.gold }]}>
          <ThemedText role="arabicSmall" color={colors.gold} style={styles.label}>
            جزء {toArabicNumeral(juzNumber)}
          </ThemedText>
        </View>

        {/* English fallback */}
        <ThemedText role="caption" color={colors.textSecondary} style={styles.english}>
          Juz {juzNumber}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: Spacing.sm,
  },
  accent: {
    width: 3,
    height: 20,
    borderRadius: 2,
  },
  pill: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xxs,
  },
  label: {
    fontSize: 14,
  },
  english: {
    marginLeft: Spacing.xxs,
  },
});
