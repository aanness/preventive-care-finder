import { theme } from "../styles/theme";

// Displays age-based health notices above the recommendations list.
export default function RiskBanner({ age }) {
  // Early return 
  if (age < 45) return null;

  // the list of relevant notices based on age thresholds.
  const messages = [];
  if (age >= 45) messages.push("Colorectal cancer screening is recommended starting at age 45.");
  if (age >= 50) messages.push("Ask your doctor about cardiovascular disease risk assessment.");
  if (age >= 65) messages.push("Bone density screening is recommended for older adults.");

  return (
    // <aside> is the correct semantic element for supplementary content
    // that is related to but not part of the main content flow
    <aside
      aria-label="Age-based health notices"
      style={{
        background:   theme.warningBg,
        border:       "1px solid rgba(245,158,11,0.3)",
        borderLeft:   `4px solid ${theme.gold}`,
        borderRadius: "0 10px 10px 0",
        padding:      "14px 18px",
        marginBottom: 20,
        animation:    "fadeUp 0.4s ease both",
      }}
    >
      <p
        style={{
          fontWeight:    600,
          fontSize:      "0.82rem",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color:         "#7A5000",
          marginBottom:  6,
        }}
      >
        ⚠ Age-based Notices
      </p>

      {/* listStyle "none" removes the default bullet points since we add our own • character. */}
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
        {messages.map((m, i) => (
          <li key={i} style={{ fontSize: "0.87rem", color: "#5A3C00", lineHeight: 1.5 }}>
            • {m}
          </li>
        ))}
      </ul>
    </aside>
  );
}
