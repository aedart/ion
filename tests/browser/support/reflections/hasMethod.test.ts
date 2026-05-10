import { hasAllMethods, hasMethod } from '@aedart/support/reflections';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/refelctions', () => {
    describe('hasAllMethods()', () => {
        test('can determine if target has methods', () => {
            const data = [
                {
                    value: null,
                    methods: ['foo', 'bar'],
                    expected: false,
                    name: 'NULL',
                },
                {
                    value: [],
                    methods: ['foo', 'bar'],
                    expected: false,
                    name: 'Array',
                },
                {
                    value: {},
                    methods: ['foo', 'bar'],
                    expected: false,
                    name: 'Object (empty)',
                },
                {
                    value: {
                        foo: () => true,
                    },
                    methods: ['foo', 'bar'],
                    expected: false,
                    name: 'Object (with some methods)',
                },
                {
                    value: {
                        foo: () => true,
                        bar: () => true,
                    },
                    methods: ['foo', 'bar'],
                    expected: true,
                    name: 'Object (with all methods)',
                },
            ];

            for (const entry of data) {
                expect(
                    // @ts-expect-error Ignore type of value for testing purpose
                    hasAllMethods(entry.value, ...entry.methods),
                    `${entry.name} was expected to ${String(entry.expected)}`,
                )
                    .toBe(entry.expected);
            }
        });
    });

    describe('hasMethod()', () => {
        test('can determine if target has method', () => {
            const data = [
                {
                    value: null,
                    method: 'foo',
                    expected: false,
                    name: 'NULL',
                },
                {
                    value: [],
                    method: 'foo',
                    expected: false,
                    name: 'Array',
                },
                {
                    value: {},
                    method: 'foo',
                    expected: false,
                    name: 'Object (empty)',
                },
                {
                    value: {
                        foo: () => true,
                    },
                    method: 'bar',
                    expected: false,
                    name: 'Object (with some methods)',
                },
                {
                    value: {
                        foo: () => true,
                        bar: () => true,
                    },
                    method: 'bar',
                    expected: true,
                    name: 'Object (with all methods)',
                },
            ];

            for (const entry of data) {
                expect(
                    // @ts-expect-error Ignore type of value for testing purpose
                    hasMethod(entry.value, entry.method),
                    `${entry.name} was expected to ${String(entry.expected)}`,
                )
                    .toBe(entry.expected);
            }
        });
    });
});
