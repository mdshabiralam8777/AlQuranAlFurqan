import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { SurahListItem } from "@/components/quran";
import {
  FilterChip,
  NavyHeader,
  SearchBar,
  ThemedText,
  ThemedView,
} from "@/components/ui";
import { Spacing } from "@/constants/spacing";
import { useAppTheme } from "@/context/ThemeContext";
import { useChaptersSearch } from "@/hooks/useChaptersSearch";
import { Chapter } from "@/services/quranApi";

export default function QuranIndexScreen() {
  const { colors } = useAppTheme();
  const { t } = useTranslation();

  const {
    filteredChapters,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    isLoading,
    isError,
    error,
  } = useChaptersSearch();

  const listRef = useRef<any>(null);

  // Scroll to top when filter or search changes
  useEffect(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [activeFilter, searchQuery]);

  if (isLoading) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.gold} />
      </ThemedView>
    );
  }

  if (isError) {
    return (
      <ThemedView style={styles.centerContainer}>
        <ThemedText
          color={colors.textSecondary}
          style={{ textAlign: "center", padding: 20 }}
        >
          {t("home.errorLoad")}
          {"\n\n"}
          Reason: {error?.message}
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <NavyHeader />

      {/* Search Bar - overlaps standard header slightly per design */}
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: colors.navyPrimary },
        ]}
      >
        <SearchBar
          placeholder={t("home.searchPlaceholder")}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery("")}
        />
      </View>

      {/* Filter Chips */}
      <View style={styles.filterContainer}>
        <FilterChip
          label={t("home.all")}
          isActive={activeFilter === "all"}
          onPress={() => setActiveFilter("all")}
        />
        <FilterChip
          label={t("surah.revelationType.meccan")}
          isActive={activeFilter === "makkah"}
          onPress={() => setActiveFilter("makkah")}
        />
        <FilterChip
          label={t("surah.revelationType.medinan")}
          isActive={activeFilter === "madinah"}
          onPress={() => setActiveFilter("madinah")}
        />
      </View>

      <FlashList<Chapter>
        ref={listRef}
        data={filteredChapters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SurahListItem
            surahNumber={item.id}
            nameArabic={item.name_arabic}
            nameEnglish={item.translated_name?.name || ""}
            nameTransliteration={item.name_simple}
            versesCount={item.verses_count}
            revelationType={
              item.revelation_place === "makkah"
                ? t("surah.revelationType.meccan")
                : t("surah.revelationType.medinan")
            }
          />
        )}
        // @ts-ignore - type definitions are missing this prop in this environment but it is strictly required for FlashList performance
        estimatedItemSize={80}
        contentContainerStyle={{ paddingBottom: Spacing.xxxl }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ThemedText color={colors.textSecondary}>
              {t("actions.noResults", { query: searchQuery })}
            </ThemedText>
          </View>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    paddingTop: 0,
    zIndex: 2,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    zIndex: 1,
  },
  emptyContainer: {
    padding: Spacing.xl,
    alignItems: "center",
  },
});
