import {
    ConcernsContainer,
    AbstractConcern,
    NotRegisteredError, BootError
} from "@aedart/support/concerns";
import { getNameOrDesc } from "@aedart/support/reflections";

describe('@aedart/support/concerns', () => {
    describe('ConcernsContainer', () => {

        it('can create new instance', () => {
            const owner = new class {};
            const container = new ConcernsContainer(owner, []);

            // ----------------------------------------------------------------------------------- //
            
            expect(container)
                .toBeInstanceOf(ConcernsContainer);
            
            expect(container.size)
                .withContext('No concerns should be available')
                .toBe(0);
            
            expect(container.isEmpty())
                .withContext('Should be empty')
                .toBeTrue();

            expect(container.isNotEmpty())
                .withContext('Should be empty (via is not empty)')
                .toBeFalse();
            
            expect(container.owner)
                .withContext('Incorrect owner')
                .toBe(owner);
        });

        it('can create instance with concerns registered', () => {
            
            class A extends AbstractConcern {}
            class B extends AbstractConcern {}
            class C extends AbstractConcern {}
            const concerns = [ A, B, C ];
            
            const container = new ConcernsContainer(new class {}, concerns);

            // ----------------------------------------------------------------------------------- //
            
            expect(container.size)
                .withContext('Incorrect size')
                .toBe(concerns.length);

            expect(container.isEmpty())
                .withContext('Should NOT be empty')
                .toBeFalse()

            expect(container.isNotEmpty())
                .withContext('Should NOT be empty (via is not empty)')
                .toBeTrue()
        });

        it('can obtain all registered concern classes', () => {

            class A extends AbstractConcern {}
            class B extends AbstractConcern {}
            class C extends AbstractConcern {}
            const concerns = [ A, B, C ];

            const container = new ConcernsContainer(new class {}, concerns);

            // ----------------------------------------------------------------------------------- //

            const all = container.all();
            let c = 0;
            for (const concern of all) {
                expect(concerns.includes(concern))
                    .withContext(`Unknown concern ${getNameOrDesc(concern)} in container`)
                    .toBeTrue();

                c++;
            }
            
            expect(c)
                .withContext('Invalid amount of concern classes returned by all()')
                .toBe(concerns.length)
        });

        it('can determine if concern class is registered', () => {
            class A extends AbstractConcern {}
            class B extends AbstractConcern {}
            class C extends AbstractConcern {}
            const concerns = [ A, B, C ];

            const container = new ConcernsContainer(new class {}, concerns);

            // ----------------------------------------------------------------------------------- //

            // Determine if exists in container
            for (const concern of concerns) {
                expect(container.has(concern))
                    .withContext(`${getNameOrDesc(concern)} SHOULD be in container`)
                    .toBeTrue();
            }
        });

        it('can boot concern', () => {
            class A extends AbstractConcern {}
            const owner = new class {};
            
            const container = new ConcernsContainer(owner, [ A ]);

            // ----------------------------------------------------------------------------------- //
            
            expect(container.hasBooted(A))
                .withContext('Concern should not (yet) be booted')
                .toBeFalse();

            // ----------------------------------------------------------------------------------- //
            
            const concern = container.boot(A);
            
            expect(concern)
                .withContext('Incorrect boot of concern class')
                .toBeInstanceOf(A);

            expect(concern.concernOwner)
                .withContext('Concern owner not set')
                .toBe(owner);
            
            expect(container.hasBooted(A))
                .withContext('Concern SHOULD be booted')
                .toBeTrue();
        });

        it('fails booting concern if not registered', () => {
            class A extends AbstractConcern {}

            const container = new ConcernsContainer(new class {}, []);

            // ----------------------------------------------------------------------------------- //

            const callback = () => {
                return container.boot(A);
            }
            
            // ----------------------------------------------------------------------------------- //
            
            expect(callback)
                .toThrowError(NotRegisteredError);
        });

        it('fails booting concern if already booted', () => {
            class A extends AbstractConcern {}

            const container = new ConcernsContainer(new class {}, [ A ]);
            container.boot(A);
            
            // ----------------------------------------------------------------------------------- //

            const callback = () => {
                // Concern should already be booted at this point and thus exception is expected
                // to be thrown...
                container.boot(A);
            }

            // ----------------------------------------------------------------------------------- //

            expect(callback)
                .toThrowError(BootError);
        });

        it('fails if concern throws exception when instantiated', () => {
            const msg = 'Test';
            class A extends AbstractConcern {
                constructor(owner) {
                    super(owner);
                    
                    throw new Error(msg);
                }
            }

            const container = new ConcernsContainer(new class {}, [ A ]);

            // ----------------------------------------------------------------------------------- //

            let wasThrown = false;
            try {
                container.boot(A);
            } catch (error) {
                wasThrown = true;

                // Debug
                // console.log(error.toString());
                // console.log(error.cause);
                
                expect(error)
                    .withContext('Should be instance of BootError')
                    .toBeInstanceOf(BootError);
                
                expect(error?.cause?.previous)
                    .withContext('Custom error cause - previous - not set!')
                    .not
                    .toBeUndefined();

                expect(error?.cause?.owner)
                    .withContext('Custom error cause - owner - not set!')
                    .not
                    .toBeUndefined();

                expect(error?.cause?.concern)
                    .withContext('Custom error cause - concern - incorrect concern!')
                    .toBe(A);
            }
            
            expect(wasThrown)
                .withContext('Exception was expected thrown during concern initialisation')
                .toBeTrue();
        });

        it('can boot all concerns', () => {

            class A extends AbstractConcern {}
            class B extends AbstractConcern {}
            class C extends AbstractConcern {}
            const concerns = [ A, B, C ];

            const container = new ConcernsContainer(new class {}, concerns);

            // ----------------------------------------------------------------------------------- //

            container.bootAll();
            
            // ----------------------------------------------------------------------------------- //
            
            for (const concern of concerns) {
                expect(container.hasBooted(concern))
                    .withContext(`${getNameOrDesc(concern)} not booted`)
                    .toBeTrue();
            }
        });

        it('boots concern when obtained via get()', () => {
            class A extends AbstractConcern {}
            const owner = new class {};

            const container = new ConcernsContainer(owner, [ A ]);

            // ----------------------------------------------------------------------------------- //

            expect(container.hasBooted(A))
                .withContext('Concern should not (yet) be booted')
                .toBeFalse();

            // ----------------------------------------------------------------------------------- //

            const concern = container.get(A);

            expect(concern)
                .withContext('Incorrect boot of concern class')
                .toBeInstanceOf(A);
            
            expect(container.hasBooted(A))
                .withContext('Concern SHOULD be booted')
                .toBeTrue();
        });

        it('returns booted concern, if already booted, when obtained via get()', () => {
            class A extends AbstractConcern {}
            const container = new ConcernsContainer(new class {}, [ A ]);

            // ----------------------------------------------------------------------------------- //

            const previousBooted = container.boot(A);

            expect(container.hasBooted(A))
                .withContext('Concern SHOULD be booted')
                .toBeTrue();

            // ----------------------------------------------------------------------------------- //

            const concern = container.get(A);
            expect(concern)
                .withContext('Incorrect instance obtained')
                .toBeInstanceOf(A);
            
            expect(concern)
                .withContext('Concern instance SHOULD match previous booted instance')
                .toBe(previousBooted);
        });

        it('fails obtaining concern instance via get(), if not registered', () => {
            class A extends AbstractConcern {}
            const container = new ConcernsContainer(new class {}, []);
            
            const callback = () => {
                return container.get(A);
            }
            
            expect(callback)
                .toThrowError(NotRegisteredError);
        });
    });
});