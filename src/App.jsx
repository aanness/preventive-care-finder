// useState manages component state (data that triggers re-renders when changed)
// useRef creates a reference to a DOM element without causing re-renders
import { useState, useRef } from "react";

// global styles and theme colors used throughout the app
import { fonts, globalCss, theme } from "./styles/theme";

// function that calls the ODPHP MyHealthFinder API
import { fetchRecommendations } from "./api/recommendations";

// UI components that make up the page layout
import Header from "./components/Header";
import PatientForm from "./components/PatientForm";
import LoadingSpinner from "./components/LoadingSpinner";
import RecommendationList from "./components/RecommendationList";

export default function App() {
  // fetched recommendations array, null until a search has been made
  const [results, setResults] = useState(null);

  // tracks whether an API request is in flight
  const [loading, setLoading] = useState(false);

  // holds any error message to display if the API call fails
  const [error,   setError]   = useState(null);

  // Stores the submitted patient profile (age, sex, pregnant) so it can be passed down to the results  for display
  const [profile, setProfile] = useState(null);

  // active filter category all, screening, vaccine, or lifestyle
  const [filter,  setFilter]  = useState("all");

  // A ref attached to the results section so we can smoothly scroll to it after recommendations load
  const resultsRef = useRef(null);

  // called when the patient form is submitted,rResets state, fires the API call, then sets results or an error depending on the outcome
  const handleSubmit = async (age, sex, pregnant) => {
    setLoading(true);
    setError(null);
    setResults(null);
    setFilter("all");
    setProfile({ age, sex, pregnant });

    try {
      const data = await fetchRecommendations(age, sex, pregnant);
      setResults(data);

      // delay before scrolling so the results have time to render first
      setTimeout(
        () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
        100
      );
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      // turn off the loading spinner whether the request succeeded or failed
      setLoading(false);
    }
  };

  // counts per category so the filter bar can show badge numbers, returns an empty object if there are no results yet
  const counts = results
    ? {
        all:       results.length,
        screening: results.filter((r) => r._category === "screening").length,
        vaccine:   results.filter((r) => r._category === "vaccine").length,
        lifestyle: results.filter((r) => r._category === "lifestyle").length,
      }
    : {};

  return (
    <>
      {/* google fnts and global CSS reset into head */}
      <style>{fonts}</style>
      <style>{globalCss}</style>

      <div style={{ minHeight: "100vh", background: theme.cream }}>
        <Header />

        <main
          style={{
            maxWidth: 780,
            margin:   "0 auto",
            // clamp() sets a fluid value that scales between a min and max
            // based on the viewport width
            padding:  "clamp(20px,4vw,40px) clamp(16px,4vw,24px)",
          }}
        >
          {/* pass the submit handler and loading state down to the form */}
          <PatientForm onSubmit={handleSubmit} loading={loading} />

          {/* Error state — role="alert" causes screen readers to read it */}
          {error && (
            <div
              role="alert"
              style={{
                marginTop:    24,
                padding:      "16px 20px",
                background:   "rgba(217,59,59,0.08)",
                border:       "1px solid rgba(217,59,59,0.25)",
                borderLeft:   `4px solid ${theme.error}`,
                borderRadius: "0 10px 10px 0",
                color:        "#7A1A1A",
                fontSize:     "0.9rem",
                animation:    "fadeIn 0.3s ease",
              }}
            >
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Loading state shown while the API request is waiting */}
          {loading && (
            <div style={{ marginTop: 32 }}>
              <LoadingSpinner />
            </div>
          )}

          {/* Results only rendered once we have data  */}
          {results && !loading && (
            <RecommendationList
              results={results}
              profile={profile}
              filter={filter}
              onFilterChange={setFilter}
              counts={counts}
              resultsRef={resultsRef}
            />
          )}
        </main>
      </div>
    </>
  );
}
