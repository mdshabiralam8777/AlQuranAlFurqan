import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Spacing } from "../../constants/spacing";
import { useAppTheme } from "../../context/ThemeContext";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import { useAudioStore } from "../../store/audioStore";
import { useSettingsStore } from "../../store/settingsStore";
import DownloadButton from "../quran/DownloadButton";
import { ThemedText } from "../ui/ThemedText";
import { ThemedView } from "../ui/ThemedView";

interface FullPlayerProps {
  onClose: () => void;
}

export default function FullPlayer({ onClose }: FullPlayerProps) {
  const {
    currentVerseKey,
    position,
    duration,
    isPlaying,
    play,
    pause,
    skipNext,
    skipPrev,
  } = useAudioPlayer();
  const { currentChapterId } = useAudioStore();
  const { reciterId, reciterName } = useSettingsStore();
  const { colors } = useAppTheme();

  const progress = duration > 0 ? (position / duration) * 100 : 0;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons
              name="chevron-down"
              size={32}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Now Playing</ThemedText>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.artworkContainer}>
          <Ionicons
            name="musical-notes-outline"
            size={80}
            color={colors.gold}
          />
        </View>

        <View style={styles.infoContainer}>
          <ThemedText style={styles.title}>
            Surah {currentChapterId || "Unknown"}
          </ThemedText>
          <ThemedText
            style={[styles.subtitle, { color: colors.textSecondary }]}
          >
            Ayah {currentVerseKey?.split(":")[1] || "Unknown"}
          </ThemedText>

          <View style={styles.reciterRow}>
            <ThemedText
              style={{
                color: colors.gold,
                marginTop: Spacing.sm,
                fontSize: 16,
              }}
            >
              {reciterName}
            </ThemedText>
          </View>

          {currentChapterId && (
            <View style={styles.downloadRow}>
              <DownloadButton
                chapterId={currentChapterId}
                reciterId={reciterId}
                size={28}
                color={colors.gold}
              />
            </View>
          )}
        </View>

        <View style={styles.playbackContainer}>
          <View style={styles.progressRow}>
            <ThemedText
              style={[styles.timeText, { color: colors.textSecondary }]}
            >
              {formatTime(position)}
            </ThemedText>
            <View
              style={[styles.progressBarBg, { backgroundColor: colors.border }]}
            >
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${progress}%`, backgroundColor: colors.gold },
                ]}
              />
            </View>
            <ThemedText
              style={[styles.timeText, { color: colors.textSecondary }]}
            >
              {formatTime(duration)}
            </ThemedText>
          </View>

          <View style={styles.controlsRow}>
            <TouchableOpacity onPress={skipPrev} style={styles.controlButton}>
              <Ionicons name="play-back" size={36} color={colors.textPrimary} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={isPlaying ? pause : play}
              style={[styles.playButton, { backgroundColor: colors.gold }]}
            >
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={40}
                color={colors.bgPrimary}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={skipNext} style={styles.controlButton}>
              <Ionicons
                name="play-forward"
                size={36}
                color={colors.textPrimary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.md,
  },
  closeButton: {
    padding: Spacing.xs,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  placeholder: {
    width: 40,
  },
  artworkContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: Spacing["2xl"],
  },
  infoContainer: {
    alignItems: "center",
    marginBottom: Spacing["2xl"],
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: 18,
  },
  reciterRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  downloadRow: {
    marginTop: Spacing.lg,
  },
  playbackContainer: {
    paddingBottom: Spacing["2xl"],
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  timeText: {
    fontSize: 12,
    width: 45,
    textAlign: "center",
  },
  progressBarBg: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginHorizontal: Spacing.sm,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 2,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing["2xl"],
  },
  controlButton: {
    padding: Spacing.sm,
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },
});
