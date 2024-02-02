import { createConfig } from '../../shared/rollup.config.mjs';

export default createConfig({
    baseDir: new URL('.', import.meta.url),
    external: [
        '@aedart/contracts/support',
        '@aedart/contracts/support/meta',
        '@aedart/contracts/support/reflections',
    ]
});
