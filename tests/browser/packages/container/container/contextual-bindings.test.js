import { Container } from "@aedart/container";
import { dependencies } from "@aedart/support/container";

describe('@aedart/support/container', () => {
    describe('addContextualBinding', () => {

        it('register and resolve contextual binding', () => {
            const container = new Container();

            class A {}
            
            class B {}
            
            @dependencies(A)
            class C {
                resolved;
                constructor(resolved) {
                    this.resolved = resolved;
                }
            }

            // ----------------------------------------------------------------- //
            
            container
                .when(C)
                .needs(A)
                .give(B);
            
            // ----------------------------------------------------------------- //

            expect(container.hasContextualBindings(C))
                .withContext('Container SHOULD have contextual bindings registered for C')
                .toBeTrue();
            
            expect(container.hasContextualBinding(C, A))
                .withContext('Container SHOULD have a contextual binding registered')
                .toBeTrue();
            
            const result = container.make(C);
            expect(result)
                .withContext('Incorrect instance resolved (C expected)')
                .toBeInstanceOf(C);

            expect(result.resolved)
                .withContext('Incorrect dependency resolved (B expected) for C')
                .toBeInstanceOf(B);
        });

        it('can register contextual binding for multiple constructors', () => {
            const container = new Container();
            
            const identifier = 'storage';
            
            @dependencies(identifier)
            class ServiceA {
                storage;
                
                constructor(storage) {
                    this.storage = storage;
                }
            }

            @dependencies(identifier)
            class ServiceB {
                storage;

                constructor(storage) {
                    this.storage = storage;
                }
            }

            class MyStorage {}
            
            // ----------------------------------------------------------------- //

            const storage = new MyStorage();
            container
                .when(ServiceA, ServiceB)
                .needs(identifier)
                .give(() => {
                    return storage;
                });
            
            // ----------------------------------------------------------------- //
            
            const a = container.make(ServiceA);
            const b = container.make(ServiceB);
            
            expect(a.storage)
                .withContext('Incorrect resolved for A')
                .toBe(storage);

            expect(b.storage)
                .withContext('Incorrect resolved for B')
                .toBe(storage);
        });
    });
});