/**
 * Strips HTML tags and footnote superscripts from provided text.
 * The Quran Foundation (QF) API wraps translations in HTML and uses
 * <sup> tags for footnotes which we want to remove for cleaner display.
 */
export function stripHtml(raw: string): string {
  if (!raw) return "";
  return raw
    .replace(/<sup[^>]*>.*?<\/sup>/gi, "") // remove footnote markers
    .replace(/<[^>]+>/g, "") // remove all remaining HTML tags
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}
