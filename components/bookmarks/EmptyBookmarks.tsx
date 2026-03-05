import React from "react";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ui";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Spacing } from "@/constants/spacing";
import { useAppTheme } from "@/context/ThemeContext";

export function EmptyBookmarks() {
  const { colors } = useAppTheme();

  return (
    <View style={styles.emptyContainer}>
      <IconSymbol
        name="bookmark"
        size={64}
        color={colors.textSecondary + "40"}
      />
      <ThemedText
        role="heading"
        color={colors.textSecondary}
        style={styles.emptyTitle}
      >
        No Bookmarks Yet
      </ThemedText>
      <ThemedText
        role="body"
        color={colors.textSecondary}
        style={styles.emptySubtitle}
      >
        Tap the Save button on any verse in Translation mode to bookmark it for
        quick access.
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 120,
    paddingHorizontal: Spacing.xxl,
  },
  emptyTitle: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    textAlign: "center",
    lineHeight: 22,
  },
});
