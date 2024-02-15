import {hasPrototypeProperty} from "@aedart/support/reflections";

fdescribe('@aedart/support/reflections', () => {
    describe('hasPrototypeProperty()', () => {

        it('can determine if object has prototype', () => {
            const obj = Object.create({ prototype: {} });
            const objWithProto = { __proto__: function() {} };
            
            const nullObj = Object.create(null);
            const objWithUndefinedProto = { __proto__: undefined };
            const objWithPrototypeNull = { prototype: null };
            
            expect(hasPrototypeProperty(obj))
                .withContext('object from Object.create({ prototype: {} }) should have a prototype')
                .toBeTrue();

            expect(hasPrototypeProperty(objWithProto))
                .withContext('object with __proto__ should have a prototype')
                .toBeTrue();
            
            expect(hasPrototypeProperty(nullObj))
                .withContext('object Object.create(null) should NOT have a prototype')
                .toBeFalse();

            expect(hasPrototypeProperty(objWithUndefinedProto))
                .withContext('object with __proto__:undefined should NOT have a prototype')
                .toBeFalse();

            expect(hasPrototypeProperty(objWithPrototypeNull))
                .withContext('object with prototype:null should NOT have a prototype')
                .toBeFalse();
        });

        it('can determine if function has prototype', () => {
            const fn = function() {};
            const arrowFn = () => true;

            expect(hasPrototypeProperty(fn))
                .withContext('function should have a prototype')
                .toBeTrue();

            expect(hasPrototypeProperty(arrowFn))
                .withContext('arrow function should NOT have a prototype')
                .toBeFalse();
        });
        
        it('can determine if class has prototype', () => {
            class A {}

            expect(hasPrototypeProperty(A))
                .withContext('Class A should have a prototype')
                .toBeTrue();
        });
    }); 
});