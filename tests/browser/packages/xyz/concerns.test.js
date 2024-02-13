// TODO: Remove these tests...
xdescribe('@aedart/xyz', () => {
    describe('concerns experiment', () => {

        it('can use "concerns" on classes', () => {

            // List of concern classes
            const CONCERN_CLASSES = Symbol('concern_classes');

            // To hold map of concern instances
            const CONCERNS = Symbol('my_concerns');

            // const concernClasses = new WeakMap();
            const container = new WeakMap();

            // --------------------------------------------------------------------------------------- //

            class MyConcernA {
                name = 'Jane Doe';
            }
            class MyConcernB {
                age = 31;
            }

            class MyConcernC {
                job = 'Office';
            }
            class MyConcernD {
                mail = 'my@somewhere.com';
            }

            // --------------------------------------------------------------------------------------- //

            const use = function(...concerns) {

                console.log('@use()');

                return (target, context) => {

                    console.log('@use() - applied', target, context);

                    context.addInitializer(function(arg) {
                        // This = class and NOT class instance here... can't use this for "boot"
                        console.log('init', arg, this);
                    });

                    // Kinda works...
                    //target.prototype[concerns] = new Map();

                    // TODO: Before adding CONCERN_CLASSES, we SHOULD prevent duplicate concerns,
                    // TODO: and naming conflicts...

                    // Define the concern classes to be applied.
                    Reflect.defineProperty(target.prototype, CONCERN_CLASSES, {
                        get() {
                            let output = [];

                            // Obtain evt. concern classes from parent class
                            let parent = Reflect.getPrototypeOf(target);
                            const fnProto = Reflect.getPrototypeOf(Function);

                            if (parent !== null && parent !== fnProto && Object.hasOwn(parent.prototype, CONCERN_CLASSES)) {
                                output = output.concat(parent.prototype[CONCERN_CLASSES]);
                            }

                            // Finally, add given concern classes to the list and return it.
                            return output.concat(concerns);
                        },
                        //writable: false
                    })

                    // Define "concerns" map getter // TODO: What if class already has defined, e.g. via inheritance?
                    Reflect.defineProperty(target.prototype, CONCERNS, {
                        // This can work... but how to deal with inheritance?
                        get() {
                            // TODO: Work...
                            console.log('   >>> concerns map access', this);
                            if (!container.has(this)) {
                                console.log('   >>> making new map for', this);
                                let map = new Map();

                                // We could obtain concern classes by invoking getter for CONCERNS,
                                // but then multiple instances would be created, which we do NOT want!
                                const concernClasses = this[CONCERN_CLASSES];
                                console.log('   >>> must init:', this, concernClasses);

                                // Init new concerns in map...
                                for (const concernClass of concernClasses) {
                                    map.set(concernClass, new concernClass())
                                }

                                // Finally, set the concerns map for class instance.
                                container.set(this, map);
                            }

                            return container.get(this);
                        }
                    });

                    //target.prototype[CONCERNS].set(MyConcern, new MyConcern()); // Problem: instance is created here...
                    // should somehow be lazy.

                    return target;

                    // Might work, but yields other issues.                 
                    // return class extends target {
                    //
                    //     [concerns] = new Map();
                    //    
                    //     static {
                    //         console.log('Static Block', target.prototype.constructor.name);
                    //         this.prototype.constructor.name = target.prototype.constructor.name; // Meh... ! Crappy
                    //     }
                    //    
                    //     constructor(...args) {
                    //         super(...args);
                    //     }
                    // }
                }
            }

            // --------------------------------------------------------------------------------------- //

            @use(
                MyConcernD,
                MyConcernA
            )
            class A {
                constructor() {
                    console.log('A');
                }
            }

            @use(
                MyConcernB
            )
            class B extends A {
                constructor() {
                    super();
                    console.log('B');
                }
            }

            @use(
                MyConcernC
            )
            class C extends B {
                constructor() {
                    super();
                    console.log('C');
                }
            }

            // -------------------------------------------------------------------------------- //

            const instanceA = new A();

            console.log(instanceA);
            console.log('instance has concerns symbol', Reflect.has(instanceA, CONCERNS));
            console.log('class has concerns symbol', Reflect.has(A, CONCERNS));

            const resultA = instanceA[CONCERNS].get(MyConcernA);
            console.log('result a', resultA, resultA?.name);
            console.log('- - - '.repeat(10));

            // -------------------------------------------------------------------------------- //

            instanceA[CONCERNS].get(MyConcernA).name = 'Booo';
            const resultAChanged = instanceA[CONCERNS].get(MyConcernA);
            console.log('result a (changed)', resultAChanged, resultAChanged?.name);

            const instanceA2 = new A();
            const resultB = instanceA2[CONCERNS].get(MyConcernA);
            console.log('Concern classes in A', instanceA2[CONCERN_CLASSES]);
            console.log('result b', resultB, resultB?.name); // Default value "Wee" here... which is good!
            console.log('- - - '.repeat(10));

            // -------------------------------------------------------------------------------- //

            const instanceB = new B();
            const bA = instanceB[CONCERNS].get(MyConcernA);
            const bB = instanceB[CONCERNS].get(MyConcernB);
            const bD = instanceB[CONCERNS].get(MyConcernD);
            console.log('Concern classes in B', instanceB[CONCERN_CLASSES]);
            console.log('Concerns in B', bA, bB, bD);
            console.log('- - - '.repeat(10));

            // -------------------------------------------------------------------------------- //

            const instanceC = new C();
            const cA = instanceC[CONCERNS].get(MyConcernA);
            const cB = instanceC[CONCERNS].get(MyConcernB);
            const cC = instanceC[CONCERNS].get(MyConcernC);
            const cD = instanceC[CONCERNS].get(MyConcernD);
            console.log('Concern classes in C', instanceC[CONCERN_CLASSES]);
            console.log('Concerns in C', cA, cB, cC, cD);
            console.log('- - - '.repeat(10));
        });

        it('can get concern "ownKeys"', () => {

            const OWN_KEYS = Symbol('concern_own_keys');
            const HIDDEN_KEYS = Symbol('concern_hidden_keys');
            
            const MY_SYMBOL = Symbol('bla');

            class A {
                // NOT OK
                name = 'John Doe';

                // NOT OK
                #other = 'unknown other';

                // NOT OK (accessor title in typescript results in get/set title, which is ok).
                title = 'stuff'; // OK

                // OK
                foo() {
                    return 'foo';
                }

                // OK
                get age() {
                    return 31;
                }

                // OK
                set desc(value) {
                    // N/A...
                }

                // OK
                [MY_SYMBOL]() {
                    return 'ccc';
                }

                /**
                 * Returns "concern's" own keys, along with class or superclass
                 * that defines them.
                 * 
                 * @return {Map<PropertyKey, Constructor>}
                 */
                static [OWN_KEYS]()
                {
                    let output = new Map();
                    
                    // Get evt. parent's keys.
                    let parent = Reflect.getPrototypeOf(this);
                    if (parent !== null && parent !== Reflect.getPrototypeOf(Function)) {
                        let parentKeys = parent[OWN_KEYS]();
                        parentKeys.forEach((target, key) => {
                            output.set(key, target);
                        });
                    }
                    
                    // Obtain this class' ownKeys
                    const hiddenKeys = this[HIDDEN_KEYS]();
                    const keys = Reflect.ownKeys(this.prototype);
                    for (const key of keys) {
                        // Skip if key must be hidden...
                        if (hiddenKeys.has(key)){
                            continue;
                        }
                        
                        output.set(key, this);
                    }

                    return output;
                }

                /**
                 * Set of keys that must NOT be aliased into owner class
                 * 
                 * @return {Set<PropertyKey>}
                 */
                static [HIDDEN_KEYS]() {
                    return new Set([
                        'constructor',
                        OWN_KEYS,
                        HIDDEN_KEYS,
                    ]);
                }
            }

            class B extends A {
                
                bar() {
                    return 'bar';
                }
            }
            

            //const keys = A[OWN_KEYS]();
            const target = B;
            const keys = target[OWN_KEYS]();
            // console.log('Keys', keys); // Iterator returned here...

            keys.forEach((target, key) => {
                // Regardless of what, a concern's constructor SHOULD NEVER be aliased into the target...
                if (key === 'constructor') {
                    return;
                }

                const descriptor = Reflect.getOwnPropertyDescriptor(target.prototype, key)
                console.log({
                    target,
                    key,
                    descriptor,
                    value: descriptor?.value,
                    get: descriptor?.get,
                    set: descriptor?.set
                });
                
                // console.log(key, descriptor, descriptor?.value);
                // console.log('value?', descriptor?.value);
                // console.log('get?', descriptor?.get);
                // console.log('set?', descriptor?.set);
                console.log('- - - - '.repeat(10));                
            });
            
        });
    });
});