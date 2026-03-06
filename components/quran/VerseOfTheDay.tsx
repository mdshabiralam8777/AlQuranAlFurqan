import { Spacing } from "@/constants/spacing";
import { BorderRadius, FontFamily, FontSize } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import { getVerseOfTheDay } from "@/data/verseOfTheDay";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText, ThemedView } from "../ui";

export function VerseOfTheDay() {
  const { colors } = useAppTheme();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const lang = i18n.language;

  const verse = useMemo(() => getVerseOfTheDay(), []);

  const translation = lang === "ur" ? verse.translationUr : verse.translationEn;

  const handlePress = () => {
    const [chapterId, verseNum] = verse.verseKey.split(":");
    router.push(
      `/surah/${chapterId}?verse=${verseNum}&mode=translation` as any,
    );
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.9 : 1,
            transform: [{ scale: pressed ? 0.99 : 1 }],
          },
        ]}
      >
        <ThemedView
          layer="primary"
          style={[styles.card, { borderColor: colors.gold }]}
        >
          {/* Header */}
          <View style={styles.header}>
            <ThemedText role="label" color={colors.gold}>
              {t("home.verseOfTheDay")}
            </ThemedText>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <ThemedText
              role="arabic"
              color={colors.textArabic}
              style={styles.arabic}
            >
              {verse.arabic}
            </ThemedText>
            <ThemedText
              role="translation"
              color={colors.textSecondary}
              style={styles.translation}
            >
              {translation}
            </ThemedText>
            <View
              style={[
                styles.referenceBadge,
                { backgroundColor: `${colors.gold}15` },
              ]}
            >
              <ThemedText
                role="caption"
                color={colors.gold}
                style={styles.reference}
              >
                {verse.reference}
              </ThemedText>
            </View>
          </View>

          {/* Tap hint */}
          <ThemedText style={[styles.tapHint, { color: colors.textSecondary }]}>
            {lang === "ar"
              ? "اضغط للقراءة"
              : lang === "ur"
                ? "پڑھنے کے لیے ٹیپ کریں"
                : "Tap to read"}
          </ThemedText>
        </ThemedView>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    marginVertical: Spacing.lg,
  },
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.xl,
    alignItems: "center",
  },
  header: {
    marginBottom: Spacing.lg,
  },
  content: {
    alignItems: "center",
  },
  arabic: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: Spacing.md,
    lineHeight: 48,
  },
  translation: {
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: Spacing.lg,
    lineHeight: 22,
  },
  referenceBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xxs,
    borderRadius: 8,
  },
  reference: {
    textAlign: "center",
  },
  tapHint: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.inter,
    marginTop: Spacing.md,
    opacity: 0.6,
  },
});
