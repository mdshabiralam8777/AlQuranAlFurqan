import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText, ThemedView } from "@/components/ui";
import { Accordion } from "@/components/ui/Accordion";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Spacing } from "@/constants/spacing";
import { FontFamily, FontSize } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import { INFO_SECTIONS, InfoItem } from "@/data/info";

export default function InfoScreen() {
  const { colors } = useAppTheme();
  const { i18n } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const lang = i18n.language;

  const t = (obj: { titleEn?: string; titleAr?: string; titleUr?: string }) =>
    lang === "ar"
      ? (obj.titleAr ?? obj.titleEn)
      : lang === "ur"
        ? (obj.titleUr ?? obj.titleEn)
        : obj.titleEn;

  const getLocalized = (en: string, ar: string, ur: string) =>
    lang === "ar" ? ar : lang === "ur" ? ur : en;

  const renderInfoItem = (item: InfoItem) => {
    const ruling = getLocalized(item.rulingEn, item.rulingAr, item.rulingUr);
    const reason = getLocalized(item.reasonEn, item.reasonAr, item.reasonUr);
    const note = item.noteEn
      ? getLocalized(item.noteEn, item.noteAr ?? "", item.noteUr ?? "")
      : null;

    return (
      <View style={styles.itemContent}>
        {/* Ruling */}
        <View style={styles.labelRow}>
          <View style={[styles.labelDot, { backgroundColor: colors.gold }]} />
          <ThemedText style={[styles.labelTitle, { color: colors.gold }]}>
            {lang === "ar" ? "الحكم" : lang === "ur" ? "حکم" : "The Ruling"}
          </ThemedText>
        </View>
        <ThemedText style={[styles.itemText, { color: colors.textPrimary }]}>
          {ruling}
        </ThemedText>

        {/* Reason */}
        <View style={[styles.labelRow, { marginTop: Spacing.md }]}>
          <View
            style={[styles.labelDot, { backgroundColor: colors.textSecondary }]}
          />
          <ThemedText
            style={[styles.labelTitle, { color: colors.textSecondary }]}
          >
            {lang === "ar" ? "السبب" : lang === "ur" ? "وجہ" : "The Reason"}
          </ThemedText>
        </View>
        <ThemedText style={[styles.itemText, { color: colors.textSecondary }]}>
          {reason}
        </ThemedText>

        {/* Note */}
        {note && (
          <View
            style={[
              styles.noteContainer,
              { backgroundColor: `${colors.gold}10` },
            ]}
          >
            <IconSymbol name="info.circle.fill" size={14} color={colors.gold} />
            <ThemedText style={[styles.noteText, { color: colors.gold }]}>
              {note}
            </ThemedText>
          </View>
        )}
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      {/* Nav Bar */}
      <View
        style={[
          styles.navBar,
          {
            backgroundColor: colors.bgSecondary,
            paddingTop: insets.top + Spacing.xs,
          },
        ]}
      >
        <Pressable onPress={() => router.back()} style={styles.navButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <ThemedText
          style={[styles.navTitle, { color: colors.textPrimary }]}
          numberOfLines={1}
        >
          {lang === "ar" ? "معلومات" : lang === "ur" ? "معلومات" : "Info"}
        </ThemedText>
        <View style={styles.navButton} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero */}
        <View style={styles.heroSection}>
          <ThemedText style={[styles.heroArabic, { color: colors.gold }]}>
            اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ
          </ThemedText>
          <ThemedText
            style={[styles.heroTranslation, { color: colors.textSecondary }]}
          >
            "Read in the name of your Lord who created."
          </ThemedText>
          <ThemedText style={[styles.heroRef, { color: colors.textSecondary }]}>
            — Surah Al-Alaq 96:1
          </ThemedText>
        </View>

        {/* Sections */}
        {INFO_SECTIONS.map((section, sIdx) => (
          <View key={sIdx} style={styles.section}>
            {/* Section header */}
            <View style={styles.sectionHeader}>
              <IconSymbol
                name={section.icon as any}
                size={18}
                color={colors.gold}
              />
              <ThemedText
                style={[styles.sectionTitle, { color: colors.textPrimary }]}
              >
                {t(section) ?? section.titleEn}
              </ThemedText>
            </View>

            {/* Accordion items */}
            {section.items.map((item, iIdx) => (
              <Accordion
                key={iIdx}
                symbol={item.symbol}
                title={t(item) ?? item.titleEn}
              >
                {renderInfoItem(item)}
              </Accordion>
            ))}
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 56,
  },
  navButton: {
    padding: Spacing.xs,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  navTitle: {
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
    fontFamily: FontFamily.interSemiBold,
  },
  scrollContent: {
    paddingBottom: Spacing.xxxl,
  },
  heroSection: {
    alignItems: "center",
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxl,
    gap: Spacing.sm,
  },
  heroArabic: {
    fontSize: 22,
    fontFamily: FontFamily.amiri,
    textAlign: "center",
    lineHeight: 40,
  },
  heroTranslation: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.inter,
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 20,
  },
  heroRef: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.interMedium,
    textAlign: "center",
    marginTop: Spacing.xxs,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.md,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  itemContent: {
    paddingTop: Spacing.md,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.xxs,
  },
  labelDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  labelTitle: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  itemText: {
    fontSize: FontSize.sm,
    fontFamily: FontFamily.inter,
    lineHeight: 20,
    paddingLeft: Spacing.lg,
  },
  noteContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: 12,
    marginTop: Spacing.md,
  },
  noteText: {
    fontSize: FontSize.xs,
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    flex: 1,
    lineHeight: 18,
  },
});
