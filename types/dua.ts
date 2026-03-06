/**
 * Dua Types — shared interfaces for all dua data.
 */

/** Base dua fields shared by all categories (Quran, Hadith, Adhkar) */
export interface BaseDua {
  Arabic: string;
  EnTranslation: string;
  UrTranslation: string;
  Reference: string;
}

/** Quran Dua — base fields only */
export type QuranDua = BaseDua;

/** Hadith Dua — adds context labels */
export interface HadithDua extends BaseDua {
  EnglishLabel: string;
  UrduLabel: string;
}

/** Adhkar Dua — adds special recitation instructions */
export interface AdhkarDua extends BaseDua {
  EnSpecialInstruction: string;
  UrSpecialInstruction: string;
}

/** Union type for any dua item */
export type DuaItem = QuranDua | HadithDua | AdhkarDua;

/** Dua category identifiers */
export type DuaCategoryId =
  | "quran-dua"
  | "hadith-dua"
  | "morning-adhkar"
  | "evening-adhkar";

/** Category metadata for the categories screen */
export interface DuaCategory {
  id: DuaCategoryId;
  titleEn: string;
  titleAr: string;
  titleUr: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionUr: string;
  icon: string;
  count: number;
}

/** Type guards */
export function isHadithDua(dua: DuaItem): dua is HadithDua {
  return "EnglishLabel" in dua;
}

export function isAdhkarDua(dua: DuaItem): dua is AdhkarDua {
  return "EnSpecialInstruction" in dua;
}
