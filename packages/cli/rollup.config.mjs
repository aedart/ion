import { createConfig } from '../../shared/rollup.config.mjs';

export default createConfig({
    baseDir: new URL('.', import.meta.url),
    external: [
        '@aedart/contracts/config',
        '@aedart/contracts/container',
        '@aedart/contracts/core',
        '@aedart/contracts/support',
        '@aedart/contracts/support/arrays',
        '@aedart/contracts/support/container',
        '@aedart/contracts/support/concerns',
        '@aedart/contracts/support/exceptions',
        '@aedart/contracts/support/meta',
        '@aedart/contracts/support/mixins',
        '@aedart/contracts/support/objects',
        '@aedart/contracts/support/reflections',
        '@aedart/contracts/support/services',
        '@aedart/support',
        '@aedart/support/arrays',
        '@aedart/support/container',
        '@aedart/support/concerns',
        '@aedart/support/exceptions',
        '@aedart/support/facades',
        '@aedart/support/meta',
        '@aedart/support/misc',
        '@aedart/support/mixins',
        '@aedart/support/objects',
        '@aedart/support/reflections',
        '@aedart/support/services',
        '@aedart/core',
        
        'lodash-es',
        
        'node:process'
    ]
});
