import { theme } from "../styles/theme";

// Displays a summary of the patient's submitted profile as a row of pill chips
// Shown at the top of the results section so the user can confirm what was submitted
// Props:
//   age the patient's age as a number
//   sex m or f
//   pregnant  y or n
export default function PatientSummary({ age, sex, pregnant }) {
  // list of chips dynamic so the pregnancy chip only appears
  // when the patient is female - spread operator conditionally adds it
  const chips = [
    { label: "Age",  value: `${age} years` },
    // capitalize the first letter of sex since the API value is lowercase
    { label: "Sex",  value: sex.charAt(0).toUpperCase() + sex.slice(1) },
    // pregnancy chip for female patients
    ...(sex === "female"
      ? [{ label: "Pregnancy", value: pregnant === "yes" ? "Pregnant" : "Not pregnant" }]
      : []),
  ];

  return (
    <div
      style={{
        display:    "flex",
        gap:        10,
        flexWrap:   "wrap", 
        marginBottom: 20,
        animation:  "fadeUp 0.4s ease both",
        animationDelay: "0.05s",
        opacity:    0,
        animationFillMode: "forwards",
      }}
      aria-label="Patient profile summary"
    >
      {chips.map((chip) => (
        // chip.label is used as the key since it's unique within this list.
        <span
          key={chip.label}
          style={{
            background:   theme.navy,
            color:        theme.white,
            borderRadius: 999, 
            padding:      "5px 14px",
            fontSize:     "0.8rem",
            fontWeight:   500,
          }}
        >
          {/* label is faded so it stands out more  */}
          <span style={{ opacity: 0.6, marginRight: 4 }}>{chip.label}:</span>
          {chip.value}
        </span>
      ))}
    </div>
  );
}
