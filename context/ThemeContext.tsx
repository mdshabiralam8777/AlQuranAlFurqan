/**
 * ThemeContext — provides active color tokens + theme mode to the entire app.
 * Defaults to the device's system color scheme.
 * Theme preference is persisted via AsyncStorage for restoration on launch.
 *
 * Usage:
 *   const { colors, mode, setMode, isDark } = useAppTheme();
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";

import { Colors, ColorTokens, ThemeMode } from "@/constants/colors";

const THEME_STORAGE_KEY = "@aqaf/theme";

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

  // Restore persisted theme on mount
  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY).then((stored) => {
      if (stored === "light" || stored === "dark" || stored === "amoled") {
        setModeState(stored);
      }
    });
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    AsyncStorage.setItem(THEME_STORAGE_KEY, next);
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
