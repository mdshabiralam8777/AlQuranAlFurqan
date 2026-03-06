import { Spacing } from "@/constants/spacing";
import { FontFamily, FontSize } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText, ThemedView } from "../ui";
import { IconSymbol } from "../ui/icon-symbol";

type QuickAccessItem = {
  id: string;
  icon: string;
  labelKey: string;
  route: string;
};

const QUICK_ITEMS: QuickAccessItem[] = [
  {
    id: "duas",
    icon: "hands.sparkles.fill",
    labelKey: "home.duas",
    route: "/duas",
  },
  {
    id: "favorite",
    icon: "heart.fill",
    labelKey: "home.favorite",
    route: "/favorites",
  },
  {
    id: "bookmark",
    icon: "bookmark.fill",
    labelKey: "home.bookmarks",
    route: "/(tabs)/bookmarks",
  },
  {
    id: "info",
    icon: "info.circle",
    labelKey: "home.info",
    route: "/info",
  },
];

export function QuickAccessRow() {
  const { colors } = useAppTheme();
  const { t } = useTranslation();
  const router = useRouter();

  const handlePress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      {/* Segmented Toggle: Surah / Juz */}
      <View
        style={[
          styles.segmentContainer,
          { backgroundColor: `${colors.gold}12` },
        ]}
      >
        <Pressable
          onPress={() => handlePress("/(tabs)/quran")}
          style={({ pressed }) => [
            styles.segmentButton,
            {
              backgroundColor: pressed ? colors.gold : `${colors.gold}25`,
              borderColor: `${colors.gold}40`,
            },
          ]}
        >
          {({ pressed }) => (
            <View style={styles.segmentInner}>
              <IconSymbol
                name="book.pages.fill"
                size={18}
                color={pressed ? colors.navyPrimary : colors.gold}
              />
              <ThemedText
                style={[
                  styles.segmentLabel,
                  {
                    color: pressed ? colors.navyPrimary : colors.gold,
                  },
                ]}
              >
                {t("tabs.surahs")}
              </ThemedText>
            </View>
          )}
        </Pressable>

        <View
          style={[
            styles.segmentDivider,
            { backgroundColor: `${colors.gold}30` },
          ]}
        />

        <Pressable
          onPress={() => handlePress("/juz")}
          style={({ pressed }) => [
            styles.segmentButton,
            {
              backgroundColor: pressed ? colors.gold : `${colors.gold}25`,
              borderColor: `${colors.gold}40`,
            },
          ]}
        >
          {({ pressed }) => (
            <View style={styles.segmentInner}>
              <IconSymbol
                name="book.closed.fill"
                size={18}
                color={pressed ? colors.navyPrimary : colors.gold}
              />
              <ThemedText
                style={[
                  styles.segmentLabel,
                  {
                    color: pressed ? colors.navyPrimary : colors.gold,
                  },
                ]}
              >
                {t("home.juz")}
              </ThemedText>
            </View>
          )}
        </Pressable>
      </View>

      {/* Quick Access Icons Row */}
      <View style={styles.iconsRow}>
        {QUICK_ITEMS.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => handlePress(item.route)}
            style={({ pressed }) => [
              styles.itemContainer,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <ThemedView
              layer="secondary"
              style={[styles.iconCircle, { borderColor: colors.separator }]}
            >
              <IconSymbol
                name={item.icon as any}
                size={22}
                color={colors.gold}
              />
            </ThemedView>
            <ThemedText
              role="label"
              color={colors.textPrimary}
              style={styles.label}
            >
              {t(item.labelKey)}
            </ThemedText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
    gap: Spacing.xl,
  },
  /* Segmented Control */
  segmentContainer: {
    flexDirection: "row",
    marginHorizontal: Spacing.lg,
    borderRadius: 14,
    padding: 4,
    alignItems: "center",
  },
  segmentButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  segmentLabel: {
    fontSize: FontSize.base,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  segmentDivider: {
    width: 1,
    height: 24,
    marginHorizontal: 2,
  },
  /* Quick Icons */
  iconsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
  },
  itemContainer: {
    alignItems: "center",
    width: 60,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginBottom: Spacing.xs,
  },
  label: {
    textAlign: "center",
    fontSize: FontSize.xs,
  },
});
