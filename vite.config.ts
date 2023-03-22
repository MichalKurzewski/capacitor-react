/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react(), eslint()],
  test: {
    setupFiles: ["./vitest.setup.ts"],
    deps: {
      inline: ["vitest-canvas-mock"],
    },
    globals: true,
    environment: "jsdom",
    css: true,
  },
});
