import globals from "globals";
import stylistic from "@stylistic/eslint-plugin-js";
import js from "@eslint/js";


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: globals.node }},
  js.configs.recommended,
  {
    plugins: {
      stylistic
    },
    rules: {
      'stylistic/indent': [
          'error',
          2
      ],
      'stylistic/quotes': [
          'error',
          'single'
      ],
      'stylistic/semi': [
          'error',
          'never'
      ],
  }
}
];