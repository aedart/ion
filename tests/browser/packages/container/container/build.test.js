import {Container, BindingEntry, ContainerError, CircularDependencyError } from "@aedart/container";
import { dependencies } from "@aedart/support/container";

fdescribe('@aedart/support/container', () => {
    describe('build', () => {

        it('fails when concrete is not buildable', () => {
            const container = new Container();

            const callback = () => {
                container.build('not_buildable');    
            }
            
            expect(callback)
                .toThrowError(ContainerError);
        });

        it('can build constructor type', () => {
            const container = new Container();
            
            class Service {}

            // -------------------------------------------------------------------- //
            
            const result = container.build(Service);
            
            expect(result)
                .toBeInstanceOf(Service);
        });

        it('can build binding entry type', () => {
            const container = new Container();

            class Service {}

            const binding = new BindingEntry('my_service', Service);
            
            // -------------------------------------------------------------------- //

            const result = container.build(binding);

            expect(result)
                .toBeInstanceOf(Service);
        });

        it('passes arguments to factory callback', () => {
            const container = new Container();

            class Cache {
                ttl;
                
                constructor(ttl) {
                    this.ttl = ttl;
                }
            }

            const binding = new BindingEntry('my_service', (container, ...args) => {
                return new Cache(...args);
            });

            // -------------------------------------------------------------------- //

            const ttl = 500;
            const result = container.build(binding, [ ttl ]);

            expect(result)
                .toBeInstanceOf(Cache);
            expect(result.ttl)
                .toBe(ttl);
        });

        it('passes arguments to constructor', () => {
            const container = new Container();

            class Cache {
                ttl;

                constructor(ttl) {
                    this.ttl = ttl;
                }
            }

            const binding = new BindingEntry('my_service', Cache);

            // -------------------------------------------------------------------- //

            const ttl = 200;
            const result = container.build(binding, [ ttl ]);

            expect(result)
                .toBeInstanceOf(Cache);
            expect(result.ttl)
                .toBe(ttl);
        });

        it('resolves dependencies for constructor', () => {
            const container = new Container();

            class MyDriver {}
            
            @dependencies('my_driver')
            class Service {
                driver;
                
                constructor(driver) {
                    this.driver = driver;
                }
            }

            container.bind('my_driver', MyDriver);
            
            // -------------------------------------------------------------------- //
            
            const result = container.build(Service);
            
            expect(result.driver)
                .toBeInstanceOf(MyDriver);
        });

        it('resolves nested dependencies ', () => {
            const container = new Container();

            class A {}

            @dependencies(A)
            class B {
                item;
                
                constructor(item) {
                    this.item = item;
                }
            }

            @dependencies(B)
            class C {
                item;

                constructor(item) {
                    this.item = item;
                }
            }
            
            // -------------------------------------------------------------------- //
            
            const result = container.build(C);    

            expect(result.item)
                .withContext('B was expected as resolved dependency')
                .toBeInstanceOf(B);
            
            expect(result.item.item)
                .withContext('A was expected as nested resolved dependency')
                .toBeInstanceOf(A);
        });

        it('fails on circular dependency', () => {
            const container = new Container();

            // NOTE: This causes a circular dependency when resolving...
            @dependencies('c')
            class A {}

            @dependencies('a')
            class B {
                item;

                constructor(item) {
                    this.item = item;
                }
            }

            @dependencies('b')
            class C {
                item;

                constructor(item) {
                    this.item = item;
                }
            }

            container
                .bind('a', A)
                .bind('b', B)
                .bind('c', C);

            // -------------------------------------------------------------------- //

            const callback = () => {
                return container.build(C);    
            }
            
            expect(callback)
                .toThrowError(CircularDependencyError);
        });
    });
});