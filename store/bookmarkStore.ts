/**
 * bookmarkStore — Zustand store for verse bookmarks with AsyncStorage persistence.
 *
 * Each bookmark captures the verse key, Arabic text, translation snippet,
 * and the Surah name for display in the Bookmarks tab.
 *
 * Usage:
 *   const { bookmarks, isBookmarked, toggleBookmark } = useBookmarkStore();
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface Bookmark {
  verseKey: string; // e.g. "2:255"
  textUthmani: string;
  translationText?: string;
  surahName: string; // e.g. "Al-Baqarah"
  source: "mushaf" | "translation"; // which mode the bookmark was created from
  timestamp: number; // Date.now()
}

interface BookmarkState {
  bookmarks: Bookmark[];

  /** Check if a specific verse is bookmarked */
  isBookmarked: (verseKey: string) => boolean;

  /** Add if not present, remove if already bookmarked */
  toggleBookmark: (bookmark: Omit<Bookmark, "timestamp">) => void;

  /** Remove a specific bookmark by verse key */
  removeBookmark: (verseKey: string) => void;

  /** Clear all bookmarks */
  clearAll: () => void;

  /** Check if a specific Chapter or Juz is bookmarked */
  isChapterBookmarked: (id: string, type: "chapter" | "juz") => boolean;

  /** Add if not present, remove if already bookmarked for Chapter or Juz */
  toggleChapterBookmark: (
    id: string,
    type: "chapter" | "juz",
    bookmarkData: Omit<Bookmark, "verseKey" | "timestamp">,
  ) => void;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],

      isBookmarked: (verseKey: string) => {
        return get().bookmarks.some((b) => b.verseKey === verseKey);
      },

      toggleBookmark: (bookmark) => {
        const existing = get().bookmarks;
        const index = existing.findIndex(
          (b) => b.verseKey === bookmark.verseKey,
        );

        if (index !== -1) {
          // Remove existing bookmark
          set({
            bookmarks: existing.filter((b) => b.verseKey !== bookmark.verseKey),
          });
        } else {
          // Add new bookmark (newest first)
          set({
            bookmarks: [{ ...bookmark, timestamp: Date.now() }, ...existing],
          });
        }
      },

      removeBookmark: (verseKey: string) => {
        set({
          bookmarks: get().bookmarks.filter((b) => b.verseKey !== verseKey),
        });
      },

      clearAll: () => {
        set({ bookmarks: [] });
      },

      isChapterBookmarked: (id: string, type: "chapter" | "juz") => {
        const key = `${type}:${id}`;
        return get().bookmarks.some((b) => b.verseKey === key);
      },

      toggleChapterBookmark: (
        id: string,
        type: "chapter" | "juz",
        bookmarkData,
      ) => {
        const key = `${type}:${id}`;
        const existing = get().bookmarks;
        const index = existing.findIndex((b) => b.verseKey === key);

        if (index !== -1) {
          set({
            bookmarks: existing.filter((b) => b.verseKey !== key),
          });
        } else {
          set({
            bookmarks: [
              { ...bookmarkData, verseKey: key, timestamp: Date.now() },
              ...existing,
            ],
          });
        }
      },
    }),
    {
      name: "aqaf-bookmarks",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
