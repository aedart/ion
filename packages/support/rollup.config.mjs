import { createConfig } from '../../shared/rollup.config.mjs';

export default createConfig({
    baseDir: new URL('.', import.meta.url),
    external: [
        '@aedart/contracts',
        '@aedart/contracts/config',
        '@aedart/contracts/container',
        '@aedart/contracts/core',
        '@aedart/contracts/support',
        '@aedart/contracts/support/arrays',
        '@aedart/contracts/support/concerns',
        '@aedart/contracts/support/env',
        '@aedart/contracts/support/exceptions',
        '@aedart/contracts/support/facades',
        '@aedart/contracts/support/meta',
        '@aedart/contracts/support/mixins',
        '@aedart/contracts/support/objects',
        '@aedart/contracts/support/reflections',
        '@aedart/contracts/support/services',
    ]
});
