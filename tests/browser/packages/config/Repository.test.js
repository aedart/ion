import { Repository } from "@aedart/config";

describe('@aedart/config', () => {
    describe('Repository', () => {

        it('can create new instance', () => {
            
            const config = new Repository();
            
            // If no exception is thrown, then test passes
            expect(config)
                .not
                .toBeUndefined();
        });

        it('can determine if has item', () => {

            const config = new Repository({
                'foo': 'bar',
                'a': {
                    'b': true
                },
                'null': null,
            });
            
            // -------------------------------------------------------------------------- //
            
            expect(config.has('foo'))
                .withContext('Expected "foo" key to exist')
                .toBeTrue();

            expect(config.has('a.b'))
                .withContext('Expected "a.b" key to exist')
                .toBeTrue();

            expect(config.has('null'))
                .withContext('Expected "null" key to exist')
                .toBeTrue();

            expect(config.has('undefined'))
                .withContext('Non existing key ("undefined") should not be a valid item')
                .toBeFalse();
        });

        it('can obtain item value', () => {
            const items = {
                'foo': 'bar',
                'a': {
                    'b': true
                },
                'null': null,
            }; 
            
            const config = new Repository(items);

            // -------------------------------------------------------------------------- //
            
            expect(config.get('foo'))
                .withContext('Incorrect value for "foo"')
                .toBe(items.foo);

            expect(config.get('a.b'))
                .withContext('Incorrect value for "a.b"')
                .toBe(items.a.b);

            expect(config.get('null'))
                .withContext('Incorrect value for "null"')
                .toBe(items.null);
            
            expect(config.get('undefined'))
                .withContext('Expected undefined for non existing key')
                .toBeUndefined();
        });

        it('can return default value', () => {

            const config = new Repository();

            // -------------------------------------------------------------------------- //

            const defaultValue = 123;
            
            expect(config.get('foo', defaultValue))
                .withContext('Incorrect default value returned')
                .toBe(defaultValue);
            
        });

        it('can set item value', () => {

            const config = new Repository();

            // -------------------------------------------------------------------------- //
            
            const keyA = 'a';
            const valueA = 'The devastation is a conscious emitter.'
            
            const keyB = 'c.a';
            const valueB = 1234;
            
            config
                .set(keyA, valueA)
                .set(keyB, valueB);

            // -------------------------------------------------------------------------- //
            
            expect(config.has(keyA))
                .withContext('Key (A) does not exist')
                .toBeTrue();
            
            expect(config.get(keyA))
                .withContext('Incorrect value for key (A)')
                .toBe(valueA);

            expect(config.has(keyB))
                .withContext('Key (B) does not exist')
                .toBeTrue();

            expect(config.get(keyB))
                .withContext('Incorrect value for key (B)')
                .toBe(valueB);
        });

        it('can delete item', () => {
            const items = {
                'foo': 'bar',
                'a': {
                    'b': true
                },
            };

            const config = new Repository(items);

            // -------------------------------------------------------------------------- //
            
            expect(config.forget('foo'))
                .withContext('Failed to delete key "foo"')
                .toBeTrue();
            expect(config.has('foo'))
                .withContext('Key "foo" still exists')
                .toBeFalse();

            expect(config.forget('a.b'))
                .withContext('Failed to delete key "a.b"')
                .toBeTrue();
            expect(config.has('a.b'))
                .withContext('Key "a.b" still exists')
                .toBeFalse();

            expect(config.has('a'))
                .withContext('Key "a" should still exist')
                .toBeTrue();
            expect(config.get('a'))
                .withContext('Expected key "a" to be an empty object')
                .toEqual({});
        });

        it('can obtain all items', () => {
            const items = {
                'a': 1,
                'b': 2,
                'c': 3
            };

            const config = new Repository(items);

            // -------------------------------------------------------------------------- //
            
            expect(config.all())
                .withContext('Incorrect items returned')
                .toEqual(items);
        });

        it('can prepend value to item', () => {
            const config = new Repository();

            // -------------------------------------------------------------------------- //
            
            const key = 'foo';
            const valueA = 1;
            const valueB = 2;
            const valueC = 3;
            
            config
                .prepend(key, valueA)
                .prepend(key, valueB)
                .prepend(key, valueC);

            // -------------------------------------------------------------------------- //
            
            expect(config.get(key))
                .toEqual([ valueC, valueB, valueA ]);
        });

        it('can push value to item', () => {
            const config = new Repository();

            // -------------------------------------------------------------------------- //

            const key = 'foo';
            const valueA = 1;
            const valueB = 2;
            const valueC = 3;

            config
                .push(key, valueA)
                .push(key, valueB)
                .push(key, valueC);

            // -------------------------------------------------------------------------- //

            expect(config.get(key))
                .toEqual([ valueA, valueB, valueC ]);
        });
    });
});