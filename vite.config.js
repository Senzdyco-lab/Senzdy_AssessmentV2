import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Repo name on GitHub. Built site is served from
// https://<owner>.github.io/Senzdy_AssessmentV2/, so all asset URLs need
// to be prefixed with that path. import.meta.env.BASE_URL picks this up
// at runtime for the React Router basename.
export default defineConfig({
  base: "/Senzdy_AssessmentV2/",
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
});
