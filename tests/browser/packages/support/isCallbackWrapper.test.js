import { CallbackWrapper, isCallbackWrapper } from "@aedart/support";

describe('@aedart/support', () => {
    describe('isCallbackWrapper', () => {

        it('can determine if value is a callback wrapper object', () => {

            // Custom Callback Wrapper - valid because it contains all expected property keys,
            // despite not truly satisfies the interface...
            const custom = {
                'callback': false,
                'binding': false,
                'arguments': false,
                'with': false,
                'hasArguments': false,
                'bind': false,
                'hasBinding': false,
                'call': false,
            };
            
            const data = [
                { value: undefined, expected: false, name: 'undefined' },
                { value: null, expected: false, name: 'null' },
                { value: [], expected: false, name: 'array' },
                { value: {}, expected: false, name: 'object' },
                
                { value: CallbackWrapper.make(() => true), expected: true, name: 'CallbackWrapper (instance)' },
                { value: custom, expected: true, name: 'custom CallbackWrapper (instance)' },
            ];

            for (const entry of data) {
                expect(isCallbackWrapper(entry.value))
                    .withContext(`${entry.name} was expected to ${entry.expected.toString()}`)
                    .toBe(entry.expected);
            }
        });
    });
});