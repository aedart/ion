import {
    isKey,
    mergeKeys
} from '@aedart/support/misc';

fdescribe('@aedart/support/misc', () => {
    describe('mergeKeys', () => {

        it('can merge keys', () => {
            const a = Symbol('my-symbol');
            const b = [ 'b', 'c.d' ];
            const c = 23;
            
            const result = mergeKeys(a, b, c);
            const expected = [ a, ...b, c];
            
            expect(result)
                .withContext('Incorrect merge of keys')
                .toEqual(expected);
            
            expect(isKey(result))
                .withContext('Invalid key output')
                .toBeTrue();
        });

        it('returns empty key when no arguments given', () => {
            const result = mergeKeys();
            const expected = [];
            
            expect(result)
                .withContext('Should return empty key')
                .toEqual(expected);
        });

        it('throws TypeError when invalid arguments are given', () => {
            const a = Symbol('my-symbol');
            const b = [ 'b', 'c.d' ];
            const c = false; // Invalid key

            const callback = () => {
                return mergeKeys(a, b, c);
            }

            expect(callback)
                .withContext('Should throw TypeError when arguments are invalid')
                .toThrowError(TypeError);
        });
    });
});