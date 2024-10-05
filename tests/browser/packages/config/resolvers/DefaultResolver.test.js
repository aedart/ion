import {
    UnsupportedSourceError,
    DefaultResolver,
} from "@aedart/config";
import { Env } from "@aedart/support/env";

describe('@aedart/config', () => {
    describe('resolvers', () => {

        describe('DefaultResolver', () => {

            beforeEach(() => {
                Env.clear();
            });
            
            afterEach(() => {
                Env.clear();
            });
            
            it('can create resolver instance', () => {
                const result = new DefaultResolver();
                
                expect(result)
                    .not
                    .toBeUndefined();
            });

            it('fails resolving items when source is not supported', async () => {
                const resolver = new DefaultResolver();
                
                let errorThrown = false;
                try {
                    await resolver.resolve(false);
                } catch (e) {
                    errorThrown = true;
                    expect(e)
                        .toBeInstanceOf(UnsupportedSourceError);
                }
                
                expect(errorThrown)
                    .withContext('Unsupported Source Error should had been thrown')
                    .toBeTrue();
            });

            it('can resolve configuration items', async () => {

                const data = [
                    {
                        name: 'Items (Plain object)',
                        source: {
                            foo: 'bar'
                        },
                        expected: { foo: 'bar' }
                    },
                    {
                        name: 'Resolve Callback',
                        source: async () => {
                            return new Promise((resolve) => {
                                resolve({
                                    a: 1,
                                    b: 2,
                                    c: 3
                                })
                            })
                        },
                        expected: { a: 1, b: 2, c: 3 }
                    },
                    {
                        name: 'Promise (dynamic import)',
                        source: (await import('../fixtures/my-config'))?.default,
                        expected: { app: { name: 'Foo' } }
                    },
                ];

                // ------------------------------------------------------------------------------------ //
                const resolver = new DefaultResolver();
                for (const entry of data) {

                    const result = await resolver.resolve(entry.source);
                    expect(result)
                        .withContext(`Unable to resolve configuration items for ${entry.name}`)
                        .toEqual(entry.expected);
                }
            });

            it('does not automatically inject environment variables into resolved items', async () => {
                // Here, environment variables are NOT defined. Thus, when configuration items are resolved,
                // any calls to env() will result in their default values to be returned!
                
                const resolver = new DefaultResolver();

                // ------------------------------------------------------------------------------------ //
                
                const result = await resolver.resolve((await import('../fixtures/my-env-config'))?.default);
                
                expect(Reflect.has(result, 'app'))
                    .withContext('"app" item not resolved')
                    .toBeTrue()

                expect(Reflect.has(result.app, 'environment'))
                    .withContext('"app.environment" item not resolved')
                    .toBeTrue();
                
                expect(result.app.environment)
                    .withContext('"app.environment" value should not be set (environment variables have not been defined!)')
                    .toBeUndefined()
            });

            it('environment variables are resolved, when Env defined', async () => {
                // When defining environment variables, the configuration items SHOULD have any calls to env()
                // resolved correctly.
                
                /** @typedef {Record<PropertyKey, any>} __ENV__ */
                Env.defineSafe(__ENV__);

                // ------------------------------------------------------------------------------------ //
                
                const resolver = new DefaultResolver();

                // ------------------------------------------------------------------------------------ //

                // Warning: re-loading the same chunk (as previous test) can yield strange results. The resolved promise might be
                // returned from Webpack, which could already have the env() calls resolved.
                // const result = await resolver.resolve((await import('../fixtures/my-env-config'))?.default);
                
                // const result = await resolver.resolve((await import('../fixtures/my-other-env-config'))?.default);
                const result = await resolver.resolve(
                    import('../fixtures/my-other-env-config')
                        .then((module) => module.default)
                );

                expect(Reflect.has(result, 'app'))
                    .withContext('"app" item not resolved')
                    .toBeTrue()

                expect(Reflect.has(result.app, 'environment'))
                    .withContext('"app.environment" item not resolved')
                    .toBeTrue();

                expect(result.app.environment)
                    .withContext('"app.environment" value should be set (environment variables are defined)')
                    .toBe('testing')
            });
        });
    });
});