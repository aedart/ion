import { shallowMerge } from '@aedart/support/objects';

describe('@aedart/support/objects', () => {
    describe('shallowMerge', () => {

        it('can returns a new object', () => {
            const source = { a: true, b: false };
            
            const result = shallowMerge(source);
            
            expect(result === source)
                .withContext('Result is identical to source, but should not be')
                .toBeFalse();
            
            expect(result)
                .withContext('Result should contain all properties from source')
                .toEqual(source);
        });

        it('can merge multiple sources into a new object', () => {
            
            const sourceA = { a: true };
            const sourceB = { b: true };
            const sourceC = { c: true };
            
            const result = shallowMerge(sourceA, sourceB, sourceC);
            
            expect(result)
                .toEqual({
                    ...sourceA,
                    ...sourceB,
                    ...sourceC
                })
        });

        it('prevents prototype pollution', () => {
            const source = { 'bar': 'zar' };
            
            const dangerousSource = {
                __proto__: {
                    'dangerous': true
                },
                'foo': 'bar'
            };
            
            const result = shallowMerge(source, dangerousSource);
            
            expect(Reflect.has(result, '__proto__'))
                .withContext('Result SHOULD NOT contain __proto__')
                .toBeFalse();
        });
    });
});