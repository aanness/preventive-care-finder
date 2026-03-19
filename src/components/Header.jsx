import { theme } from "../styles/theme";

export default function Header() {
  return (
    <header
      style={{
        background: `linear-gradient(135deg, ${theme.navy} 0%, ${theme.navyMid} 60%, #163872 100%)`,
        color: theme.white,
        padding: "0",
        position: "relative",
        overflow: "hidden",
      }}
      role="banner"
    >
      {/* Decorative circles */}
      {[
        { w: 340, h: 340, top: -100, right: -60,  op: 0.06 },
        { w: 180, h: 180, top:   30, right: 200,  op: 0.04 },
        { w: 120, h: 120, bottom: -40, left:  80, op: 0.05 },
      ].map((c, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position:     "absolute",
            width:        c.w,
            height:       c.h,
            borderRadius: "50%",
            border:       `1.5px solid rgba(255,255,255,${c.op * 3})`,
            background:   `radial-gradient(circle, rgba(45,125,210,${c.op}) 0%, transparent 70%)`,
            top:          c.top,
            right:        c.right,
            bottom:       c.bottom,
            left:         c.left,
            pointerEvents: "none",
          }}
        />
      ))}

      <div
        style={{
          maxWidth: 780,
          margin:   "0 auto",
          padding:  "42px 24px 38px",
          position: "relative",
          zIndex:   1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
          {/* Logo icon */}
          <div
            style={{
              width:        44,
              height:       44,
              borderRadius: 12,
              background:   `linear-gradient(135deg, ${theme.gold}, ${theme.goldLight})`,
              display:      "flex",
              alignItems:   "center",
              justifyContent: "center",
              fontSize:     22,
              boxShadow:    "0 4px 16px rgba(232,162,0,0.35)",
              animation:    "ripple 2.5s infinite",
            }}
            aria-hidden="true"
          >
            Q
          </div>

          <div>
            <h1
              style={{
                fontFamily:    "'DM Serif Display', serif",
                fontSize:      "clamp(1.7rem, 4vw, 2.3rem)",
                fontWeight:    400,
                letterSpacing: "-0.01em",
                lineHeight:    1.1,
              }}
            >
              Quadax Care
            </h1>
            <p
              style={{
                fontSize:      "0.72rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color:         theme.goldLight,
                marginTop:     2,
                fontWeight:    500,
              }}
            >
              Preventive Care Finder
            </p>
          </div>
        </div>

        <p
          style={{
            color:     "rgba(255,255,255,0.65)",
            fontSize:  "0.95rem",
            maxWidth:  480,
            lineHeight: 1.6,
            marginTop: 8,
          }}
        >
          Personalized preventive health recommendations — screenings, vaccines, and lifestyle guidance tailored to you.
        </p>
      </div>
    </header>
  );
}
