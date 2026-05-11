import { type MemberAddress as MemberAddressContract } from '@aedart/contracts/support/meta';
import { MemberAddress, OwnerContext } from '@aedart/support/meta';
import { describe, expect, test } from 'vitest';

describe('@meta() decorator', () => {
    describe('MemberAddress', () => {
        test('can obtain base path', () => {
            const ctx = new OwnerContext({});
            const address: MemberAddressContract = new MemberAddress(ctx, true, 'method', 'foo');

            const basePath = address.basePath;

            expect(basePath)
                .toEqual(['static', 'methods', 'foo']);
        });

        test('returns base path when no key given', () => {
            const ctx = new OwnerContext({});
            const address: MemberAddressContract = new MemberAddress(ctx, false, 'method', 'foo');

            const result = address.path();

            expect(result)
                .toEqual(['methods', 'foo']);
        });

        test('returns full path to given key', () => {
            const ctx = new OwnerContext({});
            const name = Symbol('my_foo_method');
            const key = Symbol('my_secret');
            const address: MemberAddressContract = new MemberAddress(ctx, true, 'method', name);

            const result = address.path(key);

            console.log('RESULT', result);
            
            expect(result)
                .toEqual(['static', 'methods', name, key]);
        });
    });
});
