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
        
    });
});