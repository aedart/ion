import { AbstractConcern } from "@aedart/support/concerns";
import { HIDDEN, PROVIDES } from "@aedart/contracts/support/concerns";
import { AbstractClassError } from "@aedart/support/exceptions";

describe('@aedart/support/concerns', () => {

    describe('AbstractConcern', () => {

        it('fails when attempting to create direct instance of Abstract Concern', () => {
            const callback = () => {
                return new AbstractConcern(class {});
            }
            
            expect(callback)
                .toThrowError(AbstractClassError);
        });

        it('can obtain concern owner instance', () => {
            
            class Owner {}
            
            class MyConcern extends AbstractConcern {}
            
            const owner = new Owner();
            const concern = new MyConcern(owner);
            
            const result = concern.concernOwner;
            expect(result)
                .toBe(owner);
        });

        it('defaults to concern instance when no owner given', () => {
            
            class MyConcern extends AbstractConcern {}
            
            const concern = new MyConcern();

            const result = concern.concernOwner;
            expect(result)
                .toBe(concern);
        });

        it('can obtain provided properties and methods', () => {

            class MyConcern extends AbstractConcern {
                foo() {}
                
                get bar() {}
            }

            class MyOtherConcern extends MyConcern {
                sayHi() {}
            }
            
            // const concern = new MyConcern();
            
            // --------------------------------------------------------------------------------------- //
            
            const resultA = MyOtherConcern[PROVIDES]();
            const resultB = MyConcern[PROVIDES](); // First concern class
            
            // Debug
            // console.log('result', resultA, resultB);

            // Note: Abstract Concern is NOT responsible for filtering out unsafe (ALWAYS_HIDDEN)
            // properties and methods!
            
            expect(resultA)
                .withContext('Incorrect properties for a')
                .toEqual([ 'constructor', 'concernOwner', 'foo', 'bar', 'sayHi' ]);
            
            expect(resultB)
                .withContext('Incorrect properties for b')
                .toEqual([ 'constructor', 'concernOwner', 'foo', 'bar' ]);
        });

        // TODO: To be removed
        xit('returns default list of hidden properties and methods', () => {

            class MyConcern extends AbstractConcern {}
            
            const result = MyConcern[HIDDEN]();
            
            // Debug
            // console.log('Hidden', result);
            
            expect(result.length)
                .not
                .toEqual(0)
        });

        // TODO: To be removed
        xit('can overwrite default hidden', () => {

            const newHidden = [ 'a', 'b', 'c' ];
            class MyConcern extends AbstractConcern {
                static [HIDDEN]()
                {
                    return newHidden;
                }
            }

            // --------------------------------------------------------------- /7
            
            const result = MyConcern[HIDDEN]();
            for (const key of result) {
                const k = typeof key == 'symbol'
                    ? key.toString()
                    : key;
                
                expect(newHidden.includes(key))
                    .withContext(`${k} not part of HIDDEN`)
                    .toBeTrue()
            }
        });
    });
});