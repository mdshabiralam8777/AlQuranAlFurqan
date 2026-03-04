import { ThemedText, ThemedView } from "@/components/ui";
import { Spacing } from "@/constants/spacing";
import { useAppTheme } from "@/context/ThemeContext";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function BookmarksScreen() {
  const { colors } = useAppTheme();

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.navyPrimary }]}>
        <ThemedText role="heading" color={colors.textPrimary}>
          Bookmarks
        </ThemedText>
      </View>
      <View style={styles.content}>
        <ThemedText color={colors.textSecondary}>
          Coming Soon (Phase 4)
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.huge,
    paddingBottom: Spacing.md,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
