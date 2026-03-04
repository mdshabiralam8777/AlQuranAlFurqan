import { Spacing } from "@/constants/spacing";
import { BorderRadius } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function NavyHeader() {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.navyPrimary,
          marginTop: insets.top + Spacing.sm,
        },
      ]}
    >
      <View style={styles.content}>
        <Image
          source={require("@/assets/images/FinalLogo.webp")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    borderRadius: BorderRadius.round,
    zIndex: 10,
    overflow: "hidden", // Ensures background stays within border radius
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xl, // Increased width
    paddingVertical: Spacing.xs, // Reduced height
  },
  logo: {
    width: 220, // Much wider bounds
    height: 70, // Much shorter bounds
  },
});
