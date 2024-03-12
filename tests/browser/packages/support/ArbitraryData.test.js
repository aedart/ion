import { ArbitraryData } from "@aedart/support";

describe('@aedart/support', () => {
    describe('ArbitraryData', () => {

        it('can set and obtain value for key', () => {
            
            const key = 'a.b';
            const value = 'Swell';
            
            // -------------------------------------------------------------------- //
            
            const data = new ArbitraryData();
            data.set(key, value);
            
            expect(data.has(key))
                .withContext('Key does not appear to exist')
                .toBeTrue();
            
            expect(data.get(key))
                .withContext('Incorrect value for key')
                .toBe(value);
        });

        it('returns default value when key does not exist', () => {

            const key = 'zar';
            const defaultValue = 'my_default';

            // -------------------------------------------------------------------- //

            const data = new ArbitraryData();
            
            expect(data.get(key, defaultValue))
                .withContext('Default value not returned')
                .toBe(defaultValue)
        });
        
        it('can forget key-value pair', () => {
            const key = 'foo';
            const value = 'bar';

            // -------------------------------------------------------------------- //

            const data = new ArbitraryData();
            data.set(key, value);
            
            const result = data.forget(key);
            expect(result)
                .withContext('Key not forgotten!')
                .toBeTrue();

            expect(data.has(key))
                .withContext('Key SHOULD NOT exist')
                .toBeFalse();
        });

        it('can flush all arbitrary data', () => {
            const keyA = 'foo';
            const keyB = 'bar';
            const keyC = 'zar';

            // -------------------------------------------------------------------- //

            const data = new ArbitraryData();
            data
                .set(keyA, 'a')
                .set(keyB, 'b')
                .set(keyC, 'c');

            data.flush();
            
            expect(data.has(keyA))
                .withContext('Key A SHOULD NOT exist')
                .toBeFalse();

            expect(data.has(keyB))
                .withContext('Key B SHOULD NOT exist')
                .toBeFalse();

            expect(data.has(keyC))
                .withContext('Key C SHOULD NOT exist')
                .toBeFalse();
        });

        it('can return all arbitrary data (record)', () => {
            const keyA = 'foo';
            const keyB = 'bar';

            // -------------------------------------------------------------------- //

            const data = new ArbitraryData();
            data
                .set(keyA, 'a')
                .set(keyB, 'b');

            const expected = {
                [keyA]: 'a',
                [keyB]: 'b'
            };

            expect(data.all())
                .withContext('Incorrect record')
                .toEqual(expected);
        });
    });
});