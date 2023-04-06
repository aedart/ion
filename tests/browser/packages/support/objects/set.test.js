import {
    set,
    has,
    get
} from '@aedart/support/objects';

describe('@aedart/support/objects', () => {
    describe('set', () => {

        it('can set property', function () {

            let target = {};
            
            const foo = Symbol('foo-symbol');
            let values = [
                { key: 'a', value: 1234 },
                { key: 'b.name', value: 'Ole' },
                { key: 'b.c', value: { age: 48 } },
                { key: 'd[0]', value: { name: 'Tim' } },
                { key: 'd[1].name', value: 'Erica' },
                { key: foo, value: true },
                { key: ['e', 'nested', foo], value: 'bar' },
            ];

            values.forEach(({key, value}, index) => {
                set(target, key, value);
                
                expect(has(target, key))
                    .withContext(`Target does not contain key for values index ${index}`)
                    .toBeTrue();
                
                expect(get(target, key))
                    .withContext(`Incorrect value in target for values index ${index}`)
                    .toBe(value);
            });
            
            // Debug
            // console.log(target);
            // console.log(target.d);
            // console.log(target.e);
        });
    });
});