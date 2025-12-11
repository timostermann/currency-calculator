import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    unstubEnvs: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "e2e-tests", "tmp", "vitest"],
    testTimeout: 20000,
    outputFile: "junit.xml",
    reporters: ["default", "junit"],
    coverage: {
      exclude: [
        "tmp",
        "dev",
        "test-results",
        "playwright-report",
        "dist",
        "e2e-tests",
        ".next",
        ".cursor",
        "scripts",
        ".storybook",
        "webpack",
        "patches",
        "node_modules",
        "src/**/*.d.ts",
        "src/**/*.spec.{ts,tsx}",
        "src/**/*.stories.{ts,tsx}",
        "src/**/index.ts",
        "*.config.{mjs,cjs,ts}",
        "vitest",
      ],
      reporter: ["text", "html", "lcov", "cobertura"],
    },
    root: fileURLToPath(new URL("../", import.meta.url)),
    setupFiles: ["vitest/setup.ts"],
  },
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "../src") },
      { find: "~", replacement: resolve(__dirname, "../q") },
    ],
  },
});
