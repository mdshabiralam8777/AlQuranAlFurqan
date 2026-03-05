import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SurahHeader } from "@/components/quran";
import { VerseData } from "@/components/quran/AyahRow";
import { MushafList } from "@/components/quran/MushafList";
import { TranslationList } from "@/components/quran/TranslationList";
import { ViewModeToggle } from "@/components/quran/ViewModeToggle";
import { ThemedText, ThemedView } from "@/components/ui";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Spacing } from "@/constants/spacing";
import { BorderRadius } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import {
  DEFAULT_TRANSLATION_ID,
  useChapters,
  useTranslationsByChapter,
  useVersesByChapter,
  Verse,
} from "@/services/quranApi";
import { useBookmarkStore } from "@/store/bookmarkStore";
import { stripHtml } from "@/utils/text";

type ViewMode = "mushaf" | "translation";

export default function SurahDetailScreen() {
  const { id, verse, mode, isJuz } = useLocalSearchParams<{
    id: string;
    verse?: string;
    mode?: "mushaf" | "translation";
    isJuz?: string;
  }>();
  const chapterId = parseInt(id, 10);
  const initialVerse = verse ? parseInt(verse, 10) : undefined;
  const isJuzMode = isJuz === "true";

  const { data: chapters } = useChapters();
  const {
    data: verses,
    isLoading: versesLoading,
    isError: versesError,
    refetch: refetchVerses,
  } = useVersesByChapter(chapterId);

  const {
    data: translations,
    isLoading: translationsLoading,
    isError: translationsError,
  } = useTranslationsByChapter(DEFAULT_TRANSLATION_ID, chapterId);

  const { colors } = useAppTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [viewMode, setViewMode] = useState<ViewMode>(
    mode || (initialVerse ? "translation" : "mushaf"),
  );

  const {
    isBookmarked,
    toggleBookmark,
    isChapterBookmarked,
    toggleChapterBookmark,
  } = useBookmarkStore();

  const chapter = useMemo(() => {
    return chapters?.find((c) => c.id === chapterId);
  }, [chapters, chapterId]);

  // Build a map from verse_key → translation text for O(1) lookups
  const translationMap = useMemo(() => {
    if (!translations) return new Map<string, string>();
    const map = new Map<string, string>();
    for (const t of translations) {
      map.set(t.verse_key, stripHtml(t.text));
    }
    return map;
  }, [translations]);

  const displayVerses = useMemo(() => {
    if (!verses) return undefined;
    if (isJuzMode && initialVerse) {
      return verses.filter((v) => v.verse_number >= initialVerse);
    }
    return verses;
  }, [verses, isJuzMode, initialVerse]);

  // Group verses by their physical Mushaf page number for continuous rendering flow (Mushaf Mode)
  const pages = useMemo(() => {
    if (!displayVerses) return [];

    const pagesMap = new Map<number, Verse[]>();
    for (const verse of displayVerses) {
      const pageNum = verse.page_number;
      if (!pagesMap.has(pageNum)) {
        pagesMap.set(pageNum, []);
      }
      pagesMap.get(pageNum)?.push(verse);
    }

    return Array.from(pagesMap.entries())
      .map(([pageNumber, pageVerses]) => ({
        pageNumber,
        verses: pageVerses,
      }))
      .sort((a, b) => a.pageNumber - b.pageNumber);
  }, [displayVerses]);

  // Pre-compute bookmarked verse keys for O(1) lookups
  const { bookmarks } = useBookmarkStore();
  const bookmarkedVerseKeys = useMemo(() => {
    return new Set(bookmarks.map((b) => b.verseKey));
  }, [bookmarks]);

  const handleMushafBookmark = useCallback(
    (verse: Verse) => {
      const translationText = translationMap.get(verse.verse_key);
      toggleBookmark({
        verseKey: verse.verse_key,
        textUthmani: verse.text_uthmani || verse.text_imlaei || "",
        translationText,
        surahName: chapter?.name_simple || "Surah",
        source: "mushaf",
      });
    },
    [chapter, toggleBookmark, translationMap],
  );

  const handleBookmark = useCallback(
    (verse: VerseData) => {
      toggleBookmark({
        verseKey: verse.verseKey,
        textUthmani: verse.textUthmani,
        translationText: verse.translationText,
        surahName: chapter?.name_simple || "Surah",
        source: "translation",
      });
    },
    [chapter, toggleBookmark],
  );

  const handleHeaderBookmark = useCallback(() => {
    if (!chapter || !pages.length) return;
    const type = isJuzMode ? "juz" : "chapter";
    const id = isJuzMode ? isJuz : chapterId.toString(); // We'll pass juz string or chapterId string

    // Grab the first verse to use as preview
    const firstVerse = pages[0]?.verses?.[0];
    const textUthmani =
      firstVerse?.text_uthmani || firstVerse?.text_imlaei || "";
    const translationText = firstVerse
      ? translationMap.get(firstVerse.verse_key)
      : "";

    toggleChapterBookmark(id, type, {
      textUthmani,
      translationText,
      surahName: type === "juz" ? `Juz ${id}` : chapter.name_simple,
      source: viewMode,
    });
  }, [
    chapter,
    pages,
    isJuzMode,
    isJuz,
    chapterId,
    toggleChapterBookmark,
    translationMap,
    viewMode,
  ]);

  const isCurrentChapterBookmarked = useMemo(() => {
    if (!chapter) return false;
    const type = isJuzMode ? "juz" : "chapter";
    const id = isJuzMode ? isJuz : chapterId.toString();
    return isChapterBookmarked(id, type);
  }, [chapter, isJuzMode, isJuz, chapterId, isChapterBookmarked]);

  const renderHeader = () => {
    if (!chapter) return null;
    return (
      <View style={styles.headerSpacer}>
        <SurahHeader
          surahNumber={chapter.id}
          nameArabic={chapter.name_arabic}
          nameEnglish={chapter.translated_name.name}
          nameTransliteration={chapter.name_simple}
          versesCount={chapter.verses_count}
          revelationType={
            chapter.revelation_place === "makkah" ? "Meccan" : "Medinan"
          }
          juzStart={1}
        />

        {/* View Mode Toggle */}
        <ViewModeToggle
          viewMode={viewMode as "mushaf" | "translation"}
          setViewMode={setViewMode}
        />
      </View>
    );
  };

  const isLoading =
    versesLoading || (viewMode === "translation" && translationsLoading);
  const isError =
    versesError || (viewMode === "translation" && translationsError);

  if (isLoading) {
    return (
      <ThemedView
        style={[styles.centered, { backgroundColor: colors.bgPrimary }]}
      >
        <ActivityIndicator size="large" color={colors.gold} />
      </ThemedView>
    );
  }

  if (isError) {
    return (
      <ThemedView
        style={[styles.centered, { backgroundColor: colors.bgPrimary }]}
      >
        <ThemedText
          style={{ color: colors.textSecondary, marginBottom: Spacing.md }}
        >
          Failed to load verses.
        </ThemedText>
        <Pressable
          onPress={() => refetchVerses()}
          style={[styles.retryButton, { backgroundColor: colors.gold }]}
        >
          <ThemedText role="label" color={colors.navyPrimary}>
            Retry
          </ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* Top Nav - Midnight Navy with Gold Action */}
      <View
        style={[
          styles.navBar,
          {
            backgroundColor: colors.navyPrimary,
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
          {chapter?.name_simple || "Surah"}
        </ThemedText>
        <Pressable onPress={handleHeaderBookmark} style={styles.navButton}>
          <IconSymbol
            name={isCurrentChapterBookmarked ? "bookmark.fill" : "bookmark"}
            size={20}
            color={colors.gold}
          />
        </Pressable>
      </View>

      {viewMode === "mushaf" ? (
        <MushafList
          pages={pages}
          chapter={chapter}
          onBookmark={handleMushafBookmark}
          bookmarkedVerseKeys={bookmarkedVerseKeys}
          ListHeaderComponent={renderHeader()}
          initialVerse={initialVerse}
        />
      ) : (
        <TranslationList
          verses={displayVerses || []}
          chapter={chapter}
          translationMap={translationMap}
          isBookmarked={isBookmarked}
          onBookmark={handleBookmark}
          ListHeaderComponent={renderHeader()}
          initialVerse={initialVerse}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
  },
  retryButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  headerSpacer: {
    paddingTop: Spacing.md,
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
  },
  bismillahWrapper: {
    alignItems: "center",
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
});
