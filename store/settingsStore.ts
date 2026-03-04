import { create } from "zustand";

// In future phases, we will add MMKV persistence here.
// For now, it's just an in-memory Zustand store.

type ThemeMode = "light" | "dark" | "amoled";
type ScriptStyle = "uthmani" | "imlaei";

interface SettingsState {
  // Theme & Appearance
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;

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
  setReciterId: (id: number) => void;
  autoPlayNextVerse: boolean;
  setAutoPlayNextVerse: (val: boolean) => void;

  // UI Toggles
  showRecitationControls: boolean;
  setShowRecitationControls: (val: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  theme: "dark", // default to dark matching our initial design sprint
  setTheme: (theme) => set({ theme }),

  arabicFontSize: 32,
  translationFontSize: 16,
  setArabicFontSize: (size) => set({ arabicFontSize: size }),
  setTranslationFontSize: (size) => set({ translationFontSize: size }),

  scriptStyle: "uthmani",
  setScriptStyle: (style) => set({ scriptStyle: style }),

  reciterId: 7, // Mishary Rashid Alafasy default
  setReciterId: (id) => set({ reciterId: id }),

  autoPlayNextVerse: true,
  setAutoPlayNextVerse: (val) => set({ autoPlayNextVerse: val }),

  showRecitationControls: true,
  setShowRecitationControls: (val) => set({ showRecitationControls: val }),
}));
