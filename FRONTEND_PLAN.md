# Frontend UI Plan — Al Quran Al Furqan
## React Native (Expo) — Phase 2–5

---

## 1. Design Philosophy

> **Principle:** Sacred minimalism. The Quranic text is the hero — every UI decision either serves the text or disappears.

The UI draws from the visual language shared by all major Quran apps (Quran.com, iQuran, Al-Quran, Muslim Pro) while elevating it with modern craftsmanship. We follow established conventions users already know, so the learning curve is zero.

---

## 2. Design System

### 2.1 Color Palette

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `--color-bg-primary` | `#FFFDF5` (warm cream) | `#0D0D0D` (true black) | Screen background |
| `--color-bg-secondary` | `#F5F0E8` | `#1A1A1A` | Cards, sheets |
| `--color-bg-elevated` | `#FFFFFF` | `#242424` | Modal, bottom sheets |
| `--color-gold` | `#C5963A` | `#D4A84B` | Borders, decorative, accents |
| `--color-gold-light` | `#F2DFA0` | `#3D2E0D` | Subtle fills |
| `--color-green-primary` | `#1A6B3C` | `#2E9E5B` | Primary actions, icons |
| `--color-text-primary` | `#1A1A1A` | `#F0EDE6` | Main text |
| `--color-text-secondary` | `#6B6B6B` | `#999999` | Labels, meta |
| `--color-text-arabic` | `#1A1A1A` | `#F0EDE6` | Arabic Quran text |
| `--color-verse-highlight` | `#FFF3C4` | `#3D3010` | Currently playing verse |
| `--color-separator` | `#E5DDD0` | `#2E2E2E` | Dividers |

**AMOLED variant:** `--color-bg-primary: #000000` — available as a third theme option.

### 2.2 Typography

| Role | Font | Weight | Size (default) |
|---|---|---|---|
| Arabic Quran text | KFGQPC Uthmanic Hafs | Regular | 24–32sp (user-adjustable) |
| Arabic Surah name (header) | Amiri | Bold | 28sp |
| Bismillah | KFGQPC Uthmanic Hafs | Regular | 22sp |
| Verse number badge | Amiri | Regular | 12sp |
| Translation | System (Inter) | Regular | 15sp |
| Transliteration | System (Inter) | Italic | 13sp |
| UI labels / navigation | Inter | Medium | 14sp |

**Font size user control:** 5 steps — XS / S / **M (default)** / L / XL — stored in MMKV, applied globally.

### 2.3 Spacing & Grid

- Base unit: `4dp`
- Screen horizontal padding: `16dp`
- Arabic text line height: `2.2×` font size (critical for diacritics / Tashkeel)
- Touch target minimum: `44×44dp` (Apple HIG / Material standard)

### 2.4 Border Radius

| Component | Radius |
|---|---|
| Cards | `12dp` |
| Bottom sheet | `24dp` (top corners only) |
| Verse number badge | `50%` (circle) |
| Buttons | `8dp` |
| Surah list item | `0` (full-width) |

---

## 3. Islamic Decorative System

This is what gives the app its authentic Quran identity. All decorative assets are SVG-based (scalable, theme-colorable).

### 3.1 Islamic Border Frame (`<IslamicBorder />`)

Used on **Surah header cards** and **section dividers**. Inspired by traditional Mushaf (printed Quran) borders.

**Design spec:**
- Thin outer rule line in gold (`--color-gold`)
- Corner rosette ornaments (4-point geometric stars) in each corner
- Inner arabesque vine pattern along the frame edge — subtle, low opacity
- Used on: Surah header, page headers, "Verse of the Day" card on home screen

```
┌──── ✦ ─────────────────────── ✦ ────┐
│  ˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜  │
│         سورة البقرة                 │
│    Al-Baqarah • Surah 2 • 286 Āyāt  │
│    ◆ Madinah  •  Juz 1–3            │
│  ˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜˜  │
└──── ✦ ─────────────────────── ✦ ────┘
```

### 3.2 Verse Separator (`<AyahSeparator />`)

Between each Āyah, instead of a plain divider line:
- A decorative floral rosette centered on the line
- Verse number inside a circular badge styled like traditional Mushaf verse markers: `﴾ ١٢٣ ﴿`
- Color: gold tint

### 3.3 Bismillah Header (`<Bismillah />`)

- Rendered at the start of every Surah (except At-Tawbah — Surah 9 — which has no Bismillah)
- Uses a special calligraphic SVG of بِسْمِ ٱللَّـٰهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
- Gold tint, centered, with a subtle ornamental underline

### 3.4 Section Break Markers (Juz / Hizb / Ruku)

Inline within the verse list, non-intrusive tags:
- Juz break: `جزء ٢` — gold badge, pinned to the right edge
- Hizb / Quarter: small diamond symbol `◆` in the margin
- Sajdah marker: `۩` with a "Prostration" tooltip

---

## 4. Screen Inventory

### 4.1 Bottom Tab Navigation

