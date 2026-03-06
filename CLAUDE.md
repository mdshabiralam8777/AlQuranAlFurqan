# CLAUDE.md — Al Quran Al Furqan

This file is the canonical reference for AI coding assistants (Claude, Gemini, Copilot, etc.) working in this repository. Read this before touching any code.

---

## 1. Project Overview

**Al Quran Al Furqan** is a premium, AI-enhanced Quran companion mobile application built with React Native (Expo). It serves a global Muslim audience with features ranging from foundational text display and audio playback to AI-powered recitation coaching, AR exegesis, and a community-driven scholarly layer.

Full feature breakdown and roadmap: [`PRD.md`](./PRD.md)

---

## 1.1 Planning Documents

> **AI Assistants:** Always read the relevant plan before writing any code.

| Document                                 | When to read it                                                                                                            |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [`PRD.md`](./PRD.md)                     | Understand feature scope, phases, and priorities                                                                           |
| [`BACKEND_PLAN.md`](./BACKEND_PLAN.md)   | Before touching anything inside `backend/` — directory structure, route table, token manager spec, env vars                |
| [`FRONTEND_PLAN.md`](./FRONTEND_PLAN.md) | Before touching any screen, component, or style — design system, color tokens, Islamic UI conventions, component inventory |

---

## 2. Tech Stack

| Layer            | Technology                                  |
| ---------------- | ------------------------------------------- |
| Mobile Framework | React Native 0.81 + Expo (Managed Workflow) |
| Language         | TypeScript (strict mode)                    |
| Navigation       | Expo Router v6 (file-based, typed routes)   |
| Data Fetching    | TanStack Query (React Query)                |
| Global State     | Zustand                                     |
| Local Storage    | `react-native-mmkv`                         |
| List Rendering   | `@shopify/flash-list`                       |
| Audio Engine     | `react-native-track-player`                 |
| Animations       | `react-native-reanimated` v4                |
| Backend Proxy    | Node.js + Express (TypeScript)              |
| API Source       | Quran Foundation API (`api.quran.com`)      |

---

## 3. Project Structure

```
AlQuranAlFurqan/
├── app/                    # Expo Router — file-based screens
│   ├── (tabs)/             # Tab navigator group (Home, Quran, Bookmarks, Settings)
│   ├── surah/[id].tsx      # Surah detail screen
│   ├── duas/               # Duas feature (Categories & List)
│   ├── favorites.tsx       # Favorites curated screen
│   ├── info.tsx            # Info & Tajweed screen
│   ├── juz.tsx             # Juz index screen
│   └── _layout.tsx         # Root layout / providers
├── components/             # Shared, reusable UI components
│   ├── ui/                 # Atomic UI primitives (Accordion, SearchBar, FilterChip…)
│   ├── quran/              # Domain components (AyahRow, VerseOfTheDay, QuickAccessRow…)
│   ├── duas/               # Dua-specific cards
│   └── bookmarks/          # Bookmark list items
├── constants/              # Design tokens (colors, typography, spacing, theme)
├── context/                # Context Providers (ThemeContext)
├── data/                   # Static curated JSON/TS data
│   ├── duas/               # Curated collections of Duas
│   ├── verseOfTheDay.ts    # Date-based daily verse rotation pool
│   ├── favorites.ts        # Hand-picked favorite surahs/verses
│   └── info.ts             # Tajweed rules data
├── hooks/                  # Custom React hooks (useChaptersSearch, etc)
├── store/                  # Zustand stores (settings, bookmarks, lastRead)
├── services/               # API calls
│   ├── quranApi.ts         # TanStack Query hooks wrapping our Express proxy
│   └── storage.ts          # MMKV initialization
├── types/                  # Global TypeScript interfaces
├── i18n/                   # Localizations (en, ar, ur)
├── assets/                 # Fonts, images, SVG
└── backend/                # Express proxy server (separate deployable)
    ├── src/
    │   ├── routes/
    │   ├── services/
    │   └── middleware/
    └── package.json
```

---

## 4. Development Commands

```bash
# Start Expo dev server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator/device
npm run android

# Run on web (limited feature support)
npm run web

# Lint
npm run lint
```

> **Note:** Never run `expo build` locally — builds are handled via EAS Build.

---

## 5. Coding Standards & Conventions

### TypeScript

- `strict: true` is enforced in `tsconfig.json`. Do not disable it.
- Define types/interfaces in `types/` before implementing logic.
- Prefer `interface` for object shapes; `type` for unions and mapped types.
- Use utility types (`Pick`, `Omit`, `Partial`, `Required`) to avoid duplication.

### React Native

