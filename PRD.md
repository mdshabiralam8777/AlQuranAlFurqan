# Product Requirements Document (PRD)
# Al Quran Al Furqan — Mobile Application

**Version:** 1.0  
**Date:** March 2026  
**Platform:** iOS & Android (React Native / Expo)  
**Status:** In Development

---

## 1. Executive Summary

**Al Quran Al Furqan** is a premium, AI-enhanced Quran companion mobile application targeting a global Muslim audience. The app goes beyond digital text rendering — it integrates AI-powered recitation coaching, emotional triage, AR exegesis, and a community-driven scholarly layer. Its mission is to serve as the most accessible, engaging, and spiritually meaningful Qur'anic learning tool on the market.

---

## 2. Architecture & Tech Stack

### 2.1 Frontend (Mobile)

| Concern | Technology | Rationale |
|---|---|---|
| Framework | React Native (Expo Managed Workflow) | OTA updates, simplified native module management |
| Navigation | Expo Router (file-based) | Type-safe, scalable routing with deep linking |
| Data Fetching & Caching | TanStack Query (React Query) | Request deduplication, infinite scroll pagination |
| Global State (Theme/Auth) | Zustand | Minimal boilerplate, scalable atom-based state |
| Local Persistent Storage | `react-native-mmkv` | ~30x faster than AsyncStorage; replaces web localStorage |
| List Rendering | `@shopify/flash-list` | Frame-drop-free rendering of hundreds of Āyāt |
| Audio Engine | `react-native-track-player` | Background playback, lock-screen controls, gapless audio |
| Animations | `react-native-reanimated` | 60fps UI-thread animations |
| Typography | `expo-font` + Amiri / KFGQPC Uthman Taha Naskh | Flawless Uthmanic & Indo-Pak script rendering |

### 2.2 Backend (Security Proxy)

| Concern | Technology |
|---|---|
| Runtime | Node.js (LTS) |
| Framework | Express.js |
| Auth | OAuth2 (Quran Foundation API) — server-side token management |
| Deployment | Railway / Render (serverless-friendly) |

### 2.3 Primary Data Source

- **Quran Foundation API** (`api.quran.com`) — Authoritative text, translations, audio, and Tafsir.
- All API calls are proxied through the Express backend to protect the Client Secret.

---

## 3. Feature Requirements

### 3.1 Core Features (Phase 1–5 — MVP Baseline)

These are non-negotiable foundational features required for market entry.

#### 3.1.1 Text & Display
- Flawless Arabic text rendering in both **Uthmanic (Hafs)** and **Indo-Pak** scripts.
- Font size control (user-adjustable).
- Dark / Light mode with AMOLED-safe black variant.
- RTL-first layout enforced via `I18nManager`.

#### 3.1.2 Audio & Playback
- High-quality audio from **multiple renowned reciters** (e.g., Mishary, Sudais, Husary).
- Verse-by-verse playback synchronization with visual highlighting.
- **Gapless** playback across consecutive Āyāt.
- **Background playback** with lock-screen controls (iOS & Android).
- Offline audio caching for download-once, recite-anywhere experience.

