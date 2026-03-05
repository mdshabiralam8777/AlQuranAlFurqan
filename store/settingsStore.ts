import { zustandStorage } from "@/services/storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ScriptStyle = "uthmani" | "imlaei";

interface SettingsState {
  // Font Size
  arabicFontSize: number;
  translationFontSize: number;
  setArabicFontSize: (size: number) => void;
  setTranslationFontSize: (size: number) => void;

  // Reading Preferences
  scriptStyle: ScriptStyle;
  setScriptStyle: (style: ScriptStyle) => void;

  // Audio Preferences
  reciterId: number;
  reciterName: string;
  setReciter: (id: number, name: string) => void;
  autoPlayNextVerse: boolean;
  setAutoPlayNextVerse: (val: boolean) => void;

  // Translation Preferences
  translationId: number;
  translationName: string;
  setTranslation: (id: number, name: string) => void;

  // App Language
  appLanguage: "en" | "ar" | "ur";
  setAppLanguage: (lang: "en" | "ar" | "ur") => void;

  // UI Toggles
  showRecitationControls: boolean;
  setShowRecitationControls: (val: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      arabicFontSize: 32,
      translationFontSize: 16,
      setArabicFontSize: (size) => set({ arabicFontSize: size }),
      setTranslationFontSize: (size) => set({ translationFontSize: size }),

      scriptStyle: "uthmani",
      setScriptStyle: (style) => set({ scriptStyle: style }),

      reciterId: 7,
      reciterName: "Mishary Rashid Al-Afasy",
      setReciter: (id, name) => set({ reciterId: id, reciterName: name }),

      autoPlayNextVerse: true,
      setAutoPlayNextVerse: (val) => set({ autoPlayNextVerse: val }),

      translationId: 20,
      translationName: "Sahih International",
      setTranslation: (id, name) =>
        set({ translationId: id, translationName: name }),

      appLanguage: "en",
      setAppLanguage: (lang) => set({ appLanguage: lang }),

      showRecitationControls: true,
      setShowRecitationControls: (val) => set({ showRecitationControls: val }),
    }),
    {
      name: "aqaf-settings",
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        arabicFontSize: state.arabicFontSize,
        translationFontSize: state.translationFontSize,
        scriptStyle: state.scriptStyle,
        reciterId: state.reciterId,
        reciterName: state.reciterName,
        autoPlayNextVerse: state.autoPlayNextVerse,
        translationId: state.translationId,
        translationName: state.translationName,
        appLanguage: state.appLanguage,
        showRecitationControls: state.showRecitationControls,
      }),
    },
  ),
);
