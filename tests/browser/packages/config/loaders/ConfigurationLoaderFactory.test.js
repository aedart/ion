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
                console.info('WEBPACK __TESTS_PATH__', __TESTS_PATH__);
                
                // const RELATIVE_PATH = '../fixtures/my-config.js';
                // const FULL_PATH =  __TESTS_PATH__ + '/browser/packages/config/fixtures/my-config.js';
                

                
                // TODO: WORKS
                const raw = (await import('../fixtures/my-config.js')).default;
                console.log('Raw import', raw);

                // TODO: WORKS
                const otherRaw = (await import(
                    __TESTS_PATH__ + '/browser/packages/config/fixtures/my-config.js'
                )).default;
                console.log('Other Raw import', otherRaw);
                
                // TODO: WORKS
                const fnA = async () => {
                    try {
                        return (await import('../fixtures/my-config.js')).default;    
                    } catch (e) {
                        console.error('fff', e.message);
                    }
                }
                const viaFnA = await fnA();
                console.log('Fn (A)', viaFnA);
                
                // TODO: WORKS
                const fnB = async (p) => {
                    try {
                        // Acc. to webpack docs: "[...] The import() must contain at least some
                        // information about where the module is located [...]"
                        // @see https://webpack.js.org/api/module-methods/#dynamic-expressions-in-import
                        return (await import(
                            `../${p}`
                        )).default;
                    } catch(e) {
                        console.error(e.message);
                        throw e;
                    }
                }
                const viaFnB = await fnB('fixtures/my-config.js');
                console.log('Fn (B)', viaFnB);

                // TODO:
                // console.log('baseURI', document.baseURI);
                // console.log('URL (current dir)', (new URL('./', import.meta.url)).toString());
                class MyLoader {
                    async load(path) {
                        try {
                            // return (await import(`./${path}.js`)).default;
                            return (await import(`../${path}`)).default;
                        } catch (e) {
                            throw new Error(`Unable to load: ${e.message}`);
                        }
                    }
                }
                
                const tmp = await (new MyLoader()).load(
                    // (new URL('../fixtures/my-config.js', import.meta.url)).href
                    // (new URL(__TESTS_PATH__ + '/browser/packages/config/fixtures/my-config.js', import.meta.url)).href
                    'fixtures/my-config.js'
                );
                // const tmp = await (new MyLoader()).load(
                //     '../fixtures/my-config'
                // );
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

                        // source: (new URL('../fixtures/my-config.js', import.meta.url)).href,
                        // source: __TESTS_PATH__ + '/browser/packages/config/fixtures/my-config.js',
                        source: 'my-config',
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