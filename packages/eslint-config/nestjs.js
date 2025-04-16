import eslintPluginStylistic from "@stylistic/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import typescriptEslint from "typescript-eslint";

import { config as baseConfig } from "./base.js";

export const config = [
  ...baseConfig,
  ...typescriptEslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      ecmaVersion: 5,
      globals: { ...globals.node, ...globals.jest },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      sourceType: "module",
    },
  },
  {
    plugins: { "@stylistic": eslintPluginStylistic },
    rules: {
      ...eslintPluginStylistic.configs.recommended.rules,
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/brace-style": ["error", "1tbs"],
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/implicit-arrow-linebreak": ["error", "beside"],
      "@stylistic/indent": ["error", 2, { SwitchCase: 1 }],
      "@stylistic/line-comment-position": ["error", { position: "above" }],
      "@stylistic/member-delimiter-style": "error",
      "@stylistic/multiline-comment-style": ["error", "starred-block"],
      "@stylistic/no-multiple-empty-lines": ["error", { max: 1 }],
      "@stylistic/object-curly-newline": "error",
      "@stylistic/object-property-newline": "error",
      "@stylistic/operator-linebreak": ["error", "after"],
      "@stylistic/padded-blocks": ["error", "never"],
      "@stylistic/padding-line-between-statements": [
        "error",
        { blankLine: "always", next: "*", prev: ["const", "let", "var"] },
        {
          blankLine: "any",
          next: ["const", "let", "var"],
          prev: ["const", "let", "var"],
        },
        { blankLine: "always", next: "*", prev: ["block", "block-like"] },
        { blankLine: "always", next: ["block", "block-like"], prev: "*" },
      ],
      "@stylistic/quote-props": ["error", "as-needed"],
      "@stylistic/semi": ["error", "always"],
    },
  },
  eslintConfigPrettier,
];
