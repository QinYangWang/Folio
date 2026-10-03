import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig(({ mode }) => ({
  base: mode === "pages" ? "/Folio/" : "/",
  root: "apps/docs",
  resolve: { alias: { "@": new URL("./registry", import.meta.url).pathname } },
  plugins: [react(), tailwindcss()],
  build: { outDir: "../../dist", emptyOutDir: true },
}));
