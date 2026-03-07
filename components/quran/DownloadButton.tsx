import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/colors";
import { downloadAudioFile } from "../../services/downloadManager";
import { useRecitationsByChapter } from "../../services/quranApi";
import { useDownloadStore } from "../../store/downloadStore";
import { DownloadState } from "../../types/audio";

interface DownloadButtonProps {
  chapterId: number;
  reciterId: number;
  color?: string;
  size?: number;
}

export default function DownloadButton({
  chapterId,
  reciterId,
  color,
  size = 24,
}: DownloadButtonProps) {
  const iconColor = color || Colors.light.tint;

  const { data: recitations } = useRecitationsByChapter(reciterId, chapterId);
  const {
    startDownload,
    updateProgress,
    completeDownload,
    setError,
    getChapterProgress,
  } = useDownloadStore();

  const progressObj = getChapterProgress(chapterId.toString(), reciterId);
  const state = progressObj?.state || DownloadState.IDLE;

  const handleDownload = async () => {
    if (
      state === DownloadState.DOWNLOADING ||
      state === DownloadState.DOWNLOADED
    ) {
      return;
    }

    if (!recitations || recitations.length === 0) {
      console.warn("No audio files available for download");
      return;
    }

    startDownload(chapterId.toString(), reciterId);

    try {
      const totalFiles = recitations.length;
      let downloadedCount = 0;

      // Ensure API returns .mp3 file URLs natively or hosted on CDN.
      for (const file of recitations) {
        await downloadAudioFile(
          file.audio_url,
          file.verse_key,
          reciterId,
          (progress) => {
            const overallProgress = (downloadedCount + progress) / totalFiles;
            updateProgress(chapterId.toString(), reciterId, overallProgress);
          },
        );
        downloadedCount++;
        updateProgress(
          chapterId.toString(),
          reciterId,
          downloadedCount / totalFiles,
        );
      }

      completeDownload(chapterId.toString(), reciterId, "");
    } catch (error) {
      setError(chapterId.toString(), reciterId);
    }
  };

  if (state === DownloadState.DOWNLOADING) {
    return (
      <View
        style={{
          width: size,
          height: size,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="small" color={iconColor} />
      </View>
    );
  }

  if (state === DownloadState.DOWNLOADED) {
    return (
      <View
        style={{
          width: size,
          height: size,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="checkmark-circle" size={size} color={iconColor} />
      </View>
    );
  }

  if (state === DownloadState.ERROR) {
    return (
      <TouchableOpacity
        onPress={handleDownload}
        accessibilityLabel="Retry download"
      >
        <Ionicons name="alert-circle" size={size} color="#DC2626" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={handleDownload}
      disabled={!recitations}
      accessibilityLabel="Download chapter audio"
    >
      <Ionicons
        name="cloud-download-outline"
        size={size}
        color={!recitations ? "#9CA3AF" : iconColor}
      />
    </TouchableOpacity>
  );
}
