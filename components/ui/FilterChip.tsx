import { Spacing } from "@/constants/spacing";
import { BorderRadius } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

type FilterChipProps = {
  label: string;
  isActive: boolean;
  onPress: () => void;
};

export function FilterChip({ label, isActive, onPress }: FilterChipProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: isActive ? colors.gold : colors.bgSecondary,
          borderColor: isActive ? colors.gold : colors.separator,
        },
      ]}
    >
      <ThemedText
        role="label"
        color={isActive ? colors.navyPrimary : colors.textSecondary}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.round,
    borderWidth: 1,
    marginRight: Spacing.sm,
  },
});
