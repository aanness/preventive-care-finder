import { theme } from "../styles/theme";

export default function EmptyState({ filtered }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        textAlign: "center",
        padding:   "56px 24px",
        color:     theme.muted,
        animation: "fadeIn 0.3s ease",
      }}
    >
      <div style={{ fontSize: 40, marginBottom: 12 }} aria-hidden="true">
        🔍
      </div>
      <p style={{ fontSize: "1rem", fontWeight: 500, color: theme.slate }}>
        {filtered
          ? "No recommendations in this category."
          : "No recommendations found for this profile."}
      </p>
      <p style={{ fontSize: "0.85rem", marginTop: 6 }}>
        {filtered
          ? "Try selecting a different filter above."
          : "Try adjusting your age or check the ODPHP site directly."}
      </p>
    </div>
  );
}
