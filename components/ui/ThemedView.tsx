/**
 * ThemedView — theme-aware View primitive.
 * Applies the correct background token based on the active theme.
 */

import { View, type ViewProps } from 'react-native';

import { useAppTheme } from '@/context/ThemeContext';
import { ColorTokens } from '@/constants/colors';

export type ViewLayer = 'primary' | 'secondary' | 'elevated' | 'transparent';

export type ThemedViewProps = ViewProps & {
  layer?: ViewLayer;
  /** Direct background color override — skips theme token */
  bg?: string;
};

export function ThemedView({ layer = 'primary', style, bg, ...rest }: ThemedViewProps) {
  const { colors } = useAppTheme();

  const bgColor = bg ?? layerToColor(layer, colors);

  return <View style={[{ backgroundColor: bgColor }, style]} {...rest} />;
}

function layerToColor(layer: ViewLayer, colors: ColorTokens): string {
  switch (layer) {
    case 'secondary': return colors.bgSecondary;
    case 'elevated': return colors.bgElevated;
    case 'transparent': return 'transparent';
    default: return colors.bgPrimary;
  }
}
