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
          backgroundColor: colors.bgPrimary,
          marginTop: insets.top + Spacing.md,
        },
      ]}
    >
      <View style={styles.content}>
        <Image
          source={require("@/assets/images/FinalLogo.webp")}
          style={styles.logo}
          resizeMode="cover"
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
    paddingHorizontal: Spacing.xl,
    paddingVertical: 0, // Removed padding to keep header slim
  },
  logo: {
    width: 220,
    height: 70, // Increased height so contain doesn't shrink it too much horizontally
    marginTop: -10, // Shaved off top internal padding
    marginBottom: 10, // Shaved off bottom internal padding
  },
});
