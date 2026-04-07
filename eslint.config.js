import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    // 1. Global Ignores (replacing .eslintignore)
    {
        ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**'],
    },
    // 2. Base Configuration for all TypeScript files
    {
        files: ['**/*.ts'],
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.node, // Enable Node.js globals by default
            },
        },
        rules: {
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            'no-console': 'warn',
            '@typescript-eslint/no-explicit-any': ['error', {
                ignoreRestArgs: true, // Allows ...args: any[]
            }],
        },
    },
    // 3. Browser-specific overrides for your centralized tests
    {
        files: ['tests/browser/**/*.test.ts'],
        languageOptions: {
            globals: {
                ...globals.browser, // Enable 'document', 'window', etc.
            },
        },
    },
    // 4. Configuration for the ESLint file itself (JS)
    {
        files: ['eslint.config.js', 'vitest.config.ts'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
);
