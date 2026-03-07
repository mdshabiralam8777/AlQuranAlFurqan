import { Track } from "react-native-track-player";

export interface Reciter {
  id: number;
  reciter_name: string;
  style?: string;
}

export interface AudioFile {
  id: number;
  chapter_id: number;
  verse_key: string;
  audio_url: string;
  format: string;
  duration?: number;
}

export interface RecitationsResponse {
  audio_files: AudioFile[];
}

export interface RecitersResponse {
  recitations: Reciter[];
}

export enum DownloadState {
  IDLE = "idle",
  DOWNLOADING = "downloading",
  DOWNLOADED = "downloaded",
  ERROR = "error",
}

export interface DownloadProgress {
  chapterKey: string; // e.g., "1" for Surah Al-Fatiha
  reciterId: number;
  progress: number; // 0 to 1
  state: DownloadState;
  filePath?: string;
}

export interface PlaybackTrack extends Track {
  verseKey: string;
  chapterId: number;
  verseNumber: number;
}
