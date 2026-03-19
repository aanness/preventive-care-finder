import { theme } from "../styles/theme";
import FilterBar from "./FilterBar";
import RecommendationCard from "./RecommendationCard";
import PatientSummary from "./PatientSummary";
import RiskBanner from "./RiskBanner";
import EmptyState from "./EmptyState";

// Renders the full results section — patient summary, risk banner, filter bar,
// and the list of recommendation cards.
// Props:
//   results the full array of recommendations from the API
//   profile the submitted patient profile { age, sex, pregnant }
//   filter the active filter category key (e.g. "all", "screening")
//   onFilterChange callback to update the active filter in App
//   counts item counts per category for the filter bar badges
//   resultsRef ref attached to this section so App can scroll to it
export default function RecommendationList({
  results,
  profile,
  filter,
  onFilterChange,
  counts,
  resultsRef,
}) {
  // If filter is all show everything, otherwise filter down to the
  // matching category. Derived directly from props — no extra state needed
  const filtered =
    filter === "all"
      ? results
      : results.filter((r) => r._category === filter);

  return (
    // aria-live="polite" announces updates to screen readers when the filter
    // changes or new results load, without interrupting what they're reading
    // ref={resultsRef} lets app.jsx scroll this section into view after results load
    <section
      ref={resultsRef}
      aria-label="Recommendations"
      aria-live="polite"
      style={{ marginTop: 32 }}
    >
      {/* Section heading and filtered count */}
      <div
        style={{
          display:        "flex",
          alignItems:     "baseline",
          justifyContent: "space-between",
          flexWrap:       "wrap",
          gap:            8,
          marginBottom:   16,
        }}
      >
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize:   "1.5rem",
            fontWeight: 400,
            color:      theme.navy,
            animation:  "fadeUp 0.4s ease both",
          }}
        >
          Your Recommendations
        </h2>
        {/* shows how many recommendations are visible after filtering */}
        <span style={{ fontSize: "0.82rem", color: theme.muted, animation: "fadeIn 0.5s ease both" }}>
          {filtered.length} of {results.length} shown
        </span>
      </div>

      {/* patient profile confirms what was submitted */}
      <PatientSummary age={profile.age} sex={profile.sex} pregnant={profile.pregnant} />

      {/* age-based notices renders for patients 45 and older */}
      <RiskBanner age={profile.age} />

      {/* category filter buttons controls what cards are shown */}
      <FilterBar active={filter} onChange={onFilterChange} counts={counts} />

      {/* if the active filter returns no results, show the empty state.
          The filtered prop tells EmptyState whether to show a filter-specific
          message or a general "no results" message. */}
      {filtered.length === 0 ? (
        <EmptyState filtered={filter !== "all"} />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filtered.map((topic, i) => (
            // Fall back to index as key if the topic has no Id, though Id-based keys are preferred since they're stable across re-renders
            <RecommendationCard key={topic.Id || i} topic={topic} index={i} />
          ))}
        </div>
      )}

      {/* Attribution footer required when using the ODPHP API */}
      <p
        style={{
          marginTop:  28,
          fontSize:   "0.78rem",
          color:      theme.muted,
          textAlign:  "center",
          lineHeight: 1.5,
          animation:  "fadeIn 0.6s ease both",
          animationDelay: "0.3s",
          opacity:    0,
          animationFillMode: "forwards",
        }}
      >
        Data provided by{" "}
        <a
          href="https://odphp.health.gov/myhealthfinder"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: theme.teal, textDecoration: "none" }}
        >
          ODPHP MyHealthFinder
        </a>
        . This tool is for informational purposes only. Consult your healthcare
        provider for personalized medical advice.
      </p>
    </section>
  );
}
