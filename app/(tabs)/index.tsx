import {
  LastReadCard,
  QuickAccessRow,
  VerseOfTheDay,
} from "@/components/quran";
import { ThemedView } from "@/components/ui";
import { NavyHeader } from "@/components/ui/NavyHeader";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function HomeDashboardScreen() {
  return (
    <ThemedView style={styles.container} layer="secondary">
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <NavyHeader />
        <LastReadCard />
        <QuickAccessRow />
        <VerseOfTheDay />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
