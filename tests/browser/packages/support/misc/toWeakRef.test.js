import { toWeakRef } from "@aedart/support/misc";

describe('@aedart/support/misc', () => {
   describe('toWeakRef', () => {

       it('returns undefined when target is null or undefined', () => {
           const targets = [
               null,
               undefined
           ];
           
           targets.forEach((target, index) => {
               expect(toWeakRef(target))
                   .withContext(`Target at index ${index} should be undefined`)
                   .toBeUndefined();
           });
       });

       it('returns weak reference when target already a weak reference', () => {
           
           const obj = { name: 'John' };
           
           const target = new WeakRef(obj);
           
           expect(toWeakRef(target))
               .withContext('Invalid target returned')
               .toBe(target);
       });

       it('wraps target into weak reference', () => {

           const obj = { name: 'John' };

           const result = toWeakRef(obj); 
           
           expect(result)
               .withContext('No weak reference returned')
               .toBeInstanceOf(WeakRef);

           expect(result?.deref())
               .withContext('Dereference failed')
               .toBe(obj);
       });
   });
});