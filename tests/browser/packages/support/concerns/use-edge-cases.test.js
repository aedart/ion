import {AbstractConcern, AliasConflictError, use} from "@aedart/support/concerns";

describe('@aedart/support/concerns', () => {
    describe('Edge Cases', () => {

        it('concern can use other concern', () => {

            class ConcernA extends AbstractConcern {
                ping() {
                    return 'pong';
                }
            }

            /**
             * @property {() => string} ping
             */
            @use(ConcernA)
            class ConcernB extends AbstractConcern {
                pong() {
                    return 'ping';
                }
            }

            /**
             * @property {() => string} ping
             * @property {() => string} pong
             */
            @use(ConcernB)
            class Game {}
            
            // --------------------------------------------------------------------------- //

            const instance = new Game();

            // Game (instance).ping() -> Concern B (instance).ping() -> Concern A (instance).ping()

            expect(instance.ping())
                .toBe('pong');
            expect(instance.pong())
                .toBe('ping');
        });

        it('fails when getter and setter are declared in different concerns', () => {

            class ConcernA extends AbstractConcern {
                get title() {}
            }

            class ConcernB extends AbstractConcern {
                set title(value) {}
            }
            
            const callback = () => {
                @use(
                    ConcernA,
                    ConcernB // Conflicts with "title" from Concern A - same property key!
                )
                class A {}  
            }
            
            expect(callback)
                .toThrowError(AliasConflictError);
        });
    });
});