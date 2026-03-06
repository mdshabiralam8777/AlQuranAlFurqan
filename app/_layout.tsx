import { Amiri_400Regular, Amiri_700Bold } from "@expo-google-fonts/amiri";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as Updates from "expo-updates";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { DevSettings, I18nManager } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { AppThemeProvider, useAppTheme } from "@/context/ThemeContext";
import { useSettingsStore } from "@/store/settingsStore";
import "../i18n";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

/**
 * Inner layout that reads the theme after the provider is mounted.
 */
function RootStack() {
  const { colors, isDark } = useAppTheme();
  const { i18n } = useTranslation();
  const appLanguage = useSettingsStore((s) => s.appLanguage);

  useEffect(() => {
    // 1. Change the language
    if (i18n.language !== appLanguage) {
      i18n.changeLanguage(appLanguage);
    }

    // 2. Enforce RTL layout if Arabic or Urdu
    const isRtl = appLanguage === "ar" || appLanguage === "ur";
    if (isRtl !== I18nManager.isRTL) {
      I18nManager.allowRTL(isRtl);
      I18nManager.forceRTL(isRtl);

      // Reload app to apply layout changes
      if (__DEV__) {
        DevSettings.reload();
      } else {
        Updates.reloadAsync().catch(() => {});
      }
    }
  }, [appLanguage, i18n]);

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.bgPrimary },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: { fontWeight: "600" },
          contentStyle: { backgroundColor: colors.bgPrimary },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="surah/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="juz" options={{ headerShown: false }} />
        <Stack.Screen name="duas/index" options={{ headerShown: false }} />
        <Stack.Screen name="duas/[category]" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style={isDark ? "light" : "dark"} />
    </>
  );
}

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Amiri_400Regular,
    Amiri_700Bold,
    "KFGQPC-Uthmanic-Hafs": require("../assets/fonts/KFGQPC Uthman Taha Naskh Regular.ttf"),
    "Gulzar-Regular": require("../assets/fonts/Gulzar-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AppThemeProvider>
          <RootStack />
        </AppThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
