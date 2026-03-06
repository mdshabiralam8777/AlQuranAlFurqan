/**
 * Duas Data — barrel export + category metadata.
 */

import type { DuaCategory, DuaCategoryId, DuaItem } from "@/types/dua";

import eveningAdhkar from "./evening-adhkar.json";
import hadithDua from "./hadith-dua.json";
import morningAdhkar from "./morning-adhkar.json";
import quranDua from "./quran-dua.json";

/** Map of category ID → dua array */
const DUA_DATA: Record<DuaCategoryId, DuaItem[]> = {
  "quran-dua": quranDua as DuaItem[],
  "hadith-dua": hadithDua as DuaItem[],
  "morning-adhkar": morningAdhkar as DuaItem[],
  "evening-adhkar": eveningAdhkar as DuaItem[],
};

/** Category metadata for rendering the category cards */
export const DUA_CATEGORIES: DuaCategory[] = [
  {
    id: "quran-dua",
    titleEn: "Quranic Duas",
    titleAr: "أدعية قرآنية",
    titleUr: "قرآنی دعائیں",
    descriptionEn: "Supplications from the Holy Quran",
    descriptionAr: "أدعية من القرآن الكريم",
    descriptionUr: "قرآن مجید سے دعائیں",
    icon: "book.fill",
    count: quranDua.length,
  },
  {
    id: "hadith-dua",
    titleEn: "Hadith Duas",
    titleAr: "أدعية من الحديث",
    titleUr: "حدیث کی دعائیں",
    descriptionEn: "Supplications from Hadith",
    descriptionAr: "أدعية من أحاديث النبي ﷺ",
    descriptionUr: "احادیث نبوی ﷺ سے دعائیں",
    icon: "text.book.closed.fill",
    count: hadithDua.length,
  },
  {
    id: "morning-adhkar",
    titleEn: "Morning Adhkar",
    titleAr: "أذكار الصباح",
    titleUr: "صبح کے اذکار",
    descriptionEn: "Morning remembrance & protection",
    descriptionAr: "أذكار الصباح والحماية",
    descriptionUr: "صبح کی یاد اور حفاظت",
    icon: "sun.max.fill",
    count: morningAdhkar.length,
  },
  {
    id: "evening-adhkar",
    titleEn: "Evening Adhkar",
    titleAr: "أذكار المساء",
    titleUr: "شام کے اذکار",
    descriptionEn: "Evening remembrance & protection",
    descriptionAr: "أذكار المساء والحماية",
    descriptionUr: "شام کی یاد اور حفاظت",
    icon: "moon.stars.fill",
    count: eveningAdhkar.length,
  },
];

/** Retrieve duas for a specific category */
export function getDuasByCategory(categoryId: DuaCategoryId): DuaItem[] {
  return DUA_DATA[categoryId] ?? [];
}

/** Retrieve category metadata by ID */
export function getCategoryById(
  categoryId: DuaCategoryId,
): DuaCategory | undefined {
  return DUA_CATEGORIES.find((c) => c.id === categoryId);
}
