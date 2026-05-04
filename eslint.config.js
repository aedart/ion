import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    // 1. Global Ignores
    {
        ignores: [
            "**/dist/",          // Ignores all dist folders recursively
            "**/node_modules/",
            "**/coverage/",
            "docs/.vuepress/",   // Specific to your project root
            "**/*.d.ts",         // CRITICAL: Stops the 'parserOptions.project' error
            '.turbo/',        // Recommended since you use Turbo
        ],
    },
    // 2. Base Configuration
    {
        files: ['**/*.ts'],
        // Use 'recommendedTypeChecked' since you already defined project/tsconfig
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
            ...tseslint.configs.stylisticTypeChecked
        ],
        languageOptions: {
            parserOptions: {
                project: true, // Modern way to say "use nearest tsconfig"
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
