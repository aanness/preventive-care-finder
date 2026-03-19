import { TOPIC_URLS } from "../constants/categories";

/**
 * Infers a category key ("screening" | "vaccine" | "lifestyle")
 * from a topic's Title and Categories fields.
 */
export function detectCategory(topic) {
  const title = (topic.Title || "").toLowerCase();
  const cats  = (topic.Categories || "").toLowerCase();

  if (
    cats.includes("vaccine") ||
    title.includes("vaccine") ||
    title.includes("flu shot") ||
    title.includes("immunize")
  ) return "vaccine";

  if (
    cats.includes("screen") ||
    title.includes("screen") ||
    title.includes("test")  ||
    title.includes("cancer") ||
    title.includes("blood pressure") ||
    title.includes("cholesterol") ||
    title.includes("diabetes") ||
    title.includes("hiv") ||
    title.includes("mammogram") ||
    title.includes("colonoscopy")
  ) return "screening";

  return "lifestyle";
}

/**
 * Resolves a verified odphp.health.gov URL for a given topic title.
 * Falls back to the MyHealthFinder search page if no match is found.
 */
export function resolveUrl(title) {
  const t = title.toLowerCase();
  for (const [key, url] of Object.entries(TOPIC_URLS)) {
    if (t.includes(key)) return url;
  }
  return `https://odphp.health.gov/myhealthfinder/search?q=${encodeURIComponent(title)}`;
}
