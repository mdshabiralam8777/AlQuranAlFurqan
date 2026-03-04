import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Platform } from "react-native";

// The base URL must point to our Express backend proxy, not the Quran API directly.
// This is injected via .env.local during the Expo build.
const getBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_API_BASE_URL) {
    return process.env.EXPO_PUBLIC_API_BASE_URL;
  }
  // Android emulator needs 10.0.2.2 to reach the Mac's localhost
  if (Platform.OS === "android") {
    return "http://10.0.2.2:3001/api";
  }
  return "http://localhost:3001/api";
};

const API_BASE_URL = getBaseUrl();

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// --- Types ---

export interface TranslatedName {
  language_name: string;
  name: string;
}

export interface Chapter {
  id: number;
  revelation_place: "makkah" | "madinah";
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: number[];
  translated_name: TranslatedName;
}

export interface ChaptersResponse {
  chapters: Chapter[];
}

export interface Verse {
  id: number;
  verse_number: number;
  verse_key: string;
  juz_number: number;
  hizb_number: number;
  rub_el_hizb_number: number;
  ruku_number: number;
  manzil_number: number;
  sajdah_number: number | null;
  page_number: number;
  text_uthmani?: string;
  text_imlaei?: string;
}

export interface VersesResponse {
  verses: Verse[];
  pagination: {
    per_page: number;
    current_page: number;
    next_page: number | null;
    total_pages: number;
    total_records: number;
  };
}

// --- API Service Methods ---

const quranApi = {
  getChapters: async (): Promise<Chapter[]> => {
    const { data } = await apiClient.get<ChaptersResponse>("/chapters");
    return data.chapters;
  },

  getVersesByChapter: async (chapterId: number | string): Promise<Verse[]> => {
    // Request both Uthmani script (Quran standard) and Imlaei (Plain Arabic)
    const { data } = await apiClient.get<VersesResponse>(
      `/verses/by_chapter/${chapterId}`,
      {
        params: {
          fields: "text_uthmani,text_imlaei",
          per_page: 300, // Fetch up to 300 verses at once to get the whole Surah (Al-Baqarah max is 286)
        },
      },
    );
    return data.verses;
  },
};

// --- TanStack Query Hooks ---

export const useChapters = () => {
  return useQuery({
    queryKey: ["chapters"],
    queryFn: quranApi.getChapters,
    staleTime: Infinity, // Surah metadata never changes
  });
};

export const useVersesByChapter = (chapterId: number | string) => {
  return useQuery({
    queryKey: ["verses", "chapter", chapterId.toString()],
    queryFn: () => quranApi.getVersesByChapter(chapterId),
    enabled: !!chapterId,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export default quranApi;
