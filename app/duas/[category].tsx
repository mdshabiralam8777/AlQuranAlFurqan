import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DuaCard } from "@/components/duas/DuaCard";
import { ThemedText, ThemedView } from "@/components/ui";
import { Spacing } from "@/constants/spacing";
import { FontFamily, FontSize } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import { getCategoryById, getDuasByCategory } from "@/data/duas";
import type { DuaCategoryId, DuaItem } from "@/types/dua";

export default function DuaListScreen() {
  const { colors } = useAppTheme();
  const { i18n } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { category } = useLocalSearchParams<{ category: string }>();
  const lang = i18n.language;

  const categoryId = category as DuaCategoryId;
  const categoryMeta = useMemo(() => getCategoryById(categoryId), [categoryId]);
  const duas = useMemo(() => getDuasByCategory(categoryId), [categoryId]);

  const screenTitle = categoryMeta
    ? lang === "ar"
      ? categoryMeta.titleAr
      : lang === "ur"
        ? categoryMeta.titleUr
        : categoryMeta.titleEn
    : "Duas";

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
          {screenTitle}
        </ThemedText>
        <View style={styles.navButton} />
      </View>

      {/* Category header */}
      {categoryMeta && (
        <View
          style={[
            styles.categoryHeader,
            { borderBottomColor: colors.separator },
          ]}
        >
          <ThemedText style={[styles.categoryArabic, { color: colors.gold }]}>
            {categoryMeta.titleAr}
          </ThemedText>
          <ThemedText
            style={[styles.categoryCount, { color: colors.textSecondary }]}
          >
            {categoryMeta.count}{" "}
            {lang === "ar" ? "دعاء" : lang === "ur" ? "دعائیں" : "Duas"}
          </ThemedText>
        </View>
      )}

      {/* Dua List */}
      <FlashList<DuaItem>
        data={duas}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <DuaCard dua={item} index={index} lang={lang} />
        )}
        estimatedItemSize={300}
        contentContainerStyle={{
          paddingTop: Spacing.md,
          paddingBottom: Spacing.xxxl,
        }}
        showsVerticalScrollIndicator={false}
      />
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
  categoryHeader: {
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    gap: Spacing.xxs,
  },
  categoryArabic: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.amiriBold,
  },
  categoryCount: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.interMedium,
  },
});
