import { populate } from "@aedart/support/objects";

describe('@aedart/support/objects', () => {
    describe('populate()', () => {
        
        it('populates all source properties into target', () => {
            
            class A {
                name = null;
                age = null;
                
                constructor(data) {
                    populate(this, data);
                }
            }
            
            const data = {
                name: 'Ally',
                age: 28
            };
            
            // --------------------------------------------------------------------------- //
            
            const result = new A(data);
            
            expect(result.name)
                .withContext('Property "name" not populated correctly')
                .toBe(data.name);

            expect(result.age)
                .withContext('Property "age" not populated correctly')
                .toBe(data.age);
        });

        it('populates selected source properties into target', () => {

            class A {
                name = null;
                age = null;

                constructor(data) {
                    populate(this, data, 'name');
                }
            }

            const data = {
                name: 'Ally',
                age: 28
            };

            // --------------------------------------------------------------------------- //

            const result = new A(data);

            expect(result.name)
                .withContext('Property "name" not populated correctly')
                .toBe(data.name);

            expect(result.age)
                .withContext('Property "age" not populated correctly')
                .toBeNull();
        });

        it('can select source keys via callback', () => {
            
            const a = {
                name: null,
                age: null,
            };
            
            const b = {
                name: 'John Doe', age: 29
            }
            
            const c = {
                name: 'Gwen', age: 42
            };
            
            // --------------------------------------------------------------------------- //

            const callback = (source) => {
                const keys = [ 'name' ];
                
                if (Reflect.has(source, 'age') && source.age < 40) {
                    keys.push('age');
                }
                
                return keys;
            }
            
            // Populate with b...
            const result = populate(a, b, callback);
            
            // Populate again, but with c
            populate(a, c, callback);

            expect(result.name)
                .withContext('Property "name" (from c) not populated correctly')
                .toBe(c.name);

            expect(result.age)
                .withContext('Property "age" (from b) not populated correctly')
                .toBe(b.age);
        });
        
        it('prevents prototype pollution', () => {

            const A = {
                name: null,
                age: null,
            }
            
            const data = {
                __proto__: {
                    admin: true
                },
                name: 'Ally',
                age: 28
            };

            // --------------------------------------------------------------------------- //

            // NOTE: Reflect.ownKeys never returns '__proto__', so here we attempt to force
            // populate() to inject it (which should be prevented)
            const result = populate(A, data, [
                'name',
                'age',
                '__proto__' // Attempt to trick populate...
            ]);

            // Debug
            // console.log('__proto__', result, result.__proto__);
            
            const prototype = Reflect.getPrototypeOf(result);
            
            expect(Reflect.has(prototype, 'admin'))
                .withContext('Prototype pollution NOT prevented')
                .toBeFalse();
            
            expect(result.name)
                .withContext('Property "name" not populated correctly')
                .toBe(data.name);

            expect(result.age)
                .withContext('Property "age" not populated correctly')
                .toBe(data.age);
        });

        it('fails if key does not exist in target', () => {

            class A {
                name = null;
                age = null;

                constructor(data) {
                    populate(this, data);
                }
            }

            const data = {
                name: 'Sweeney',
                age: 36,
                title: 'Gardner'
            };

            // --------------------------------------------------------------------------- //

            const callback = () => {
                return new A(data);    
            }
            
            expect(callback)
                .toThrowError(TypeError);
        });

        it('can inject properties that target does not have, when "safe" mode disabled', () => {

            class A {
                name = null;
                age = null;

                constructor(data) {
                    populate(this, data, '*', false);
                }
            }

            const data = {
                name: 'Sweeney',
                age: 36,
                title: 'Gardner'
            };

            // --------------------------------------------------------------------------- //

            const result = new A(data);

            expect(Reflect.has(result, 'title'))
                .withContext('Property "title" not populated')
                .toBeTrue();
            
            expect(result.title)
                .withContext('Property "title" not populated correctly')
                .toBe(data.title);
        });
    }); 
});