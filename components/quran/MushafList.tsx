import { FlashList } from "@shopify/flash-list";
import React, { useRef } from "react";

import { MushafPage } from "@/components/quran";
import { Spacing } from "@/constants/spacing";
import { Chapter, Verse } from "@/services/quranApi";
import { useLastReadStore } from "@/store/lastReadStore";

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
  playingVerseKey?: string | null;
}

export function MushafList({
  pages,
  chapter,
  onBookmark,
  bookmarkedVerseKeys,
  ListHeaderComponent,
  initialVerse,
  playingVerseKey,
}: MushafListProps) {
  const mushafListRef = useRef<any>(null);
  const { setLastRead } = useLastReadStore();

  const renderMushafItem = ({ item }: { item: MushafPageData }) => {
    return (
      <MushafPage
        pageNumber={item.pageNumber}
        verses={item.verses}
        showBismillah={false}
        onVersePress={onBookmark}
        bookmarkedVerseKeys={bookmarkedVerseKeys}
        playingVerseKey={playingVerseKey}
      />
    );
  };

  return (
    <TypedFlashList
      ref={mushafListRef}
      data={pages}
      renderItem={renderMushafItem}
      keyExtractor={(item: MushafPageData) => item.pageNumber.toString()}
      ListHeaderComponent={ListHeaderComponent}
      estimatedItemSize={600}
      contentContainerStyle={{ paddingBottom: Spacing.md }}
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={({ viewableItems }: any) => {
        if (!chapter || viewableItems.length === 0) return;
        const topPage = viewableItems[0].item as MushafPageData;
        if (topPage && topPage.verses && topPage.verses.length > 0) {
          const firstVerse = topPage.verses[0];
          setLastRead({
            surahId: chapter.id,
            surahNameEng: chapter.translated_name.name,
            surahNameArabic: chapter.name_arabic,
            ayahNumber: firstVerse.verse_number,
          });
        }
      }}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50,
        minimumViewTime: 500,
      }}
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
