import { defineConfig } from "vitest/config";
import { WxtVitest } from "wxt/testing/vitest-plugin";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue(), await WxtVitest()],
  test: {
    environment: "happy-dom",
    include: ["**/__tests__/**/*.test.ts", "**/*.test.ts", "**/*.spec.ts"],
    exclude: ["node_modules/**", ".output/**", ".wxt/**", ".worktrees/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["entrypoints/**/*.ts"],
      exclude: ["entrypoints/**/__tests__/**"],
    },
  },
});
