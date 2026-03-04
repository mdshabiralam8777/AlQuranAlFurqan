/**
 * AyahSeparator — ornamental divider between Āyāt.
 * Shows a floral diamond ornament with the verse number in Mushaf-style ﴾N﴿ brackets.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

import { ThemedText } from '@/components/ui/ThemedText';
import { useAppTheme } from '@/context/ThemeContext';
import { Spacing } from '@/constants/spacing';

interface AyahSeparatorProps {
  verseNumber: number;
  color?: string;
}

function FloralOrnament({ color }: { color: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16">
      <Path
        d="M8 1 L15 8 L8 15 L1 8 Z"
        fill="none"
        stroke={color}
        strokeWidth={0.9}
      />
      <Circle cx={8} cy={8} r={2.5} fill={color} />
      <Circle cx={8} cy={2} r={0.7} fill={color} />
      <Circle cx={8} cy={14} r={0.7} fill={color} />
      <Circle cx={2} cy={8} r={0.7} fill={color} />
      <Circle cx={14} cy={8} r={0.7} fill={color} />
    </Svg>
  );
}

export function AyahSeparator({ verseNumber, color }: AyahSeparatorProps) {
  const { colors } = useAppTheme();
  const ornamentColor = color ?? colors.gold;

  return (
    <View style={styles.container}>
      {/* Left line */}
      <View style={[styles.line, { backgroundColor: ornamentColor }]} />

      {/* Left ornament */}
      <FloralOrnament color={ornamentColor} />

      {/* Verse number badge: ﴾N﴿ */}
      <View style={[styles.badge, { borderColor: ornamentColor }]}>
        <ThemedText role="verseNumber" color={ornamentColor}>
          {'﴾'} {verseNumber} {'﴿'}
        </ThemedText>
      </View>

      {/* Right ornament */}
      <FloralOrnament color={ornamentColor} />

      {/* Right line */}
      <View style={[styles.line, { backgroundColor: ornamentColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.xs,
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth * 1.5,
    opacity: 0.4,
  },
  badge: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
