import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, Switch, View } from "react-native";

import {
  PickerOption,
  SettingsPicker,
} from "@/components/settings/SettingsPicker";
import { SettingsRow } from "@/components/settings/SettingsRow";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { NavyHeader, ThemedText, ThemedView } from "@/components/ui";
import { IconSymbol } from "@/components/ui/icon-symbol";
import type { ThemeMode } from "@/constants/colors";
import { Spacing } from "@/constants/spacing";
import { BorderRadius } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import { useReciters } from "@/services/quranApi";
import { useSettingsStore } from "@/store/settingsStore";

/* ────────────────────────────────────────────
 * Static option lists
 * (Later these can come from the backend API)
 * ──────────────────────────────────────────── */
const RECITER_OPTIONS: PickerOption[] = [
  { id: 7, label: "Mishary Rashid Al-Afasy" },
  { id: 1, label: "Abdul Basit (Murattal)" },
  { id: 2, label: "Abdul Rahman Al-Sudais" },
  { id: 3, label: "Abu Bakr Al-Shatri" },
  { id: 4, label: "Hani Ar-Rifai" },
  { id: 5, label: "Mahmoud Khalil Al-Hussary" },
  { id: 6, label: "Maher Al-Muaiqly" },
  { id: 9, label: "Sa'ud Ash-Shuraim" },
  { id: 10, label: "Mohamed Siddiq Al-Minshawi" },
];

const TRANSLATION_OPTIONS: PickerOption[] = [
  { id: 20, label: "Sahih International" },
  { id: 131, label: "Dr. Mustafa Khattab (The Clear Quran)" },
  { id: 85, label: "Abdul Haleem" },
  { id: 21, label: "Pickthall" },
  { id: 22, label: "Yusuf Ali" },
  { id: 95, label: "Abul A'la Maududi" },
  { id: 234, label: "Fateh Muhammad Jalandhry (Urdu)" },
  { id: 97, label: "Taqi Usmani" },
];

const LANGUAGE_OPTIONS: PickerOption[] = [
  { id: "en", label: "English" },
  { id: "ar", label: "العربية" },
  { id: "ur", label: "اردو" },
];

export default function SettingsScreen() {
  const { data: recitersData } = useReciters();

  const RECITER_OPTIONS_DYNAMIC =
    recitersData?.map((r) => ({
      id: r.id,
      label: r.reciter_name,
    })) || RECITER_OPTIONS;

  const { colors, mode, setMode } = useAppTheme();
  const { t } = useTranslation();

  const {
    arabicFontSize,
    setArabicFontSize,
    translationFontSize,
    setTranslationFontSize,
    scriptStyle,
    setScriptStyle,
    reciterId,
    setReciter,
    translationId,
    setTranslation,
    autoPlayNextVerse,
    setAutoPlayNextVerse,
    showRecitationControls,
    setShowRecitationControls,
    appLanguage,
    setAppLanguage,
  } = useSettingsStore();

  return (
    <ThemedView style={styles.container} layer="primary">
      <NavyHeader />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* ── DISPLAY & TYPOGRAPHY ── */}
        <SettingsSection title={t("settings.displayTypography")}>
          {/* Theme */}
          <SettingsRow icon="moon.circle.fill" label={t("settings.theme")}>
            <View style={styles.segmentedControl}>
              {(["light", "dark", "amoled"] as ThemeMode[]).map((t_mode) => (
                <Pressable
                  key={t_mode}
                  style={[
                    styles.segmentBtn,
                    mode === t_mode && { backgroundColor: colors.gold },
                  ]}
                  onPress={() => setMode(t_mode)}
                >
                  <ThemedText
                    role="caption"
                    color={
                      mode === t_mode
                        ? colors.navyPrimary
                        : colors.textSecondary
                    }
                  >
                    {t(`settings.themes.${t_mode}`)}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </SettingsRow>

          {/* Script Style */}
          <SettingsRow
            icon="character.book.closed.fill"
            label={t("settings.scriptStyle")}
          >
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
                  {t("settings.scripts.uthmani")}
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
                  {t("settings.scripts.imlaei")}
                </ThemedText>
              </Pressable>
            </View>
          </SettingsRow>

          {/* Arabic Font Size Stepper */}
          <SettingsRow
            icon="textformat.size"
            label={t("settings.arabicFontSize")}
          >
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

          {/* Translation Font Size Stepper */}
          <SettingsRow
            icon="textformat.size"
            label={t("settings.translationFontSize")}
            isLast
          >
            <View style={styles.stepperControl}>
              <Pressable
                style={[
                  styles.stepperBtn,
                  { backgroundColor: colors.bgPrimary },
                ]}
                onPress={() =>
                  setTranslationFontSize(Math.max(12, translationFontSize - 2))
                }
              >
                <IconSymbol name="minus" size={16} color={colors.textPrimary} />
              </Pressable>
              <ThemedText style={styles.stepperValue}>
                {translationFontSize}
              </ThemedText>
              <Pressable
                style={[
                  styles.stepperBtn,
                  { backgroundColor: colors.bgPrimary },
                ]}
                onPress={() =>
                  setTranslationFontSize(Math.min(32, translationFontSize + 2))
                }
              >
                <IconSymbol name="plus" size={16} color={colors.textPrimary} />
              </Pressable>
            </View>
          </SettingsRow>
        </SettingsSection>

        {/* ── READING PREFERENCES ── */}
        <SettingsSection title={t("settings.readingPreferences")}>
          <SettingsRow icon="person.wave.2.fill" label={t("settings.reciter")}>
            <SettingsPicker
              title={t("settings.reciter")}
              options={RECITER_OPTIONS_DYNAMIC}
              selectedId={reciterId}
              onSelect={setReciter}
            />
          </SettingsRow>

          <SettingsRow icon="globe" label={t("settings.translation")}>
            <SettingsPicker
              title={t("settings.translation")}
              options={TRANSLATION_OPTIONS}
              selectedId={translationId}
              onSelect={setTranslation}
            />
          </SettingsRow>

          <SettingsRow
            icon="character.bubble.fill"
            label={t("settings.language")}
            isLast
          >
            <SettingsPicker
              title={t("settings.language")}
              options={LANGUAGE_OPTIONS}
              selectedId={appLanguage}
              onSelect={(id) => setAppLanguage(id as "en" | "ar" | "ur")}
            />
          </SettingsRow>
        </SettingsSection>

        {/* ── AUDIO & PLAYBACK ── */}
        <SettingsSection title={t("settings.audioPlayback")}>
          <SettingsRow
            icon="play.circle.fill"
            label={t("settings.autoPlayNextVerse")}
          >
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
            label={t("settings.showInlineControls")}
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
    backgroundColor: "rgba(0,0,0,0.1)",
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
