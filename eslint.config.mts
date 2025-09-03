import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import pluginReact from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['**/node_modules', '**/dist/', '**/src/components/ui']),
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-duplicate-imports': 'error',
      'react/jsx-key': 'error',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      semi: 'error',
      'prefer-const': 'error',
      'import/no-anonymous-default-export': 'off',
      '@next/next/no-img-element': 'off',
    },
  },
]);
