import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import promisePlugin from "eslint-plugin-promise";
import eslintConfigPrettier from "eslint-config-prettier";
import { customRules } from "./eslint-rules/index.js";

export default [
  { ignores: ["playwright-report/**"] },
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  promisePlugin.configs["flat/recommended"],
  eslintConfigPrettier,
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*.vue"],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    rules: {
      eqeqeq: ["error", "smart"],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["vitest-preview"],
              message: "vitest-preview must be removed",
            },
          ],
        },
      ],
      "no-restricted-properties": [
        "error",
        {
          object: "screen",
          property: "debug",
          message: "screen.debug() must be removed",
        },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector: "CallExpression[callee.name='showMe']",
          message: "showMe is a debug tool and must be removed before commit",
        },
      ],
    },
  },
  {
    plugins: { customRules: customRules },
    rules: {
      "customRules/retry-dynamic-imports": "error",
    },
  },
];
