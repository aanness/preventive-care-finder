import { useState } from "react";
import { theme } from "../styles/theme";
import { useHover } from "../hooks/useHover";

// Renders the patient input form and handles validation before submitting.
// Props:
//   onSubmit — callback fired with (age, sex, pregnant) when the form is valid
//   loading  — disables the button and shows a spinner while the API is fetching
export default function PatientForm({ onSubmit, loading }) {
  // Each form field is controlled — React owns the value, not the DOM.
  const [age,      setAge]      = useState("");
  const [sex,      setSex]      = useState("");
  const [pregnant, setPregnant] = useState("no");

  // Stores validation error messages keyed by field name (e.g. { age: "..." }).
  const [errors,   setErrors]   = useState({});

  // Tracks hover state on the submit button to derive its box shadow.
  const btn = useHover();

  // Returns an object of error messages for any invalid fields.
  // An empty object means all fields are valid.
  const validate = () => {
    const e = {};
    if (!age || isNaN(age) || age < 1 || age > 120)
      e.age = "Enter a valid age (1–120)";
    if (!sex)
      e.sex = "Please select a biological sex";
    return e;
  };

  const handleSubmit = () => {
    const errs = validate();
    // If there are any errors, show them and stop — don't call the API.
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    // Convert age to a number before passing it up since input values are strings.
    onSubmit(Number(age), sex, pregnant);
  };

  // Returns a style object for text inputs. Border turns red if there's a validation error.
  const inputStyle = (hasError) => ({
    width:        "100%",
    padding:      "11px 14px",
    border:       `1.5px solid ${hasError ? theme.error : "rgba(11,31,58,0.15)"}`,
    borderRadius: 10,
    fontSize:     "0.95rem",
    background:   theme.white,
    color:        theme.navy,
    fontFamily:   "'DM Sans', sans-serif",
    transition:   "border-color 0.2s, box-shadow 0.2s",
    outline:      "none",
  });

  // Extends inputStyle with select-specific overrides.
  // appearance: "none" removes the browser's default dropdown arrow so we
  // can inject our own custom SVG chevron via backgroundImage.
  const selectStyle = (hasError) => ({
    ...inputStyle(hasError),
    cursor:             "pointer",
    appearance:         "none",
    backgroundImage:    `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234A6580' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat:   "no-repeat",
    backgroundPosition: "right 14px center",
    paddingRight:       36, // Makes room so text doesn't overlap the chevron icon.
  });

  // Shared style for all field labels — uppercase and spaced for a clean look.
  const labelStyle = {
    display:       "block",
    fontSize:      "0.78rem",
    fontWeight:    600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color:         theme.slate,
    marginBottom:  6,
  };

  return (
    <section
      aria-label="Patient information form"
      style={{
        background:   theme.white,
        borderRadius: 18,
        padding:      "clamp(20px, 5vw, 36px)",
        boxShadow:    "0 2px 8px rgba(11,31,58,0.06), 0 12px 40px rgba(11,31,58,0.05)",
        border:       "1px solid rgba(11,31,58,0.07)",
        animation:    "fadeUp 0.5s ease both",
      }}
    >
      <h2
        style={{
          fontFamily:   "'DM Serif Display', serif",
          fontSize:     "1.25rem",
          fontWeight:   400,
          color:        theme.navy,
          marginBottom: 6,
        }}
      >
        Your Profile
      </h2>
      <p style={{ fontSize: "0.87rem", color: theme.muted, marginBottom: 24, lineHeight: 1.5 }}>
        Enter your details to receive personalized recommendations from the ODPHP MyHealthFinder.
      </p>

      <div role="form" aria-label="Patient input">
        {/* css grid with auto-fit lets the fields stack on mobile and sit
            side by side on wider screens without any media queries. */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap:                 "18px",
            marginBottom:        18,
          }}
        >
          {/* age */}
          <div>
            <label htmlFor="age" style={labelStyle}>Age</label>
            <input
              id="age"
              type="number"
              min="1"
              max="120"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g. 45"
              style={inputStyle(errors.age)}
              aria-required="true"
              // aria-describedby links the input to its error message so screen
              // readers announce the error when the field is focused.
              aria-describedby={errors.age ? "age-error" : undefined}
              // onFocus/onBlur update the border color to reflect focus and error state.
              onFocus={(e) => (e.target.style.borderColor = errors.age ? theme.error : theme.teal)}
              onBlur={(e)  => (e.target.style.borderColor = errors.age ? theme.error : "rgba(11,31,58,0.15)")}
            />
            {/* role="alert" causes screen readers to announce the error immediately. */}
            {errors.age && (
              <p id="age-error" role="alert" style={{ color: theme.error, fontSize: "0.78rem", marginTop: 4 }}>
                {errors.age}
              </p>
            )}
          </div>

          {/* sex */}
          <div>
            <label htmlFor="sex" style={labelStyle}>Biological Sex</label>
            <select
              id="sex"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              style={selectStyle(errors.sex)}
              aria-required="true"
              aria-describedby={errors.sex ? "sex-error" : undefined}
            >
              <option value="">Select…</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
            {errors.sex && (
              <p id="sex-error" role="alert" style={{ color: theme.error, fontSize: "0.78rem", marginTop: 4 }}>
                {errors.sex}
              </p>
            )}
          </div>

          {/* pregnancy stat — conditionally rendered only when sex is female */}
          {sex === "female" && (
            <div style={{ animation: "slideDown 0.25s ease" }}>
              <label htmlFor="pregnant" style={labelStyle}>Pregnancy Status</label>
              <select
                id="pregnant"
                value={pregnant}
                onChange={(e) => setPregnant(e.target.value)}
                style={selectStyle(false)}
              >
                <option value="no">Not pregnant</option>
                <option value="yes">Currently pregnant</option>
              </select>
            </div>
          )}
        </div>

        {/* submit button grayed out and disabled while loading */}
        <button
          {...btn.hoverProps}
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          aria-busy={loading}
          style={{
            width:          "100%",
            padding:        "13px 24px",
            // Button turns gray while loading to signal it's not interactive.
            background:     loading
              ? theme.muted
              : `linear-gradient(135deg, ${theme.gold} 0%, ${theme.goldLight} 100%)`,
            color:          theme.navy,
            border:         "none",
            borderRadius:   11,
            fontSize:       "0.95rem",
            fontWeight:     600,
            fontFamily:     "'DM Sans', sans-serif",
            cursor:         loading ? "not-allowed" : "pointer",
            letterSpacing:  "0.02em",
            transition:     "all 0.2s",
            boxShadow:      loading
              ? "none"
              : btn.hovered
                ? "0 6px 24px rgba(232,162,0,0.5)"
                : "0 4px 18px rgba(232,162,0,0.35)",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            gap:            8,
          }}
        >

          {loading ? (
            <>
              <span
                style={{
                  width:        16,
                  height:       16,
                  border:       "2px solid rgba(26,58,107,0.3)",
                  borderTop:    "2px solid " + theme.navy,
                  borderRadius: "50%",
                  display:      "inline-block",
                  animation:    "spin 0.8s linear infinite",
                }}
                aria-hidden="true"
              />
              Fetching recommendations…
            </>
          ) : (
            <>Get My Recommendations →</>
          )}
        </button>
      </div>
    </section>
  );
}
