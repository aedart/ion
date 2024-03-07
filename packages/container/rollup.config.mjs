import { createConfig } from '../../shared/rollup.config.mjs';

export default createConfig({
    baseDir: new URL('.', import.meta.url),
    external: [
        '@aedart/contracts/container',
        '@aedart/contracts/support',
        '@aedart/contracts/support/arrays',
        '@aedart/contracts/support/concerns',
        '@aedart/contracts/support/exceptions',
        '@aedart/contracts/support/meta',
        '@aedart/contracts/support/mixins',
        '@aedart/contracts/support/reflections',
    ]
});
