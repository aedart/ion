import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    // 1. Global Ignores
    {
        ignores: [
            '**/dist/', // Ignores all dist folders recursively
            '**/node_modules/',
            '**/coverage/',
            'docs/.vuepress/', // Specific to your project root
            '**/*.d.ts', // CRITICAL: Stops the 'parserOptions.project' error
            '.turbo/', // Recommended since you use Turbo
        ],
    },
    // 2. Base Configuration
    {
        files: ['**/*.ts'],
        // Use 'recommendedTypeChecked' since you already defined project/tsconfig
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
            ...tseslint.configs.stylisticTypeChecked,
        ],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.node,
            },
        },
        rules: {
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            'no-console': 'warn',
            '@typescript-eslint/no-explicit-any': ['error', {
                ignoreRestArgs: true,
            }],
            // Disable rules that dprint handles to avoid conflicts
            '@typescript-eslint/indent': 'off',

            // There is no "sane" way to define return type of the `@use()` decorator.
            // This means that defining interfaces that extend concern classes is perhaps
            // the "best" solution, given the limitations of TypeScript.
            // @see /tests/browser/support/concerns/use.test.ts
            "@typescript-eslint/no-unsafe-declaration-merging": "off"
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
