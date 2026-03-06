import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText, ThemedView } from "@/components/ui";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Spacing } from "@/constants/spacing";
import { FontFamily, FontSize } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import { FAVORITE_SECTIONS, FavoriteItem } from "@/data/favorites";

export default function FavoritesScreen() {
  const { colors } = useAppTheme();
  const { i18n } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const lang = i18n.language;

  const handleItemPress = (item: FavoriteItem) => {
    router.push({
      pathname: "/surah/[id]",
      params: {
        id: item.chapterId.toString(),
        ...(item.verse
          ? { verse: item.verse.toString(), mode: "translation" }
          : {}),
      },
    } as any);
  };

  const getTitle = (obj: {
    titleEn: string;
    titleAr: string;
    titleUr: string;
  }) =>
    lang === "ar" ? obj.titleAr : lang === "ur" ? obj.titleUr : obj.titleEn;

  const getDesc = (obj: {
    descriptionEn: string;
    descriptionAr: string;
    descriptionUr: string;
  }) =>
    lang === "ar"
      ? obj.descriptionAr
      : lang === "ur"
        ? obj.descriptionUr
        : obj.descriptionEn;

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
          {lang === "ar" ? "المفضلة" : lang === "ur" ? "پسندیدہ" : "Favorites"}
        </ThemedText>
        <View style={styles.navButton} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero */}
        <View style={styles.heroSection}>
          <ThemedText style={[styles.heroArabic, { color: colors.gold }]}>
            فَاذْكُرُونِي أَذْكُرْكُمْ
          </ThemedText>
          <ThemedText
            style={[styles.heroTranslation, { color: colors.textSecondary }]}
          >
            "So remember Me; I will remember you."
          </ThemedText>
          <ThemedText style={[styles.heroRef, { color: colors.textSecondary }]}>
            — Surah Al-Baqarah 2:152
          </ThemedText>
        </View>

        {/* Sections */}
        {FAVORITE_SECTIONS.map((section, sIdx) => (
          <View key={sIdx} style={styles.section}>
            {/* Section header */}
            <View style={styles.sectionHeader}>
              <View
                style={[styles.sectionAccent, { backgroundColor: colors.gold }]}
              />
              <ThemedText
                style={[styles.sectionTitle, { color: colors.textPrimary }]}
              >
                {getTitle(section)}
              </ThemedText>
            </View>

            {/* Items */}
            {section.items.map((item, iIdx) => (
              <Pressable
                key={iIdx}
                onPress={() => handleItemPress(item)}
                style={({ pressed }) => [
                  styles.itemPressable,
                  {
                    opacity: pressed ? 0.85 : 1,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  },
                ]}
              >
                <ThemedView
                  layer="elevated"
                  style={[styles.itemCard, { borderColor: colors.separator }]}
                >
                  {/* Icon */}
                  <View
                    style={[
                      styles.itemIcon,
                      { backgroundColor: `${colors.gold}18` },
                    ]}
                  >
                    <IconSymbol
                      name={item.icon as any}
                      size={22}
                      color={colors.gold}
                    />
                  </View>

                  {/* Text content */}
                  <View style={styles.itemText}>
                    <View style={styles.itemTitleRow}>
                      <ThemedText
                        style={[
                          styles.itemTitle,
                          { color: colors.textPrimary },
                        ]}
                        numberOfLines={1}
                      >
                        {getTitle(item)}
                      </ThemedText>
                      <ThemedText
                        style={[styles.itemArabic, { color: colors.gold }]}
                        numberOfLines={1}
                      >
                        {item.titleAr}
                      </ThemedText>
                    </View>
                    <ThemedText
                      style={[
                        styles.itemDescription,
                        { color: colors.textSecondary },
                      ]}
                      numberOfLines={2}
                    >
                      {getDesc(item)}
                    </ThemedText>
                    {item.verse && (
                      <ThemedText
                        style={[styles.itemVerse, { color: colors.gold }]}
                      >
                        {item.verseEnd
                          ? `Ayah ${item.verse}–${item.verseEnd}`
                          : `Ayah ${item.verse}`}
                      </ThemedText>
                    )}
                  </View>

                  {/* Chevron */}
                  <IconSymbol
                    name="chevron.right"
                    size={14}
                    color={colors.textSecondary}
                  />
                </ThemedView>
              </Pressable>
            ))}
          </View>
        ))}
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
  section: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionAccent: {
    width: 3,
    height: 20,
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: FontSize.md,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  itemPressable: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: 14,
    borderWidth: 1,
    gap: Spacing.md,
  },
  itemIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    flex: 1,
    gap: 2,
  },
  itemTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    flexWrap: "wrap",
  },
  itemTitle: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  itemArabic: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.amiri,
  },
  itemDescription: {
    fontSize: FontSize.xs,
    lineHeight: 16,
    marginTop: 2,
  },
  itemVerse: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    marginTop: 2,
  },
});
