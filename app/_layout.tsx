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

import MiniPlayer from "@/components/audio/MiniPlayer";
import { audioService } from "@/services/audioService";
import { PlaybackService } from "@/services/playbackService";

import TrackPlayer from "react-native-track-player";

TrackPlayer.registerPlaybackService(() => PlaybackService);

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

      // Reload app to apply layout changes (delayed slightly to prevent race conditions)
      setTimeout(() => {
        if (__DEV__) {
          DevSettings.reload();
        } else {
          Updates.reloadAsync().catch((err) => {
            console.warn("Updates.reloadAsync failed", err);
          });
        }
      }, 100);
    }
  }, [appLanguage, i18n]);

  useEffect(() => {
    audioService.setupPlayer();
  }, []);

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
        <Stack.Screen name="favorites" options={{ headerShown: false }} />
        <Stack.Screen name="info" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <MiniPlayer />
      <StatusBar style={isDark ? "light" : "dark"} />
    </>
  );
}

export const unstable_settings = {
  // Ensure that reloading on `/cart` keeps a back button present.
  initialRouteName: "(tabs)",
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
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [loaded, error]);

  // Fallback to hide splash screen after 3 seconds just in case fonts or initial state hang
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hideAsync().catch(() => {});
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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
