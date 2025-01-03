import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      "no-process-env": ["error", { "allow": ["process.env"] }],
    },
  },
  pluginJs.configs.recommended,
];