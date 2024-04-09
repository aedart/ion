import { Container } from "@aedart/container";

describe('@aedart/support/container', () => {
    describe('extend', () => {

        it('can extend existing binding', () => {
            const container = new Container();
            
            class A {
                foo;
            }
            
            container
                .bind('a', () => new A())
                .extend('a', (resolved) => {
                    resolved.foo = 'bar';
                    
                    return resolved;
                })
            
            // ----------------------------------------------------------------- //
            
            const result = container.make('a');
            
            expect(result)
                .toBeInstanceOf(A);
            
            expect(result.foo)
                .toBe('bar');
        });

        it('can extend shared instance', () => {
            const container = new Container();

            class A {
                name;
            }

            container
                .singleton('a', () => new A());

            // ----------------------------------------------------------------- //
            
            const first = container.make('a');
            
            // ----------------------------------------------------------------- //

            container.extend('a', (resolved) => {
                resolved.name = 'Jimmy';
                
                return resolved;
            });
            
            // ----------------------------------------------------------------- //
            
            const second = container.make('a');

            expect(first)
                .withContext('First not of correct instance')
                .toBeInstanceOf(A);
            expect(second)
                .withContext('Second not of correct instance')
                .toBeInstanceOf(A);

            expect(first)
                .withContext('First and second instance SHOULD be the same')
                .toBe(second);
            
            expect(second.name)
                .toBe('Jimmy');
        });

        it('can replace shared instance via extend', () => {
            const container = new Container();

            class A {}
            class B {}

            container
                .singleton('a', () => new A());

            // ----------------------------------------------------------------- //

            const first = container.make('a');

            // ----------------------------------------------------------------- //

            container.extend('a', () => {
                // This might be unusual to do, but possible!
                return new B();
            });

            // ----------------------------------------------------------------- //

            const second = container.make('a');
            
            expect(first)
                .withContext('First incorrect')
                .toBeInstanceOf(A);
            
            expect(second)
                .withContext('Second incorrect')
                .toBeInstanceOf(B);

            expect(first)
                .withContext('First and second instance SHOULD NOT be the same')
                .not
                .toBe(second);
        });
    });
});