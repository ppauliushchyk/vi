import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginOnlyWarn from "eslint-plugin-only-warn";
import eslintPluginTurbo from "eslint-plugin-turbo";
import typescriptEslint from "typescript-eslint";

export const config = [
  {
    plugins: { js },
    rules: {
      ...js.configs.recommended.rules,
      "no-fallthrough": "off",
      "no-unused-vars": "warn",
    },
  },
  ...typescriptEslint.configs.recommended,
  {
    plugins: { import: eslintPluginImport },
    rules: {
      ...eslintPluginImport.flatConfigs.rules,
      "import/extensions": "off",
      "import/no-unresolved": "off",
      "import/order": [
        "error",
        {
          alphabetize: { caseInsensitive: true, order: "asc" },
          groups: [
            "builtin",
            "external",
            "index",
            "internal",
            "parent",
            "sibling",
          ],
          "newlines-between": "always",
        },
      ],
      "import/prefer-default-export": "off",
    },
  },
  {
    rules: {
      "no-console": "error",
      "sort-keys": ["error", "asc"],
    },
  },
  eslintConfigPrettier,
  {
    plugins: { turbo: eslintPluginTurbo },
    rules: { "turbo/no-undeclared-env-vars": "warn" },
  },
  { plugins: { eslintPluginOnlyWarn } },
];
