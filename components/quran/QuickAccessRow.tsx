import { Spacing } from "@/constants/spacing";
import { useAppTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ThemedText, ThemedView } from "../ui";
import { IconSymbol } from "../ui/icon-symbol";

type QuickAccessItem = {
  id: string;
  icon: string;
  label: string;
  route: string;
};

const ITEMS: QuickAccessItem[] = [
  {
    id: "surah",
    icon: "book.pages.fill",
    label: "Surah",
    route: "/(tabs)/quran",
  },
  { id: "juz", icon: "book.closed.fill", label: "Juz", route: "/juz" },
  {
    id: "bookmark",
    icon: "bookmark.fill",
    label: "Bookmarks",
    route: "/(tabs)/bookmarks",
  },
  { id: "qibla", icon: "location.north.fill", label: "Qibla", route: "/qibla" },
  { id: "duas", icon: "hands.sparkles.fill", label: "Duas", route: "/duas" },
];

export function QuickAccessRow() {
  const { colors } = useAppTheme();
  const router = useRouter();

  const handlePress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContent}>
        {ITEMS.map((item) => (
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
              {item.label}
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
  },
  rowContent: {
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
  },
});
