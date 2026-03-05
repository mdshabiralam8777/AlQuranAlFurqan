import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import { ThemedText } from "@/components/ui";
import { Spacing } from "@/constants/spacing";
import { BorderRadius, FontFamily } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import { Bookmark } from "@/store/bookmarkStore";
import { getTimeAgo } from "@/utils/date";

export interface BookmarkItemProps {
  item: Bookmark;
  onNavigate: (bookmark: Bookmark) => void;
  onDelete: (verseKey: string) => void;
}

export function BookmarkItem({
  item,
  onNavigate,
  onDelete,
}: BookmarkItemProps) {
  const { colors } = useAppTheme();

  const arabicPreview =
    item.textUthmani.length > 80
      ? item.textUthmani.slice(0, 80) + "…"
      : item.textUthmani;

  const translationPreview = item.translationText
    ? item.translationText.length > 100
      ? item.translationText.slice(0, 100) + "…"
      : item.translationText
    : undefined;

  const renderDeleteAction = () => {
    return (
      <Pressable
        onPress={() => onDelete(item.verseKey)}
        style={[styles.deleteAction, { backgroundColor: "#E53935" }]}
      >
        <Ionicons name="trash-outline" size={22} color="#fff" />
        <ThemedText role="caption" color="#fff" style={{ marginTop: 4 }}>
          Delete
        </ThemedText>
      </Pressable>
    );
  };

  return (
    <Swipeable renderRightActions={renderDeleteAction} overshootRight={false}>
      <Pressable
        onPress={() => onNavigate(item)}
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
              {item.verseKey.startsWith("chapter:")
                ? "Surah"
                : item.verseKey.startsWith("juz:")
                  ? "Juz"
                  : item.verseKey}
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
}

const styles = StyleSheet.create({
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
});
