import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

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
                    include: ['tests/node/**/*.test.ts'],
                    exclude: ['tests/browser/**/*.test.ts'],
                },
            },
            {
                test: {
                    name: 'browser-headless',
                    browser: {
                        enabled: true,
                        headless: true,
                        provider: playwright(),
                        instances: [{ browser: 'chromium' }, { browser: 'firefox' }],
                    },
                    include: ['tests/browser/**/*.test.ts'],
                },
            },
        ],
    },
});
