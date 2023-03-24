import { createConfig } from '../../shared/rollup.config.mjs';

export default createConfig({
    baseDir: new URL('.', import.meta.url),
    
    // Because this package offers *.vue files, we need to
    // be explicit about which to export! 
    submodules: [
        //'components', // don't!
        'contracts',
        'navigation'
    ]
});
