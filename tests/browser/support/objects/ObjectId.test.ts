import { hasUniqueId, ObjectId, uniqueId } from '@aedart/support/objects';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/objects', () => {
    describe('ObjectId', () => {
        test('can get unique id of object', () => {
            const objA = { name: 'Ulla' };
            const objB = { name: 'Olson' };
            const objC = objA;

            // ---------------------------------------------------------- //
            // Ensure no ID initially exists for objects

            expect(hasUniqueId(objA), 'Object A has initial ID, but should not have')
                .toBeFalsy();

            expect(hasUniqueId(objB), 'Object B has initial ID, but should not have')
                .toBeFalsy();

            expect(hasUniqueId(objC), 'Object C has initial ID, but should not have')
                .toBeFalsy();

            // ---------------------------------------------------------- //
            // Obtain ID
            const idA = uniqueId(objA);
            const idB = uniqueId(objB);
            const idC = uniqueId(objC);

            // console.log('a', idA);
            // console.log('b', idB);
            // console.log('c', idC);

            expect(idA, 'Object A id was not generated')
                .toBeTypeOf('number');

            expect(idB, 'Object B id was not generated')
                .toBeTypeOf('number');

            expect(idC, 'Object C id was not generated')
                .toBeTypeOf('number');

            expect(idB, "Object B's id matches Object A's id")
                .not
                .toEqual(idA);

            expect(idC, "Object C's (ref. to Object A) should have same ID as Object A")
                .toEqual(idA);

            // ---------------------------------------------------------- //
            // Ensure objects now have id stored

            expect(hasUniqueId(objA), 'Object A should have ID')
                .toBeTruthy();

            expect(hasUniqueId(objB), 'Object B should have ID')
                .toBeTruthy();

            expect(hasUniqueId(objC), 'Object C should have ID')
                .toBeTruthy();

            // ---------------------------------------------------------- //
            // (Re)obtain ID

            expect(ObjectId.get(objA), '(Re)obtained ID for Object A is incorrect')
                .toBe(idA);

            expect(ObjectId.get(objB), '(Re)obtained ID for Object B is incorrect')
                .toBe(idB);

            expect(ObjectId.get(objC), '(Re)obtained ID for Object C is incorrect')
                .toBe(idC);
        });

        test('no longer has ID when object is reassigned', () => {
            let obj = { name: 'Ulrika' };
            const id = uniqueId(obj);

            // Reassign "obj" to a different object
            obj = { name: 'Other' };
            const newId = uniqueId(obj);

            // console.log('original', id);
            // console.log('new', newId);

            expect(newId, 'obj variable was reassigned, but same ID was returned')
                .not
                .toEqual(id);
        });
    });
});