- **Functional components only.** No class components.
- Extract business logic into custom hooks in `hooks/`.
- Use `useMemo` and `useCallback` for expensive computations and stable callbacks.
- Prefer `StyleSheet.create()` for styles — avoid inline style objects inside JSX.
- All text must go through the `<ThemedText>` component (never raw `<Text>`).

### State Management

- **Local UI state** → `useState` / `useReducer`
- **Server/async state** → TanStack Query (`useQuery`, `useMutation`)
- **Global app state** (theme, auth, bookmarks) → Zustand stores in `store/`
- **Persistent state** → Zustand + MMKV persistence middleware

### Data Fetching

- All API hooks live in `services/quranApi.ts`.
- Never call `fetch` directly inside a component — always use a TanStack Query hook.
- Handle loading, error, and empty states explicitly in every screen.

### Navigation

- Use Expo Router typed routes: `router.push('/surah/1')` — not string literals.
- Deep links must be handled in the root `_layout.tsx`.

### RTL Support

- All layouts must support RTL natively.
- Use `I18nManager.isRTL` as the source of truth for directional logic.
- Never use `textAlign: 'right'` as a RTL hack — use `I18nManager`-aware flex direction.

### Audio

- All audio state mutations go through `audioService.ts` — never call `TrackPlayer` directly from a component.
- Ensure the background service is registered in the app entry point.

---

## 6. Architecture Rules

### Backend Proxy (Critical Security Requirement)

- The Quran Foundation **Client Secret must never be embedded in the mobile app**.
- All authenticated API calls route through the Express backend proxy.
- The `TokenManager` handles OAuth2 token caching and refresh silently.
- Mobile app calls `/api/*` on the backend — never `api.quran.com` directly.

### Layered Backend Structure

```
Routes → Controllers (req/res) → Services (business logic) → Repository (API calls)
```

No business logic in controllers. No direct API calls in services — use the repository layer.

---

## 7. Environment Variables

### Mobile (Expo)

Prefix all public env vars with `EXPO_PUBLIC_`. Store in `.env.local` (gitignored).

```bash
EXPO_PUBLIC_API_BASE_URL=https://your-proxy.railway.app
```

### Backend Proxy

```bash
QURAN_CLIENT_ID=...
QURAN_CLIENT_SECRET=...
PORT=3000
```

**Never commit `.env` files.** Always use `.env.example` as the template.

---

## 8. Performance Constraints

| Concern        | Rule                                                                          |
| -------------- | ----------------------------------------------------------------------------- |
| List Rendering | Always use `FlashList` — never `FlatList` or `ScrollView` for Āyah lists      |
| Images         | Use `expo-image` with `contentFit` and `cachePolicy` set                      |
| Re-renders     | Memoize selectors in Zustand; avoid subscribing to full store                 |
| Fonts          | Load all custom fonts in the root `_layout.tsx` via `useFonts`                |
| Animations     | Run on UI thread via `useAnimatedStyle` + `worklet` — no JS-thread animations |

---

## 9. Git Workflow

- Branch naming: `feature/`, `fix/`, `chore/`, `docs/`
- Commits follow **Conventional Commits**: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`
- Direct pushes to `main` are not allowed — always open a PR.
- PRs require at least one passing lint check before merge.

---

## 10. Key Domain Vocabulary

Use this terminology consistently in code, comments, and commit messages.

| Term     | Meaning                                           |
| -------- | ------------------------------------------------- |
| Surah    | A chapter of the Quran (114 total)                |
| Āyah     | A verse within a Surah (plural: Āyāt)             |
| Juz      | One of 30 equal portions of the Quran             |
| Tashkeel | Arabic diacritical marks (vowel markers)          |
| Tajweed  | Rules governing correct Quranic pronunciation     |
| Tafsir   | Scholarly exegesis/interpretation of Quranic text |
| Hizb     | Half of a Juz (60 Ahzab total)                    |
| Khatam   | Completion of the full Quran                      |
| Reciter  | A Qāri — person who recites the Quran             |
| Madd     | Tajweed rule: elongation of a vowel sound         |
| Ghunna   | Tajweed rule: nasalization of certain letters     |

---

## 11. Off-Limits (Do Not Do)

- ❌ Do not use `AsyncStorage` — use `react-native-mmkv`.
- ❌ Do not use `FlatList` for Āyah rendering — use `FlashList`.
- ❌ Do not embed API secrets in the mobile bundle.
- ❌ Do not call `api.quran.com` directly from the client.
- ❌ Do not write business logic inside screen components.
- ❌ Do not use inline styles in JSX (`style={{ color: 'red' }}`).
- ❌ Do not use `any` type — use `unknown` with type guards if forced.
- ❌ Do not subscribe to full Zustand stores — use selectors.
