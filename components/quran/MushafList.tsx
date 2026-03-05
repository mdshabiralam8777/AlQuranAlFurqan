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
  const { setLastRead } = useLastReadStore();

  const renderMushafItem = ({ item }: { item: MushafPageData }) => {
    const showBismillah =
      (chapter?.bismillah_pre || chapter?.id === 1) &&
      item.verses.some((v) => v.verse_number === (chapter?.id === 1 ? 2 : 1));

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
      onViewableItemsChanged={({ viewableItems }: any) => {
        if (!chapter || viewableItems.length === 0) return;
        // The first viewable item is the topmost page on the screen
        const topPage = viewableItems[0].item as MushafPageData;
        if (topPage && topPage.verses && topPage.verses.length > 0) {
          // Grab the first verse of the visible page
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
        itemVisiblePercentThreshold: 50, // trigger when 50% of the page is visible
        minimumViewTime: 500, // require page to be visible for 500ms before triggering
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
