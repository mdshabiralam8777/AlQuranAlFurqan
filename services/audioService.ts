import TrackPlayer from "react-native-track-player";
import { PlaybackTrack } from "../types/audio";
import { getLocalAudioPath, isDownloaded } from "./downloadManager";
import quranApi from "./quranApi";

let isSetup = false;

class AudioService {
  async setupPlayer() {
    if (isSetup) return;

    try {
      await TrackPlayer.setupPlayer({
        autoHandleInterruptions: true,
      });

      await TrackPlayer.updateOptions({
        capabilities: [
          0, // Capability.Play
          1, // Capability.Pause
          4, // Capability.SkipToNext
          5, // Capability.SkipToPrevious
          2, // Capability.SeekTo
          3, // Capability.Stop
        ],
      });

      isSetup = true;
    } catch (e) {
      console.warn("Error setting up TrackPlayer:", e);
    }
  }

  async loadChapterQueue(
    chapterId: number,
    recitationId: number,
    startVerseNumber?: number,
  ) {
    if (!isSetup) await this.setupPlayer();

    // Fetch the recitations (audio files)
    const audioFiles = await quranApi.getRecitationsByChapter(
      recitationId,
      chapterId,
    );
    if (!audioFiles || audioFiles.length === 0) return;

    const tracks: PlaybackTrack[] = [];

    // Convert to tracks
    for (let i = 0; i < audioFiles.length; i++) {
      const file = audioFiles[i];
      // Assume verse_key is standard chapterId:verseNumber, we parse verseNumber
      const verseNum = parseInt(file.verse_key.split(":")[1], 10) || i + 1;

      // Check if downloaded
      const downloaded = await isDownloaded(file.verse_key, recitationId);
      const url = downloaded
        ? getLocalAudioPath(file.verse_key, recitationId)
        : file.audio_url;

      tracks.push({
        id: file.verse_key,
        url: url,
        title: `Ayah ${verseNum}`,
        artist: `Reciter ${recitationId}`,
        album: `Surah ${chapterId}`,
        verseKey: file.verse_key,
        chapterId: chapterId,
        verseNumber: verseNum,
      });
    }

    await TrackPlayer.reset();
    // Re-cast to any to satisfy TrackPlayer which wants an array of Tracks
    // but works fine with extended objects on the JS side
    await TrackPlayer.add(tracks as any);

    if (startVerseNumber) {
      // Find track index
      const index = tracks.findIndex((t) => t.verseNumber === startVerseNumber);
      if (index !== -1) {
        await TrackPlayer.skip(index);
      }
    }
  }

  async play() {
    await TrackPlayer.play();
  }

  async pause() {
    await TrackPlayer.pause();
  }

  async stop() {
    await TrackPlayer.stop();
  }

  async skipToNext() {
    await TrackPlayer.skipToNext();
  }

  async skipToPrevious() {
    await TrackPlayer.skipToPrevious();
  }
}

export const audioService = new AudioService();
