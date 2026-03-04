/**
 * SajdahMarker — inline prostration (سجدة) indicator shown within the Āyah list.
 * Displayed when a verse contains a mandatory or recommended prostration.
 *
 * The ۩ character is the standard Unicode Sajdah symbol.
 */

import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import { useAppTheme } from '@/context/ThemeContext';
import { Spacing } from '@/constants/spacing';

interface SajdahMarkerProps {
  /** 'obligatory' (واجب) or 'recommended' (مستحب) */
  type?: 'obligatory' | 'recommended';
  onPress?: () => void;
}

export function SajdahMarker({ type = 'obligatory', onPress }: SajdahMarkerProps) {
  const { colors } = useAppTheme();

  const label = type === 'obligatory' ? 'Sajdah Wajibah' : 'Sajdah Mustahabbah';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.7 }]}
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityHint="Tap to see prostration details"
    >
      <View style={[styles.inner, { borderColor: colors.gold, backgroundColor: colors.goldLight }]}>
        {/* Unicode Sajdah symbol */}
        <ThemedText role="arabicSmall" color={colors.gold} style={styles.symbol}>
          ۩
        </ThemedText>
        <ThemedText role="caption" color={colors.gold} style={styles.labelText}>
          {label}
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xxs,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
  },
  symbol: {
    fontSize: 16,
    lineHeight: 22,
  },
  labelText: {
    fontSize: 11,
  },
});
