import { useState } from "react";
import { theme } from "../styles/theme";
import { CATEGORIES } from "../constants/categories";
import { resolveUrl } from "../utils/healthUtils";
import { useHover } from "../hooks/useHover";

// Renders a single recommendation as a card with a title, category badge,
// learn more link, and an expandable description
// Props:
//   topic recommendation object from the API 
//   index used for staggered animation delay and unique element IDs
export default function RecommendationCard({ topic, index }) {
  const [expanded, setExpanded] = useState(false);

  // hover instances for the card and the learn link so they can each have independent hover styles.
  const card = useHover();
  const link = useHover();

  // Look up the category config (icon, label, color) from our constants.
  // Falls back to lifestyle if the category key isn't recognized.
  const cat    = CATEGORIES[topic._category] || CATEGORIES.lifestyle;

  // Unique ID used to link the "Read more" button to the description it controls
  // via aria-controls, which helps screen readers understand the relationship.
  const descId = `desc-${topic.Id || index}`;

  // removes tags from the API description since it sometimes returns raw HTML strings
  const cleanHtml = (html = "") =>
    html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  // MyHFDescription, fall back to the first descriptionthen fall back to an empty string if neither exists
  const description = cleanHtml(
    topic.MyHFDescription ||
    topic.Sections?.section?.[0]?.Description ||
    ""
  );

  const shortDesc = description.slice(0, 160);

  return (
    <article
      {...card.hoverProps}
      aria-labelledby={`card-title-${index}`}
      style={{
        background:        theme.white,
        borderRadius:      14,
        border:            "1px solid rgba(11,31,58,0.08)",
        padding:           "20px 22px",
        transition:        "box-shadow 0.2s, transform 0.2s",
        animation:         "fadeUp 0.45s ease both",
        // each card animates in slightly after the previous one for staggered effect
        animationDelay:    `${0.05 * index}s`,
        opacity:           0,
        animationFillMode: "forwards",
        boxShadow:         card.hovered
          ? "0 4px 20px rgba(11,31,58,0.1), 0 1px 4px rgba(11,31,58,0.06)"
          : "none",
        transform:         card.hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <div
        style={{
          display:        "flex",
          alignItems:     "flex-start",
          justifyContent: "space-between",
          gap:            12,
          // no bottom margin if there's no description 
          marginBottom:   description ? 10 : 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <span
            aria-hidden="true"
            style={{ fontSize: 22, lineHeight: 1, marginTop: 2, flexShrink: 0 }}
          >
            {cat.icon}
          </span>
          <div>
            <h3
              id={`card-title-${index}`}
              style={{
                fontSize:     "1rem",
                fontWeight:   600,
                color:        theme.navy,
                lineHeight:   1.3,
                marginBottom: 4,
              }}
            >
              {topic.Title}
            </h3>
            <span
              style={{
                display:       "inline-block",
                fontSize:      "0.7rem",
                fontWeight:    600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color:         cat.color,
                background:    `${cat.color}18`,
                padding:       "2px 9px",
                borderRadius:  999,
              }}
              aria-label={`Category: ${cat.label}`}
            >
              {cat.label}
            </span>
          </div>
        </div>

        {/*verify its a gov URL*/}
        <a
          {...link.hoverProps}
          href={resolveUrl(topic.Title)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Learn more about ${topic.Title} on health.gov (opens in new tab)`}
          // stopPropagation prevents the click from bubbling up to the card
          onClick={(e) => e.stopPropagation()}
          style={{
            fontSize:       "0.78rem",
            fontWeight:     500,
            whiteSpace:     "nowrap",
            textDecoration: "none",
            padding:        "4px 10px",
            border:         `1px solid ${theme.teal}`,
            borderRadius:   6,
            flexShrink:     0,
            transition:     "all 0.15s",
            // colors invert on hover via the useHover hook
            background:     link.hovered ? theme.teal  : "transparent",
            color:          link.hovered ? theme.white : theme.teal,
          }}
        >
          Learn →
        </a>
      </div>

      {/* description only rendered if there is one */}
      {description && (
        <div>
          <p
            id={descId}
            style={{
              fontSize:   "0.88rem",
              color:      theme.slate,
              lineHeight: 1.65,
              marginTop:  8,
            }}
          >
            {/* Show full description if expanded, truncated version if not. */}
            {expanded ? description : shortDesc}
            {!expanded && description.length > 160 && "…"}
          </p>

          {/* Only render the toggle button if the description exceeds 160 characters. */}
          {description.length > 160 && (
            <button
              onClick={() => setExpanded(!expanded)}
              // aria-expanded tells screen readers whether the content is currently visible
              aria-expanded={expanded}
              aria-controls={descId}
              style={{
                background: "none",
                border:     "none",
                color:      theme.teal,
                cursor:     "pointer",
                fontSize:   "0.8rem",
                fontWeight: 500,
                padding:    "4px 0",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {expanded ? "Show less ↑" : "Read more ↓"}
            </button>
          )}
        </div>
      )}
    </article>
  );
}
