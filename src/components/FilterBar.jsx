import { theme } from "../styles/theme";
import { CATEGORIES } from "../constants/categories";

// Renders a row of filter buttons — one per category plus all
// Props:
//   active   — the currently selected category key
//   onChange— callback fired when a filter button is clicked
//   counts   — object mapping category keys to their item counts for the badges
export default function FilterBar({ active, onChange, counts }) {
  return (

    <nav
      aria-label="Filter recommendations by category"
      style={{
        display:    "flex",
        gap:        8,
        flexWrap:   "wrap", 
        marginBottom: 20,
        animation:  "fadeUp 0.4s ease both",
        animationDelay: "0.1s",
        // opacity: 0 with animationFillMode: "forwards" keeps the element
        // invisible until the animation starts, preventing a flash on load.
        opacity:    0,
        animationFillMode: "forwards",
      }}
    >
      {/* Loop over CATEGORIES to render one button per category.
          CATEGORIES includes "all" so no extra button is needed. */}
      {Object.entries(CATEGORIES).map(([key, cat]) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            aria-pressed={isActive}
            // aria-label includes the count so screen reader users know
            // how many items are in each cat
            aria-label={`Filter by ${cat.label}${counts[key] ? `, ${counts[key]} items` : ""}`}
            style={{
              padding:      "7px 16px",
              borderRadius: 999, // Fully rounded pill shape
              border:     isActive
                ? `1.5px solid ${theme.teal}`
                : "1.5px solid rgba(11,31,58,0.12)",
              background: isActive ? theme.tealGhost : theme.white,
              color:      isActive ? theme.teal : theme.slate,
              fontFamily: "'DM Sans', sans-serif",
              fontSize:   "0.83rem",
              fontWeight: isActive ? 600 : 400,
              cursor:     "pointer",
              transition: "all 0.18s",
              display:    "flex",
              alignItems: "center",
              gap:        5,
              whiteSpace: "nowrap", 
            }}
          >
            {/* aria-hidden hides the decorative icon from screen readers
                since the aria-label on the button already describes it. */}
            <span aria-hidden="true">{cat.icon}</span>
            {cat.label}

            {/* count badge only rendered when a count exists for this category.
                != null catches both null and undefined with a check */}
            {counts[key] != null && (
              <span
                style={{
                  // badge inverts colors when its button is active.
                  background:   isActive ? theme.teal : "rgba(11,31,58,0.08)",
                  color:        isActive ? theme.white : theme.slate,
                  borderRadius: 999,
                  padding:      "1px 7px",
                  fontSize:     "0.72rem",
                  fontWeight:   600,
                  minWidth:     22,
                  textAlign:    "center",
                }}
              >
                {counts[key]}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
