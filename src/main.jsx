// StrictMode is a React development tool that highlights potential problems.
// It renders components twice in development to catch side effects, but has
// no impact on the production build.
import { StrictMode } from "react";

// createRoot is the modern React 18 API for mounting the app into the DOM.
// It replaces the older ReactDOM.render() from React 17 and below.
import { createRoot } from "react-dom/client";

// The root App component — the top of the component tree.
import App from "./App.jsx";

// Find the <div id="root"> in index.html and mount the React app inside it.
// Everything React renders lives inside that single DOM node.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);


