import makeConcernsInjector from "../helpers/makeConcernsInjector";
import { AbstractConcern, InjectionError, UnsafeAliasError } from "@aedart/support/concerns";

describe('@aedart/support/concerns', () => {
    describe('ConcernsInjector', () => {
        describe('defineAlias()', () => {

            it('fails if key is "unsafe"', () => {
                class ConcernA extends AbstractConcern {}

                class A {}

                const injector = makeConcernsInjector(A);

                // --------------------------------------------------------------------------- //
                
                const callback = () => {
                    injector.defineAlias(A, 'foo', 'constructor', ConcernA);    
                }
                
                expect(callback)
                    .toThrowError(UnsafeAliasError);
            });

            it('does not define alias if property or method already exists in target"', () => {
                class ConcernA extends AbstractConcern {}

                class A {
                    get foo() {}
                    
                    bar() {}
                }

                const injector = makeConcernsInjector(A);

                // --------------------------------------------------------------------------- //

                const resultA = injector.defineAlias(A, 'foo', 'foo', ConcernA);
                const resultB = injector.defineAlias(A, 'bar', 'bar', ConcernA);
                
                expect(resultA)
                    .withContext('Property alias was defined when it SHOULD NOT be')
                    .toBeFalse();

                expect(resultB)
                    .withContext('Method alias was defined when it SHOULD NOT be')
                    .toBeFalse();
            });

            it('fails if key does not exist in concern', () => {
                class ConcernA extends AbstractConcern {}

                class A {}

                const injector = makeConcernsInjector(A);

                // --------------------------------------------------------------------------- //

                const callback = () => {
                    injector.defineAlias(A, 'foo', 'bar', ConcernA);
                }

                expect(callback)
                    .toThrowError(InjectionError);
            });

            it('can define proxies in target prototype', () => {
                class ConcernA extends AbstractConcern {
                    foo() {}
                    
                    get message() {}
                    set message(value) {}
                    
                    // Writable attribute
                    //title = 'ABC' // NOTE: This is defined below. Transpilers move this into the constructor (...uh)
                }
                Reflect.defineProperty(ConcernA.prototype, 'title', {
                    value: 'ABC',
                    writable: true,
                    enumerable: true,
                    configurable: true
                });

                class A {}

                const injector = makeConcernsInjector(A);
                
                // --------------------------------------------------------------------------- //

                const resultA = injector.defineAlias(A, 'foo', 'foo', ConcernA);
                const resultB = injector.defineAlias(A, 'message', 'message', ConcernA);
                const resultC = injector.defineAlias(A, 'title', 'title', ConcernA);
                
                // Debug
                // console.log('A.prototype', Reflect.ownKeys(A.prototype));
                
                expect(resultA)
                    .withContext('Method "foo" alias failed?!')
                    .toBeTrue();
                expect(Reflect.has(A.prototype, 'foo'))
                    .withContext('Method "foo" was not defined in target prototype')
                    .toBeTrue();

                expect(resultB)
                    .withContext('property "message" alias failed?!')
                    .toBeTrue();
                expect(Reflect.has(A.prototype, 'foo'))
                    .withContext('property "message" was not defined in target prototype')
                    .toBeTrue();

                expect(resultC)
                    .withContext('writable property "title" alias failed?!')
                    .toBeTrue();
                expect(Reflect.has(A.prototype, 'foo'))
                    .withContext('writable property "title" was not defined in target prototype')
                    .toBeTrue();
            });

            it('can interact with proxy properties and methods in target instance', () => {

                /**
                 * @ mixin Uhm, only works on objects!
                 */
                class ConcernA extends AbstractConcern {

                    /**
                     * Say hi to ...
                     *
                     * @param {string} name
                     * 
                     * @returns {string}
                     * 
                     * @memberof ConcernA
                     */
                    greetings(name) {
                        return `Hi ${name}`;
                    }

                    #msg = null;
                    get message() {
                        return this.#msg;
                    }
                    set message(value) {
                        this.#msg = value
                    }
                    
                    // Writable attribute
                    //title = 'ABC' // NOTE: This is defined below. Transpilers move this into the constructor (...uh)
                }
                Reflect.defineProperty(ConcernA.prototype, 'title', {
                    value: 'ABC',
                    writable: true,
                    enumerable: true,
                    configurable: true
                });

                /**
                 * A (with a bit of JSDoc experiment)
                 * 
                 * @ mixes ConcernA Uhm, only works on objects!
                 * @ borrows ConcernA#greetings as greetings Does not seem to work
                 * @ borrows ConcernA#greetings as A#greetings Does not seem to work
                 * @ property {ConcernA.greetings} greetings Does not seem to work
                 * @ property {typeof ConcernA.greetings} greetings Does not seem to work
                 * @property {(name: string) => string} greetings Say hi
                 * @property {string|null} message Set a message
                 * @property {string} title A title
                 */
                class A {
                }
                
                const injector = makeConcernsInjector(A);
                const target = injector.defineContainer(
                    injector.defineConcerns(A, [
                        ConcernA,
                    ])
                );

                // --------------------------------------------------------------------------- //

                injector.defineAlias(target, 'greetings', 'greetings', ConcernA);
                injector.defineAlias(target, 'message', 'message', ConcernA);
                injector.defineAlias(target, 'title', 'title', ConcernA);

                // Debug
                // console.log('A.prototype', Reflect.ownKeys(A.prototype));
                
                // --------------------------------------------------------------------------- //
                
                const instance = new A();

                // Method
                const result = instance.greetings('Timmy');
                expect(result)
                    .withContext('Method interaction failed')
                    .toBe('Hi Timmy');

                // Getter / Setter (Accessor)
                const message = 'There goes an elephant...';
                instance.message = message;
                expect(instance.message)
                    .withContext('getter/setter interaction failed')
                    .toBe(message);


                // "Writable" property, defined on prototype
                expect(instance.title)
                    .withContext('getter/setter interaction for "writable" property failed (A)')
                    .toBe('ABC');

                const newTitle = 'Zookeeper';
                instance.title = newTitle;
                expect(instance.title)
                    .withContext('getter/setter interaction for "writable" property failed (B)')
                    .toBe(newTitle);
            });

            it('alias remains for new target instance', () => {

                const defaultCategory = 'N/A';
                
                class ConcernA extends AbstractConcern {
                    
                    #category = defaultCategory;
                    get category() {
                        return this.#category;
                    }
                    set category(value) {
                        this.#category = value
                    }
                }

                /**
                 * @property {string} category A category name
                 */
                class A {}
                
                class B extends A {}

                const injector = makeConcernsInjector(A);
                const target = injector.defineContainer(
                    injector.defineConcerns(A, [
                        ConcernA,
                    ])
                );

                // --------------------------------------------------------------------------- //
                
                injector.defineAlias(target, 'category', 'category', ConcernA);

                // Debug
                // console.log('A.prototype', Reflect.ownKeys(A.prototype));
                
                const instanceA = new A();
                expect(instanceA.category)
                    .withContext('Incorrect default title for A')
                    .toBe(defaultCategory);
                
                const newCategoryA = 'Fish';
                instanceA.category = newCategoryA;
                expect(instanceA.category)
                    .withContext('Incorrect changed title for A')
                    .toBe(newCategoryA);
                
                const instanceB = new B();
                expect(instanceB.category)
                    .withContext('Incorrect default title for B')
                    .toBe(defaultCategory);

                const newCategoryB = 'Dogs';
                instanceB.category = newCategoryB;
                expect(instanceB.category)
                    .withContext('Incorrect changed title for B')
                    .toBe(newCategoryB);
                
            });
        });
    });
});