| Tab | Icon | Label |
|---|---|---|
| 1 | 📖 open book | Quran |
| 2 | 🔍 magnifier | Search |
| 3 | 🔖 bookmark | Bookmarks |
| 4 | 📊 chart | Progress |
| 5 | ⚙️ gear | Settings |

Active tab indicator: a gold underline bar, not a filled background.

---

### 4.2 Home / Surah List Screen

**What it shows:**
- Top section: "Continue Reading" card — last Surah/Āyah with a decorative Islamic border, resume button
- "Verse of the Day" card — random Āyah with translation, framed in the IslamicBorder component
- Tabs: **By Surah** | **By Juz** | **By Page** — switches the list mode
- Surah list items: Surah number badge, Arabic name (right), English name + Āyah count (left), revelation type chip (Makkī/Madanī)

**UX conventions (standard across all Quran apps):**
- Surah numbers in a colored circle/hexagon badge
- Arabic name aligned right, transliteration + English name left
- Revelation type: chip or dot label

---

### 4.3 Surah Detail Screen (Reading View)

The most important screen. Must feel like reading a physical Mushaf.

**Layout (top → bottom):**
1. `<IslamicBorder>` **Surah Header**
   - Arabic name, English name, Surah number, Āyah count, revelation type, Juz range
2. `<Bismillah />` (if not Surah 9)
3. Scrollable `<FlashList>` of Āyah rows

**Āyah Row anatomy:**
```
┌─────────────────────────────────────────┐
│  ﴾ ١ ﴿                                  │  ← Verse number badge (gold, right)
│                                         │
│   ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ  │  ← Arabic text (RTL, large)
│                                         │
│   All praise is due to Allah, Lord of   │  ← Translation (if enabled)
│   all the worlds.                       │
│                                         │
│  [🔊] [🔖] [📋] [📝]                   │  ← Action icons (play, bookmark, copy, note)
└────────── ✦ ornament ✦ ──────────────┘  ← AyahSeparator
```

**Interaction affordances:**
- Tap verse → show action bar (Play, Bookmark, Copy, Share, Note, Tafsir)
- Long-press verse → select mode (multi-verse copy/share)
- Highlighted verse during audio playback: gold background tint, smooth animated transition
- Pinch to zoom → adjusts Arabic font size (saved to MMKV)

**View modes (toggle in header):**
- **Arabic only** — pure Quran text, maximum focus
- **With Translation** — Arabic + translation side-by-side or stacked
- **Word-by-Word** — each Arabic word tappable, shows meaning popup

---

### 4.4 Persistent Mini Audio Player

Floats above the tab bar when audio is playing. Standard Quran app pattern.

```
┌────────────────────────────────────────────────────┐
│  ◉ Mishary Rashid │ Al-Fatiha 1:3  │ ⏮ ⏸ ⏭  🔁 │
└────────────────────────────────────────────────────┘
```

- Tap → expands to **Full-Screen Player** with:
  - Reciter photo/avatar
  - Surah name + current verse
  - Timeline scrubber (verse-by-verse markers)
  - Play/Pause, Previous Verse, Next Verse, Repeat (verse/surah/none)
  - Speed control: 0.75× / 1× / 1.25× / 1.5×
  - Reciter switcher

---

### 4.5 Search Screen

- Search bar auto-focused on tab tap
- Tabs: **Quran Text** | **Translation** | **Surah Name**
- Results show: Surah name, verse key, matched text with highlighted query term
- Recent searches stored locally (MMKV)

---

### 4.6 Bookmarks Screen

- Grouped by Surah (collapsible sections)
- Each item: verse key, snippet of Arabic text, date saved
- Tap → deep-link to that exact Āyah in the reading view
- Swipe left → delete bookmark

---

### 4.7 Progress Screen

- Reading streak: flame icon + count, with a weekly calendar heatmap
- Quran completion ring chart (% read, with Juz breakdown)
- Today's goal card: e.g. "5 of 10 Āyāt read today"
- Lifetime stats: total Āyāt read, total listening time, total sessions

---

### 4.8 Settings Screen

Grouped sections (standard Quran app layout):

| Section | Options |
|---|---|
| **Display** | Theme (Light / Dark / AMOLED), Font Size (XS–XL) |
| **Arabic Script** | Uthmani Hafs / Indo-Pak / Imlaei |
| **Translation** | Language picker, translation picker (from API) |
| **Audio** | Default reciter, playback speed, auto-scroll toggle |
| **Notifications** | Prayer time alerts, daily verse reminder |
| **Storage** | Downloaded audio management, cache size, clear cache |
| **About** | App version, data source attribution (Quran.Foundation) |

---

## 5. Component Library

