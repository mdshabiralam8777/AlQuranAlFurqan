import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DownloadProgress, DownloadState } from "../types/audio";

interface DownloadStore {
  downloads: Record<string, DownloadProgress>;
  startDownload: (chapterKey: string, reciterId: number) => void;
  updateProgress: (
    chapterKey: string,
    reciterId: number,
    progress: number,
  ) => void;
  completeDownload: (
    chapterKey: string,
    reciterId: number,
    filePath: string,
  ) => void;
  setError: (chapterKey: string, reciterId: number) => void;
  removeDownload: (chapterKey: string, reciterId: number) => void;
  isChapterDownloaded: (chapterKey: string, reciterId: number) => boolean;
  getChapterProgress: (
    chapterKey: string,
    reciterId: number,
  ) => DownloadProgress | undefined;
}

const getDownloadKey = (chapterKey: string, reciterId: number) =>
  `${reciterId}:${chapterKey}`;

export const useDownloadStore = create<DownloadStore>()(
  persist(
    (set, get) => ({
      downloads: {},

      startDownload: (chapterKey, reciterId) => {
        const key = getDownloadKey(chapterKey, reciterId);
        set((state) => ({
          downloads: {
            ...state.downloads,
            [key]: {
              chapterKey,
              reciterId,
              progress: 0,
              state: DownloadState.DOWNLOADING,
            },
          },
        }));
      },

      updateProgress: (chapterKey, reciterId, progress) => {
        const key = getDownloadKey(chapterKey, reciterId);
        set((state) => ({
          downloads: {
            ...state.downloads,
            [key]: {
              ...state.downloads[key]!,
              progress,
            },
          },
        }));
      },

      completeDownload: (chapterKey, reciterId, filePath) => {
        const key = getDownloadKey(chapterKey, reciterId);
        set((state) => ({
          downloads: {
            ...state.downloads,
            [key]: {
              chapterKey,
              reciterId,
              progress: 1,
              state: DownloadState.DOWNLOADED,
              filePath,
            },
          },
        }));
      },

      setError: (chapterKey, reciterId) => {
        const key = getDownloadKey(chapterKey, reciterId);
        set((state) => ({
          downloads: {
            ...state.downloads,
            [key]: {
              ...state.downloads[key]!,
              progress: 0,
              state: DownloadState.ERROR,
            },
          },
        }));
      },

      removeDownload: (chapterKey, reciterId) => {
        const key = getDownloadKey(chapterKey, reciterId);
        set((state) => {
          const newDownloads = { ...state.downloads };
          delete newDownloads[key];
          return { downloads: newDownloads };
        });
      },

      isChapterDownloaded: (chapterKey, reciterId) => {
        const key = getDownloadKey(chapterKey, reciterId);
        const download = get().downloads[key];
        return download?.state === DownloadState.DOWNLOADED;
      },

      getChapterProgress: (chapterKey, reciterId) => {
        const key = getDownloadKey(chapterKey, reciterId);
        return get().downloads[key];
      },
    }),
    {
      name: "download-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
