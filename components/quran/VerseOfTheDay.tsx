import { Spacing } from "@/constants/spacing";
import { BorderRadius } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText, ThemedView } from "../ui";

export function VerseOfTheDay() {
  const { colors } = useAppTheme();

  // STUB: This will be connected to React Query + Quran.com /random/ayat API
  const mockVerse = {
    arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
    translation: "\"And say: 'My Lord, increase me in knowledge.'\"",
    reference: "Surah Taha [20:114]",
  };

  return (
    <View style={styles.container}>
      <ThemedView
        layer="primary"
        style={[styles.card, { borderColor: colors.gold }]}
      >
        <View style={styles.header}>
          <ThemedText role="label" color={colors.gold}>
            Verse of the Day
          </ThemedText>
        </View>

        <View style={styles.content}>
          <ThemedText
            role="arabic"
            color={colors.textArabic}
            style={styles.arabic}
          >
            {mockVerse.arabic}
          </ThemedText>
          <ThemedText
            role="translation"
            color={colors.textSecondary}
            style={styles.translation}
          >
            {mockVerse.translation}
          </ThemedText>
          <ThemedText
            role="caption"
            color={colors.gold}
            style={styles.reference}
          >
            {mockVerse.reference}
          </ThemedText>
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    marginVertical: Spacing.lg,
  },
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.xl,
    alignItems: "center",
  },
  header: {
    marginBottom: Spacing.lg,
  },
  content: {
    alignItems: "center",
  },
  arabic: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  translation: {
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: Spacing.lg,
  },
  reference: {
    textAlign: "center",
  },
});
