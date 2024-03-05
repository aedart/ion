import { hasAllMethods, hasMethod } from "@aedart/support/reflections";

describe('@aedart/support/reflections', () => {
    describe('hasAllMethods()', () => {

        it('can determine if target has methods', () => {

            const data = [
                {
                    value: null,
                    methods: [ 'foo', 'bar' ],
                    expected: false,
                    name: 'NUll'
                },
                {
                    value: [],
                    methods: [ 'foo', 'bar' ],
                    expected: false,
                    name: 'Array'
                },
                {
                    value: {},
                    methods: [ 'foo', 'bar' ],
                    expected: false,
                    name: 'Object (empty)'
                },
                {
                    value: {
                        foo: () => true,
                    },
                    methods: [ 'foo', 'bar' ],
                    expected: false,
                    name: 'Object (with some methods)'
                },
                {
                    value: {
                        foo: () => true,
                        bar: () => true,
                    },
                    methods: [ 'foo', 'bar' ],
                    expected: true,
                    name: 'Object (with all methods)'
                },
            ];

            for (const entry of data) {
                expect(hasAllMethods(entry.value, ...entry.methods))
                    .withContext(`${entry.name} was expected to ${entry.expected.toString()}`)
                    .toBe(entry.expected);
            }
            
        });
    });

    describe('hasMethod()', () => {

        it('can determine if target has method', () => {

            const data = [
                {
                    value: null,
                    method: 'foo',
                    expected: false,
                    name: 'NUll'
                },
                {
                    value: [],
                    method: 'foo',
                    expected: false,
                    name: 'Array'
                },
                {
                    value: {},
                    method: 'foo',
                    expected: false,
                    name: 'Object (empty)'
                },
                {
                    value: {
                        foo: () => true,
                    },
                    method: 'bar',
                    expected: false,
                    name: 'Object (with some methods)'
                },
                {
                    value: {
                        foo: () => true,
                        bar: () => true,
                    },
                    method: 'bar',
                    expected: true,
                    name: 'Object (with all methods)'
                },
            ];

            for (const entry of data) {
                expect(hasMethod(entry.value, entry.method))
                    .withContext(`${entry.name} was expected to ${entry.expected.toString()}`)
                    .toBe(entry.expected);
            }

        });
    });
});