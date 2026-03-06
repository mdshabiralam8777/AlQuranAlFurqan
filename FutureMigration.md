# Future Migration Plan

This document tracks deferred technical improvements that are blocked on migrating from **Expo Go** to **EAS Development Builds**.

---

## 1. AsyncStorage → react-native-mmkv

**Why:** MMKV is ~30× faster than AsyncStorage and synchronous (no hydration flicker on launch). The `PRD.md` and `CLAUDE.md` mandate it.

**Why Deferred:** `react-native-mmkv` (all versions) is a native module not included in Expo Go. It requires a custom development build.

**Migration Steps:**

1. Install: `npm install react-native-mmkv`
2. Uninstall: `npm uninstall @react-native-async-storage/async-storage`
3. Update **only** `services/storage.ts` — the centralized adapter was designed as a single swap point
4. Run `npx expo prebuild` to generate native projects
5. Build with `npx expo run:android` / `npx expo run:ios`

**Affected Stores (no changes needed — they use the adapter):**

- `store/bookmarkStore.ts`
- `store/lastReadStore.ts`
- `store/settingsStore.ts`
- `context/ThemeContext.tsx` (update to use synchronous MMKV reads for flicker-free theme init)

---

## 2. react-native-track-player (Phase 5 — Audio)

**Why:** Background audio, lock-screen controls, gapless verse-by-verse playback.

**Status:** Also a native module. Will require dev builds when implemented.

---

## 3. EAS Build Setup (Prerequisite)

Before any of the above, the project needs:

1. `npx eas-cli login`
2. `eas build:configure`
3. `npx expo prebuild`
4. Test on physical device via `npx expo run:android` / `npx expo run:ios`

> **Note:** After switching to dev builds, Expo Go can no longer be used for this project.

---

## 4. SQLite / WatermelonDB (Phase 7 — Data Scale)

**Why:** Currently, all Dua JSONs, Tajweed rules, and Favorites are loaded into JavaScript memory or queried via `Array.find`. As the app grows (especially adding Hadith collections or full Tafsir text), JSON loading will cause JS thread blockages and increased RAM usage.

**When to Migrate:** If/when the static data payload exceeds ~10MB, or if startup time degrades.

**Migration Steps:**

1. Introduce `expo-sqlite` or `@nozbe/watermelondb`.
2. Move JSON content (`data/duas/*.json`, `data/favorites.ts`, `data/info.ts`) into a pre-populated SQLite database file shipped with the app assets.
3. Replace synchronous direct array imports with async database queries.
