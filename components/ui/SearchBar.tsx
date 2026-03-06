import { Spacing } from "@/constants/spacing";
import { BorderRadius, FontFamily, FontSize } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";
import React from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { IconSymbol } from "./icon-symbol";

type SearchBarProps = TextInputProps & {
  onClear?: () => void;
};

export function SearchBar({ style, value, onClear, ...props }: SearchBarProps) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bgSecondary }]}>
      <View
        style={[styles.inputWrapper, { backgroundColor: colors.bgPrimary }]}
      >
        <IconSymbol
          name="magnifyingglass"
          size={20}
          color={colors.gold}
          style={styles.icon}
        />

        <TextInput
          style={[styles.input, { color: colors.textPrimary }]}
          placeholderTextColor={colors.textSecondary}
          value={value}
          {...props}
        />

        {value ? (
          <Pressable onPress={onClear} style={styles.clearIcon}>
            <IconSymbol
              name="multiply.circle.fill"
              size={20}
              color={colors.textSecondary}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    paddingTop: Spacing.md,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BorderRadius.round,
    paddingHorizontal: Spacing.md,
    height: 48,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontFamily: FontFamily.inter,
    fontSize: FontSize.md,
    height: "100%",
  },
  clearIcon: {
    marginLeft: Spacing.sm,
    padding: Spacing.xs,
  },
});
