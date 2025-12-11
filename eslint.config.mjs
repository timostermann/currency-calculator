import globals from "globals";
import js from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import nextConfig from "eslint-config-next";

const eslintConfig = [
  js.configs.recommended,
  ...nextConfig,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "dist/**",
      "build/**",
      "next-env.d.ts",
      "coverage/**",
      "test-results/**",
      "playwright-report/**",
      "tmp/**",
    ],
  },
  {
    rules: {
      quotes: [
        "error",
        "double",
        {
          avoidEscape: true,
          allowTemplateLiterals: false,
        },
      ],
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        "eslint-import-resolver-node": {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        "eslint-import-resolver-typescript": {
          alwaysTryTypes: true,
        },
      },
    },
  },
  {
    files: ["**/*.{ts,tsx,mjs}"],
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*"],
              message: "Please use alias for imports",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        parser: "@typescript-eslint/parser",
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
    rules: {
      "no-unused-vars": "off",
      "react/prop-types": "off",
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { ignoreRestSiblings: true },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },
  {
    files: ["**/*.spec.{ts,tsx}", "vitest/*.{ts,tsx}"],
    plugins: {
      vitest,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...vitest.environments.env.globals,
        itPassesStandardComponentTests: "readonly",
        HTMLRules: "readonly",
      },
    },
    rules: {
      ...vitest.configs.recommended.rules,
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          disallowTypeAnnotations: false,
        },
      ],
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",
      "react/jsx-key": "off",
    },
  },
  {
    files: ["**/*.{cjs,js,mjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.{cjs,js}"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default eslintConfig;
