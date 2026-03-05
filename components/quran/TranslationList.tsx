import { FlashList } from "@shopify/flash-list";
import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";

import { AyahRow, VerseData } from "@/components/quran/AyahRow";
import { Bismillah } from "@/components/ui";
import { Spacing } from "@/constants/spacing";
import { Chapter, Verse } from "@/services/quranApi";

const TypedFlashList = FlashList as any;

interface TranslationListProps {
  verses: Verse[];
  chapter?: Chapter;
  translationMap: Map<string, string>;
  isBookmarked: (verseKey: string) => boolean;
  onBookmark: (verse: VerseData) => void;
  ListHeaderComponent: React.ReactElement | null;
  initialVerse?: number;
}

export function TranslationList({
  verses,
  chapter,
  translationMap,
  isBookmarked,
  onBookmark,
  ListHeaderComponent,
  initialVerse,
}: TranslationListProps) {
  const listRef = useRef<any>(null);

  const renderItem = ({ item }: { item: Verse }) => {
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
        isBookmarked={isBookmarked(item.verse_key)}
        onBookmark={onBookmark}
        showTranslation={true}
        viewMode="translation"
      />
    );
  };

  const renderBismillah = () => {
    const showBismillah =
      chapter && (chapter.bismillah_pre || chapter.id === 1);
    if (!showBismillah) return null;

    return (
      <View style={styles.bismillahWrapper}>
        <Bismillah />
      </View>
    );
  };

  return (
    <TypedFlashList
      ref={listRef}
      data={verses}
      renderItem={renderItem}
      keyExtractor={(item: any) => item.id.toString()}
      ListHeaderComponent={
        <>
          {ListHeaderComponent}
          {renderBismillah()}
        </>
      }
      estimatedItemSize={200}
      contentContainerStyle={{ paddingBottom: Spacing.xxl }}
      showsVerticalScrollIndicator={false}
      onLoad={() => {
        if (initialVerse && verses && verses.length > 0) {
          const targetIndex = verses.findIndex(
            (v) => v.verse_number === initialVerse,
          );
          if (targetIndex > 0) {
            setTimeout(() => {
              listRef.current?.scrollToIndex({
                index: targetIndex,
                animated: true,
              });
            }, 300);
          }
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  bismillahWrapper: {
    alignItems: "center",
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
});
