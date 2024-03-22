import { BindingEntry } from "@aedart/container";

describe('@aedart/container', () => {
    describe('BindingEntry', () => {

        it('fails when binding identifier is invalid', () => {
            
            const callback = () => {
                return new BindingEntry(null, () => false);     
            }
            
            expect(callback)
                .toThrowError(TypeError);
        });

        it('fails when binding value is invalid', () => {

            const callback = () => {
                return new BindingEntry(null, false);
            }

            expect(callback)
                .toThrowError(TypeError);
        });

        it('can create new binding entry', () => {
            const identifier = 'a';
            class A {}

            const binding = new BindingEntry(identifier, A, true);
            
            expect(binding.identifier)
                .withContext('Invalid identifier')
                .toBe(identifier);

            expect(binding.value)
                .withContext('Invalid value')
                .toBe(A);

            expect(binding.shared)
                .withContext('Invalid shared')
                .toBeTrue();
        });

        it('can determine if value is a constructor', () => {
            
            class A {}
            
            const binding = new BindingEntry('a', A);
            
            expect(binding.isConstructor())
                .withContext('Binding value should be a constructor')
                .toBeTrue();

            expect(binding.isFactoryCallback())
                .withContext('Binding value SHOULD NOT be a callback factory')
                .toBeFalse();
        });

        it('can determine if value is a constructor', () => {
            
            const binding = new BindingEntry('a', () => false);

            expect(binding.isConstructor())
                .withContext('Binding value SHOULD NOT be a constructor')
                .toBeFalse();

            expect(binding.isFactoryCallback())
                .withContext('Binding value should be a callback factory')
                .toBeTrue();
        });
    });
});