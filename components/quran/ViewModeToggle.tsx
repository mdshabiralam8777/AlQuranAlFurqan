import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ui";
import { Spacing } from "@/constants/spacing";
import { BorderRadius } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";

type ViewMode = "mushaf" | "translation";

interface ViewModeToggleProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export function ViewModeToggle({ viewMode, setViewMode }: ViewModeToggleProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.toggleContainer}>
      <Pressable
        onPress={() => setViewMode("mushaf")}
        style={[
          styles.toggleButton,
          viewMode === "mushaf" && [
            styles.toggleButtonActive,
            { backgroundColor: colors.gold },
          ],
        ]}
      >
        <ThemedText
          role="label"
          color={
            viewMode === "mushaf" ? colors.navyPrimary : colors.textSecondary
          }
        >
          Mushaf
        </ThemedText>
      </Pressable>
      <Pressable
        onPress={() => setViewMode("translation")}
        style={[
          styles.toggleButton,
          viewMode === "translation" && [
            styles.toggleButtonActive,
            { backgroundColor: colors.gold },
          ],
        ]}
      >
        <ThemedText
          role="label"
          color={
            viewMode === "translation"
              ? colors.navyPrimary
              : colors.textSecondary
          }
        >
          Translation
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: "row",
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: BorderRadius.lg,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: "center",
    borderRadius: BorderRadius.md,
  },
  toggleButtonActive: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
