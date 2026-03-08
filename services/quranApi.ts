import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Platform } from "react-native";
import {
  AudioFile,
  RecitationsResponse,
  Reciter,
  RecitersResponse,
} from "../types/audio";

// The base URL must point to our Express backend proxy, not the Quran API directly.
// This is injected via .env.local during the Expo build.
const getBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_API_BASE_URL) {
    return process.env.EXPO_PUBLIC_API_BASE_URL;
  }

  // If no environment variable is provided, default to the production URL
  if (!__DEV__) {
    return "https://alquranalfurqan.onrender.com/api";
  }

  // Fallbacks for local development when env vars are missing
  if (Platform.OS === "android") {
    return "http://10.0.2.2:3001/api"; // Android Emulator
  }
  return "http://localhost:3001/api"; // iOS Simulator / Web
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

// --- Translation Types ---

export interface Translation {
  id: number;
  name: string;
  author_name: string;
  slug: string;
  language_name: string;
  translated_name: TranslatedName;
}

export interface TranslationsListResponse {
  translations: Translation[];
}

export interface TranslationText {
  id: number;
  resource_id: number;
  text: string;
  verse_key: string;
  verse_number: number;
  chapter_id: number;
  juz_number: number;
  language_name: string;
}

export interface TranslationByChapterResponse {
  translations: TranslationText[];
  meta: {
    translation_name: string;
    author_name: string;
  };
}

/** Default translation — Saheeh International (most widely used English) */
export const DEFAULT_TRANSLATION_ID = 20;

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

  getTranslationsList: async (): Promise<Translation[]> => {
    const { data } =
      await apiClient.get<TranslationsListResponse>("/translations/list");
    return data.translations;
  },

  getTranslationsByChapter: async (
    translationId: number,
    chapterId: number | string,
  ): Promise<TranslationText[]> => {
    const { data } = await apiClient.get<TranslationByChapterResponse>(
      `/translations/${translationId}/by_chapter/${chapterId}`,
      {
        params: {
          fields: "verse_key,verse_number,chapter_id",
          per_page: 300, // Fetch all verses at once (Al-Baqarah max is 286)
        },
      },
    );
    return data.translations;
  },

  getReciters: async (): Promise<Reciter[]> => {
    const { data } = await apiClient.get<RecitersResponse>("/audio/reciters");
    return data.recitations;
  },

  getRecitationsByChapter: async (
    recitationId: number,
    chapterNumber: number | string,
  ): Promise<AudioFile[]> => {
    const { data } = await apiClient.get<RecitationsResponse>(
      `/audio/recitations/${recitationId}/by_chapter/${chapterNumber}`,
    );

    // Normalize audio URLs
    const audioFiles = data.audio_files.map((file: any) => {
      let rawUrl = file.audio_url || file.url;
      if (rawUrl && !rawUrl.startsWith("http") && !rawUrl.startsWith("//")) {
        // Prepend the standard Quran.com audio CDN if it's a relative path
        rawUrl = `https://verses.quran.com/${rawUrl}`;
      }
      return {
        ...file,
        audio_url: rawUrl,
      };
    });

    return audioFiles as AudioFile[];
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

export const useTranslationsList = () => {
  return useQuery({
    queryKey: ["translations", "list"],
    queryFn: quranApi.getTranslationsList,
    staleTime: Infinity, // Available translations don't change
  });
};

export const useTranslationsByChapter = (
  translationId: number,
  chapterId: number | string,
) => {
  return useQuery({
    queryKey: [
      "translations",
      translationId.toString(),
      "chapter",
      chapterId.toString(),
    ],
    queryFn: () => quranApi.getTranslationsByChapter(translationId, chapterId),
    enabled: !!chapterId && !!translationId,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours — translations are static
  });
};

export const useReciters = () => {
  return useQuery({
    queryKey: ["audio", "reciters"],
    queryFn: quranApi.getReciters,
    staleTime: Infinity,
  });
};

export const useRecitationsByChapter = (
  recitationId: number,
  chapterNumber: number | string,
) => {
  return useQuery({
    queryKey: [
      "audio",
      "recitations",
      recitationId.toString(),
      "chapter",
      chapterNumber.toString(),
    ],
    queryFn: () =>
      quranApi.getRecitationsByChapter(recitationId, chapterNumber),
    enabled: !!recitationId && !!chapterNumber,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};

export default quranApi;
