import { Spacing } from "@/constants/spacing";
import { FontFamily, FontSize } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import type { DuaCategory } from "@/types/dua";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText, ThemedView } from "../ui";
import { IconSymbol } from "../ui/icon-symbol";

interface DuaCategoryCardProps {
  category: DuaCategory;
  onPress: () => void;
  /** Language code for selecting the right title/description */
  lang: string;
}

export function DuaCategoryCard({
  category,
  onPress,
  lang,
}: DuaCategoryCardProps) {
  const { colors } = useAppTheme();

  const title =
    lang === "ar"
      ? category.titleAr
      : lang === "ur"
        ? category.titleUr
        : category.titleEn;

  const description =
    lang === "ar"
      ? category.descriptionAr
      : lang === "ur"
        ? category.descriptionUr
        : category.descriptionEn;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pressable,
        {
          opacity: pressed ? 0.85 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <ThemedView
        layer="elevated"
        style={[
          styles.card,
          {
            borderColor: colors.separator,
          },
        ]}
      >
        {/* Gold accent strip at top */}
        <View style={[styles.accentStrip, { backgroundColor: colors.gold }]} />

        <View style={styles.cardContent}>
          {/* Icon */}
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${colors.gold}18` },
            ]}
          >
            <IconSymbol
              name={category.icon as any}
              size={28}
              color={colors.gold}
            />
          </View>

          {/* Text */}
          <View style={styles.textContainer}>
            <ThemedText
              style={[styles.title, { color: colors.textPrimary }]}
              numberOfLines={1}
            >
              {title}
            </ThemedText>

            <ThemedText
              style={[styles.arabicSubtitle, { color: colors.gold }]}
              numberOfLines={1}
            >
              {category.titleAr}
            </ThemedText>

            <ThemedText
              style={[styles.description, { color: colors.textSecondary }]}
              numberOfLines={2}
            >
              {description}
            </ThemedText>
          </View>

          {/* Count badge + chevron */}
          <View style={styles.trailingContainer}>
            <View
              style={[
                styles.countBadge,
                { backgroundColor: `${colors.gold}20` },
              ]}
            >
              <ThemedText style={[styles.countText, { color: colors.gold }]}>
                {category.count}
              </ThemedText>
            </View>
            <IconSymbol
              name="chevron.right"
              size={14}
              color={colors.textSecondary}
            />
          </View>
        </View>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  accentStrip: {
    height: 3,
    width: "100%",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: FontSize.md,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  arabicSubtitle: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.amiri,
  },
  description: {
    fontSize: FontSize.xs,
    marginTop: 2,
  },
  trailingContainer: {
    alignItems: "center",
    gap: Spacing.xs,
  },
  countBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    borderRadius: 10,
  },
  countText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
});
