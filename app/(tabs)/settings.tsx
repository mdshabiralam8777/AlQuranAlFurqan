import React from "react";
import { Pressable, ScrollView, StyleSheet, Switch, View } from "react-native";

import { SettingsRow } from "@/components/settings/SettingsRow";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { NavyHeader, ThemedText, ThemedView } from "@/components/ui";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Spacing } from "@/constants/spacing";
import { BorderRadius } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import { useSettingsStore } from "@/store/settingsStore";

export default function SettingsScreen() {
  const { colors } = useAppTheme();

  // Connect to Zustand store
  const {
    theme,
    setTheme,
    arabicFontSize,
    setArabicFontSize,
    scriptStyle,
    setScriptStyle,
    autoPlayNextVerse,
    setAutoPlayNextVerse,
    showRecitationControls,
    setShowRecitationControls,
  } = useSettingsStore();

  return (
    <ThemedView style={styles.container} layer="primary">
      <NavyHeader />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* SECTION: Display & Typography */}
        <SettingsSection title="Display & Typography">
          {/* Theme */}
          <SettingsRow icon="moon.circle.fill" label="Theme">
            <View style={styles.segmentedControl}>
              {(["light", "dark", "amoled"] as const).map((t) => (
                <Pressable
                  key={t}
                  style={[
                    styles.segmentBtn,
                    theme === t && { backgroundColor: colors.gold },
                  ]}
                  onPress={() => setTheme(t)}
                >
                  <ThemedText
                    role="caption"
                    color={
                      theme === t ? colors.navyPrimary : colors.textSecondary
                    }
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </SettingsRow>

          {/* Script Style */}
          <SettingsRow icon="character.book.closed.fill" label="Script Style">
            <View style={styles.segmentedControl}>
              <Pressable
                style={[
                  styles.segmentBtn,
                  scriptStyle === "uthmani" && { backgroundColor: colors.gold },
                ]}
                onPress={() => setScriptStyle("uthmani")}
              >
                <ThemedText
                  role="caption"
                  color={
                    scriptStyle === "uthmani"
                      ? colors.navyPrimary
                      : colors.textSecondary
                  }
                >
                  Uthmani
                </ThemedText>
              </Pressable>
              <Pressable
                style={[
                  styles.segmentBtn,
                  scriptStyle === "imlaei" && { backgroundColor: colors.gold },
                ]}
                onPress={() => setScriptStyle("imlaei")}
              >
                <ThemedText
                  role="caption"
                  color={
                    scriptStyle === "imlaei"
                      ? colors.navyPrimary
                      : colors.textSecondary
                  }
                >
                  Imlaei
                </ThemedText>
              </Pressable>
            </View>
          </SettingsRow>

          {/* Font Size Stepper */}
          <SettingsRow icon="textformat.size" label="Arabic Font Size" isLast>
            <View style={styles.stepperControl}>
              <Pressable
                style={[
                  styles.stepperBtn,
                  { backgroundColor: colors.bgPrimary },
                ]}
                onPress={() =>
                  setArabicFontSize(Math.max(20, arabicFontSize - 4))
                }
              >
                <IconSymbol name="minus" size={16} color={colors.textPrimary} />
              </Pressable>
              <ThemedText style={styles.stepperValue}>
                {arabicFontSize}
              </ThemedText>
              <Pressable
                style={[
                  styles.stepperBtn,
                  { backgroundColor: colors.bgPrimary },
                ]}
                onPress={() =>
                  setArabicFontSize(Math.min(64, arabicFontSize + 4))
                }
              >
                <IconSymbol name="plus" size={16} color={colors.textPrimary} />
              </Pressable>
            </View>
          </SettingsRow>
        </SettingsSection>

        {/* SECTION: Audio & Playback */}
        <SettingsSection title="Audio & Playback">
          <SettingsRow icon="play.circle.fill" label="Auto-play Next Ayah">
            <Switch
              value={autoPlayNextVerse}
              onValueChange={setAutoPlayNextVerse}
              trackColor={{ false: colors.separator, true: colors.gold }}
              thumbColor={
                autoPlayNextVerse ? colors.bgPrimary : colors.textSecondary
              }
            />
          </SettingsRow>

          <SettingsRow
            icon="slider.horizontal.3"
            label="Show Inline Controls"
            isLast
          >
            <Switch
              value={showRecitationControls}
              onValueChange={setShowRecitationControls}
              trackColor={{ false: colors.separator, true: colors.gold }}
              thumbColor={
                showRecitationControls ? colors.bgPrimary : colors.textSecondary
              }
            />
          </SettingsRow>
        </SettingsSection>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.lg,
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.1)", // fallback transparent darker/lighter
    borderRadius: BorderRadius.sm,
    padding: 2,
  },
  segmentBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  stepperControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepperBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  stepperValue: {
    width: 40,
    textAlign: "center",
    fontWeight: "600",
  },
});
