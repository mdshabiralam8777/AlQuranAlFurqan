/**
 * JuzListItem — a single row in the Juz list.
 *
 * Layout:
 *   [Number Badge]  [Juz Name & Start Info]  [Arabic Name]
 */

import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ui/ThemedText";
import { Spacing, TouchTarget } from "@/constants/spacing";
import { useAppTheme } from "@/context/ThemeContext";

export interface JuzInfo {
  juzNumber: number;
  nameArabic: string;
  nameEnglish: string;
  startSurah: string;
  startAyah: string;
  versesCount: number;
}

/** Static Juz data — the Quran has exactly 30 Juz */
export const JUZ_DATA: JuzInfo[] = [
  {
    juzNumber: 1,
    nameArabic: "آلم",
    nameEnglish: "Alif Lam Meem",
    startSurah: "Al-Fatihah",
    startAyah: "1:1",
    versesCount: 148,
  },
  {
    juzNumber: 2,
    nameArabic: "سَيَقُولُ",
    nameEnglish: "Sayaqool",
    startSurah: "Al-Baqarah",
    startAyah: "2:142",
    versesCount: 111,
  },
  {
    juzNumber: 3,
    nameArabic: "تِلْكَ ٱلرُّسُلُ",
    nameEnglish: "Tilkal Rusul",
    startSurah: "Al-Baqarah",
    startAyah: "2:253",
    versesCount: 126,
  },
  {
    juzNumber: 4,
    nameArabic: "لَن تَنَالُوا۟",
    nameEnglish: "Lan Tanaloo",
    startSurah: "Aal-E-Imran",
    startAyah: "3:92",
    versesCount: 131,
  },
  {
    juzNumber: 5,
    nameArabic: "وَٱلْمُحْصَنَاتُ",
    nameEnglish: "Wal Muhsanaat",
    startSurah: "An-Nisa",
    startAyah: "4:24",
    versesCount: 124,
  },
  {
    juzNumber: 6,
    nameArabic: "لَا يُحِبُّ ٱللَّهُ",
    nameEnglish: "La Yuhibbullah",
    startSurah: "An-Nisa",
    startAyah: "4:148",
    versesCount: 110,
  },
  {
    juzNumber: 7,
    nameArabic: "وَإِذَا سَمِعُوا۟",
    nameEnglish: "Wa Iza Samiu",
    startSurah: "Al-Ma'idah",
    startAyah: "5:82",
    versesCount: 149,
  },
  {
    juzNumber: 8,
    nameArabic: "وَلَوْ أَنَّنَا",
    nameEnglish: "Wa Lau Annana",
    startSurah: "Al-An'am",
    startAyah: "6:111",
    versesCount: 142,
  },
  {
    juzNumber: 9,
    nameArabic: "قَالَ ٱلْمَلَأُ",
    nameEnglish: "Qalal Malau",
    startSurah: "Al-A'raf",
    startAyah: "7:88",
    versesCount: 159,
  },
  {
    juzNumber: 10,
    nameArabic: "وَٱعْلَمُوٓا۟",
    nameEnglish: "Wa A'lamu",
    startSurah: "Al-Anfal",
    startAyah: "8:41",
    versesCount: 127,
  },
  {
    juzNumber: 11,
    nameArabic: "يَعْتَذِرُونَ",
    nameEnglish: "Ya'tazirun",
    startSurah: "At-Tawbah",
    startAyah: "9:93",
    versesCount: 151,
  },
  {
    juzNumber: 12,
    nameArabic: "وَمَا مِن دَآبَّةٍ",
    nameEnglish: "Wa Ma Min Da'bah",
    startSurah: "Hud",
    startAyah: "11:6",
    versesCount: 170,
  },
  {
    juzNumber: 13,
    nameArabic: "وَمَا أُبَرِّئُ",
    nameEnglish: "Wa Ma Ubarri'u",
    startSurah: "Yusuf",
    startAyah: "12:53",
    versesCount: 154,
  },
  {
    juzNumber: 14,
    nameArabic: "رُبَمَا",
    nameEnglish: "Rubama",
    startSurah: "Al-Hijr",
    startAyah: "15:1",
    versesCount: 227,
  },
  {
    juzNumber: 15,
    nameArabic: "سُبْحَانَ ٱلَّذِى",
    nameEnglish: "Subhanallazi",
    startSurah: "Al-Isra",
    startAyah: "17:1",
    versesCount: 185,
  },
  {
    juzNumber: 16,
    nameArabic: "قَالَ أَلَمْ",
    nameEnglish: "Qal Alam",
    startSurah: "Al-Kahf",
    startAyah: "18:75",
    versesCount: 269,
  },
  {
    juzNumber: 17,
    nameArabic: "ٱقْتَرَبَ لِلنَّاسِ",
    nameEnglish: "Iqtaraba Linnas",
    startSurah: "Al-Anbiya",
    startAyah: "21:1",
    versesCount: 190,
  },
  {
    juzNumber: 18,
    nameArabic: "قَدْ أَفْلَحَ",
    nameEnglish: "Qad Aflaha",
    startSurah: "Al-Mu'minun",
    startAyah: "23:1",
    versesCount: 202,
  },
  {
    juzNumber: 19,
    nameArabic: "وَقَالَ ٱلَّذِينَ",
    nameEnglish: "Wa Qalallazina",
    startSurah: "Al-Furqan",
    startAyah: "25:21",
    versesCount: 339,
  },
  {
    juzNumber: 20,
    nameArabic: "أَمَّنْ خَلَقَ",
    nameEnglish: "A'man Khalaq",
    startSurah: "An-Naml",
    startAyah: "27:56",
    versesCount: 171,
  },
  {
    juzNumber: 21,
    nameArabic: "أُتْلُ مَا أُوحِيَ",
    nameEnglish: "Utlu Ma Uhiya",
    startSurah: "Al-Ankabut",
    startAyah: "29:46",
    versesCount: 178,
  },
  {
    juzNumber: 22,
    nameArabic: "وَمَن يَقْنُتْ",
    nameEnglish: "Wa Man Yaqnut",
    startSurah: "Al-Ahzab",
    startAyah: "33:31",
    versesCount: 169,
  },
  {
    juzNumber: 23,
    nameArabic: "وَمَآ لِيَ",
    nameEnglish: "Wa Mali",
    startSurah: "Ya-Sin",
    startAyah: "36:28",
    versesCount: 357,
  },
  {
    juzNumber: 24,
    nameArabic: "فَمَنْ أَظْلَمُ",
    nameEnglish: "Faman Azlamu",
    startSurah: "Az-Zumar",
    startAyah: "39:32",
    versesCount: 175,
  },
  {
    juzNumber: 25,
    nameArabic: "إِلَيْهِ يُرَدُّ",
    nameEnglish: "Ilaihi Yuraddu",
    startSurah: "Fussilat",
    startAyah: "41:47",
    versesCount: 246,
  },
  {
    juzNumber: 26,
    nameArabic: "حم",
    nameEnglish: "Ha Meem",
    startSurah: "Al-Ahqaf",
    startAyah: "46:1",
    versesCount: 195,
  },
  {
    juzNumber: 27,
    nameArabic: "قَالَ فَمَا خَطْبُكُمْ",
    nameEnglish: "Qala Fama Khatbukum",
    startSurah: "Adh-Dhariyat",
    startAyah: "51:31",
    versesCount: 399,
  },
  {
    juzNumber: 28,
    nameArabic: "قَدْ سَمِعَ ٱللَّهُ",
    nameEnglish: "Qad Sami Allah",
    startSurah: "Al-Mujadila",
    startAyah: "58:1",
    versesCount: 137,
  },
  {
    juzNumber: 29,
    nameArabic: "تَبَارَكَ ٱلَّذِى",
    nameEnglish: "Tabarakallazi",
    startSurah: "Al-Mulk",
    startAyah: "67:1",
    versesCount: 431,
  },
  {
    juzNumber: 30,
    nameArabic: "عَمَّ يَتَسَآءَلُونَ",
    nameEnglish: "Amma Yatasa'alun",
    startSurah: "An-Naba",
    startAyah: "78:1",
    versesCount: 564,
  },
];

