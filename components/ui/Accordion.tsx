import { Spacing } from "@/constants/spacing";
import { FontFamily, FontSize } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import React, { useCallback, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  UIManager,
  View,
} from "react-native";
import { ThemedText, ThemedView } from "../ui";
import { IconSymbol } from "../ui/icon-symbol";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionProps {
  /** Symbol (e.g., م, لا) shown as a badge */
  symbol?: string;
  title: string;
  children: React.ReactNode;
  /** Whether initially expanded */
  defaultOpen?: boolean;
}

export function Accordion({
  symbol,
  title,
  children,
  defaultOpen = false,
}: AccordionProps) {
  const { colors } = useAppTheme();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <ThemedView
      layer="elevated"
      style={[styles.container, { borderColor: colors.separator }]}
    >
      <Pressable
        onPress={toggle}
        style={({ pressed }) => [styles.header, { opacity: pressed ? 0.8 : 1 }]}
      >
        {/* Symbol badge */}
        {symbol && (
          <View
            style={[
              styles.symbolBadge,
              { backgroundColor: `${colors.gold}20` },
            ]}
          >
            <ThemedText style={[styles.symbolText, { color: colors.gold }]}>
              {symbol}
            </ThemedText>
          </View>
        )}

        {/* Title */}
        <ThemedText
          style={[styles.title, { color: colors.textPrimary }]}
          numberOfLines={2}
        >
          {title}
        </ThemedText>

        {/* Chevron */}
        <View
          style={[
            styles.chevronContainer,
            { transform: [{ rotate: isOpen ? "90deg" : "0deg" }] },
          ]}
        >
          <IconSymbol
            name="chevron.right"
            size={14}
            color={colors.textSecondary}
          />
        </View>
      </Pressable>

      {/* Expandable content */}
      {isOpen && (
        <View style={[styles.content, { borderTopColor: colors.separator }]}>
          {children}
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  symbolBadge: {
    minWidth: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xs,
  },
  symbolText: {
    fontSize: FontSize.md,
    fontFamily: FontFamily.amiriBold,
    fontWeight: "700",
  },
  title: {
    flex: 1,
    fontSize: FontSize.sm,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    lineHeight: 20,
  },
  chevronContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    borderTopWidth: 1,
  },
});
