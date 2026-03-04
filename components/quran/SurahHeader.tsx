import React from "react";
import { StyleSheet, View } from "react-native";

import { IslamicBorder } from "@/assets/svgs/IslamicBorder";
import { ThemedText } from "@/components/ui/ThemedText";
import { Spacing } from "@/constants/spacing";
import { useAppTheme } from "@/context/ThemeContext";

export interface SurahHeaderProps {
  surahNumber: number;
  nameArabic: string;
  nameEnglish: string;
  nameTransliteration: string;
  versesCount: number;
  revelationType: "Meccan" | "Medinan";
  juzStart: number;
  juzEnd?: number;
}

export function SurahHeader({
  surahNumber,
  nameArabic,
  nameEnglish,
  nameTransliteration,
  versesCount,
  revelationType,
}: SurahHeaderProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <IslamicBorder padding={Spacing.lg} color={colors.gold}>
        <View style={styles.content}>
          <ThemedText
            role="title"
            color={colors.textPrimary}
            style={styles.title}
          >
            {nameTransliteration}
          </ThemedText>
          <ThemedText
            role="subtitle"
            color={colors.textSecondary}
            style={styles.subtitle}
          >
            {nameEnglish}
          </ThemedText>

          <View style={styles.dividerRow}>
            <View
              style={[styles.line, { backgroundColor: colors.separator }]}
            />
            <ThemedText
              role="arabicSmall"
              color={colors.gold}
              style={styles.arabicName}
            >
              {nameArabic}
            </ThemedText>
            <View
              style={[styles.line, { backgroundColor: colors.separator }]}
            />
          </View>

          <View style={styles.metaRow}>
            <ThemedText role="caption" color={colors.textPrimary}>
              {revelationType}
            </ThemedText>
            <View style={[styles.dot, { backgroundColor: colors.gold }]} />
            <ThemedText role="caption" color={colors.textPrimary}>
              {versesCount} Verses
            </ThemedText>
          </View>
        </View>
      </IslamicBorder>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
  },
  content: {
    alignItems: "center",
  },
  title: {
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontStyle: "italic",
    marginBottom: Spacing.md,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: Spacing.md,
  },
  line: {
    flex: 1,
    height: 1,
  },
  arabicName: {
    marginHorizontal: Spacing.md,
    fontSize: 28, // Give it prominent size inside the border
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: Spacing.sm,
  },
});
