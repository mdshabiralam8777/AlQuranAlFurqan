import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MushafPage, SurahHeader } from "@/components/quran";
import { AyahRow } from "@/components/quran/AyahRow";
import { Bismillah, ThemedText, ThemedView } from "@/components/ui";
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

const TypedFlashList = FlashList as any;

type ViewMode = "mushaf" | "translation";

/** Strip HTML tags and footnote superscripts the QF API wraps translations in */
function stripHtml(raw: string): string {
  return raw
    .replace(/<sup[^>]*>.*?<\/sup>/gi, "") // remove footnote markers
    .replace(/<[^>]+>/g, "") // remove all remaining HTML tags
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

export default function SurahDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const chapterId = parseInt(id, 10);

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

  const [viewMode, setViewMode] = useState<ViewMode>("mushaf");

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

  // Group verses by their physical Mushaf page number for continuous rendering flow (Mushaf Mode)
  const pages = useMemo(() => {
    if (!verses) return [];

    const pagesMap = new Map<number, Verse[]>();
    for (const verse of verses) {
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
  }, [verses]);

  const renderMushafItem = ({
    item,
  }: {
    item: { pageNumber: number; verses: Verse[] };
  }) => {
    const showBismillah =
      (chapter?.bismillah_pre || chapter?.id === 1) &&
      item.verses.some((v) => v.verse_number === 1);

    return (
      <MushafPage
        pageNumber={item.pageNumber}
        verses={item.verses}
        showBismillah={!!showBismillah}
      />
    );
  };

  const renderTranslationItem = ({ item }: { item: Verse }) => {
    const translationText =
      translationMap.get(item.verse_key) ?? "Loading translation…";

    return (
      <AyahRow
        verse={{
          id: item.id,
          verseKey: item.verse_key,
          textUthmani: item.text_uthmani || item.text_imlaei || "",
          translationText,
          isSajdah: !!item.sajdah_number,
        }}
        showTranslation={true}
        viewMode="translation"
      />
    );
  };

  const renderTranslationBismillah = () => {
    const showBismillah =
      chapter && (chapter.bismillah_pre || chapter.id === 1);
    if (!showBismillah) return null;

    return (
      <View style={styles.bismillahWrapper}>
        <Bismillah />
      </View>
    );
  };

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
        <View style={styles.toggleContainer}>
          <Pressable
            onPress={() => setViewMode("mushaf")}
            style={[
              styles.toggleButton,
              viewMode === "mushaf" && [
                styles.toggleButtonActive,
                { backgroundColor: colors.gold },
              ],
            ]}
          >
            <ThemedText
              role="label"
              color={
                viewMode === "mushaf"
                  ? colors.navyPrimary
                  : colors.textSecondary
              }
            >
              Mushaf
            </ThemedText>
          </Pressable>
          <Pressable
            onPress={() => setViewMode("translation")}
            style={[
              styles.toggleButton,
              viewMode === "translation" && [
                styles.toggleButtonActive,
                { backgroundColor: colors.gold },
              ],
            ]}
          >
            <ThemedText
              role="label"
              color={
                viewMode === "translation"
                  ? colors.navyPrimary
                  : colors.textSecondary
              }
            >
              Translation
            </ThemedText>
          </Pressable>
        </View>

        {/* Bismillah in translation mode */}
        {viewMode === "translation" && renderTranslationBismillah()}
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
        <Pressable style={styles.navButton}>
          <IconSymbol name="bookmark" size={20} color={colors.gold} />
        </Pressable>
      </View>

      {viewMode === "mushaf" ? (
        <TypedFlashList
          data={pages}
          renderItem={renderMushafItem}
          keyExtractor={(item: any) => item.pageNumber.toString()}
          ListHeaderComponent={renderHeader}
          estimatedItemSize={600}
          contentContainerStyle={{ paddingBottom: Spacing.xxl }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <TypedFlashList
          data={verses}
          renderItem={renderTranslationItem}
          keyExtractor={(item: any) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          estimatedItemSize={200}
          contentContainerStyle={{ paddingBottom: Spacing.xxl }}
          showsVerticalScrollIndicator={false}
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
  toggleContainer: {
    flexDirection: "row",
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: BorderRadius.lg,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: "center",
    borderRadius: BorderRadius.md,
  },
  toggleButtonActive: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
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