| Component | Description |
|---|---|
| `<IslamicBorder>` | Decorative SVG border frame — used on cards and headers |
| `<SurahHeader>` | Surah name header with revelation type badge |
| `<Bismillah>` | Calligraphic SVG, themed |
| `<AyahRow>` | Full verse row: Arabic, translation, action bar |
| `<AyahSeparator>` | Ornamental verse divider with verse number badge |
| `<JuzMarker>` | Inline Juz break label |
| `<SajdahMarker>` | Inline prostration marker |
| `<MiniPlayer>` | Persistent bottom audio bar |
| `<FullPlayer>` | Full-screen audio player |
| `<SurahListItem>` | Surah number badge + name row |
| `<VerseOfTheDay>` | Home screen featured verse card |
| `<LastReadCard>` | "Continue reading" resume card |
| `<StreakWidget>` | Flame + count + calendar heatmap |
| `<ThemedText>` | Theme-aware text primitive (wraps all text) |
| `<IslamicDivider>` | Thin gold rule line with center ornament |

---

## 6. Animations & Motion

| Element | Animation | Library |
|---|---|---|
| Verse playback highlight | Fade in gold bg, 200ms ease | Reanimated |
| Bottom sheet open | Spring slide up | Reanimated |
| Tab switch | Subtle fade | Expo Router |
| Font size change | Layout animation | Reanimated `Layout` |
| Bookmark save | Scale pulse on icon | Reanimated |
| Page transition | Horizontal slide | Expo Router |
| Streak flame | Subtle flicker loop | Reanimated |

**Rule:** No animation exceeds 350ms. All respect `useReducedMotion`.

---

## 7. RTL & Localization

| Rule | Detail |
|---|---|
| Default layout direction | RTL (Quran is Arabic-first) |
| `I18nManager.forceRTL` | Set to `true` at app init |
| UI language | EN / AR / UR (3 at launch) |
| Arabic text alignment | Always `textAlign: right` within RTL context |
| Number display | Arabic-Indic numerals `٠١٢٣` for verse numbers; Western `0123` for page/UI counters |
| Translation text | Always LTR regardless of app language |

---

## 8. Accessibility

- All interactive elements have `accessibilityLabel` in both English and Arabic
- Minimum contrast ratio: **4.5:1** (WCAG AA) for all text
- VoiceOver / TalkBack: AyahRow reads "Verse 1, Al-Fatiha: [Arabic text]. Translation: [translation]."
- `useReducedMotion` hook disables all non-essential animations
- Haptic feedback on bookmark save, playback start/stop

---

## 9. File Structure (Frontend)

```
app/
├── (tabs)/
│   ├── index.tsx            # Home / Surah list
│   ├── search.tsx           # Search
│   ├── bookmarks.tsx        # Bookmarks
│   ├── progress.tsx         # Progress & streaks
│   └── settings.tsx         # Settings
├── surah/[id].tsx           # Surah reading view
└── _layout.tsx              # Root layout + providers

components/
├── ui/
│   ├── ThemedText.tsx
│   ├── IslamicBorder.tsx
│   ├── IslamicDivider.tsx
│   └── Bismillah.tsx
├── quran/
│   ├── AyahRow.tsx
│   ├── AyahSeparator.tsx
│   ├── SurahHeader.tsx
│   ├── SurahListItem.tsx
│   ├── JuzMarker.tsx
│   └── SajdahMarker.tsx
├── audio/
│   ├── MiniPlayer.tsx
│   └── FullPlayer.tsx
└── home/
    ├── LastReadCard.tsx
    ├── VerseOfTheDay.tsx
    └── StreakWidget.tsx

constants/
├── colors.ts               # Design token definitions
├── typography.ts           # Font scale
└── spacing.ts              # Base unit grid

assets/
├── fonts/
│   ├── KFGQPC-Uthmanic-Hafs.ttf
│   └── Amiri-*.ttf
└── svg/
    ├── islamic-border-corner.svg
    ├── bismillah.svg
    └── verse-ornament.svg
```

---

## 10. UI Conventions Shared Across All Major Quran Apps

These are non-negotiable — users will expect them:

| Convention | Implementation |
|---|---|
| Verse number inside `﴾ ﴿` brackets | `AyahSeparator` component |
| Bismillah before every Surah (except Surah 9) | `<Bismillah />` component, conditionally rendered |
| Sajdah prostration marker `۩` | `<SajdahMarker />` inline in FlashList |
| Gold color for decorative/accent elements | `--color-gold` token |
| Arabic text is always right-aligned, large, and leading | AyahRow layout |
| Translation always smaller and below/beside Arabic | AyahRow layout |
| Persistent mini audio player above tabs | `<MiniPlayer />` in root `_layout.tsx` |
| Long-press to bookmark / share | Gesture handler on AyahRow |
| Surah list shows number, Arabic name, English name, count | SurahListItem |
| Revelation type badge (Makkī / Madanī) | SurahHeader + SurahListItem |
| Dark mode is first-class, not an afterthought | `ThemeProvider` with Zustand + MMKV |

---

## 11. Fonts Required

Download and place in `assets/fonts/`:

| Font | Source | Usage |
|---|---|---|
| `KFGQPC Uthmanic Hafs` | [qurancomplex.gov.sa](https://qurancomplex.gov.sa) | Main Quran text |
| `Amiri` | Google Fonts | Surah names, headers |
| `Inter` | Google Fonts | All UI / translations |

Load all via `useFonts()` in the root `_layout.tsx` before rendering.
