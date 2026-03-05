/**
 * IslamicDivider — a horizontal gold rule with a center floral ornament.
 * Used as a subtle section separator throughout the app.
 */

import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Svg, { Circle, G, Path } from "react-native-svg";

import { Spacing } from "@/constants/spacing";
import { useAppTheme } from "@/context/ThemeContext";

interface IslamicDividerProps {
  style?: ViewStyle;
  color?: string;
  /** Ornament size in dp (default 18) */
  ornamentSize?: number;
}

export function CenterOrnament({
  color,
  size,
}: {
  color: string;
  size: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18">
      {/* Diamond */}
      <G fill="none" stroke={color} strokeWidth={0.9}>
        <Path d="M9 1 L17 9 L9 17 L1 9 Z" />
      </G>
      <Circle cx={9} cy={9} r={2} fill={color} />
      {/* Small dots at diamond tips */}
      <Circle cx={9} cy={2} r={0.8} fill={color} />
      <Circle cx={9} cy={16} r={0.8} fill={color} />
      <Circle cx={2} cy={9} r={0.8} fill={color} />
      <Circle cx={16} cy={9} r={0.8} fill={color} />
    </Svg>
  );
}

export function IslamicDivider({
  style,
  color,
  ornamentSize = 18,
}: IslamicDividerProps) {
  const { colors } = useAppTheme();
  const lineColor = color ?? colors.gold;

  return (
    <View style={[styles.row, style]}>
      <View style={[styles.line, { backgroundColor: lineColor }]} />
      <View style={styles.ornament}>
        <CenterOrnament color={lineColor} size={ornamentSize} />
      </View>
      <View style={[styles.line, { backgroundColor: lineColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Spacing.sm,
    marginHorizontal: Spacing.lg,
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth * 2,
    opacity: 0.6,
  },
  ornament: {
    marginHorizontal: Spacing.sm,
  },
});
