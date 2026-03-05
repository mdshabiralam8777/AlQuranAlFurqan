import { zustandStorage } from "@/services/storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface LastReadData {
  surahId: number;
  surahNameEng: string;
  surahNameArabic: string;
  ayahNumber: number;
  pageNumber?: number; // Optional: useful for mushaf view tracking if needed later
}

interface LastReadState {
  lastRead: LastReadData;
  setLastRead: (data: LastReadData) => void;
  clearLastRead: () => void;
}

export const useLastReadStore = create<LastReadState>()(
  persist(
    (set) => ({
      lastRead: {
        surahId: 1,
        surahNameEng: "Al-Fatihah",
        surahNameArabic: "الفاتحة",
        ayahNumber: 2,
      },
      setLastRead: (data) => set({ lastRead: data }),
      clearLastRead: () =>
        set({
          lastRead: {
            surahId: 1,
            surahNameEng: "Al-Fatihah",
            surahNameArabic: "الفاتحة",
            ayahNumber: 2,
          },
        }),
    }),
    {
      name: "aqaf-last-read",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
