import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      // Proxy MyHealthFinder API to avoid CORS in local dev.
      // The public API at odphp.health.gov is free and requires no API key.
      "/api/myhealthfinder": {
        target:       "https://odphp.health.gov",
        changeOrigin: true,
        rewrite:      (path) => path.replace(/^\/api\/myhealthfinder/, "/myhealthfinder"),
      },
    },
  },
  build: {
    outDir:    "dist",
    sourcemap: true,
  },
});
