/**
 * AyahSeparator — ornamental divider between Āyāt.
 * Shows a premium floral roundel ornament with the verse number in the center.
 */

import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

import { ThemedText } from "@/components/ui/ThemedText";
import { Spacing } from "@/constants/spacing";
import { useAppTheme } from "@/context/ThemeContext";

interface AyahSeparatorProps {
  verseNumber: number;
  color?: string;
}

function PremiumFloralRing({
  color,
  size = 32,
}: {
  color: string;
  size?: number;
}) {
  // A more premium, intricate circular geometric/floral SVG pattern
  // Note: opacity on Circle/Path sometimes renders unreliably on Android/iOS via r-n-svg
  // So we use standard supported color props
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      {/* Outer intricate border */}
      <Circle
        cx={50}
        cy={50}
        r={46}
        fill="none"
        stroke={color}
        strokeWidth={1}
      />
      <Circle
        cx={50}
        cy={50}
        r={43}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
      />

      {/* 8-pointed star base pattern frequently found in Islamic art */}
      <Path
        d="M50 12 L56 37 L81 31 L64 50 L81 69 L56 63 L50 88 L44 63 L19 69 L36 50 L19 31 L44 37 Z"
        fill="none"
        stroke={color}
        strokeWidth={1}
      />

      {/* Inner circular frame for the number */}
      <Circle
        cx={50}
        cy={50}
        r={30}
        fill="none"
        stroke={color}
        strokeWidth={1}
      />

      {/* Small decorative dots around the inner circle */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 50 + 35 * Math.cos(rad);
        const cy = 50 + 35 * Math.sin(rad);
        return <Circle key={i} cx={cx} cy={cy} r={1.5} fill={color} />;
      })}
    </Svg>
  );
}

export function AyahSeparator({ verseNumber, color }: AyahSeparatorProps) {
  const { colors } = useAppTheme();
  // Using gold as the default premium accent color
  const ornamentColor = color ?? colors.gold;

  return (
    <View style={styles.container}>
      {/* Left elegant fading line */}
      <View
        style={[
          styles.gradientLine,
          styles.leftLine,
          { backgroundColor: ornamentColor },
        ]}
      />

      {/* Center premium roundel with number overlay */}
      <View style={styles.badgeContainer}>
        <View style={styles.svgWrapper}>
          <PremiumFloralRing color={ornamentColor} size={36} />
        </View>
        <View style={styles.numberWrapper}>
          <ThemedText
            role="verseNumber"
            style={[styles.verseNumberText, { color: ornamentColor }]}
          >
            {verseNumber}
          </ThemedText>
        </View>
      </View>

      {/* Right elegant fading line */}
      <View
        style={[
          styles.gradientLine,
          styles.rightLine,
          { backgroundColor: ornamentColor },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  gradientLine: {
    flex: 1,
    height: 1,
    opacity: 0.5,
  },
  leftLine: {
    // Optionally create a gradient effect by playing with border radius or using LinearGradient if available
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  rightLine: {
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  badgeContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
  },
  svgWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  numberWrapper: {
    justifyContent: "center",
    alignItems: "center",
    // Adjust slightly to visually center fonts that might ride high/low
    paddingTop: 1,
  },
  verseNumberText: {
    // Ensure the number stands out clearly against the delicate artwork
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});
