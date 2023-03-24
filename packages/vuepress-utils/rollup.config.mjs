import { createConfig } from '../../shared/rollup.config.mjs';

export default createConfig({
    baseDir: new URL('.', import.meta.url),

    // *.vue files offered by this package, so we must manually
    // specify the submodules to be exported or vue components
    // must be compiled...
    submodules: [
        //'components', // *.vue files copied into dist - not compiled!
        'contracts',
        'navigation'
    ]
});
