/**
 * HomeTabs — Surah / Juz tabbed browsing section for the home page.
 *
 * Renders pill-style tab buttons at the top and a scrollable list below.
 * - Surah tab: all 114 chapters using SurahListItem
 * - Juz tab: all 30 Juz using JuzListItem
 */

import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ui";
import { Spacing } from "@/constants/spacing";
import { BorderRadius } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import quranApi, { Chapter } from "@/services/quranApi";

import { JUZ_DATA, JuzInfo, JuzListItem } from "./JuzListItem";
import { SurahListItem } from "./SurahListItem";

type TabType = "surah" | "juz";

export function HomeTabs() {
  const { colors } = useAppTheme();
  const [activeTab, setActiveTab] = useState<TabType>("surah");

  // Fetch chapters for Surah tab
  const {
    data: chapters = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["chapters"],
    queryFn: () => quranApi.getChapters(),
  });

  const renderSurahItem = ({ item }: { item: Chapter }) => (
    <SurahListItem
      surahNumber={item.id}
      nameArabic={item.name_arabic}
      nameEnglish={item.translated_name?.name || ""}
      nameTransliteration={item.name_simple}
      versesCount={item.verses_count}
      revelationType={item.revelation_place === "makkah" ? "Meccan" : "Medinan"}
    />
  );

  const renderJuzItem = ({ item }: { item: JuzInfo }) => (
    <JuzListItem juz={item} />
  );

  return (
    <View style={styles.container}>
      {/* Tab Pills */}
      <View style={styles.tabBar}>
        <Pressable
          onPress={() => setActiveTab("surah")}
          style={[
            styles.tabPill,
            activeTab === "surah"
              ? [styles.tabPillActive, { backgroundColor: colors.gold }]
              : { backgroundColor: colors.bgSecondary },
          ]}
        >
          <ThemedText
            role="label"
            color={
              activeTab === "surah" ? colors.navyPrimary : colors.textSecondary
            }
          >
            Surah
          </ThemedText>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab("juz")}
          style={[
            styles.tabPill,
            activeTab === "juz"
              ? [styles.tabPillActive, { backgroundColor: colors.gold }]
              : { backgroundColor: colors.bgSecondary },
          ]}
        >
          <ThemedText
            role="label"
            color={
              activeTab === "juz" ? colors.navyPrimary : colors.textSecondary
            }
          >
            Juz
          </ThemedText>
        </Pressable>
      </View>

      {/* List Content */}
      <View style={styles.listContainer}>
        {activeTab === "surah" ? (
          isLoading ? (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color={colors.gold} />
            </View>
          ) : isError ? (
            <View style={styles.centered}>
              <ThemedText color={colors.textSecondary}>
                Failed to load Surahs.
              </ThemedText>
            </View>
          ) : (
            <FlashList<Chapter>
              data={chapters}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderSurahItem}
              // @ts-ignore - estimatedItemSize is required for FlashList
              estimatedItemSize={80}
              scrollEnabled={false}
            />
          )
        ) : (
          <FlashList<JuzInfo>
            data={JUZ_DATA}
            keyExtractor={(item) => item.juzNumber.toString()}
            renderItem={renderJuzItem}
            // @ts-ignore - estimatedItemSize is required for FlashList
            estimatedItemSize={80}
            scrollEnabled={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.lg,
  },
  tabBar: {
    flexDirection: "row",
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  tabPill: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.xxl,
    alignItems: "center",
    justifyContent: "center",
  },
  tabPillActive: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  listContainer: {
    minHeight: 200,
  },
  centered: {
    paddingVertical: Spacing.xxl,
    alignItems: "center",
    justifyContent: "center",
  },
});
