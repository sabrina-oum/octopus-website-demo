import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";

// eslint-config-next already registers the @typescript-eslint and jsx-a11y
// plugins, so only their rules are added here (registering them again errors).
const typeCheckedRules = Object.assign(
  {},
  ...tseslint.configs.recommendedTypeChecked.map((config) => config.rules),
);

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    name: "project/type-checked",
    files: ["**/*.{ts,tsx,mts,cts}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...typeCheckedRules,
      // Catalog getters are async by contract (src/catalog/index.ts) so callers
      // don't change when the JSON is replaced by a real data source.
      "@typescript-eslint/require-await": "off",
    },
  },
  {
    name: "project/jsx-a11y",
    files: ["**/*.{jsx,tsx}"],
    rules: jsxA11y.flatConfigs.recommended.rules,
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
