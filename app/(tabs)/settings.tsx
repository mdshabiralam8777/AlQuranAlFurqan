import { NavyHeader, ThemedText, ThemedView } from "@/components/ui";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Spacing } from "@/constants/spacing";
import { BorderRadius } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import { useSettingsStore } from "@/store/settingsStore";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Switch, View } from "react-native";

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
        <ThemedText
          role="label"
          color={colors.gold}
          style={styles.sectionTitle}
        >
          Display & Typography
        </ThemedText>
        <ThemedView
          layer="secondary"
          style={[styles.sectionCard, { borderColor: colors.separator }]}
        >
          {/* Theme */}
          <View
            style={[
              styles.row,
              {
                borderBottomColor: colors.separator,
                borderBottomWidth: StyleSheet.hairlineWidth,
              },
            ]}
          >
            <View style={styles.rowLeft}>
              <IconSymbol
                name="moon.circle.fill"
                size={24}
                color={colors.textSecondary}
              />
              <ThemedText style={styles.rowLabel}>Theme</ThemedText>
            </View>
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
          </View>

          {/* Script Style */}
          <View
            style={[
              styles.row,
              {
                borderBottomColor: colors.separator,
                borderBottomWidth: StyleSheet.hairlineWidth,
              },
            ]}
          >
            <View style={styles.rowLeft}>
              <IconSymbol
                name="character.book.closed.fill"
                size={24}
                color={colors.textSecondary}
              />
              <ThemedText style={styles.rowLabel}>Script Style</ThemedText>
            </View>
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
          </View>

          {/* Font Size Stepper */}
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <IconSymbol
                name="textformat.size"
                size={24}
                color={colors.textSecondary}
              />
              <ThemedText style={styles.rowLabel}>Arabic Font Size</ThemedText>
            </View>
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
          </View>
        </ThemedView>

        {/* SECTION: Audio & Playback */}
        <ThemedText
          role="label"
          color={colors.gold}
          style={styles.sectionTitle}
        >
          Audio & Playback
        </ThemedText>
        <ThemedView
          layer="secondary"
          style={[styles.sectionCard, { borderColor: colors.separator }]}
        >
          <View
            style={[
              styles.row,
              {
                borderBottomColor: colors.separator,
                borderBottomWidth: StyleSheet.hairlineWidth,
              },
            ]}
          >
            <View style={styles.rowLeft}>
              <IconSymbol
                name="play.circle.fill"
                size={24}
                color={colors.textSecondary}
              />
              <ThemedText style={styles.rowLabel}>
                Auto-play Next Ayah
              </ThemedText>
            </View>
            <Switch
              value={autoPlayNextVerse}
              onValueChange={setAutoPlayNextVerse}
              trackColor={{ false: colors.separator, true: colors.gold }}
              thumbColor={
                autoPlayNextVerse ? colors.bgPrimary : colors.textSecondary
              }
            />
          </View>

          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <IconSymbol
                name="slider.horizontal.3"
                size={24}
                color={colors.textSecondary}
              />
              <ThemedText style={styles.rowLabel}>
                Show Inline Controls
              </ThemedText>
            </View>
            <Switch
              value={showRecitationControls}
              onValueChange={setShowRecitationControls}
              trackColor={{ false: colors.separator, true: colors.gold }}
              thumbColor={
                showRecitationControls ? colors.bgPrimary : colors.textSecondary
              }
            />
          </View>
        </ThemedView>
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
  sectionTitle: {
    marginLeft: Spacing.sm,
    marginBottom: Spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  sectionCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    marginBottom: Spacing.xl,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.lg,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rowLabel: {
    marginLeft: Spacing.md,
    fontSize: 16,
    fontWeight: "500",
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
