import { Spacing } from "@/constants/spacing";
import { BorderRadius } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import { useLastReadStore } from "@/store/lastReadStore";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText, ThemedView } from "../ui";
import { IconSymbol } from "../ui/icon-symbol";

export function LastReadCard() {
  const { colors } = useAppTheme();
  const router = useRouter();

  const { lastRead } = useLastReadStore();

  if (!lastRead) {
    return null;
  }

  const handlePress = () => {
    // Navigate to the exact verse in translation view
    router.push(`/surah/${lastRead.surahId}?verse=${lastRead.ayahNumber}`);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
    >
      <ThemedView layer="elevated" style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.iconWrapper}>
            <IconSymbol name="book.pages.fill" size={20} color={colors.gold} />
          </View>
          <ThemedText role="label" color={colors.textSecondary}>
            Last Read
          </ThemedText>
        </View>

        <View style={styles.mainContent}>
          <View>
            <ThemedText role="title" color={colors.textPrimary}>
              {lastRead.surahNameEng}
            </ThemedText>
            <ThemedText
              role="caption"
              color={colors.textSecondary}
              style={{ marginTop: Spacing.xs }}
            >
              Ayah {lastRead.ayahNumber}
            </ThemedText>
          </View>
          <ThemedText
            role="arabicSmall"
            color={colors.gold}
            style={styles.arabicName}
          >
            {lastRead.surahNameArabic}
          </ThemedText>
        </View>

        <View style={[styles.bottomRow, { borderTopColor: colors.separator }]}>
          <ThemedText role="label" color={colors.gold}>
            Continue Reading
          </ThemedText>
          <IconSymbol name="chevron.right" size={16} color={colors.gold} />
        </View>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  iconWrapper: {
    marginRight: Spacing.sm,
  },
  mainContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  arabicName: {
    fontSize: 24, // Override slightly larger for this card
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    paddingTop: Spacing.md,
  },
});
