import * as FileSystem from "expo-file-system";

const AUDIO_DIR = `${FileSystem.documentDirectory}audio/`;

// Ensure the audio directory exists
export const initDownloadManager = async () => {
  const dirInfo = await FileSystem.getInfoAsync(AUDIO_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(AUDIO_DIR, { intermediates: true });
  }
};

// Returns the full expected local path for a given verse & reciter
export const getLocalAudioPath = (
  verseKey: string,
  reciterId: number,
): string => {
  // format: [reciterId]_[verseKey].mp3, e.g., 2_1:1.mp3
  return `${AUDIO_DIR}${reciterId}_${verseKey}.mp3`;
};

// Checks if a file is already downloaded
export const isDownloaded = async (
  verseKey: string,
  reciterId: number,
): Promise<boolean> => {
  const path = getLocalAudioPath(verseKey, reciterId);
  const info = await FileSystem.getInfoAsync(path);
  return info.exists;
};

// Downloads an audio file with progress tracking
export const downloadAudioFile = async (
  url: string,
  verseKey: string,
  reciterId: number,
  onProgress?: (progress: number) => void,
): Promise<string> => {
  await initDownloadManager();
  const destPath = getLocalAudioPath(verseKey, reciterId);

  // If already downloaded, just return the path
  const exists = await isDownloaded(verseKey, reciterId);
  if (exists) {
    if (onProgress) onProgress(1);
    return destPath;
  }

  const downloadResumable = FileSystem.createDownloadResumable(
    url,
    destPath,
    {},
    (downloadProgress) => {
      const progress =
        downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite;
      if (onProgress) onProgress(progress);
    },
  );

  try {
    const result = await downloadResumable.downloadAsync();
    if (!result) throw new Error("Download failed");
    return result.uri;
  } catch (error) {
    console.error(
      `Error downloading ${verseKey} for reciter ${reciterId}:`,
      error,
    );
    throw error;
  }
};

// Deletes all cached audio files for a specific chapter and reciter
export const deleteChapterDownloads = async (
  chapterId: number,
  reciterId: number,
) => {
  const dirInfo = await FileSystem.getInfoAsync(AUDIO_DIR);
  if (!dirInfo.exists) return;

  const files = await FileSystem.readDirectoryAsync(AUDIO_DIR);
  // verseKey is usually `${chapterId}:${verseNumber}`, so it starts with `${chapterId}:`
  const prefix = `${reciterId}_${chapterId}:`;

  const deletePromises = files
    .filter((file) => file.startsWith(prefix) && file.endsWith(".mp3"))
    .map((file) =>
      FileSystem.deleteAsync(`${AUDIO_DIR}${file}`, { idempotent: true }),
    );

  await Promise.all(deletePromises);
};

// Returns total bytes used by a chapter for a specific reciter
export const getDownloadSize = async (
  chapterId: number,
  reciterId: number,
): Promise<number> => {
  const dirInfo = await FileSystem.getInfoAsync(AUDIO_DIR);
  if (!dirInfo.exists) return 0;

  const files = await FileSystem.readDirectoryAsync(AUDIO_DIR);
  const prefix = `${reciterId}_${chapterId}:`;

  let totalSize = 0;
  for (const file of files) {
    if (file.startsWith(prefix) && file.endsWith(".mp3")) {
      const info = await FileSystem.getInfoAsync(`${AUDIO_DIR}${file}`);
      if (info.exists && !info.isDirectory) {
        totalSize += info.size || 0;
      }
    }
  }

  return totalSize;
};
