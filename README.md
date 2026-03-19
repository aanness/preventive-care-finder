# CareCompass — Preventive Care Finder

A React + Vite application that delivers personalized preventive health
recommendations (screenings, vaccines, and lifestyle counseling) directly
from the **ODPHP MyHealthFinder API** — no AI, no API key required.

---

## 🚀 Local Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) v18 or later

### 2. Install dependencies
```bash
npm install
```

### 3. Start the dev server
```bash
npm run dev
```
Opens at **http://localhost:3000** automatically.

> No `.env` file or API key is needed. The ODPHP MyHealthFinder API is free and public.

### 4. Build for production
```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

---

## 📁 Project Structure

```
carecompass/
├── index.html                       # Vite HTML entry point
├── vite.config.js                   # Vite config + MyHealthFinder proxy
├── package.json
│
├── public/
│   └── favicon.svg
│
└── src/
    ├── main.jsx                     # React DOM entry
    ├── App.jsx                      # Root component — state, layout
    │
    ├── api/
    │   └── recommendations.js       # fetchRecommendations() — MyHealthFinder API
    │
    ├── components/
    │   ├── Header.jsx
    │   ├── PatientForm.jsx
    │   ├── RecommendationList.jsx
    │   ├── RecommendationCard.jsx
    │   ├── FilterBar.jsx
    │   ├── PatientSummary.jsx
    │   ├── RiskBanner.jsx
    │   ├── LoadingSpinner.jsx
    │   └── EmptyState.jsx
    │
    ├── constants/
    │   └── categories.js            # CATEGORIES config + verified TOPIC_URLS
    │
    ├── utils/
    │   └── healthUtils.js           # detectCategory() + resolveUrl()
    │
    └── styles/
        └── theme.js                 # Brand tokens + globalCss + fonts
```

---

## 🔑 How the API proxy works

The ODPHP MyHealthFinder API at `health.gov` blocks direct browser requests (CORS).
In local dev, the Vite proxy transparently forwards requests so the app works without a backend.

```
Browser  →  GET /api/myhealthfinder/api/v3/myhealthfinder.json?age=45&sex=female
Vite     →  GET https://health.gov/myhealthfinder/api/v3/myhealthfinder.json?age=45&sex=female
```

**Production deployment:** Point `/api/myhealthfinder` to a lightweight serverless
function or Nginx `proxy_pass` that forwards to `https://health.gov/myhealthfinder`.

---

## 🩺 MyHealthFinder API

- **Endpoint:** `GET https://health.gov/myhealthfinder/api/v3/myhealthfinder.json`
- **Parameters:** `age`, `sex`, `lang`, `pregnant` (optional)
- **Docs:** https://health.gov/our-work/national-health-initiatives/health-literacy/consumer-health-content/free-web-content/apis-developers/myhealth-finder-api

No registration or API key required. Content is curated by the US Office of Disease
Prevention and Health Promotion (ODPHP).

---

## ♿ Accessibility

- Semantic HTML (`<header>`, `<main>`, `<section>`, `<article>`)
- `aria-live="polite"` on results + loading regions
- `aria-label`, `aria-required`, `aria-describedby` on all form fields
- `aria-pressed` on filter buttons, `aria-expanded` on card toggles
- High-contrast brand palette (WCAG AA compliant)
