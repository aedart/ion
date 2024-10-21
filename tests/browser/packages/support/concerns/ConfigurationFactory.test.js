import makeConfigurationFactory from "./helpers/makeConfigurationFactory.js";
import {AbstractConcern, InjectionError, isUnsafeKey} from "@aedart/support/concerns";

describe('@aedart/support/concerns', () => {
    describe('ConfigurationFactory', () => {

        it('fails when entry is neither a concern class or configuration', () => {
            
            const entry = {};
            
            const factory = makeConfigurationFactory();
            
            // ------------------------------------------------------------------ //
            
            const callback = () => factory.make(class {}, entry); 
            
            expect(callback)
                .toThrowError(InjectionError);
        });

        it('returns default configuration for a concern class', () => {
            
            class MyConcern extends AbstractConcern {
                foo() {}
            }

            const factory = makeConfigurationFactory();

            // ------------------------------------------------------------------ //
            
            const configuration = factory.make(class {}, MyConcern);
            
            // Debug
            // console.log('configuration', configuration);
           
            // concern
            expect(Reflect.has(configuration, 'concern'))
                .withContext('Concern property does not exist in configuration')
                .toBeTrue();
            expect(configuration.concern)
                .withContext('Incorrect concern class in configuration')
                .toBe(MyConcern);

            // aliases
            expect(Reflect.has(configuration, 'aliases'))
                .withContext('Aliases property does not exist in configuration')
                .toBeTrue();
            expect(configuration.aliases)
                .withContext('Incorrect aliases object in configuration')
                .toEqual({ 'foo': 'foo' });
            
            // allowAliases
            expect(Reflect.has(configuration, 'allowAliases'))
                .withContext('AllowAliases property does not exist in configuration')
                .toBeTrue();
            expect(configuration.allowAliases)
                .withContext('Incorrect allowAliases value configuration')
                .toBeTrue();
        });

        it('populates aliases when not given in configuration', () => {
            class MyConcern extends AbstractConcern {
                zoom() {}
            }

            const entry = { concern: MyConcern }
            
            const factory = makeConfigurationFactory();

            // ------------------------------------------------------------------ //

            const configuration = factory.make(class {}, entry);

            // Debug
            // console.log('configuration', configuration);

            // concern
            expect(Reflect.has(configuration, 'concern'))
                .withContext('Concern property does not exist in configuration')
                .toBeTrue();
            expect(configuration.concern)
                .withContext('Incorrect concern class in configuration')
                .toBe(MyConcern);

            // aliases
            expect(Reflect.has(configuration, 'aliases'))
                .withContext('Aliases property does not exist in configuration')
                .toBeTrue();
            expect(configuration.aliases)
                .withContext('Incorrect aliases object in configuration')
                .toEqual({ 'zoom': 'zoom' });

            // allowAliases
            expect(Reflect.has(configuration, 'allowAliases'))
                .withContext('AllowAliases property does not exist in configuration')
                .toBeTrue();
            expect(configuration.allowAliases)
                .withContext('Incorrect allowAliases value configuration')
                .toBeTrue();
        });

        it('can specify custom aliases', () => {
            class MyConcern extends AbstractConcern {
                foo() {}
                
                bar() {}
            }

            const aliases = {
                'foo': 'a',
                'bar': 'b'
            };
            const entry = { concern: MyConcern, aliases: aliases };

            const factory = makeConfigurationFactory();

            // ------------------------------------------------------------------ //

            const configuration = factory.make(class {}, entry);

            // Debug
            // console.log('configuration', configuration);

            expect(configuration.aliases)
                .withContext('Incorrect aliases object in configuration')
                .toEqual(aliases);
        });

        it('merges default aliases with custom aliases', () => {
            class MyConcern extends AbstractConcern {
                foo() {}

                bar() {}
            }

            const aliases = {
                'bar': 'a'
            };
            const entry = { concern: MyConcern, aliases: aliases };

            const factory = makeConfigurationFactory();

            // ------------------------------------------------------------------ //

            const configuration = factory.make(class {}, entry);

            // Debug
            // console.log('configuration', configuration);

            expect(configuration.aliases)
                .withContext('Incorrect aliases object in configuration')
                .toEqual({ 'foo': 'foo', ...aliases });
        });
        
        it('can disable aliases', () => {
            class MyConcern extends AbstractConcern {
                sayGoodBye() {}

                sayHi() {}
            }


            const entry = { concern: MyConcern, allowAliases: false };

            const factory = makeConfigurationFactory();

            // ------------------------------------------------------------------ //

            const configuration = factory.make(class {}, entry);

            // Debug
            // console.log('configuration', configuration);

            expect(configuration.allowAliases)
                .withContext('Incorrect allowAliases value configuration')
                .toBeFalse();
            
            expect(configuration.aliases)
                .withContext('Incorrect aliases object in configuration')
                .toEqual({});
        });

        it('removes unsafe keys / aliases', () => {
            class MyConcern extends AbstractConcern {
                foo() {}
            }

            const aliases = {
                'foo': 'a',
                
                'constructor': 'danger' // This should NOT be part of normalised aliases
            };
            const entry = { concern: MyConcern, aliases: aliases };

            const factory = makeConfigurationFactory();

            // ------------------------------------------------------------------ //

            const configuration = factory.make(class {}, entry);

            // Debug
            // console.log('configuration', configuration);

            expect(configuration.aliases)
                .withContext('Incorrect aliases object in configuration')
                .not
                .toEqual({ 'foo': 'a', ...aliases });

            const keys = Reflect.ownKeys(configuration.aliases);
            for (const key of keys) {
                expect(isUnsafeKey(key))
                    .withContext(`Unsafe key "${key.toString()}" is part of aliases`)
                    .toBeFalse();
            }
        });

        it('can make configuration from shorthand', () => {

            class MyConcern extends AbstractConcern {
                foo() {}
            }

            const aliases = {
                'foo': 'a',
            };
            const entry = [ MyConcern, aliases ];

            const factory = makeConfigurationFactory();

            // ------------------------------------------------------------------ //

            const configuration = factory.make(class {}, entry);

            expect(configuration.concern)
                .withContext('Incorrect aliases object in configuration')
                .toEqual(MyConcern);
            
            expect(configuration.aliases)
                .withContext('Incorrect aliases object in configuration')
                .toEqual({ ...aliases });

            expect(configuration.allowAliases)
                .withContext('Incorrect allowAliases in configuration')
                .toBeTrue();
        });
    }); 
});