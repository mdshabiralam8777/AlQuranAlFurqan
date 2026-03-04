import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

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
import quranApi, { Chapter } from "@/services/quranApi";
import { ActivityIndicator } from "react-native";

type FilterType = "all" | "makkah" | "madinah";

export default function QuranIndexScreen() {
  const { colors } = useAppTheme();

  // Local state for search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const listRef = useRef<FlashList<Chapter>>(null);

  // Scroll to top when filter or search changes
  useEffect(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [activeFilter, searchQuery]);

  // Fetch chapters
  const {
    data: chapters = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["chapters"],
    queryFn: () => quranApi.getChapters(),
  });

  // Derived state: filter and search
  const filteredChapters = useMemo(() => {
    let result = chapters;

    // 1. Filter by revelation place
    if (activeFilter === "makkah") {
      result = result.filter((c: Chapter) => c.revelation_place === "makkah");
    } else if (activeFilter === "madinah") {
      result = result.filter((c: Chapter) => c.revelation_place === "madinah");
    }

    // 2. Filter by search query
    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (c: Chapter) =>
          c.name_simple.toLowerCase().includes(lowerQuery) ||
          c.translated_name?.name.toLowerCase().includes(lowerQuery) ||
          c.name_arabic.includes(lowerQuery),
      );
    }

    return result;
  }, [chapters, activeFilter, searchQuery]);

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
          Failed to load Surahs.
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
          placeholder="Search Surah Name..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery("")}
        />
      </View>

      {/* Filter Chips */}
      <View style={styles.filterContainer}>
        <FilterChip
          label="All"
          isActive={activeFilter === "all"}
          onPress={() => setActiveFilter("all")}
        />
        <FilterChip
          label="Makkah"
          isActive={activeFilter === "makkah"}
          onPress={() => setActiveFilter("makkah")}
        />
        <FilterChip
          label="Madinah"
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
              item.revelation_place === "makkah" ? "Meccan" : "Medinan"
            }
          />
        )}
        // @ts-ignore - type definitions are missing this prop in this environment but it is strictly required for FlashList performance
        estimatedItemSize={80}
        contentContainerStyle={{ paddingBottom: Spacing.xxxl }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ThemedText color={colors.textSecondary}>
              No Surahs found matching "{searchQuery}"
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
