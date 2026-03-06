import { Spacing } from "@/constants/spacing";
import { FontFamily, FontSize } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import type { DuaItem } from "@/types/dua";
import { isAdhkarDua, isHadithDua } from "@/types/dua";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText, ThemedView } from "../ui";
import { IconSymbol } from "../ui/icon-symbol";

interface DuaCardProps {
  dua: DuaItem;
  index: number;
  /** Language code for selecting the right translation */
  lang: string;
}

export function DuaCard({ dua, index, lang }: DuaCardProps) {
  const { colors } = useAppTheme();

  const hasLabel = isHadithDua(dua);
  const hasInstruction = isAdhkarDua(dua);

  const label = hasLabel
    ? lang === "ur"
      ? dua.UrduLabel
      : dua.EnglishLabel
    : null;

  const instruction = hasInstruction
    ? lang === "ur"
      ? dua.UrSpecialInstruction
      : dua.EnSpecialInstruction
    : null;

  const translation = lang === "ur" ? dua.UrTranslation : dua.EnTranslation;

  return (
    <ThemedView
      layer="elevated"
      style={[styles.card, { borderColor: colors.separator }]}
    >
      {/* Index number */}
      <View style={styles.headerRow}>
        <View
          style={[styles.indexBadge, { backgroundColor: `${colors.gold}20` }]}
        >
          <ThemedText style={[styles.indexText, { color: colors.gold }]}>
            {index + 1}
          </ThemedText>
        </View>

        {/* Context label for Hadith duas */}
        {label && (
          <View
            style={[styles.labelBadge, { backgroundColor: `${colors.gold}15` }]}
          >
            <IconSymbol name="tag.fill" size={10} color={colors.gold} />
            <ThemedText
              style={[styles.labelText, { color: colors.gold }]}
              numberOfLines={1}
            >
              {label}
            </ThemedText>
          </View>
        )}
      </View>

      {/* Arabic text */}
      <View style={styles.arabicContainer}>
        <ThemedText style={[styles.arabicText, { color: colors.textArabic }]}>
          {dua.Arabic}
        </ThemedText>
      </View>

      {/* Gold divider */}
      <View style={[styles.divider, { backgroundColor: `${colors.gold}30` }]} />

      {/* Translation */}
      <ThemedText
        style={[styles.translationText, { color: colors.textPrimary }]}
      >
        {translation}
      </ThemedText>

      {/* Special instruction for Adhkar */}
      {instruction && (
        <View
          style={[
            styles.instructionContainer,
            { backgroundColor: `${colors.gold}10` },
          ]}
        >
          <IconSymbol name="info.circle.fill" size={14} color={colors.gold} />
          <ThemedText style={[styles.instructionText, { color: colors.gold }]}>
            {instruction}
          </ThemedText>
        </View>
      )}

      {/* Reference */}
      <View style={styles.referenceRow}>
        <IconSymbol
          name="book.closed.fill"
          size={12}
          color={colors.textSecondary}
        />
        <ThemedText
          style={[styles.referenceText, { color: colors.textSecondary }]}
          numberOfLines={2}
        >
          {dua.Reference}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    flexWrap: "wrap",
  },
  indexBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  indexText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  labelBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    borderRadius: 8,
    flex: 1,
  },
  labelText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    flex: 1,
  },
  arabicContainer: {
    paddingVertical: Spacing.sm,
  },
  arabicText: {
    fontSize: 24,
    fontFamily: FontFamily.amiri,
    lineHeight: 48,
    textAlign: "right",
    writingDirection: "rtl",
  },
  divider: {
    height: 1,
    width: "100%",
  },
  translationText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.inter,
    lineHeight: 20,
  },
  instructionContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: 12,
  },
  instructionText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    flex: 1,
    lineHeight: 18,
  },
  referenceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  referenceText: {
    fontSize: FontSize.xs,
    flex: 1,
  },
});
