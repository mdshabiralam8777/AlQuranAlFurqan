import { Spacing } from "@/constants/spacing";
import { BorderRadius } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconSymbol } from "./icon-symbol";
import { ThemedText } from "./ThemedText";

export function NavyHeader() {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  // Format current date (e.g. "Friday, 24 March")
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.navyPrimary,
          paddingTop: insets.top + Spacing.md,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.leftCol}>
          <ThemedText role="label" color={colors.textSecondary}>
            {today}
          </ThemedText>
          <ThemedText
            role="heading"
            color={colors.bgPrimary}
            style={styles.greeting}
          >
            Assalamu Alaikum
          </ThemedText>
        </View>

        {/* Center absolutely positioned app logo */}
        <View
          style={[StyleSheet.absoluteFill, styles.centerCol]}
          pointerEvents="none"
        >
          <Image
            source={require("@/assets/app-screens/QuranAppLogo-new.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.iconContainer}>
          <View
            style={[styles.iconButton, { backgroundColor: colors.bgSecondary }]}
          >
            <IconSymbol name="bell.fill" size={20} color={colors.textPrimary} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
    zIndex: 10,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    marginTop: Spacing.xs,
  },
  iconContainer: {
    justifyContent: "center",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  leftCol: {
    zIndex: 2, // above absolute fill
  },
  centerCol: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 160,
    height: 40,
  },
});
