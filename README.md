# Quadax Care — Preventive Care Finder

A React application that delivers personalized preventive health recommendations based on a patient's age, sex, and pregnancy status. Built using the [ODPHP MyHealthFinder API](https://odphp.health.gov/myhealthfinder).

---

## Screenshots

<img width="1487" height="872" alt="Screenshot 2026-03-19 at 7 09 51 PM" src="https://github.com/user-attachments/assets/23c9c3e0-ed3c-4eaf-b520-71e34314b170" />

<img width="839" height="806" alt="Screenshot 2026-03-19 at 7 10 23 PM" src="https://github.com/user-attachments/assets/8ebdb5ba-9e9c-43a3-a3a1-f6b8f170d6be" />

---

## Features

- **Personalized recommendations** — screenings, vaccines, and lifestyle guidance tailored to the patient's profile
- **Category filtering** — filter results by Screening, Vaccine, or Lifestyle with live item counts
- **Age-based notices** — automatic health alerts for patients 45 and older
- **Expandable cards** — descriptions truncate at 160 characters with a read more toggle
- **Accessible** — semantic HTML, ARIA labels, keyboard navigation, and screen reader support throughout
- **Responsive** — fluid layout that works on mobile and desktop without media queries

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [React 18](https://react.dev/) | UI components and state management |
| [Vite](https://vitejs.dev/) | Dev server and build tool |
| [ODPHP MyHealthFinder API](https://odphp.health.gov/myhealthfinder) | Health recommendation data |

No UI libraries or CSS frameworks — all styling is done with inline styles and a central theme file.

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
# Clone the repository
https://github.com/aanness/preventive-care-finder

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at `http://localhost `.

### Environment

The app proxies API requests through Vite to avoid CORS issues in development. No API key is required — the ODPHP MyHealthFinder API is free and publicly available.

---

## Project Structure

```
src/
├── api/
│   └── recommendations.js     # Fetches and shapes data from the ODPHP API
├── components/
│   ├── EmptyState.jsx          # Shown when no results match the active filter
│   ├── FilterBar.jsx           # Category filter buttons with item count badges
│   ├── Header.jsx              # App header with branding
│   ├── LoadingSpinner.jsx      # Spinner and skeleton cards shown during fetch
│   ├── PatientForm.jsx         # Age, sex, and pregnancy input form with validation
│   ├── PatientSummary.jsx      # Profile chips shown above the results
│   ├── RecommendationCard.jsx  # Individual recommendation with expandable description
│   ├── RecommendationList.jsx  # Results section — orchestrates all result components
│   └── RiskBanner.jsx          # Age-based health notices for patients 45+
├── constants/
│   └── categories.js           # Category config (labels, icons, colors) and topic URLs
├── hooks/
│   └── useHover.js             # Reusable hover state hook for declarative hover styles
├── styles/
│   └── theme.js                # Brand colors, Google Fonts import, and global CSS
├── utils/
│   └── healthUtils.js          # Category detection and URL resolution utilities
├── App.jsx                     # Root component — manages global state and layout
└── main.jsx                    # Entry point — mounts the React app into the DOM
```

---

## Key Design Decisions

**Centralized theming** — all colors live in `theme.js` so there are no hardcoded hex values in components. Updating a color in one place propagates everywhere.

**Derived state over extra state** — the filtered recommendations list is computed directly from `results` and `filter` props rather than stored in a separate state variable, keeping the data flow simple.

**Custom `useHover` hook** — hover styles are managed through React state rather than direct DOM mutation, keeping the component logic declarative and consistent with how all other state is handled.

**Category inference** — the ODPHP API doesn't return a clean category field, so `detectCategory` in `healthUtils.js` infers it from keywords in the topic title and categories string.

**Vite proxy** — API requests are proxied through Vite in development to avoid CORS issues, so no backend is needed.

---

## Accessibility

- Semantic HTML elements throughout (`<article>`, `<nav>`, `<aside>`, `<section>`)
- `aria-live="polite"` on the results section announces filter changes to screen readers
- `aria-expanded` and `aria-controls` on the description toggle button
- `aria-pressed` on filter buttons to communicate toggle state
- `role="alert"` on form validation error messages
- `:focus-visible` styles for keyboard navigation

---

## Data Source

All health recommendation data is provided by the [U.S. Office of Disease Prevention and Health Promotion (ODPHP)](https://odphp.health.gov/myhealthfinder). This tool is for informational purposes only. Users should consult a healthcare provider for personalized medical advice.
