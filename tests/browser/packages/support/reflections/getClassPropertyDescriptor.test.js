import {getClassPropertyDescriptor} from "@aedart/support/reflections";

fdescribe('@aedart/support/reflections', () => {

    describe('getClassPropertyDescriptor()', () => {

        it('fails when target has no prototype', () => {
            const callback = () => {
                const obj = Object.create(null);

                getClassPropertyDescriptor(obj, 'name');
            }
            
            expect(callback)
                .withContext('Should not be able to obtain anything from object without prototype')
                .toThrowError(TypeError);
        });

        it('returns undefined if property does not exist', () => {
            class A {}
            
            const descriptor = getClassPropertyDescriptor(A, 'unknown_property');
            expect(descriptor)
                .toBeUndefined();
        });

        it('can get property descriptor from target prototype', () => {
            
            const MY_SYMBOL = Symbol('my_symbol');
            
            class A {
                set name(v) {}
                get name() {}
                foo() {}
                [MY_SYMBOL]() {}
            }
            
            const properties = [
                'name',
                'foo',
                MY_SYMBOL
            ];
            
            for (const key of properties) {
                const descriptor = getClassPropertyDescriptor(A, key);

                // Debug
                // console.log(descriptor);

                let k = (typeof key == "symbol")
                    ? key.toString()
                    : key
                
                expect(descriptor)
                    .withContext('No descriptor returned for ' + k)
                    .not
                    .toBeUndefined()
            }
        });

        it('returns undefined if property is private', () => {
            class A {
                #foo() {}
            }

            const a = getClassPropertyDescriptor(A, 'foo');
            expect(a)
                .withContext('Returned descriptor for "foo"')
                .toBeUndefined();

            const b = getClassPropertyDescriptor(A, '#foo');
            expect(b)
                .withContext('Returned descriptor for "#foo"')
                .toBeUndefined();
        });
    });
    
});