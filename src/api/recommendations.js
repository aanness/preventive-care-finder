// This file handles all communication with the ODPHP MyHealthFinder API.
// It fetches recommendations based on the patient's age, sex, and pregnancy status,
// then shapes the raw API response into a clean format the UI can use.

import { detectCategory } from "../utils/healthUtils";

export async function fetchRecommendations(age, sex, pregnant) {
  // Build the query string parameters the API expects
  // Pregnant is only ever "yes" if the patient is female and selected yes
  const params = new URLSearchParams({
    Lang: "en",
    age: String(age),
    sex: sex === "female" ? "female" : "male",
    pregnant: sex === "female" && pregnant === "yes" ? "yes" : "no",
  });

  // The request goes to /api/... which Vite proxies to the real API in vite.config.js
  // avoiding CORS issues in development
  const res = await fetch(`/api/myhealthfinder/api/v4/myhealthfinder.json?${params}`);

  // If the server returned an error status, throw with as much detail as possible
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`MyHealthFinder API error ${res.status}${body ? ": " + body.slice(0, 200) : ""}`);
  }

  const data = await res.json();

  // The API nests the results deeply — dig down to the Resource array
  // Shape: { Result: { Resources: { All: { Resource: [...] } } } }
  const raw = data?.Result?.Resources?.All?.Resource;

  // If the expected key is missing, throw a descriptive error for easy debugging
  if (raw == null) {
    throw new Error(`Could not find data. Keys: ${Object.keys(data?.Result?.Resources?.All ?? {}).join(", ")}`);
  }

  // The API returns a single object when there's only one result or array
  // when there are multiple
  const resources = Array.isArray(raw) ? raw : [raw];

  if (!resources.length) {
    throw new Error("No recommendations found for your profile. Try adjusting your age or sex.");
  }

  // transform each raw resource into a clean topic object for the UI.
  return resources.map((r, idx) => {
    // categories can be a single object or an array depending on how many
    // categories the topic belongs to — handle both 
    const categoryList = Array.isArray(r.Categories?.category)
      ? r.Categories.category.map((c) => c.Title).join(", ")
      : r.Categories?.category?.Title ?? "";

    // pick only the fields we need and provide fallbacks for missing values
    const topic = {
      Id:              r.Id ?? idx + 1,
      Title:           r.Title ?? "Health Recommendation",
      MyHFDescription: r.MyHFDescription ?? "",
      Categories:      categoryList,
      Sections:        r.Sections,
      RelatedItems:    r.RelatedItems,
    };

    // Attach a _category key derived from the topic's title and categories
    // so the filter bar knows which bucket to put this recommendation in.
    return { ...topic, _category: detectCategory(topic) };
  });
}
