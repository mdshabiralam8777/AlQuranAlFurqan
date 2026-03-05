/**
 * storage.ts — Centralized storage adapter for Zustand persistence.
 *
 * Currently uses AsyncStorage (Expo Go compatible).
 * When migrating to a custom development build, swap to react-native-mmkv
 * for ~30x faster synchronous storage.
 *
 * Usage (Zustand):
 *   import { zustandStorage } from '@/services/storage';
 *   persist(store, { storage: createJSONStorage(() => zustandStorage) })
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import type { StateStorage } from "zustand/middleware";

/**
 * Zustand-compatible StateStorage adapter wrapping AsyncStorage.
 */
export const zustandStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return AsyncStorage.getItem(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await AsyncStorage.removeItem(name);
  },
};
