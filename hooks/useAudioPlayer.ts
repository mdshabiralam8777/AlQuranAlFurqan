import { useEffect } from "react";
import TrackPlayer, {
  Event,
  State,
  useProgress,
  useTrackPlayerEvents,
} from "react-native-track-player";
import { audioService } from "../services/audioService";
import { useAudioStore } from "../store/audioStore";

const events = [
  Event.PlaybackState,
  Event.PlaybackActiveTrackChanged,
  Event.PlaybackError,
];

export const useAudioPlayer = () => {
  const {
    isPlaying,
    currentVerseKey,
    position,
    duration,
    isBuffering,
    setPlaying,
    setCurrentTrack,
    updateProgress,
    setBuffering,
  } = useAudioStore();

  // Provide fallback progress if TrackPlayer hooks aren't ready
  let progress = { position: 0, duration: 0, buffered: 0 };
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    progress = useProgress();
  } catch (err) {
    // Ignore early initialization errors
  }

  useEffect(() => {
    updateProgress(progress.position, progress.duration);
  }, [progress.position, progress.duration, updateProgress]);

  // Wrap the event listener in a try-catch to prevent early native call crashes
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTrackPlayerEvents(events, async (event: any) => {
      if (event.type === Event.PlaybackState) {
        if (event.state === State.Playing) {
          setPlaying(true);
          setBuffering(false);
        } else if (
          event.state === State.Paused ||
          event.state === State.Stopped
        ) {
          setPlaying(false);
          setBuffering(false);
        } else if (
          event.state === State.Buffering ||
          event.state === State.Loading
        ) {
          setBuffering(true);
        }
      }

      if (event.type === Event.PlaybackActiveTrackChanged) {
        const index = event.index;
        if (index !== undefined && index !== null) {
          const track = await TrackPlayer.getTrack(index);
          if (track) {
            setCurrentTrack(
              track.verseKey as string,
              track.chapterId as number,
            );
          }
        }
      }

      if (event.type === Event.PlaybackError) {
        console.error("TrackPlayer Error:", event.error);
      }
    });
  } catch (err) {
    // Ignore early initialization errors
  }

  return {
    isPlaying,
    currentVerseKey,
    position,
    duration,
    isBuffering,
    play: () => audioService.play(),
    pause: () => audioService.pause(),
    skipNext: () => audioService.skipToNext(),
    skipPrev: () => audioService.skipToPrevious(),
    stop: () => audioService.stop(),
    loadChapterQueue: (
      chapterId: number,
      recitationId: number,
      startVerseNumber?: number,
    ) =>
      audioService.loadChapterQueue(chapterId, recitationId, startVerseNumber),
  };
};
