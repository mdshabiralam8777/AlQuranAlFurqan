import { create } from "zustand";
import { PlaybackTrack } from "../types/audio";

interface AudioState {
  isPlaying: boolean;
  currentVerseKey: string | null;
  currentChapterId: number | null;
  currentRecitationId: number | null;
  duration: number;
  position: number;
  isBuffering: boolean;
  queue: PlaybackTrack[];

  setPlaying: (isPlaying: boolean) => void;
  setCurrentTrack: (verseKey: string, chapterId: number) => void;
  updateProgress: (position: number, duration: number) => void;
  setBuffering: (isBuffering: boolean) => void;
  reset: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  isPlaying: false,
  currentVerseKey: null,
  currentChapterId: null,
  currentRecitationId: null,
  duration: 0,
  position: 0,
  isBuffering: false,
  queue: [],

  setPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTrack: (verseKey, chapterId) =>
    set({ currentVerseKey: verseKey, currentChapterId: chapterId }),
  updateProgress: (position, duration) => set({ position, duration }),
  setBuffering: (isBuffering) => set({ isBuffering }),
  reset: () =>
    set({
      isPlaying: false,
      currentVerseKey: null,
      currentChapterId: null,
      duration: 0,
      position: 0,
      isBuffering: false,
      queue: [],
    }),
}));
