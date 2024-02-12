import { Bare, hasMixin } from "@aedart/support/mixins";

describe('@aedart/support/mixins', () => {
    describe('decorators', () => {

        describe('Bare', () => {

            it('mixin is on prototype chain', () => {

                const MyMixin = Bare((superclass) => class extends superclass {});    
                
                class A extends MyMixin(class {}) {}
                
                // -------------------------------------------------------------------------- //
                
                const instance = new A();
                
                const result = hasMixin(instance, MyMixin);
                expect(result)
                    .toBeTrue();
            });

            it('can invoke methods from mixin, superclass and subclass', () => {

                const MyMixin = Bare((superclass) => class extends superclass {
                    foo() {
                        return 'foo';
                    }
                });
                
                class A {
                    bar() {
                        return 'bar';
                    }
                }
                
                class B extends MyMixin(A) {
                    fin() {
                        return 'fin'
                    }
                }

                // -------------------------------------------------------------------------- //
                
                const instance = new B();

                expect(instance.foo())
                    .withContext('mixin defined method not invoked')
                    .toEqual('foo');

                expect(instance.bar())
                    .withContext('superclass defined method not invoked')
                    .toEqual('bar');

                expect(instance.fin())
                    .withContext('subclass defined method not invoked')
                    .toEqual('fin');
            });

            it('mixin methods overwrite superclass methods', () => {

                // For better or worse, this is one of the edge cases that can really create a mess.
                // Whenever a mixin is applied, and it has the same name as a parent class that it is
                // applied on, the mixin will overwrite it... 
                
                const MyMixin = Bare((superclass) => class extends superclass {
                    foo() {
                        return 'bar';
                    }
                });

                class A {
                    foo() {
                        return 'foo';
                    }
                }

                class B extends MyMixin(A) {}

                // -------------------------------------------------------------------------- //

                const instance = new B();

                expect(instance.foo())
                    .withContext('mixin should overwrite superclass foo method')
                    .toEqual('bar');
            });

            it('subclass methods overwrite mixin methods', () => {
                
                const MyMixin = Bare((superclass) => class extends superclass {
                    foo() {
                        return 'bar';
                    }
                });

                class A {
                    foo() {
                        return 'foo';
                    }
                }

                class B extends MyMixin(A) {
                    foo() {
                        return 'zim';
                    }
                }

                // -------------------------------------------------------------------------- //

                const instance = new B();

                expect(instance.foo())
                    .withContext('subclass should overwrite mixin defined methods')
                    .toEqual('zim');
            });

            it('subclass methods overwrite superclass methods', () => {

                const MyMixin = Bare((superclass) => class extends superclass {});

                class A {
                    foo() {
                        return 'foo';
                    }
                }

                class B extends MyMixin(A) {
                    foo() {
                        return 'bar';
                    }
                }

                // -------------------------------------------------------------------------- //

                const instance = new B();

                expect(instance.foo())
                    .withContext('subclass should overwrite superclass defined methods')
                    .toEqual('bar');
            });
            
            it('mixin can invoke superclass methods', () => {
                
                const MyMixin = Bare((superclass) => class extends superclass {
                    foo() {
                        return super.foo();
                    }
                });

                class A {
                    foo() {
                        return 'weeee';
                    }
                }

                class B extends MyMixin(A) {}

                // -------------------------------------------------------------------------- //

                const instance = new B();

                expect(instance.foo())
                    .withContext('mixin should invoke superclass foo method')
                    .toEqual('weeee');
            });

            it('subclass can invoke parent methods', () => {

                const MyMixin = Bare((superclass) => class extends superclass {});

                class A {
                    foo() {
                        return 'bar';
                    }
                }

                class B extends MyMixin(A) {
                    foo() {
                        return super.foo();
                    }
                }

                // -------------------------------------------------------------------------- //

                const instance = new B();

                expect(instance.foo())
                    .withContext('subclass should be able to call super.foo')
                    .toEqual('bar');
            });
            
        });
    });
});