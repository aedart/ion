import { hasPrototypeProperty } from "@aedart/support/reflections";
import { describe, expect, test } from 'vitest';

describe('@aedart/support/refelctions', () => {
    describe('hasPrototypeProperty', () => {

        test('can determine if object has prototype', () => {
            const obj = Object.create({ prototype: {} });
            const objWithProto = { __proto__: function() {} };

            const nullObj = Object.create(null);
            const objWithUndefinedProto = { __proto__: undefined };
            const objWithPrototypeNull = { prototype: null };

            expect(hasPrototypeProperty(obj), 'object from Object.create({ prototype: {} }) should have a prototype')
                .toBeTruthy();

            expect(hasPrototypeProperty(objWithProto), 'object with __proto__ should have a prototype')
                .toBeTruthy();

            expect(hasPrototypeProperty(nullObj), 'object Object.create(null) should NOT have a prototype')
                .toBeFalsy();

            expect(hasPrototypeProperty(objWithUndefinedProto), 'object with __proto__:undefined should NOT have a prototype')
                .toBeFalsy();

            expect(hasPrototypeProperty(objWithPrototypeNull), 'object with prototype:null should NOT have a prototype')
                .toBeFalsy();
        });

        test('can determine if function has prototype', () => {
            const fn = function() {};
            const arrowFn = () => true;

            expect(hasPrototypeProperty(fn), 'function should have a prototype')
                .toBeTruthy();

            expect(hasPrototypeProperty(arrowFn), 'arrow function should NOT have a prototype')
                .toBeFalsy();
        });

        test('can determine if class has prototype', () => {
            class A {}

            expect(hasPrototypeProperty(A), 'Class A should have a prototype')
                .toBeTruthy();
        });

        test('returns false when null given', () => {
            // @ts-expect-error null isn't accepted, but we force it here for testing purposes.
            expect(hasPrototypeProperty(null), 'null does not have prototype')
                .toBeFalsy();
        });
        
    });
});
