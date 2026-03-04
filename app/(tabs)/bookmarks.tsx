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

import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText, ThemedView } from "@/components/ui";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Spacing } from "@/constants/spacing";
import { BorderRadius, FontFamily } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import { Bookmark, useBookmarkStore } from "@/store/bookmarkStore";

function getTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  return new Date(timestamp).toLocaleDateString();
}

export default function BookmarksScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { bookmarks, removeBookmark, clearAll } = useBookmarkStore();

  const handleClearAll = useCallback(() => {
    Alert.alert(
      "Clear All Bookmarks",
      "Are you sure you want to remove all bookmarks? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => clearAll(),
        },
      ],
    );
  }, [clearAll]);

  const handleNavigate = useCallback(
    (bookmark: Bookmark) => {
      const [chapterId, verseNumber] = bookmark.verseKey.split(":");
      const mode = bookmark.source || "translation";
      router.push(`/surah/${chapterId}?verse=${verseNumber}&mode=${mode}`);
    },
    [router],
  );

  const renderDeleteAction = (verseKey: string) => {
    return (
      <Pressable
        onPress={() => removeBookmark(verseKey)}
        style={[styles.deleteAction, { backgroundColor: "#E53935" }]}
      >
        <Ionicons name="trash-outline" size={22} color="#fff" />
        <ThemedText role="caption" color="#fff" style={{ marginTop: 4 }}>
          Delete
        </ThemedText>
      </Pressable>
    );
  };

  const renderBookmarkItem = ({ item }: { item: Bookmark }) => {
    const arabicPreview =
      item.textUthmani.length > 80
        ? item.textUthmani.slice(0, 80) + "…"
        : item.textUthmani;

    const translationPreview = item.translationText
      ? item.translationText.length > 100
        ? item.translationText.slice(0, 100) + "…"
        : item.translationText
      : undefined;

    return (
      <Swipeable
        renderRightActions={() => renderDeleteAction(item.verseKey)}
        overshootRight={false}
      >
        <Pressable
          onPress={() => handleNavigate(item)}
          style={[
            styles.bookmarkCard,
            {
              backgroundColor: colors.bgSecondary,
              borderColor: colors.separator,
            },
          ]}
        >
          {/* Top row — verse key badge + surah name + time */}
          <View style={styles.topRow}>
            <View
              style={[
                styles.verseKeyBadge,
                { backgroundColor: colors.gold + "18" },
              ]}
            >
              <ThemedText
                role="caption"
                color={colors.gold}
                style={styles.verseKeyText}
              >
                {item.verseKey}
              </ThemedText>
            </View>
            <ThemedText role="label" color={colors.textPrimary}>
              {item.surahName}
            </ThemedText>
            <View style={{ flex: 1 }} />
            <ThemedText role="caption" color={colors.textSecondary}>
              {getTimeAgo(item.timestamp)}
            </ThemedText>
          </View>

          {/* Arabic text preview */}
          <ThemedText
            role="arabic"
            color={colors.textArabic}
            style={styles.arabicPreview}
            numberOfLines={2}
          >
            {arabicPreview}
          </ThemedText>

          {/* Translation preview — only for bookmarks from translation mode */}
          {translationPreview && item.source === "translation" && (
            <ThemedText
              role="translation"
              color={colors.textSecondary}
              numberOfLines={2}
              style={styles.translationPreview}
            >
              {translationPreview}
            </ThemedText>
          )}
        </Pressable>
      </Swipeable>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <IconSymbol
        name="bookmark"
        size={64}
        color={colors.textSecondary + "40"}
      />
      <ThemedText
        role="heading"
        color={colors.textSecondary}
        style={styles.emptyTitle}
      >
        No Bookmarks Yet
      </ThemedText>
      <ThemedText
        role="body"
        color={colors.textSecondary}
        style={styles.emptySubtitle}
      >
        Tap the Save button on any verse in Translation mode to bookmark it for
        quick access.
      </ThemedText>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.navyPrimary,
            paddingTop: insets.top + Spacing.sm,
          },
        ]}
      >
        <View style={styles.headerRow}>
          <ThemedText role="heading" color={colors.textPrimary}>
            Bookmarks
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
                Clear All
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
        ListEmptyComponent={renderEmptyState}
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
  bookmarkCard: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: StyleSheet.hairlineWidth,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  verseKeyBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  verseKeyText: {
    fontWeight: "600",
    fontSize: 12,
  },
  arabicPreview: {
    textAlign: "right",
    writingDirection: "rtl",
    fontSize: 20,
    lineHeight: 36,
    marginBottom: Spacing.xs,
    fontFamily: FontFamily.quranArabic,
  },
  translationPreview: {
    marginTop: Spacing.xs,
    lineHeight: 20,
  },
  deleteAction: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    marginTop: Spacing.sm,
    marginRight: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 120,
    paddingHorizontal: Spacing.xxl,
  },
  emptyTitle: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    textAlign: "center",
    lineHeight: 22,
  },
});
