/**
 * BookmarksScreen — displays all saved verse bookmarks.
 *
 * Features:
 *  - FlashList of bookmarks (verse key, Arabic preview, translation snippet)
 *  - Swipe-to-delete using Swipeable from react-native-gesture-handler
 *  - Tap → navigate to the Surah at that verse
 *  - Empty state with message
 *  - Clear All button in header (with confirmation)
 */

import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BookmarkItem } from "@/components/bookmarks/BookmarkItem";
import { EmptyBookmarks } from "@/components/bookmarks/EmptyBookmarks";
import { JUZ_DATA } from "@/components/quran/JuzListItem";
import { ThemedText, ThemedView } from "@/components/ui";
import { Spacing } from "@/constants/spacing";
import { BorderRadius } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import { Bookmark, useBookmarkStore } from "@/store/bookmarkStore";

export default function BookmarksScreen() {
  const { colors } = useAppTheme();
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { bookmarks, removeBookmark, clearAll } = useBookmarkStore();

  const handleClearAll = useCallback(() => {
    Alert.alert(t("actions.clearAllBookmarks"), t("actions.clearAllConfirm"), [
      { text: t("actions.cancel"), style: "cancel" },
      {
        text: t("actions.clearAll"),
        style: "destructive",
        onPress: () => clearAll(),
      },
    ]);
  }, [clearAll, t]);

  const handleNavigate = useCallback(
    (bookmark: Bookmark) => {
      const mode = bookmark.source || "translation";

      if (bookmark.verseKey.startsWith("chapter:")) {
        const chapterId = bookmark.verseKey.split(":")[1];
        router.push(`/surah/${chapterId}?mode=${mode}`);
      } else if (bookmark.verseKey.startsWith("juz:")) {
        const juzId = bookmark.verseKey.split(":")[1];
        // We need to fetch the start surah and verse for the Juz.
        const juzInfo = JUZ_DATA.find(
          (j: any) => j.juzNumber.toString() === juzId,
        );
        if (juzInfo) {
          const [surahNum, verseNum] = juzInfo.startAyah.split(":");
          router.push(
            `/surah/${surahNum}?verse=${verseNum}&isJuz=true&mode=${mode}`,
          );
        }
      } else {
        const [chapterId, verseNumber] = bookmark.verseKey.split(":");
        router.push(`/surah/${chapterId}?verse=${verseNumber}&mode=${mode}`);
      }
    },
    [router],
  );

  const renderBookmarkItem = ({ item }: { item: Bookmark }) => (
    <BookmarkItem
      item={item}
      onNavigate={handleNavigate}
      onDelete={removeBookmark}
    />
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.bgSecondary,
            paddingTop: insets.top + Spacing.sm,
          },
        ]}
      >
        <View style={styles.headerRow}>
          <ThemedText role="heading" color={colors.textPrimary}>
            {t("tabs.bookmarks")}
          </ThemedText>
          {bookmarks.length > 0 && (
            <View
              style={[
                styles.countBadge,
                { backgroundColor: colors.gold + "25" },
              ]}
            >
              <ThemedText role="caption" color={colors.gold}>
                {bookmarks.length}
              </ThemedText>
            </View>
          )}
          <View style={{ flex: 1 }} />
          {bookmarks.length > 0 && (
            <Pressable onPress={handleClearAll} style={styles.clearButton}>
              <ThemedText role="caption" color={colors.gold}>
                {t("actions.clearAll")}
              </ThemedText>
            </Pressable>
          )}
        </View>
      </View>

      {/* Bookmark List */}
      <FlashList
        data={bookmarks}
        keyExtractor={(item) => item.verseKey}
        renderItem={renderBookmarkItem}
        // @ts-ignore - type definitions are missing this prop but it is required for FlashList
        estimatedItemSize={140}
        contentContainerStyle={{ paddingBottom: Spacing.xxxl }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyBookmarks}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  countBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.round,
    minWidth: 28,
    alignItems: "center",
  },
  clearButton: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
  },
});
