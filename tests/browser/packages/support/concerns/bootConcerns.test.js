import {bootConcerns, bootAllConcerns, getConcernsContainer, AbstractConcern, use} from "@aedart/support/concerns";

describe('@aedart/support/concerns', () => {
    describe('bootConcerns()', () => {
        it('can boot concerns', () => {
            class ConcernA extends AbstractConcern {}
            class ConcernB extends AbstractConcern {}
            class ConcernC extends AbstractConcern {}

            @use(
                ConcernA,
                ConcernB
            )
            class A {}

            @use(ConcernC)
            class B extends A {
                constructor() {
                    super();

                    bootConcerns(this, ConcernA, ConcernB);
                }
            }

            // ------------------------------------------------------------------------------------ //

            const instance = new B();
            const container = getConcernsContainer(instance);
            
            expect(container.hasBooted(ConcernA))
                .withContext('Concern A not booted')
                .toBeTrue();
            expect(container.hasBooted(ConcernB))
                .withContext('Concern B not booted')
                .toBeTrue();

            expect(container.hasBooted(ConcernC))
                .withContext('Concern C SHOULD NOT have booted')
                .toBeFalse();
        });

    });

    describe('bootAllConcerns()', () => {
        it('can boot all concerns', () => {

            class ConcernA extends AbstractConcern {}
            class ConcernB extends AbstractConcern {}
            class ConcernC extends AbstractConcern {}

            @use(
                ConcernA,
                ConcernB
            )
            class A {}

            @use(ConcernC)
            class B extends A {
                constructor() {
                    super();

                    bootAllConcerns(this);
                }
            }


            // ------------------------------------------------------------------------------------ //

            const instance = new B();
            const container = getConcernsContainer(instance);

            expect(container.hasBooted(ConcernA))
                .withContext('Concern A not booted')
                .toBeTrue();
            expect(container.hasBooted(ConcernB))
                .withContext('Concern B not booted')
                .toBeTrue();
            expect(container.hasBooted(ConcernC))
                .withContext('Concern C not booted')
                .toBeTrue();
        });
    });
});