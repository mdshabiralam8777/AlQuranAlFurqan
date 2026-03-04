# Frontend UI Plan — Al Quran Al Furqan

## React Native (Expo) — Redesign

---

## 1. Design Philosophy

> **Principle:** Sacred minimalism. The Quranic text is the hero — every UI decision either serves the text or disappears.

The UI draws from the visual language shared by all major Quran apps, elevating it with modern craftsmanship and a premium **Midnight Navy** aesthetic.

---

## 2. Design System

### 2.1 Color Palette

Based on the provided design specifications (Screens 1–6).

| Token                    | Light Mode | Dark Mode | Usage                                                                                |
| ------------------------ | ---------- | --------- | ------------------------------------------------------------------------------------ |
| `--color-bg-primary`     | `#FAF9F6`  | `#0A192F` | Main app background (Ivory in light mode, Navy in dark mode). Mushaf reading surface |
| `--color-bg-secondary`   | `#F4F2E9`  | `#112240` | Cards, Elevated Surfaces, Settings rows                                              |
| `--color-navy-primary`   | `#0A192F`  | `#0A192F` | Primary Brand Color (Headers, Splash Screen, Nav Bar, primary accents)               |
| `--color-gold`           | `#C5A059`  | `#C5A059` | Primary Accent Gold (Buttons, Ornaments, Active Tab, Calligraphy)                    |
| `--color-text-primary`   | `#1C1C1C`  | `#FAF9F6` | Reading text, main headings                                                          |
| `--color-text-secondary` | `#424242`  | `#9CA3AF` | English translation, labels, metadata                                                |
| `--color-text-arabic`    | `#000000`  | `#FAF9F6` | Arabic Quran text (pitch black in light mode for max contrast)                       |
| `--color-separator`      | `#E5DDD0`  | `#233554` | List dividers, subtle outlines                                                       |

### 2.2 Typography

| Role                 | Font                 | Weight  | Size (default) |
| -------------------- | -------------------- | ------- | -------------- |
| Arabic Quran Text    | KFGQPC Uthmanic Hafs | Regular | 28–32sp        |
| Arabic Surah Title   | Amiri                | Bold    | 24sp           |
| Verse Number Badge   | Amiri                | Regular | 12sp           |
| Translation          | Inter                | Regular | 15sp           |
| UI Navigation / Meta | Inter                | Medium  | 12sp-14sp      |

### 2.3 Screen Elements & Padding

- **Base Grid**: 8dp
- **Card Border Radius**: 12dp
- **Content Padding**: 16dp horizontal standard.

---

## 3. Screen Inventory & Layouts

### 3.1 Splash Screen (Screen 1)

- **Background**: Solid Midnight Navy (`#0A192F`)
- **Center**: Polished Gold Emblem (`#C5A059`) featuring stylized open Quran + Arabic calligraphy.
- **Typography**: "Al Quran Al Furqan" (Ivory/Refined weight), Tagline "Your Divine Companion" (Lighter weight).
- **Loading State**: Gold spinner at the bottom center.

### 3.2 Home Dashboard (Screen 2)

- **Header**: Midnight Navy background. Shows "Assalamu Alaikum", Location, Date, and a Notification bell.
- **Top Card (Last Read)**: Elevated Ivory card. Shows Surah Name, Ayah number, "Continue Reading" button.
- **Quick Access Row**: Horizontal scrolling pills/circles for (Juz, Bookmark, Qibla, Duas).
- **Verse of the Day**: Housed in a styled card with translation.

### 3.3 Surah Index (Explore/Search - Screen 3)

- **Header**: Midnight Navy with Search Bar input.
- **Filters**: Scrollable Chips: [Makkah] [Madinah] [All].
- **List Items**:
  - Left: Surah number enclosed in a stylized octagon/star.
  - Middle: English name, "Ayahs: X", "Makki/Madani".
  - Right: Arabic text. Play button shortcut.

### 3.4 Reading Screen (Screens 5 & 6)

Two interchangeable viewing modes to give users preference:

**Mode A: Mushaf (Arabic Only - Screen 6)**

- Continuous, flowing Arabic text wrapping naturally like a physical Mushaf.
- Ornate Verse Markers (`﴿١٢﴾`) inline at the end of each Ayah.
- Minimal distractions.

**Mode B: Translation (List View - Screen 5)**

- Vertical stacked list.
- Top: Arabic text (right-aligned).
- Middle: Translation text (left-aligned) with transliteration.
- Bottom/Side: Action icons (Play sub-button for individual ayah).
- Separator line between ayahs.

**Common Header/Footer reading elements**:

- **Header**: Midnight Navy nav bar, Back Arrow, "Surah [Name], Ayah [Range]", Bookmark icon.
- **Footer**: Standard app bottom tab-bar or minimalist contextual audio tools.

### 3.5 Settings / Configuration (Screen 4)

- **Header**: "Settings"
- **Controls**:
  - Dropdowns for: Reciter (e.g. Mishari Rashid), Translation (e.g. Sahih International), Script Style.
  - Slider: Font Size adjustment (`A` to `A+`).
  - Toggles: "Auto-play Ayah", "Ayah Recitation Controls".

---

## 4. Components & SVG Asset Architecture

The app heavily relies on scalable vector graphics (SVGs) tinted appropriately for the active theme. All SVGs are housed in `assets/svgs`.

- `<IslamicDivider>`: used underneath headers to establish context.
- `<AyahSeparator>`: ornate gold inline marker for end of a verse.
- `<Bismillah>`: Calligraphy rendered at the start of Surahs.
- `<IslamicBorder>`: Surrounding decorative framing for special cards.

---

## 5. Development Strategy

1. **Tokens**: Redefine `colors.ts`, `spacing.ts`, and `typography.ts` strictly following the #0A192F + #C5A059 palette.
2. **Global Components**: Build `NavyHeader`, `ThemedText` updates, `FilterChip`.
3. **Screen Rebuilds**:
   - Update `MushafPage.tsx` to handle conditional rendering (List vs Mushaf block wrap).
   - Rebuild `index.tsx` (Home) matching Screen 2.
   - Rebuild Surah Index matching Screen 3.
   - Add/Update Settings matching Screen 4.
