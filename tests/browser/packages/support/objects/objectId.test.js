import {
    uniqueId,
    hasUniqueId,
    ObjectId
} from '@aedart/support/objects';

describe('@aedart/support/objects', () => {
    describe('ObjectId', () => {

        it('can get unique id of object', () => {

            const objA = { name: 'Ulla' };
            const objB = { name: 'Olson' };
            const objC = objA;
            
            // ---------------------------------------------------------- //
            // Ensure no ID initially exists for objects
            
            expect(hasUniqueId(objA))
                .withContext('Object A has initial ID, but should not have')
                .toBeFalse();

            expect(hasUniqueId(objB))
                .withContext('Object B has initial ID, but should not have')
                .toBeFalse();

            expect(hasUniqueId(objC))
                .withContext('Object C has initial ID, but should not have')
                .toBeFalse();
            
            // ---------------------------------------------------------- //
            // Obtain ID
            let idA = uniqueId(objA);
            let idB = uniqueId(objB);
            let idC = uniqueId(objC);
            
            // console.log('a', idA);
            // console.log('b', idB);
            // console.log('c', idC);
            
            expect(idA)
                .withContext('Object A id was not generated')
                .toBeInstanceOf(Number);

            expect(idB)
                .withContext('Object B id was not generated')
                .toBeInstanceOf(Number);

            expect(idC)
                .withContext('Object C id was not generated')
                .toBeInstanceOf(Number);
            
            expect(idB)
                .withContext('Object B\'s id matches Object A\'s id')
                .not
                .toEqual(idA);

            expect(idC)
                .withContext('Object C\'s (ref. to Object A) should have same ID as Object A')
                .toEqual(idA);
            
            // ---------------------------------------------------------- //
            // Ensure objects now have id stored
            
            expect(hasUniqueId(objA))
                .withContext('Object A should have ID')
                .toBeTrue();

            expect(hasUniqueId(objB))
                .withContext('Object B should have ID')
                .toBeTrue();

            expect(hasUniqueId(objC))
                .withContext('Object C should have ID')
                .toBeTrue();
            
            // ---------------------------------------------------------- //
            // (Re)obtain ID
            
            expect(ObjectId.get(objA))
                .withContext('(Re)obtained ID for Object A is incorrect')
                .toBe(idA);

            expect(ObjectId.get(objB))
                .withContext('(Re)obtained ID for Object B is incorrect')
                .toBe(idB);

            expect(ObjectId.get(objC))
                .withContext('(Re)obtained ID for Object C is incorrect')
                .toBe(idC);
        });

        it('no longer has ID when object is reassigned', () => {
            let obj = { name: 'Ulrika' };
            const id = uniqueId(obj);
            
            // Reassign "obj" to a different object
            obj = { name: 'Other' };
            const newId = uniqueId(obj); 
            
            // console.log('original', id);
            // console.log('new', newId);
            
            expect(newId)
                .withContext('obj variable was reassigned, but same ID was returned')
                .not
                .toEqual(id);
        });
    });
});