import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { Spacing } from "../../constants/spacing";
import { useAppTheme } from "../../context/ThemeContext";
import { useAudioPlayer } from "../../hooks/useAudioPlayer";
import { ThemedText } from "../ui/ThemedText";
import FullPlayer from "./FullPlayer";

export default function MiniPlayer() {
  const {
    currentVerseKey,
    position,
    duration,
    isPlaying,
    play,
    pause,
    skipNext,
    isBuffering,
  } = useAudioPlayer();
  const { colors } = useAppTheme();
  const [fullPlayerVisible, setFullPlayerVisible] = useState(false);

  // If no track is playing or loaded, don't show the player
  if (!currentVerseKey) return null;

  const progress = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: colors.bgSecondary,
            borderTopColor: colors.border,
          },
        ]}
        onPress={() => setFullPlayerVisible(true)}
        activeOpacity={0.9}
      >
        <View
          style={[
            styles.progressBarContainer,
            { backgroundColor: colors.border },
          ]}
        >
          <View
            style={[
              styles.progressBar,
              { width: `${progress}%`, backgroundColor: colors.gold },
            ]}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.textContainer}>
            <ThemedText style={styles.title} numberOfLines={1}>
              Ayah {currentVerseKey.split(":")[1] || currentVerseKey}
            </ThemedText>
            <ThemedText
              style={[styles.subtitle, { color: colors.textSecondary }]}
              numberOfLines={1}
            >
              {currentVerseKey}
            </ThemedText>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity
              onPress={isPlaying ? pause : play}
              style={styles.playButton}
            >
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={24}
                color={colors.textPrimary}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={skipNext} style={styles.skipButton}>
              <Ionicons
                name="play-forward"
                size={24}
                color={colors.textPrimary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        visible={fullPlayerVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setFullPlayerVisible(false)}
      >
        <FullPlayer onClose={() => setFullPlayerVisible(false)} />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing.sm,
    borderTopWidth: 1,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  progressBarContainer: {
    height: 3,
    width: "100%",
  },
  progressBar: {
    height: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 12,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
  },
  playButton: {
    padding: Spacing.sm,
  },
  skipButton: {
    padding: Spacing.sm,
  },
});