export interface JuzListItemProps {
  juz: JuzInfo;
}

export function JuzListItem({ juz }: JuzListItemProps) {
  const { colors } = useAppTheme();
  const router = useRouter();

  const handlePress = () => {
    // Navigate to the specific surah and verse where this Juz starts
    const [surahNum, verseNum] = juz.startAyah.split(":");
    router.push(`/surah/${surahNum}?verse=${verseNum}&isJuz=true&mode=mushaf`);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        {
          borderBottomColor: colors.separator,
          backgroundColor: pressed ? colors.bgSecondary : colors.bgPrimary,
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Juz ${juz.juzNumber}, ${juz.nameEnglish}`}
    >
      {/* Number badge */}
      <View style={[styles.badgeContainer, { borderColor: colors.gold }]}>
        <View style={styles.numberWrapper}>
          <ThemedText role="verseNumber" color={colors.textPrimary}>
            {juz.juzNumber}
          </ThemedText>
        </View>
      </View>

      {/* Juz Details */}
      <View style={styles.contentContainer}>
        <ThemedText role="subtitle" color={colors.textPrimary}>
          Juz {juz.juzNumber}
        </ThemedText>
        <View style={styles.metaContainer}>
          <ThemedText role="caption" color={colors.textSecondary}>
            {juz.startSurah}
          </ThemedText>
          <View
            style={[styles.dot, { backgroundColor: colors.textSecondary }]}
          />
          <ThemedText role="caption" color={colors.textSecondary}>
            Starts at {juz.startAyah}
          </ThemedText>
        </View>
      </View>

      {/* Arabic name */}
      <View style={styles.rightContainer}>
        <ThemedText role="arabicSmall" color={colors.gold}>
          {juz.nameArabic}
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    minHeight: TouchTarget.min,
  },
  badgeContainer: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.md,
  },
  numberWrapper: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.xs,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: Spacing.sm,
  },
  rightContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
