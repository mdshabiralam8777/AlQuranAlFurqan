import React, { useCallback, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ui";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Spacing } from "@/constants/spacing";
import { BorderRadius } from "@/constants/typography";
import { useAppTheme } from "@/context/ThemeContext";

export interface PickerOption {
  id: number;
  label: string;
}

interface SettingsPickerProps {
  title: string;
  options: PickerOption[];
  selectedId: number;
  onSelect: (id: number, label: string) => void;
}

/**
 * SettingsPicker — A modal-based picker for dropdown-style selections.
 * Renders a pressable row showing the current value; on tap opens
 * a bottom-sheet-style modal with a scrollable list of radio options.
 */
export function SettingsPicker({
  title,
  options,
  selectedId,
  onSelect,
}: SettingsPickerProps) {
  const { colors } = useAppTheme();
  const [visible, setVisible] = useState(false);

  const selectedLabel =
    options.find((o) => o.id === selectedId)?.label ?? "Select...";

  const handleSelect = useCallback(
    (option: PickerOption) => {
      onSelect(option.id, option.label);
      setVisible(false);
    },
    [onSelect],
  );

  return (
    <>
      {/* Trigger Row */}
      <Pressable
        style={styles.trigger}
        onPress={() => setVisible(true)}
        accessibilityRole="button"
        accessibilityLabel={`Select ${title}`}
      >
        <ThemedText
          role="caption"
          color={colors.textSecondary}
          numberOfLines={1}
          style={styles.triggerText}
        >
          {selectedLabel}
        </ThemedText>
        <IconSymbol
          name="chevron.right"
          size={14}
          color={colors.textSecondary}
        />
      </Pressable>

      {/* Modal */}
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setVisible(false)} />
        <View
          style={[
            styles.sheet,
            {
              backgroundColor: colors.bgSecondary,
              borderColor: colors.separator,
            },
          ]}
        >
          {/* Header */}
          <View
            style={[
              styles.sheetHeader,
              { borderBottomColor: colors.separator },
            ]}
          >
            <ThemedText style={styles.sheetTitle} color={colors.gold}>
              {title}
            </ThemedText>
            <Pressable onPress={() => setVisible(false)}>
              <IconSymbol
                name="xmark.circle.fill"
                size={28}
                color={colors.textSecondary}
              />
            </Pressable>
          </View>

          {/* Options List */}
          <FlatList
            data={options}
            keyExtractor={(item) => String(item.id)}
            style={styles.list}
            renderItem={({ item }) => {
              const isSelected = item.id === selectedId;
              return (
                <Pressable
                  style={[
                    styles.option,
                    { borderBottomColor: colors.separator },
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <ThemedText
                    color={isSelected ? colors.gold : colors.textPrimary}
                    style={[
                      styles.optionLabel,
                      isSelected && styles.optionLabelSelected,
                    ]}
                  >
                    {item.label}
                  </ThemedText>
                  {isSelected && (
                    <IconSymbol
                      name="checkmark.circle.fill"
                      size={22}
                      color={colors.gold}
                    />
                  )}
                </Pressable>
              );
            }}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  triggerText: {
    maxWidth: 150,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: "60%",
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  list: {
    paddingHorizontal: Spacing.lg,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionLabel: {
    fontSize: 16,
    flex: 1,
  },
  optionLabelSelected: {
    fontWeight: "600",
  },
});
