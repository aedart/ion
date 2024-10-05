import {
    UnsupportedSourceError,
    ItemsLoader,
    PathLoader,
} from "@aedart/config";
import makeLoaderFactory from "../helpers/makeLoaderFactory";

describe('@aedart/config', () => {
    describe('loaders', () => {

        describe('ConfigurationLoaderFactory', () => {

            it('can create factory instance', () => {
                const result = makeLoaderFactory();
                
                // If this does not fail, then test is a success
                expect(result)
                    .not
                    .toBeUndefined();
            });

            it('fails when attempting to make loader for unsupported source', () => {
                
                const factory = makeLoaderFactory();
                
                const result = () => {
                    factory.make(false);
                }
                
                expect(result)
                    .toThrowError(UnsupportedSourceError);
            });

            xit('can make loaders and load items', async () => {
                
                // ------------------------------------------------------------------------------------ //
                
                console.info('FILE URL', import.meta.url);
                console.info('FILE URL # 2', (new URL('../fixtures/my-config.js', import.meta.url)).toString());
                console.info('FILE URL # 3', (new URL('../fixtures/my-config.js', import.meta.url)).href);
                console.info('FILE URL # 4', (new URL('../fixtures/my-config.js', import.meta.url)).pathname);
                
                class MyLoader {
                    async load(path) {
                        try {
                            return await import(path).default;
                        } catch (e) {
                            throw new Error(`Unable to load: ${e.message}`);
                        }
                    }
                }

                const fn = async (p) => {
                    const c = await import(p);
                    return c?.default;
                }
                
                // TODO: WORKS
                const raw = (await import('../fixtures/my-config.js')).default;
                console.log('Raw import', raw);
                
                // TODO:
                const viaFn = await fn('../fixtures/my-config.js');
                console.log('Fn import', viaFn);

                // const tmp = await (new MyLoader()).load('../fixtures/my-config.js');
                // const tmp = await (new MyLoader()).load((new URL('../fixtures/my-config.js', import.meta.url)).href);
                // const tmp = await (new MyLoader()).load(
                //     'file://' + (new URL('../fixtures/my-config.js', import.meta.url)).href
                // );
                // const tmp = await (new MyLoader()).load(
                //     (new URL('../fixtures/my-config.js', import.meta.url)).toString()
                // );
                const tmp = await (new MyLoader()).load(
                    (new URL('../fixtures/my-config.js', import.meta.url))
                );
                console.log('LOADED via MyLoader', tmp);
                
                const data = [
                    {
                        name: 'ItemsLoader',
                        source: {
                            foo: 'bar'
                        },
                        loader: ItemsLoader,
                        expected: { foo: 'bar' }
                    },
                    {
                        name: 'PathLoader',
                        //source: '../fixtures/my-config.js', // Relative does not seem to work here...
                        // source: path.resolve('../fixtures/my-config.js'),
                        // source: import.meta.url + '/../fixtures/my-config.js',
                        // source: '/home/alin/code/ion/tests/browser/packages/config/fixtures/my-config.js',
                        //source: '/home/alin/code/ion/tests/browser/packages/config/fixtures/my-config.js',
                        // source: (new URL('../fixtures/my-config.js', import.meta.url)).toString(),
                        
                        // source: (new URL('../fixtures/my-config.js', import.meta.url)).href,
                        
                        //source: 'file://' + (new URL('../fixtures/my-config.js', import.meta.url)).href,

                        source: (new URL('../fixtures/my-config.js', import.meta.url)).href,
                        loader: PathLoader,
                        expected: {
                            app: {
                                name: 'Foo'
                            }
                        }
                    }
                ];

                // ------------------------------------------------------------------------------------ //
                const factory = makeLoaderFactory();

                for (const entry of data) {
                    
                    const loader = factory.make(entry.source);
                    expect(loader)
                        .withContext(`Incorrect loader resolved from factory, for ${entry.name}`)
                        .toBeInstanceOf(entry.loader);
                    
                    const result = await loader.load();
                    expect(result)
                        .withContext(`Loaded configuration items appear to be invalid, for ${entry.name}`)
                        .toEqual(entry.expected);
                }
            });

        });
    });
});