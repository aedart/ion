import {getClassPropertyDescriptor, getClassPropertyDescriptors} from "@aedart/support/reflections";


fdescribe('@aedart/support/reflections', () => {

    describe('getClassPropertyDescriptors()', () => {

        it('fails when target has no prototype', () => {
            const callback = () => {
                const obj = Object.create(null);

                getClassPropertyDescriptors(obj);
            }

            expect(callback)
                .withContext('Should not be able to obtain anything from object without prototype')
                .toThrowError(TypeError);
        });

        it('can get property descriptors for class', () => {

            const MY_SYMBOL = Symbol('my_symbol');

            class A {
                set name(v) {}
                get name() {}
                bar() {}
                [MY_SYMBOL]() {}
            }

            // -------------------------------------------------------------------------------- //
            
            const expected = [
                'constructor',
                'name',
                'bar',
                MY_SYMBOL
            ];
            
            const descriptors = getClassPropertyDescriptors(A);
            
            // Debug
            // console.log(descriptors);

            for (const key of expected) {
                let k = (typeof key == "symbol")
                    ? key.toString()
                    : key
                
                expect(Reflect.has(descriptors, key))
                    .withContext('Key ' + k + ' not in descriptors record')
                    .toBeTrue();
                
                const descriptor = descriptors[key];
                
                // Debug
                // console.log(key, descriptor);
                
                expect(descriptor)
                    .withContext('No descriptor returned for ' + k)
                    .not
                    .toBeUndefined();
            }
        });

        it('can get property descriptors for class recursively', () => {

            const MY_SYMBOL = Symbol('my_symbol');

            class A {
                set name(v) {}
                get name() {}
                foo() {}
                [MY_SYMBOL]() {}
            }

            class B extends A {
                set bar(v) {}
                get bar() {}
            }
            
            // -------------------------------------------------------------------------------- //

            const expected = [
                'constructor',
                'name',
                'foo',
                'bar',
                MY_SYMBOL
            ];

            const descriptors = getClassPropertyDescriptors(B, true);
            for (const key of expected) {
                let k = (typeof key == "symbol")
                    ? key.toString()
                    : key

                expect(Reflect.has(descriptors, key))
                    .withContext('Key ' + k + ' not in descriptors record')
                    .toBeTrue();

                const descriptor = descriptors[key];
                expect(descriptor)
                    .withContext('No descriptor returned for ' + k)
                    .not
                    .toBeUndefined();
            }
        });

        it('returns top-most property descriptors', () => {

            const MY_SYMBOL = Symbol('my_symbol');

            class A {
                set name(v) {}
                get name() {}
                foo() {}
                [MY_SYMBOL]() {}
            }

            class B extends A {
                set name(v) {}
                get name() {}
                foo() {}
                [MY_SYMBOL]() {
                    return false;
                }
            }

            // -------------------------------------------------------------------------------- //

            const expected = [
                'constructor',
                'name',
                'foo',
                MY_SYMBOL
            ];
            
            const descriptors = getClassPropertyDescriptors(B, true);
            for (const key of expected) {
                let k = (typeof key == "symbol")
                    ? key.toString()
                    : key

                const parentDescriptor = getClassPropertyDescriptor(A, key);
                const targetDescriptor = getClassPropertyDescriptor(B, key);
                const descriptor = descriptors[key];
                
                // Debug
                // console.log('parent', key, parentDescriptor);
                // console.log('target', key, descriptor);
                
                // Value, get, set... check of descriptor
                const props = Reflect.ownKeys(descriptor);
                for (const p of props) {
                    
                    // Debug
                    // console.log('   - parent', p, parentDescriptor[p]);
                    // console.log('   - target', p, descriptor[p]);
                    
                    // Skip assert if not "value", "get" or "set
                    if (!['value', 'get', 'set'].includes(p)) {
                        continue;
                    }
                    
                    // Ensure does not match parent's descriptor...
                    expect(descriptor[p] !== parentDescriptor[p])
                        .withContext(`${k}[${p}] matches parent descriptor property, but SHOULD NOT do so`)
                        .toBeTrue();

                    // Double check...
                    expect(descriptor[p] === targetDescriptor[p])
                        .withContext(`${k}[${p}] does NOT match target property descriptor property!`)
                        .toBeTrue();
                }

                // Debug
                // console.log('- - - '.repeat(15));
            }
        });
    });

});