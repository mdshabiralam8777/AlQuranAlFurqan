/**
 * Favorites Data — curated surahs and essential verses for quick access.
 */

export interface FavoriteItem {
  /** Display title */
  titleEn: string;
  titleAr: string;
  titleUr: string;
  /** Short description of significance */
  descriptionEn: string;
  descriptionAr: string;
  descriptionUr: string;
  /** Navigation target */
  chapterId: number;
  /** Optional specific verse to scroll to */
  verse?: number;
  /** Optional verse end for ranges */
  verseEnd?: number;
  /** Icon name (SF Symbol) */
  icon: string;
}

export interface FavoriteSection {
  titleEn: string;
  titleAr: string;
  titleUr: string;
  items: FavoriteItem[];
}

export const FAVORITE_SECTIONS: FavoriteSection[] = [
  {
    titleEn: "Recommended Daily Recitations",
    titleAr: "تلاوات يومية موصى بها",
    titleUr: "تجویز کردہ روزانہ تلاوتیں",
    items: [
      {
        titleEn: "Surah Al-Mulk",
        titleAr: "سورة الملك",
        titleUr: "سورۃ الملک",
        descriptionEn:
          "Often recited before sleep for protection in the grave.",
        descriptionAr: "تُقرأ قبل النوم للحماية في القبر.",
        descriptionUr: "قبر کی حفاظت کے لیے سونے سے پہلے پڑھی جاتی ہے۔",
        chapterId: 67,
        icon: "moon.stars.fill",
      },
      {
        titleEn: "Surah Yasin",
        titleAr: "سورة يس",
        titleUr: "سورۃ یٰسین",
        descriptionEn:
          'Known as the "heart of the Quran"; recited for various needs.',
        descriptionAr: "معروف بقلب القرآن؛ تُقرأ لحاجات متعددة.",
        descriptionUr: "قرآن کا دل؛ مختلف ضروریات کے لیے پڑھی جاتی ہے۔",
        chapterId: 36,
        icon: "heart.fill",
      },
      {
        titleEn: "Surah Al-Waqi'ah",
        titleAr: "سورة الواقعة",
        titleUr: "سورۃ الواقعہ",
        descriptionEn: "Frequently recited for protection against poverty.",
        descriptionAr: "تُقرأ كثيراً للوقاية من الفقر.",
        descriptionUr: "غربت سے حفاظت کے لیے بکثرت پڑھی جاتی ہے۔",
        chapterId: 56,
        icon: "hands.sparkles.fill",
      },
      {
        titleEn: "Surah Ar-Rahman",
        titleAr: "سورة الرحمن",
        titleUr: "سورۃ الرحمٰن",
        descriptionEn: "Highlights Allah's mercy and favors.",
        descriptionAr: "تسلّط الضوء على رحمة الله ونعمه.",
        descriptionUr: "اللہ کی رحمت اور نعمتوں کا بیان۔",
        chapterId: 55,
        icon: "sun.max.fill",
      },
      {
        titleEn: "Surah Al-Kahf",
        titleAr: "سورة الكهف",
        titleUr: "سورۃ الکہف",
        descriptionEn:
          "Traditionally read on Fridays for protection and light.",
        descriptionAr: "تُقرأ تقليدياً يوم الجمعة للحماية والنور.",
        descriptionUr: "جمعہ کو نور اور حفاظت کے لیے پڑھی جاتی ہے۔",
        chapterId: 18,
        icon: "book.fill",
      },
    ],
  },
  {
    titleEn: "Essential Verses",
    titleAr: "آيات أساسية",
    titleUr: "اہم آیات",
    items: [
      {
        titleEn: "Ayat Al-Kursi",
        titleAr: "آية الكرسي",
        titleUr: "آیت الکرسی",
        descriptionEn:
          'The "Throne Verse"; regarded as the greatest verse for protection.',
        descriptionAr: "آية العرش؛ أعظم آية للحماية.",
        descriptionUr: "آیت العرش؛ حفاظت کی سب سے عظیم آیت۔",
        chapterId: 2,
        verse: 255,
        icon: "bookmark.fill",
      },
      {
        titleEn: "Last Two Verses of Al-Baqarah",
        titleAr: "آخر آيتين من البقرة",
        titleUr: "سورۃ البقرہ کی آخری دو آیات",
        descriptionEn: "Recited at night for sufficiency and protection.",
        descriptionAr: "تُقرأ ليلاً للكفاية والحماية.",
        descriptionUr: "رات کو کفایت اور حفاظت کے لیے پڑھی جاتی ہیں۔",
        chapterId: 2,
        verse: 285,
        verseEnd: 286,
        icon: "bookmark.fill",
      },
    ],
  },
];
