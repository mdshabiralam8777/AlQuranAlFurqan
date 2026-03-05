import { ThemedText } from "@/components/ui";
import { IconSymbol, IconSymbolName } from "@/components/ui/icon-symbol";
import { Spacing } from "@/constants/spacing";
import { useAppTheme } from "@/context/ThemeContext";
import React from "react";
import { StyleSheet, View } from "react-native";

interface SettingsRowProps {
  icon: IconSymbolName;
  label: string;
  children: React.ReactNode;
  isLast?: boolean;
}

export function SettingsRow({
  icon,
  label,
  children,
  isLast = false,
}: SettingsRowProps) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.row,
        !isLast && {
          borderBottomColor: colors.separator,
          borderBottomWidth: StyleSheet.hairlineWidth,
        },
      ]}
    >
      <View style={styles.left}>
        <IconSymbol name={icon} size={24} color={colors.textSecondary} />
        <ThemedText style={styles.label}>{label}</ThemedText>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.lg,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  label: {
    marginLeft: Spacing.md,
    fontSize: 16,
    fontWeight: "500",
  },
});
