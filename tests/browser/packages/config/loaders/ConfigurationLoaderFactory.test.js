import {
    UnsupportedSourceError,
    ItemsLoader,
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

            it('can make loaders and load items', async () => {

                const factory = makeLoaderFactory();
                
                const data = [
                    {
                        name: 'ItemsLoader',
                        source: {
                            foo: 'bar'
                        },
                        loader: ItemsLoader,
                        expected: { foo: 'bar' }
                    }
                ];

                // ------------------------------------------------------------------------------------ //

                for (const entry of data) {
                    
                    const loader = factory.make(entry.source);
                    expect(loader)
                        .withContext(`Incorrect loader resolved from factory, for ${entry.name}`)
                        .toBeInstanceOf(entry.loader);
                    
                    const result = await loader.load();
                    expect(result)
                        .withContext(`Loaded configuration appears to be invalid, for ${entry.name}`)
                        .toEqual(entry.expected);
                }
            });

        });
    });
});