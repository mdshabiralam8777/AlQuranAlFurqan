import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { JUZ_DATA, JuzInfo, JuzListItem } from "@/components/quran/JuzListItem";
import { ThemedText, ThemedView } from "@/components/ui";
import { Spacing } from "@/constants/spacing";
import { useAppTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function JuzListScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={styles.container}>
      {/* Nav Bar */}
      <View
        style={[
          styles.navBar,
          {
            backgroundColor: colors.navyPrimary,
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
          Juz Index
        </ThemedText>
        <View style={styles.navButton} />
      </View>

      {/* Juz List */}
      <FlashList<JuzInfo>
        data={JUZ_DATA}
        keyExtractor={(item) => item.juzNumber.toString()}
        renderItem={({ item }) => <JuzListItem juz={item} />}
        // @ts-ignore
        estimatedItemSize={80}
        contentContainerStyle={{ paddingBottom: Spacing.xxxl }}
        showsVerticalScrollIndicator={false}
      />
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
  },
});
