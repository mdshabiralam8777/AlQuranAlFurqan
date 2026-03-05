import React from "react";
import { StyleSheet, View } from "react-native";

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
      {/* 
        A highly compact, single-line arrangement. 
        We use a subtle background with an underline to anchor it visually, 
        saving vertical space compared to the large decorative border. 
      */}
      <View
        style={[
          styles.compactCard,
          {
            backgroundColor: colors.bgSecondary,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.leftSection}>
          <View style={[styles.numberBadge, { backgroundColor: colors.gold }]}>
            <ThemedText
              style={[styles.numberText, { color: colors.navyPrimary }]}
            >
              {surahNumber}
            </ThemedText>
          </View>
          <View>
            <ThemedText role="label" color={colors.textPrimary}>
              {nameTransliteration}
            </ThemedText>
            <ThemedText role="caption" color={colors.textSecondary}>
              {nameEnglish}
            </ThemedText>
          </View>
        </View>

        <View style={styles.centerSection}>
          <ThemedText color={colors.textSecondary} style={styles.metaText}>
            {revelationType} • {versesCount} Verses
          </ThemedText>
        </View>

        <View style={styles.rightSection}>
          <ThemedText
            role="arabicSmall"
            color={colors.gold}
            style={styles.arabicName}
          >
            {nameArabic}
          </ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm, // Reduced vertical padding
  },
  compactCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  numberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.sm,
  },
  numberText: {
    fontSize: 12,
    fontWeight: "600",
  },
  centerSection: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xs,
  },
  rightSection: {
    flex: 1,
    alignItems: "flex-end",
  },
  arabicName: {
    fontSize: 20, // Slightly smaller to fit compact layout
    textAlign: "right",
  },
  metaText: {
    fontSize: 9,
    opacity: 0.7,
  },
});
