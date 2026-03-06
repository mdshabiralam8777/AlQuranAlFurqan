/**
 * Info Data — content for the Info screen accordion sections.
 */

export interface InfoItem {
  /** Symbol shown on the left (e.g., م, لا, ج) */
  symbol: string;
  /** Title of the ruling */
  titleEn: string;
  titleAr: string;
  titleUr: string;
  /** The ruling */
  rulingEn: string;
  rulingAr: string;
  rulingUr: string;
  /** Detailed explanation */
  reasonEn: string;
  reasonAr: string;
  reasonUr: string;
  /** Optional practical note */
  noteEn?: string;
  noteAr?: string;
  noteUr?: string;
}

export interface InfoSection {
  titleEn: string;
  titleAr: string;
  titleUr: string;
  icon: string;
  items: InfoItem[];
}

export const INFO_SECTIONS: InfoSection[] = [
  {
    titleEn: "Tajweed — Waqf Rulings",
    titleAr: "التجويد — أحكام الوقف",
    titleUr: "تجوید — وقف کے احکام",
    icon: "book.fill",
    items: [
      {
        symbol: "م",
        titleEn: "Waqf Lāzim (Compulsory Stop)",
        titleAr: "وقف لازم",
        titleUr: "وقفِ لازم (ضروری ٹھہراؤ)",
        rulingEn: "You must stop here.",
        rulingAr: "يجب الوقف هنا.",
        rulingUr: "یہاں رکنا ضروری ہے۔",
        reasonEn:
          "If you continue and connect this word with the next one, the meaning of the verse will be severely altered or completely changed into something incorrect.",
        reasonAr:
          "إذا استمررت ووصلت هذه الكلمة بالتي بعدها، فسيتغير معنى الآية تغيراً شديداً أو يتحول إلى معنى غير صحيح.",
        reasonUr:
          "اگر آپ رک کر اگلے لفظ سے ملا دیں تو آیت کا مطلب بالکل بدل جائے گا یا غلط ہو جائے گا۔",
      },
      {
        symbol: "لا",
        titleEn: "Waqf Mamnū' (Prohibited Stop)",
        titleAr: "وقف ممنوع",
        titleUr: "وقفِ ممنوع (ٹھہرنا منع ہے)",
        rulingEn: "You must not intentionally stop here.",
        rulingAr: "لا يجوز الوقف هنا عمداً.",
        rulingUr: "یہاں جان بوجھ کر رکنا منع ہے۔",
        reasonEn:
          "Stopping at this sign breaks the sentence in the middle of an incomplete thought, which can distort or contradict the intended meaning.",
        reasonAr:
          "الوقف عند هذه العلامة يقطع الجملة في منتصف فكرة ناقصة، مما يشوه المعنى المقصود أو يناقضه.",
        reasonUr:
          "یہاں رکنا جملے کو ادھورے خیال کے بیچ توڑ دیتا ہے، جو مطلب کو بگاڑ سکتا ہے۔",
        noteEn:
          "If you run out of breath and are forced to stop here, you are not penalized. However, to maintain the correct meaning, you must go back a few words and restart so that you connect the phrase properly.",
        noteAr:
          "إذا انقطع نفسك واضطررت للوقف هنا فلا إثم عليك، لكن يجب أن تعود بضع كلمات وتعيد القراءة لتصل الجملة بشكل صحيح.",
        noteUr:
          "اگر سانس ختم ہو جائے اور رکنا پڑے تو گناہ نہیں، لیکن درست مطلب کے لیے چند الفاظ پیچھے جا کر دوبارہ پڑھیں۔",
      },
      {
        symbol: "ج",
        titleEn: "Waqf Jā'iz (Permissible Stop)",
        titleAr: "وقف جائز",
        titleUr: "وقفِ جائز (رکنا جائز ہے)",
        rulingEn: "You have the choice to stop or continue.",
        rulingAr: "لك الخيار بين الوقف والوصل.",
        rulingUr: "آپ کو رکنے یا جاری رکھنے کا اختیار ہے۔",
        reasonEn:
          "The sentence is complete in its meaning, but it is also grammatically connected to the next part. Neither stopping nor continuing changes the meaning, so both are equally acceptable.",
        reasonAr:
          "الجملة مكتملة المعنى، لكنها مرتبطة نحوياً بما بعدها. لا يتغير المعنى سواء وقفت أم واصلت، فكلاهما مقبول.",
        reasonUr:
          "جملہ معنوی طور پر مکمل ہے، لیکن اگلے حصے سے بھی جڑا ہوا ہے۔ رکنے یا جاری رکھنے سے مطلب نہیں بدلتا۔",
      },
      {
        symbol: "صلے",
        titleEn: "Al-Waṣl Awlā (Continuation is Better)",
        titleAr: "الوصل أولى",
        titleUr: "الوصل اولیٰ (ملانا بہتر ہے)",
        rulingEn:
          "It is better to continue reciting, though stopping is allowed.",
        rulingAr: "الأفضل الوصل وإن كان الوقف جائزاً.",
        rulingUr: "ملا کر پڑھنا بہتر ہے، لیکن رکنا بھی جائز ہے۔",
        reasonEn:
          '"Ṣalā" is an abbreviation for Al-Waṣl Awlā (connection is preferred). While the meaning is fine if you stop, the flow of the linguistic structure and the overall meaning are much stronger and more cohesive if you connect it to the next word.',
        reasonAr:
          '"صلے" اختصار لِ "الوصل أولى". المعنى لا يتأثر إذا وقفت، لكن سياق الجملة وتماسك المعنى يكون أقوى وأجمل عند الوصل.',
        reasonUr:
          '"صلے" الوصل اولیٰ کا مخفف ہے۔ رکنے سے مطلب ٹھیک رہتا ہے، لیکن ملانے سے جملے کا بہاؤ اور مطلب زیادہ مربوط ہوتا ہے۔',
      },
      {
        symbol: "قلے",
        titleEn: "Al-Waqf Awlā (Stopping is Better)",
        titleAr: "الوقف أولى",
        titleUr: "الوقف اولیٰ (رکنا بہتر ہے)",
        rulingEn: "It is better to stop here, though continuing is allowed.",
        rulingAr: "الأفضل الوقف وإن كان الوصل جائزاً.",
        rulingUr: "رکنا بہتر ہے، لیکن ملانا بھی جائز ہے۔",
        reasonEn:
          '"Qalā" is an abbreviation for Al-Waqf Awlā (stopping is preferred). Pausing here helps emphasize a particular point or clearly separates two distinct thoughts, making the meaning easier to understand for the listener.',
        reasonAr:
          '"قلے" اختصار لِ "الوقف أولى". الوقف هنا يساعد على تأكيد نقطة معينة أو فصل فكرتين مختلفتين، مما يسهّل فهم المعنى للمستمع.',
        reasonUr:
          '"قلے" الوقف اولیٰ کا مخفف ہے۔ یہاں رکنا کسی خاص نکتے پر زور دیتا ہے یا دو مختلف خیالات کو واضح طور پر الگ کرتا ہے۔',
      },
      {
        symbol: "∴ ∴",
        titleEn: "Waqf Mu'ānaqah (Embracing Stop)",
        titleAr: "وقف معانقة",
        titleUr: "وقفِ معانقہ (ملانے والا ٹھہراؤ)",
        rulingEn:
          "These dots always come in pairs. You may stop at either the first sign or the second sign, but not both.",
        rulingAr:
          "تأتي هذه النقاط دائماً في أزواج. يجوز الوقف عند الأولى أو الثانية فقط، وليس عند كلتيهما.",
        rulingUr:
          "یہ نقطے ہمیشہ جوڑے میں آتے ہیں۔ آپ پہلی یا دوسری جگہ رک سکتے ہیں، لیکن دونوں جگہ نہیں۔",
        reasonEn:
          "This indicates a shared phrase that can belong to either the preceding sentence or the following sentence. If you stop at the first set of dots, you must read through the second set. If you read through the first set, you must stop at the second set.",
        reasonAr:
          "هذا يشير إلى عبارة مشتركة يمكن أن تنتمي للجملة السابقة أو اللاحقة. إذا وقفت عند الأولى، يجب أن تواصل عند الثانية، والعكس.",
        reasonUr:
          "یہ ایک مشترکہ جملے کی نشاندہی کرتا ہے جو پچھلے یا اگلے جملے سے جڑ سکتا ہے۔ پہلے پر رکیں تو دوسرے پر ملائیں، دوسرے پر رکیں تو پہلے پر ملائیں۔",
      },
      {
        symbol: "س",
        titleEn: "Saktah (Breathless Pause)",
        titleAr: "سكتة",
        titleUr: "سکتہ (بے سانس وقفہ)",
        rulingEn:
          "You must make a slight pause without taking a breath, and then immediately continue reciting.",
        rulingAr:
          "يجب عمل وقفة خفيفة بدون أخذ نفس، ثم الاستمرار في القراءة فوراً.",
        rulingUr: "سانس لیے بغیر ہلکا سا ٹھہریں اور فوراً پڑھتے رہیں۔",
        reasonEn:
          "This is a very brief pause (usually measured as two counts) that separates two words to prevent them from blending in a way that might suggest an incorrect meaning. In the most common recitation style (Hafs 'an 'Asim), there are four obligatory places in the Quran where this specific pause occurs (in Surahs Al-Kahf, Yaseen, Al-Qiyamah, and Al-Mutaffifin).",
        reasonAr:
          "هي وقفة قصيرة جداً (عادة بمقدار حركتين) تفصل كلمتين لمنع اندماجهما بطريقة قد توحي بمعنى خاطئ. في رواية حفص عن عاصم، هناك أربعة مواضع واجبة في القرآن (في سور: الكهف، يس، القيامة، والمطففين).",
        reasonUr:
          "یہ بہت مختصر وقفہ ہے (عموماً دو حرکتوں کے برابر) جو دو الفاظ کو ملنے سے روکتا ہے تاکہ غلط مطلب نہ نکلے۔ حفص عن عاصم میں قرآن میں چار مقامات پر یہ واجب ہے (سورہ الکہف، یٰسین، القیامۃ، اور المطففین)۔",
      },
    ],
  },
];
