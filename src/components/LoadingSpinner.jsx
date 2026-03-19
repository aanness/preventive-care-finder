import { theme } from "../styles/theme";

export default function LoadingSpinner() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Fetching your recommendations"
      style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        padding:        "60px 24px",
        gap:            16,
        animation:      "fadeIn 0.3s ease",
      }}
    >
      <div
        style={{
          width:        48,
          height:       48,
          border:       `3px solid ${theme.mint}`,
          borderTop:    `3px solid ${theme.teal}`,
          borderRadius: "50%",
          animation:    "spin 0.9s linear infinite",
        }}
        aria-hidden="true"
      />
      <p style={{ color: theme.slate, fontSize: "0.92rem", fontWeight: 500 }}>
        Fetching recommendations…
      </p>

      {/* Skeleton shimmer cards */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            width:           "100%",
            maxWidth:        560,
            height:          88,
            borderRadius:    14,
            background:      "linear-gradient(90deg, #edf2f7 25%, #e2e8f0 50%, #edf2f7 75%)",
            backgroundSize:  "800px 100%",
            animation:       `shimmer 1.4s ${i * 0.18}s infinite linear`,
          }}
        />
      ))}
    </div>
  );
}