#### 3.1.3 Comprehension Tools
- **Multiple translations** (English, Urdu, French, etc.) rendered alongside the Arabic.
- **Tafsir** (exegesis) from trusted classical and contemporary sources (e.g., Ibn Kathir, Sa'di).
- **Word-by-word** grammatical and lexical breakdown with root-word display.

#### 3.1.4 User Utilities
- Bookmark any Āyah (long-press gesture) with a dedicated Bookmarks screen.
- Progress tracking: last-read position preserved on app launch.
- **Keyword Search** across translations and Arabic text.
- Reading streak tracker.

#### 3.1.5 Daily Needs
- Geolocation-based **Prayer Times** (5 daily prayers) with customizable calculation methods.
- **Adhan (call to prayer) notifications**.
- **Qibla Compass** using device magnetometer.

---

### 3.2 Advanced Market Features (Competitive Differentiators)

These features elevate the app above existing competition.

#### 3.2.1 AI Recitation Coach (On-Device)
- **On-device speech recognition** that listens to user recitation in real-time.
- Highlights mispronounced or skipped words immediately in the UI.
- Provides corrective audio playback of the specific word.
- **Privacy-first**: audio never leaves the device.

#### 3.2.2 Gamified Habit System
- Daily micro-goals (e.g., "read 5 Āyāt today").
- **Streak counters** with visual streak chains.
- "Hasanat" reward tracker — a motivational, non-gambling points system.
- Push notification reminders aligned with user-set goals.

#### 3.2.3 Deep Semantic Search (Arabic Root Engine)
- Search by **Arabic root word** (`ك-ت-ب` → returns all derivatives: كتَب, كتاب, مكتبة, etc.).
- Uncovers thematic connections and patterns across all 114 Surahs.
- Results grouped by root family with relevant translations.

#### 3.2.4 Social & Collaborative Reading
- **Group Khatam**: invite friends/family to collectively complete the Quran.
- Each member is assigned Juz sections; progress is aggregated on a shared dashboard.
- Completion milestones with push notifications for group members.

---

### 3.3 Innovation Features (Market-First Concepts)

Features that do not currently exist in any mainstream Quran application.

#### 3.3.1 Graph-RAG Contextual AI Assistant
- A **locally-operated, hallucination-free AI chatbot** grounded strictly in verified Tafsir and Hadith corpora.
- Uses Retrieval-Augmented Generation (RAG) with a knowledge graph to answer complex, life-applicable questions.
- **All answers include forced, tap-able citations** that deep-link directly to the source Āyah or Hadith.
- No fabricated Fatwas; explicitly scoped to the trained corpus.

#### 3.3.2 Mood-Based Spiritual Triage Engine
- Lightweight **sentiment/emotion detection** from user input (text or keyword selection).
- Maps detected emotional states (anxiety, grief, gratitude, hope) to curated sets of:
  - Relevant Āyāt and their translations.
  - Recommended Duas (supplications).
  - A calming reciter playlist.
- Generates a personalized "Spiritual Playlist" session.

#### 3.3.3 Haptic Tajweed Feedback System
- Uses the device **vibration motor** to physically convey Tajweed rules during recitation.
- Pattern dictionary: e.g., long vibration = Madd (elongation), double-tap = Ghunna (nasalization).
- **Accessibility-first**: primarily designed for visually impaired users.
- Can be toggled on/off in settings.

#### 3.3.4 AR Spatial Exegesis (Augmented Reality)
- Users **point their camera at a printed physical Quran**.
- Computer vision identifies the Surah and Āyah using OCR / pattern matching.
- The app overlays:
  - Translations in the user's language.
  - Tajweed color-coding directly on the printed text.
  - Tap-to-expand 3D historical context maps.

#### 3.3.5 Crowdsourced "Living" Tafsir
- A **moderated, peer-reviewed social layer** for scholarly reflection.
- Verified scholars and community members can submit reflections on how specific Āyāt apply to contemporary life.
- Submissions go through a **multi-stage moderation pipeline** (AI pre-screen → Scholar review → Publish).
- Prevents misinformation while keeping community deeply engaged.

---

## 4. Phase Implementation Roadmap

### Phase 1 — Backend Security Proxy (Express)
**Goal:** Protect the Client Secret and autonomously manage OAuth2 tokens.

- [ ] Initialize Express server (TypeScript).
- [ ] Create an `AuthService` that requests a Bearer token from `https://oauth2.quran.foundation` using Client ID & Secret.
- [ ] Implement a `TokenManager` class to cache the token in-memory and auto-refresh before expiry.
- [ ] Create proxy endpoints (e.g., `GET /api/surahs`, `GET /api/verses/:surahId`) that attach the valid Bearer token and forward mobile requests to the Foundation API.
- [ ] Add rate limiting and request validation middleware.
- [ ] Deploy to Railway/Render with environment variable scoping.

---

### Phase 2 — React Native Foundation & Theming
**Goal:** Scaffold the mobile application and establish the global design system.

- [ ] Initialize Expo application (`npx create-expo-app`).
- [ ] Set up Expo Router with typed routes.
- [ ] Configure RTL layout in `app.json` and enforce via `I18nManager.forceRTL(true)`.
- [ ] Build `ThemeProvider` using Zustand with Dark / Light / AMOLED modes.
- [ ] Persist theme selection to `react-native-mmkv` for instant load on startup.
- [ ] Define global design tokens: colors, typography scale, spacing, border radii.
- [ ] Set up i18n with `expo-localization` + `i18next` for EN, AR, UR.

---

### Phase 3 — Core Reading View & Typography
**Goal:** Fetch, cache, and render the Qur'an text perfectly across all screen sizes.

- [ ] Configure `TanStack Query` provider at the app root.
- [ ] Build **Home Screen** — List all 114 Surahs (Arabic name, English name, Āyah count, revelation type).
- [ ] Build **Surah Detail Screen** using `FlashList` for performant Āyah rendering.
- [ ] Load Uthmani font via `expo-font` ensuring all Tashkeel (diacritics) render correctly.
- [ ] Implement font-size control with live preview.
- [ ] Add **translation toggle** UI (show/hide translations per Āyah row).

---

### Phase 4 — Offline Storage & Bookmarking
**Goal:** Enable users to persist their progress and save Āyāt locally.

- [ ] Create `BookmarkStore` (Zustand + MMKV persistence).
- [ ] Implement long-press gesture on Āyah rows to trigger bookmark action.
- [ ] Build **Bookmarks Screen** — list all saved Āyāt with Surah/Āyah reference and one-tap navigation.
- [ ] Persist last-read position (Surah ID + Āyah index) and restore on app launch.
- [ ] Add **Download Manager** for offline audio caching with progress indicators.

---

### Phase 5 — Audio Integration
**Goal:** Deliver seamless, background-capable recitation playback.

- [ ] Install and configure `react-native-track-player` with a background service.
- [ ] Fetch audio URLs from the backend proxy per reciter and verse.
- [ ] Build a global **AudioPlayer** UI component (mini player + full-screen player).
- [ ] Implement verse-by-verse **synchronized highlighting** during playback.
- [ ] Expose lock-screen controls (play, pause, next verse, previous verse).
- [ ] Support reciter switching mid-playback.

---

### Phase 6 — AI Recitation Coach (Post-MVP)
**Goal:** On-device recitation error detection and corrective feedback.

- [ ] Integrate on-device speech recognition API.
- [ ] Build audio segmenter to isolate individual word utterances.
- [ ] Compare against reference phoneme model; compute confidence score per word.
- [ ] Highlight low-confidence words in the UI with corrective audio playback.

---

### Phase 7 — Advanced Features (Post-MVP)
**Goal:** Launch innovation features in sequential A/B tested rollouts.

- [ ] **Semantic Search**: Arabic root-word indexing engine.
- [ ] **Graph-RAG AI Assistant**: RAG pipeline on Tafsir + Hadith corpus.
- [ ] **Mood Triage Engine**: Sentiment classifier + curated content mapping.
- [ ] **Group Khatam**: Real-time collaborative reading backend (WebSocket or Firebase).
- [ ] **Haptic Tajweed**: Vibration pattern dictionary + playback sync.
- [ ] **AR Exegesis**: On-device OCR + camera overlay module.
- [ ] **Living Tafsir**: Moderation pipeline + community submission UI.

---

## 5. Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | 60fps scroll on FlashList; <2s cold start; audio starts within 500ms |
| Offline Capability | Core reading and bookmarks must work 100% offline |
| Accessibility | VoiceOver (iOS) & TalkBack (Android) support; haptic feedback; high-contrast mode |
| Security | No API secrets on client; HTTPS-only; MMKV data encrypted at rest |
| Scalability | Backend supports horizontal scaling; stateless token proxy |
| Localization | Arabic (RTL), English (LTR), Urdu (RTL) from launch |
| Privacy | AI Coach: audio processed on-device only; no audio stored or transmitted |

---

## 6. Success Metrics (KPIs)

| Metric | Target (6 months post-launch) |
|---|---|
| Daily Active Users (DAU) | 50,000+ |
| D7 Retention | ≥ 35% |
| Average Session Duration | ≥ 12 minutes |
| App Store Rating | ≥ 4.7 / 5.0 |
| Recitation Coach Adoption | ≥ 20% of active users |
| Audio Playback Sessions/Day | ≥ 80,000 |

---

## 7. Out of Scope (v1.0)

- Web application version.
- Quran memorization (Hifz) program management.
- Live streaming of Sheikh lectures.
- E-commerce / paid content model (freemium model deferred to v2).
