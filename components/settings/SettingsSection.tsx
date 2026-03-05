import { ThemedText, ThemedView } from "@/components/ui";
import { Spacing } from "@/constants/spacing";
import { BorderRadius } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import React from "react";
import { StyleSheet } from "react-native";

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
  const { colors } = useAppTheme();

  return (
    <>
      <ThemedText role="label" color={colors.gold} style={styles.title}>
        {title}
      </ThemedText>
      <ThemedView
        layer="secondary"
        style={[styles.card, { borderColor: colors.separator }]}
      >
        {children}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    marginLeft: Spacing.sm,
    marginBottom: Spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.xl,
    overflow: "hidden",
  },
});
