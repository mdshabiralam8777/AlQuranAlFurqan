/**
 * ThemeContext — provides active color tokens + theme mode to the entire app.
 * Defaults to the device's system color scheme.
 * TODO: swap storage to react-native-mmkv once installed for persistent preference.
 *
 * Usage:
 *   const { colors, mode, setMode, isDark } = useAppTheme();
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";

import { Colors, ColorTokens, ThemeMode } from "@/constants/colors";

interface ThemeContextValue {
  mode: ThemeMode;
  colors: ColorTokens;
  setMode: (mode: ThemeMode) => void;
  /** true when mode is 'dark' or 'amoled' */
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>(
    systemScheme === "dark" ? "dark" : "light",
  );

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    // TODO: persist with MMKV — mmkv.set('@aqaf/theme', next)
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      colors: Colors[mode] as ColorTokens,
      setMode,
      isDark: mode === "dark" || mode === "amoled",
    }),
    [mode, setMode],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useAppTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error("useAppTheme must be used inside <AppThemeProvider>");
  return ctx;
}
