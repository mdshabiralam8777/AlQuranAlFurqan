import { FlashList } from "@shopify/flash-list";
import React, { useRef } from "react";
import { StyleSheet } from "react-native";

import { MushafPage } from "@/components/quran";
import { Spacing } from "@/constants/spacing";
import { Chapter, Verse } from "@/services/quranApi";

const TypedFlashList = FlashList as any;

export interface MushafPageData {
  pageNumber: number;
  verses: Verse[];
}

interface MushafListProps {
  pages: MushafPageData[];
  chapter?: Chapter;
  onBookmark: (verse: Verse) => void;
  bookmarkedVerseKeys: Set<string>;
  ListHeaderComponent: React.ReactElement | null;
  initialVerse?: number;
}

export function MushafList({
  pages,
  chapter,
  onBookmark,
  bookmarkedVerseKeys,
  ListHeaderComponent,
  initialVerse,
}: MushafListProps) {
  const mushafListRef = useRef<any>(null);

  const renderMushafItem = ({ item }: { item: MushafPageData }) => {
    const showBismillah =
      (chapter?.bismillah_pre || chapter?.id === 1) &&
      item.verses.some((v) => v.verse_number === 1);

    return (
      <MushafPage
        pageNumber={item.pageNumber}
        verses={item.verses}
        showBismillah={!!showBismillah}
        onVersePress={onBookmark}
        bookmarkedVerseKeys={bookmarkedVerseKeys}
      />
    );
  };

  return (
    <TypedFlashList
      ref={mushafListRef}
      data={pages}
      renderItem={renderMushafItem}
      keyExtractor={(item: any) => item.pageNumber.toString()}
      ListHeaderComponent={ListHeaderComponent}
      estimatedItemSize={600}
      contentContainerStyle={{ paddingBottom: Spacing.xxl }}
      showsVerticalScrollIndicator={false}
      onLoad={() => {
        if (initialVerse && pages && pages.length > 0) {
          const targetPageIndex = pages.findIndex((p) =>
            p.verses.some((v) => v.verse_number === initialVerse),
          );
          if (targetPageIndex > 0) {
            setTimeout(() => {
              mushafListRef.current?.scrollToIndex({
                index: targetPageIndex,
                animated: true,
              });
            }, 300);
          }
        }
      }}
    />
  );
}

const styles = StyleSheet.create({});
