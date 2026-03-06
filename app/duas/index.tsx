import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DuaCategoryCard } from "@/components/duas/DuaCategoryCard";
import { ThemedText, ThemedView } from "@/components/ui";
import { Spacing } from "@/constants/spacing";
import { FontFamily, FontSize } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import { DUA_CATEGORIES } from "@/data/duas";
import type { DuaCategoryId } from "@/types/dua";
import { Pressable } from "react-native";

export default function DuaCategoriesScreen() {
  const { colors } = useAppTheme();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const lang = i18n.language;

  const handleCategoryPress = (categoryId: DuaCategoryId) => {
    router.push(`/duas/${categoryId}` as any);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Nav Bar */}
      <View
        style={[
          styles.navBar,
          {
            backgroundColor: colors.bgSecondary,
            paddingTop: insets.top + Spacing.xs,
          },
        ]}
      >
        <Pressable onPress={() => router.back()} style={styles.navButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <ThemedText
          style={[styles.navTitle, { color: colors.textPrimary }]}
          numberOfLines={1}
        >
          Duas & Adhkar
        </ThemedText>
        <View style={styles.navButton} />
      </View>

      {/* Hero section */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.heroSection}>
          <ThemedText style={[styles.heroArabic, { color: colors.gold }]}>
            وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ
          </ThemedText>
          <ThemedText
            style={[styles.heroTranslation, { color: colors.textSecondary }]}
          >
            "And your Lord says, 'Call upon Me; I will respond to you.'"
          </ThemedText>
          <ThemedText style={[styles.heroRef, { color: colors.textSecondary }]}>
            — Surah Ghafir 40:60
          </ThemedText>
        </View>

        {/* Category Cards */}
        <View style={styles.categoriesSection}>
          {DUA_CATEGORIES.map((category) => (
            <DuaCategoryCard
              key={category.id}
              category={category}
              lang={lang}
              onPress={() => handleCategoryPress(category.id)}
            />
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 56,
  },
  navButton: {
    padding: Spacing.xs,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  navTitle: {
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
    fontFamily: FontFamily.interSemiBold,
  },
  scrollContent: {
    paddingBottom: Spacing.xxxl,
  },
  heroSection: {
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxl,
    gap: Spacing.sm,
  },
  heroArabic: {
    fontSize: 22,
    fontFamily: FontFamily.amiri,
    textAlign: "center",
    lineHeight: 40,
  },
  heroTranslation: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.inter,
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 20,
  },
  heroRef: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.interMedium,
    textAlign: "center",
    marginTop: Spacing.xxs,
  },
  categoriesSection: {
    paddingTop: Spacing.sm,
  },
});
