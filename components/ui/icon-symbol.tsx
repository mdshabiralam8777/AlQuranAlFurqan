// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolViewProps, SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<
  SymbolViewProps["name"],
  ComponentProps<typeof MaterialIcons>["name"]
>;
export type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  // Navigation
  "house.fill": "home",
  "book.fill": "menu-book",
  "bookmark.fill": "bookmark",
  "gearshape.fill": "settings",

  // Actions
  magnifyingglass: "search",
  "multiply.circle.fill": "cancel",
  bookmark: "bookmark-border",
  "square.and.arrow.up": "share",
  "square.and.pencil": "edit",
  "bell.fill": "notifications",

  // Components
  "book.pages.fill": "import-contacts",
  "play.fill": "play-arrow",
  "play.circle.fill": "play-circle",
  book: "menu-book",
  "character.book.closed.fill": "library-books",

  // Settings
  "moon.circle.fill": "dark-mode",
  "textformat.size": "format-size",
  minus: "remove",
  plus: "add",
  "slider.horizontal.3": "tune",

  // Quick Access Row
  "book.closed.fill": "menu-book",
  "location.north.fill": "explore",
  "hands.sparkles.fill": "auto-awesome",
  "info.circle": "info",
  "info.circle.fill": "info",
  "heart.fill": "favorite",

  // Duas
  "sun.max.fill": "wb-sunny",
  "moon.stars.fill": "nightlight-round",
  "text.book.closed.fill": "library-books",
  "tag.fill": "label",

  // Default Expo
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}
