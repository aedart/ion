import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';
// import swc from 'unplugin-swc';
import babelPlugin from "@rolldown/plugin-babel";

export default defineConfig({
    test: {
        coverage: {
            enabled: true,
            provider: 'istanbul',
        },

        projects: [
            {
                test: {
                    name: 'node-cli',
                    environment: 'node',
                    //setupFiles: ['./tests/vitest.setup.ts'],
                    include: [
                        'tests/node/**/*/*.test.ts',
                        'tests/node/**/*.test.ts',
                    ],
                    // exclude: ['tests/browser/**/*.test.ts'],
                },
            },
            {
                // Disable default transformers to prevent them from skipping the @ symbol
                // oxc: false,
                // esbuild: false,
                
                plugins: [
                    
                    // WARNING: Do NOT use this for decorator transpiling. It has WRONG context.metadata
                    // inheritance.
                    // swc.vite({
                    //     jsc: {
                    //         parser: {
                    //             syntax: 'typescript',
                    //             decorators: true,
                    //         },
                    //         transform: {
                    //             decoratorVersion: '2023-11',
                    //
                    //             // This corresponds to TS `emitDecoratorMetadata` (which is outdated)
                    //             decoratorMetadata: false,
                    //         },
                    //         target: "es2024"
                    //     },
                    // }),

                    babelPlugin({
                        presets: [{
                            preset: () => ({
                                plugins: [
                                    ["@babel/plugin-proposal-decorators", {version: "2023-11"}]
                                ]
                            }),
                            rolldown: {
                                filter: {
                                    code: "@"
                                }
                            },
                        }],
                    }),
                ],

                test: {
                    name: 'browser-headless',
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: playwright(),
                        screenshotDirectory: 'tests/output',
                        instances: [{ browser: 'chromium' }, { browser: 'firefox' }],
                    },
                    //setupFiles: ['./tests/vitest.setup.ts'],
                    include: [
                        'tests/browser/**/*/*.test.ts',
                        'tests/browser/**/*.test.ts',
                    ],
                },
            },
        ],
    },
});
