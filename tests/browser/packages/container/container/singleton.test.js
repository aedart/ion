import { Container } from "@aedart/container";

describe('@aedart/container', () => {
    describe('singleton', () => {

        it('can register "shared" binding', () => {
            class A {}
            
            const container = new Container();

            container.singleton('a', () => new A());

            // -------------------------------------------------------------------- //

            expect(container.isShared('a'))
                .withContext('Binding is not marked as "shared"')
                .toBeTrue();
            
            const first = container.make('a');
            const second = container.make('a');
            
            expect(first)
                .toBe(second);
        });

        it('"singleton if" does not overwrite existing binding', () => {
            class A {}
            class B {}

            const container = new Container();

            container
                .singletonIf('a', () => new A())
                .singletonIf('a', () => new B());

            // -------------------------------------------------------------------- //

            const result = container.make('a');
            expect(result)
                .toBeInstanceOf(A);
        });

        it('"singleton if" registers when there is no existing binding', () => {
            class A {}
            class B {}
            
            const container = new Container();

            container
                .singletonIf('a', () => new A())
                .singletonIf('b', () => new B());

            // -------------------------------------------------------------------- //

            const result = container.make('b');
            expect(result)
                .toBeInstanceOf(B);
        });

        it('can register constructor as "shared" binding', () => {
            class Bar {}

            const container = new Container();

            container.singleton('foo', Bar);

            // -------------------------------------------------------------------- //

            const first = container.make('foo');
            const second = container.make('foo');

            expect(first)
                .toBe(second);
        });
    });
});