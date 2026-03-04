/**
 * IslamicBorder — decorative gold frame with corner ornaments.
 * Used on Surah headers, "Verse of the Day" cards, and featured content cards.
 *
 * The border is rendered using nested Views + SVG corner ornaments,
 * so it scales to any content height automatically.
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Svg, { Path, G, Circle } from 'react-native-svg';

import { useAppTheme } from '@/context/ThemeContext';
import { Spacing } from '@/constants/spacing';

interface IslamicBorderProps {
  children: React.ReactNode;
  style?: ViewStyle;
  /** Override the border/ornament color (defaults to theme gold) */
  color?: string;
  /** Padding inside the frame */
  padding?: number;
}

/** A small SVG rosette / geometric star used in corners */
function CornerOrnament({ color, size = 20 }: { color: string; size?: number }) {
  const r = size / 2;
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      {/* 8-point star outline */}
      <G fill="none" stroke={color} strokeWidth={0.8}>
        <Path d="M10 1 L11.5 7 L17 3.5 L13.5 9 L19 10 L13.5 11 L17 16.5 L11.5 13 L10 19 L8.5 13 L3 16.5 L6.5 11 L1 10 L6.5 9 L3 3.5 L8.5 7 Z" />
      </G>
      <Circle cx={10} cy={10} r={2.5} fill={color} />
    </Svg>
  );
}

/** A small horizontal arabesque SVG ornament — used in the center of edges */
function EdgeOrnament({ color }: { color: string }) {
  return (
    <Svg width={24} height={10} viewBox="0 0 24 10">
      <Path
        d="M0 5 Q6 0 12 5 Q18 10 24 5"
        fill="none"
        stroke={color}
        strokeWidth={0.8}
        opacity={0.7}
      />
    </Svg>
  );
}

export function IslamicBorder({
  children,
  style,
  color,
  padding = Spacing.lg,
}: IslamicBorderProps) {
  const { colors } = useAppTheme();
  const borderColor = color ?? colors.gold;

  return (
    <View style={[styles.wrapper, { borderColor: borderColor, padding }, style]}>
      {/* Corner ornaments */}
      <View style={[styles.corner, styles.topLeft]}>
        <CornerOrnament color={borderColor} />
      </View>
      <View style={[styles.corner, styles.topRight]}>
        <CornerOrnament color={borderColor} />
      </View>
      <View style={[styles.corner, styles.bottomLeft]}>
        <CornerOrnament color={borderColor} />
      </View>
      <View style={[styles.corner, styles.bottomRight]}>
        <CornerOrnament color={borderColor} />
      </View>

      {/* Top & bottom center ornaments */}
      <View style={styles.topCenter}>
        <EdgeOrnament color={borderColor} />
      </View>
      <View style={styles.bottomCenter}>
        <EdgeOrnament color={borderColor} />
      </View>

      {/* Main content */}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1.5,
    borderStyle: 'solid',
    borderRadius: 2,
    position: 'relative',
    overflow: 'visible',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  topLeft: { top: -10, left: -10 },
  topRight: { top: -10, right: -10 },
  bottomLeft: { bottom: -10, left: -10 },
  bottomRight: { bottom: -10, right: -10 },
  topCenter: {
    position: 'absolute',
    top: -5,
    alignSelf: 'center',
    zIndex: 1,
  },
  bottomCenter: {
    position: 'absolute',
    bottom: -5,
    alignSelf: 'center',
    zIndex: 1,
  },
});
