import { config as baseConfig } from "@repo/eslint-config/nestjs";

/** @type {import("eslint").Linter.Config} */
const config = [
  ...baseConfig,
  { settings: { "import/internal-regex": "^@api/" } },
];

export default config;
