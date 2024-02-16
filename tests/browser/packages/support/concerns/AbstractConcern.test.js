import { AbstractConcern } from "@aedart/support/concerns";
import { HIDDEN } from "@aedart/contracts/support/concerns";
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

        it('returns default list of hidden properties and methods', () => {

            class MyConcern extends AbstractConcern {}
            
            const result = MyConcern[HIDDEN]();
            
            // Debug
            // console.log('Hidden', result);
            
            expect(result.length)
                .not
                .toEqual(0)
        });

        it('can overwrite default hidden', () => {

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