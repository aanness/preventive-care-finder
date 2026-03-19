// ── Quadax Brand Colors ───────────────────────────────────────────────────────
export const theme = {
  navy:        "#1A3A6B",
  navyMid:     "#1E4480",
  teal:        "#2D7DD2",
  tealLight:   "#4B9FE1",
  tealGhost:   "rgba(45,125,210,0.12)",
  tealGlow:    "rgba(45,125,210,0.28)",
  mint:        "#D6E8F7",
  cream:       "#F4F7FC",
  slate:       "#3A5A8A",
  muted:       "#7A9CC0",
  white:       "#FFFFFF",
  warning:     "#E8A200",
  warningBg:   "rgba(232,162,0,0.1)",
  error:       "#D93B3B",
  gold:        "#E8A200",
  goldLight:   "#F5C842",
  goldGhost:   "rgba(232,162,0,0.15)",
};

// ── Google Fonts import ───────────────────────────────────────────────────────
export const fonts = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
`;

// ── Global CSS ────────────────────────────────────────────────────────────────
export const globalCss = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { font-size: 16px; scroll-behavior: smooth; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: ${theme.cream};
    color: ${theme.navy};
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }
  ::selection { background: ${theme.teal}; color: white; }
  :focus-visible {
    outline: 2.5px solid ${theme.teal};
    outline-offset: 3px;
    border-radius: 4px;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  @keyframes ripple {
    0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(45,125,210,0.28); }
    70%  { transform: scale(1);    box-shadow: 0 0 0 12px transparent; }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 transparent; }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${theme.muted}; border-radius: 3px; }
`;
