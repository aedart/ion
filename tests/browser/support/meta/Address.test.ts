import { Address, OwnerContext } from '@aedart/support/meta';
import { describe, expect, test } from 'vitest';

describe('@meta() decorator', () => {
    describe('Address', () => {
        test('can obtain base path', () => {
            const address = new Address(undefined, true, 'method', 'foo');

            const basePath = address.basePath;

            expect(basePath)
                .toEqual(['static', 'methods', 'foo']);
        });

        test('returns base path when no key given', () => {
            const address = new Address(undefined, false, 'method', 'foo');

            const result = address.path();

            expect(result)
                .toEqual(['methods', 'foo']);
        });

        test('returns full path to given key', () => {
            const name = Symbol('my_foo_method');
            const key = Symbol('my_secret');
            const address = new Address(undefined, true, 'method', name);

            const result = address.path(key);

            expect(result)
                .toEqual(['static', 'methods', name, key]);
        });

        test('can (re)set ctx', () => {
            const contextA = new OwnerContext({});

            const address = new Address(contextA, true, 'method', 'foo');
            expect(address.ctx)
                .toEqual(contextA);

            const contextB = new OwnerContext({});
            address.ctx = contextB;
            expect(address.ctx)
                .toEqual(contextB);
        });
    });
});
