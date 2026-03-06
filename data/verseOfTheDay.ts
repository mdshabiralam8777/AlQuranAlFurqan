/**
 * Verse of the Day — curated pool of short/medium verses.
 *
 * Selection criteria:
 *  - Arabic text length similar to 20:114 (up to ~15% longer)
 *  - Motivational, reflective, or protective themes
 *  - Trilingual (Arabic + English + Urdu translations)
 */

export interface DailyVerse {
  arabic: string;
  translationEn: string;
  translationUr: string;
  reference: string;
  /** Surah:Ayah for navigation */
  verseKey: string;
}

export const VERSE_POOL: DailyVerse[] = [
  {
    arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
    translationEn: "\"And say: 'My Lord, increase me in knowledge.'\"",
    translationUr: '"اور کہو: اے میرے رب! میرا علم بڑھا دے۔"',
    reference: "Surah Taha [20:114]",
    verseKey: "20:114",
  },
  {
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translationEn: '"For indeed, with hardship comes ease."',
    translationUr: '"بے شک مشکل کے ساتھ آسانی ہے۔"',
    reference: "Surah Ash-Sharh [94:5]",
    verseKey: "94:5",
  },
  {
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    translationEn: '"Indeed, Allah is with the patient."',
    translationUr: '"بے شک اللہ صبر کرنے والوں کے ساتھ ہے۔"',
    reference: "Surah Al-Baqarah [2:153]",
    verseKey: "2:153",
  },
  {
    arabic: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    translationEn:
      '"And whoever relies upon Allah — then He is sufficient for him."',
    translationUr: '"اور جو اللہ پر بھروسہ کرے تو وہ اسے کافی ہے۔"',
    reference: "Surah At-Talaq [65:3]",
    verseKey: "65:3",
  },
  {
    arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً",
    translationEn:
      '"Our Lord, give us good in this world and good in the Hereafter."',
    translationUr:
      '"اے ہمارے رب! ہمیں دنیا میں بھی بھلائی دے اور آخرت میں بھی بھلائی دے۔"',
    reference: "Surah Al-Baqarah [2:201]",
    verseKey: "2:201",
  },
  {
    arabic: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ",
    translationEn:
      '"And your Lord is going to give you, and you will be satisfied."',
    translationUr:
      '"اور عنقریب تیرا رب تجھے اتنا دے گا کہ تو راضی ہو جائے گا۔"',
    reference: "Surah Ad-Duha [93:5]",
    verseKey: "93:5",
  },
  {
    arabic: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    translationEn:
      '"Unquestionably, by the remembrance of Allah hearts find rest."',
    translationUr: '"سن لو! اللہ کے ذکر سے دلوں کو سکون ملتا ہے۔"',
    reference: "Surah Ar-Ra'd [13:28]",
    verseKey: "13:28",
  },
  {
    arabic: "وَاللَّهُ خَيْرُ الرَّازِقِينَ",
    translationEn: '"And Allah is the best of providers."',
    translationUr: '"اور اللہ سب سے بہتر رزق دینے والا ہے۔"',
    reference: "Surah Al-Jumu'ah [62:11]",
    verseKey: "62:11",
  },
  {
    arabic: "إِنَّ رَحْمَتَ اللَّهِ قَرِيبٌ مِّنَ الْمُحْسِنِينَ",
    translationEn: '"Indeed, the mercy of Allah is near to the doers of good."',
    translationUr: '"بے شک اللہ کی رحمت نیکی کرنے والوں کے قریب ہے۔"',
    reference: "Surah Al-A'raf [7:56]",
    verseKey: "7:56",
  },
  {
    arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
    translationEn: '"And He is with you wherever you are."',
    translationUr: '"اور تم جہاں کہیں بھی ہو وہ تمہارے ساتھ ہے۔"',
    reference: "Surah Al-Hadid [57:4]",
    verseKey: "57:4",
  },
  {
    arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
    translationEn: '"So remember Me; I will remember you."',
    translationUr: '"پس تم مجھے یاد کرو میں تمہیں یاد کروں گا۔"',
    reference: "Surah Al-Baqarah [2:152]",
    verseKey: "2:152",
  },
  {
    arabic: "وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ",
    translationEn: '"And We are closer to him than his jugular vein."',
    translationUr: '"اور ہم اس کی شہ رگ سے بھی زیادہ اس کے قریب ہیں۔"',
    reference: "Surah Qaf [50:16]",
    verseKey: "50:16",
  },
  {
    arabic: "ادْعُونِي أَسْتَجِبْ لَكُمْ",
    translationEn: '"Call upon Me; I will respond to you."',
    translationUr: '"مجھے پکارو میں تمہاری دعا قبول کروں گا۔"',
    reference: "Surah Ghafir [40:60]",
    verseKey: "40:60",
  },
  {
    arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    translationEn: '"Allah does not burden a soul beyond that it can bear."',
    translationUr: '"اللہ کسی جان کو اس کی طاقت سے زیادہ تکلیف نہیں دیتا۔"',
    reference: "Surah Al-Baqarah [2:286]",
    verseKey: "2:286",
  },
  {
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
    translationEn: '"My Lord, expand for me my chest and ease for me my task."',
    translationUr: '"اے میرے رب! میرا سینہ کھول دے اور میرا کام آسان کر دے۔"',
    reference: "Surah Taha [20:25–26]",
    verseKey: "20:25",
  },
  {
    arabic: "وَإِلَىٰ رَبِّكَ فَارْغَبْ",
    translationEn: '"And to your Lord direct your longing."',
    translationUr: '"اور اپنے رب ہی کی طرف رغبت کر۔"',
    reference: "Surah Ash-Sharh [94:8]",
    verseKey: "94:8",
  },
  {
    arabic: "إِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ",
    translationEn:
      '"Indeed, Allah does not waste the reward of the doers of good."',
    translationUr: '"بے شک اللہ نیکی کرنے والوں کا اجر ضائع نہیں کرتا۔"',
    reference: "Surah Yusuf [12:90]",
    verseKey: "12:90",
  },
  {
    arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
    translationEn: '"Say: He is Allah, the One."',
    translationUr: '"کہو: وہ اللہ ایک ہے۔"',
    reference: "Surah Al-Ikhlas [112:1]",
    verseKey: "112:1",
  },
  {
    arabic: "وَعَسَىٰ أَن تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَّكُمْ",
    translationEn: '"Perhaps you dislike a thing and it is good for you."',
    translationUr:
      '"ہو سکتا ہے کہ تم کسی چیز کو ناپسند کرو اور وہ تمہارے لیے بہتر ہو۔"',
    reference: "Surah Al-Baqarah [2:216]",
    verseKey: "2:216",
  },
  {
    arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا",
    translationEn:
      '"Our Lord, let not our hearts deviate after You have guided us."',
    translationUr:
      '"اے ہمارے رب! ہمارے دلوں کو ٹیڑھا نہ کر جب تو نے ہمیں ہدایت دی ہے۔"',
    reference: "Surah Al-Imran [3:8]",
    verseKey: "3:8",
  },
  {
    arabic: "وَاصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ",
    translationEn:
      '"And be patient, for indeed, Allah does not waste the reward of the good."',
    translationUr:
      '"اور صبر کرو کیونکہ اللہ نیکی کرنے والوں کا اجر ضائع نہیں کرتا۔"',
    reference: "Surah Hud [11:115]",
    verseKey: "11:115",
  },
  {
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    translationEn:
      '"Sufficient for us is Allah, and He is the best Disposer of affairs."',
    translationUr: '"ہمیں اللہ کافی ہے اور وہ بہترین کارساز ہے۔"',
    reference: "Surah Al-Imran [3:173]",
    verseKey: "3:173",
  },
  {
    arabic: "وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ",
    translationEn: '"And my success is not but through Allah."',
    translationUr: '"اور میری توفیق صرف اللہ کی طرف سے ہے۔"',
    reference: "Surah Hud [11:88]",
    verseKey: "11:88",
  },
  {
    arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ",
    translationEn: '"My Lord, enable me to be grateful for Your favor."',
    translationUr:
      '"اے میرے رب! مجھے توفیق دے کہ میں تیری نعمت کا شکر ادا کروں۔"',
    reference: "Surah An-Naml [27:19]",
    verseKey: "27:19",
  },
  {
    arabic: "وَاللَّهُ يُحِبُّ الصَّابِرِينَ",
    translationEn: '"And Allah loves the patient."',
    translationUr: '"اور اللہ صبر کرنے والوں سے محبت کرتا ہے۔"',
    reference: "Surah Al-Imran [3:146]",
    verseKey: "3:146",
  },
  {
    arabic: "فَفِرُّوا إِلَى اللَّهِ",
    translationEn: '"So flee to Allah."',
    translationUr: '"پس اللہ کی طرف بھاگو۔"',
    reference: "Surah Adh-Dhariyat [51:50]",
    verseKey: "51:50",
  },
  {
    arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
    translationEn:
      '"Our Lord, accept from us. Indeed You are the Hearing, the Knowing."',
    translationUr:
      '"اے ہمارے رب! ہم سے قبول فرما۔ بے شک تو سننے والا جاننے والا ہے۔"',
    reference: "Surah Al-Baqarah [2:127]",
    verseKey: "2:127",
  },
  {
    arabic: "إِنَّ اللَّهَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    translationEn: '"Indeed, Allah is over all things competent."',
    translationUr: '"بے شک اللہ ہر چیز پر قادر ہے۔"',
    reference: "Surah Al-Baqarah [2:20]",
    verseKey: "2:20",
  },
  {
    arabic: "وَاللَّهُ غَفُورٌ رَّحِيمٌ",
    translationEn: '"And Allah is Forgiving and Merciful."',
    translationUr: '"اور اللہ بخشنے والا مہربان ہے۔"',
    reference: "Surah Al-Baqarah [2:218]",
    verseKey: "2:218",
  },
  {
    arabic:
      "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ",
    translationEn:
      '"O you who believe, seek help through patience and prayer."',
    translationUr: '"اے ایمان والو! صبر اور نماز سے مدد مانگو۔"',
    reference: "Surah Al-Baqarah [2:153]",
    verseKey: "2:153",
  },
];

/**
 * Get the verse of the day based on the current date.
 * Uses day-of-year modulo pool size for deterministic daily rotation.
 */
export function getVerseOfTheDay(): DailyVerse {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const index = dayOfYear % VERSE_POOL.length;
  return VERSE_POOL[index];
}
