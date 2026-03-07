import { FlashList } from "@shopify/flash-list";
import React, { useRef } from "react";

import { AyahRow, VerseData } from "@/components/quran/AyahRow";
import { Spacing } from "@/constants/spacing";
import { Chapter, Verse } from "@/services/quranApi";
import { Bookmark } from "@/store/bookmarkStore";
import { useLastReadStore } from "@/store/lastReadStore";
import { useSettingsStore } from "@/store/settingsStore";

const TypedFlashList = FlashList as any;

interface TranslationListProps {
  verses: Verse[];
  chapter?: Chapter;
  translationMap: Map<string, string>;
  isBookmarked: (verseKey: string) => boolean;
  onBookmark: (verse: VerseData) => void;
  ListHeaderComponent: React.ReactElement | null;
  initialVerse?: number;
  bookmarks?: Bookmark[];
  onPlay?: (verse: VerseData) => void;
  playingVerseKey?: string | null;
}

export function TranslationList({
  verses,
  chapter,
  translationMap,
  isBookmarked,
  onBookmark,
  ListHeaderComponent,
  initialVerse,
  bookmarks,
  onPlay,
  playingVerseKey,
}: TranslationListProps) {
  const listRef = useRef<any>(null);
  const { setLastRead } = useLastReadStore();
  const { arabicFontSize, translationFontSize, scriptStyle } =
    useSettingsStore();

  const renderItem = ({ item }: { item: Verse }) => {
    const translationText =
      translationMap.get(item.verse_key) ?? "Loading translation…";

    return (
      <AyahRow
        verse={{
          id: item.id,
          verseKey: item.verse_key,
          textUthmani:
            scriptStyle === "uthmani"
              ? item.text_uthmani || item.text_imlaei || ""
              : item.text_imlaei || item.text_uthmani || "",
          translationText,
          isSajdah: !!item.sajdah_number,
        }}
        arabicFontSize={arabicFontSize}
        translationFontSize={translationFontSize}
        isBookmarked={isBookmarked(item.verse_key)}
        onBookmark={onBookmark}
        onPlay={onPlay}
        isPlaying={playingVerseKey === item.verse_key}
        showTranslation={true}
        viewMode="translation"
      />
    );
  };

  return (
    <TypedFlashList
      ref={listRef}
      data={verses}
      renderItem={renderItem}
      keyExtractor={(item: any) => item.id.toString()}
      ListHeaderComponent={ListHeaderComponent}
      estimatedItemSize={200}
      extraData={`${arabicFontSize}-${translationFontSize}-${scriptStyle}-${bookmarks?.length ?? 0}-${playingVerseKey}-${bookmarks?.map((b) => b.verseKey).join(",")}`}
      contentContainerStyle={{ paddingBottom: Spacing.xxl }}
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={({ viewableItems }: any) => {
        if (!chapter || viewableItems.length === 0) return;
        // The first viewable item is typically the topmost one on the screen
        const topItem = viewableItems[0].item as Verse;
        if (topItem && topItem.verse_number) {
          setLastRead({
            surahId: chapter.id,
            surahNameEng: chapter.translated_name.name,
            surahNameArabic: chapter.name_arabic,
            ayahNumber: topItem.verse_number,
          });
        }
      }}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50, // trigger when 50% of the item is visible
        minimumViewTime: 500, // require item to be visible for 500ms before triggering
      }}
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
