import globals from "globals";
import js from "@eslint/js";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.node },
      ecmaVersion: "latest",
    },
    rules: {
      // Error prevention
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "no-undef": "error",
      "no-constant-condition": "error",
      "no-unreachable": "error",
      "eqeqeq": "error",
      
      // Node.js best practices
      "no-process-exit": "error",
      "handle-callback-err": "error",
      "no-path-concat": "error",
      "no-new-require": "error",
      
      // Style consistency
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "double"],
      "semi": ["error", "always"],
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { "before": true, "after": true }],
      "comma-spacing": ["error", { "before": false, "after": true }],
      "no-multiple-empty-lines": ["error", { "max": 1 }],
      
      // Allow console for backend
      "no-console": "off",
    },
  },
  {
    ignores: ["node_modules/**", "dist/**"],
  },
]);
