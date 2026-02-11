import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { join } from "path";

// Vite config for migrating a Next.js (app router) project to a client-side SPA.
// We alias a few Next-only imports to lightweight shims so most existing components keep compiling.
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        sourceMap: true,
      },
    },
  },
  server: {
    open: true,
    port: 3002,
    strictPort: true,
    https: false,
  },
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
  },
  build: {
    outDir: "build",
  },
});
