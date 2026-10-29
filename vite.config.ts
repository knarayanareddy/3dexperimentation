import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
const githubPagesBase = process.env.GITHUB_PAGES === "true" ? "/3dexperimentation/" : "/";

export default defineConfig({
  base: githubPagesBase,
  define: {
    // vite-plugin-singlefile emits a relative document base; keep public media URLs
    // anchored to the repository subpath on GitHub Pages.
    __APP_BASE_PATH__: JSON.stringify(githubPagesBase),
  },
  plugins: [react(), tailwindcss(), viteSingleFile()],
  server: {
    // Arena's preview uses a dynamic e2b.app host. Permit that suffix without
    // disabling Vite's host validation for every arbitrary hostname.
    allowedHosts: [".e2b.app"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
