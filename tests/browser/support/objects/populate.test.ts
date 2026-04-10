import { populate } from '@aedart/support/objects';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/objects', () => {
    describe('populate()', () => {
        test('populates all source properties into target', () => {
            class A
            {
                name = null;
                age = null;

                constructor(data: object)
                {
                    populate(this, data);
                }
            }

            const data = {
                name: 'Ally',
                age: 28,
            };

            // --------------------------------------------------------------------------- //

            const result = new A(data);

            expect(result.name, 'Property "name" not populated correctly')
                .toBe(data.name);

            expect(result.age, 'Property "age" not populated correctly')
                .toBe(data.age);
        });

        test('populates allowed properties into target', () => {
            class A
            {
                name = null;
                age = null;

                constructor(data: object)
                {
                    populate(this, data, 'name');
                }
            }

            const data = {
                name: 'Ally',
                age: 28,
            };

            // --------------------------------------------------------------------------- //

            const result = new A(data);

            expect(result.name, 'Property "name" not populated correctly')
                .toBe(data.name);

            expect(result.age, 'Property "age" not populated correctly')
                .toBeNull();
        });

        test('can select keys via callback', () => {
            const a = {
                name: null,
                age: null,
            };

            const b = {
                name: 'John Doe',
                age: 29,
            };

            const c = {
                name: 'Gwen',
                age: 42,
            };

            // --------------------------------------------------------------------------- //

            const callback = (target: object, source: object) => {
                const keys = ['name'];

                // @ts-expect-error Ignore arg. type for testing purposes
                if (Reflect.has(source, 'age') && source.age < 40) {
                    keys.push('age');
                }

                return keys;
            };

            // Populate with b...
            const result = populate(a, b, callback);

            // Populate again, but with c
            populate(a, c, callback);

            expect(result.name, 'Property "name" (from c) not populated correctly')
                .toBe(c.name);

            expect(result.age, 'Property "age" (from b) not populated correctly')
                .toBe(b.age);
        });

        test('prevents prototype pollution', () => {
            const A = {
                name: null,
                age: null,
            };

            const data = {
                __proto__: {
                    admin: true,
                },
                name: 'Ally',
                age: 28,
            };

            // --------------------------------------------------------------------------- //

            // NOTE: Reflect.ownKeys never returns '__proto__', so here we attempt to force
            // populate() to inject it (which should be prevented)
            const result = populate(A, data, [
                'name',
                'age',
                '__proto__', // Attempt to trick populate...
            ]);

            // Debug
            // console.log('__proto__', result, result.__proto__);

            const prototype = Reflect.getPrototypeOf(result);

            expect(Reflect.has(prototype as object, 'admin'), 'Prototype pollution NOT prevented')
                .toBeFalsy();

            expect(result.name, 'Property "name" not populated correctly')
                .toBe(data.name);

            expect(result.age, 'Property "age" not populated correctly')
                .toBe(data.age);
        });

        test('ignores source property if does not exist in target', () => {
            class A
            {
                name = null;
                age = null;

                constructor(data: object)
                {
                    populate(this, data);
                }
            }

            const data = {
                name: 'Sweeney',
                age: 36,
                
                // Title does not exist in A, should just be ignored
                title: 'Gardner',
            };

            // --------------------------------------------------------------------------- //

            const a = new A(data);
            
            expect(Reflect.has(a, 'title'))
                .toBeFalsy();
        });

        test('fails property if does not exist in target', () => {
            class A
            {
                name = null;
                age = null;

                constructor(data: object)
                {
                    populate(this, data, [
                        'name',
                        'age',

                        // Title does not exist - should cause failure, despite being allowed!
                        // (when in safe mode!)
                        'title'
                    ]);
                }
            }

            const data = {
                name: 'Sweeney',
                age: 36,

                // Title does not exist - should cause failure...
                title: 'Gardner',
            };

            // --------------------------------------------------------------------------- //

            const callback = () => {
                return new A(data);
            };

            expect(callback)
                .toThrow(TypeError);
        });
        
        test('can inject properties that target does not have, when "safe" mode disabled', () => {
            class A
            {
                name = null;
                age = null;

                constructor(data: object)
                {
                    populate(this, data, '*', false);
                }
            }

            const data = {
                name: 'Sweeney',
                age: 36,
                title: 'Gardner',
            };

            // --------------------------------------------------------------------------- //

            const result = new A(data);

            expect(Reflect.has(result, 'title'), 'Property "title" not populated')
                .toBeTruthy();

            // @ts-expect-error Ignoring args. for testing purposes.
            expect(result.title, 'Property "title" not populated correctly')
                .toBe(data.title);
        });
    });
});
