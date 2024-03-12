import { CallbackWrapper } from "@aedart/support";

describe('@aedart/support', () => {
    describe('CallbackWrapper', () => {

        it('fails if callback argument is not callable', () => {

            const callback = () => {
                CallbackWrapper.make(null);    
            }
            
            expect(callback)
                .toThrowError(TypeError);
        });

        it('can wrap callback with arguments', () => {
            
            const callback = () => {
                return true;
            }
            
            const args = [ 'a', 'b', 'c' ];
            
            // -------------------------------------------------------------------- //
            
            const wrapper = CallbackWrapper.make(callback, ...args);
            
            expect(wrapper.callback)
                .withContext('Invalid callback function in wrapper')
                .toBe(callback);
            
            expect(wrapper.hasArguments())
                .withContext('No arguments in wrapper')
                .toBeTrue();
            
            expect(wrapper.arguments)
                .withContext('Invalid arguments in wrapper')
                .toEqual(args);
        });

        it('can add additional arguments', () => {
            const callback = () => {
                return true;
            }

            const initialArgs = [ 'a', 'b', 'c' ];
            const additional = [ 'd', 'e', 'f' ];

            // -------------------------------------------------------------------- //

            const wrapper = CallbackWrapper.make(callback, ...initialArgs)
                .with(...additional);

            expect(wrapper.hasArguments())
                .withContext('No arguments in wrapper')
                .toBeTrue();

            expect(wrapper.arguments)
                .withContext('Invalid arguments in wrapper')
                .toEqual([ ...initialArgs, ...additional ]);
        });

        it('can clear arguments', () => {
            const callback = () => {
                return true;
            }

            const args = [ 'a', 'b', 'c' ];

            // -------------------------------------------------------------------- //

            const wrapper = CallbackWrapper.make(callback, ...args);
            wrapper.arguments = [];

            expect(wrapper.hasArguments())
                .withContext('Arguments not cleared in wrapper')
                .toBeFalse();
        });

        it('can specify a binding', () => {
            const callback = () => {
                return true;
            }

            class A {}
            const instance = new A();
            
            // -------------------------------------------------------------------- //

            const wrapper = CallbackWrapper.makeFor(instance, callback);
            
            expect(wrapper.hasBinding())
                .withContext('No binding in wrapper')
                .toBeTrue();
            
            expect(wrapper.binding)
                .withContext('Incorrect binding in wrapper')
                .toBe(instance);
        });

        it('can invoke callback', () => {
            
            const value = 1234;
            const callback = () => {
                return value;
            }
            
            // -------------------------------------------------------------------- //

            const wrapper = CallbackWrapper.make(callback);
            const result = wrapper.call();
            
            expect(result)
                .withContext('Invalid callback result')
                .toBe(value);
        });

        it('can invoke callback with arguments', () => {

            const callback = (arg1, arg2) => {
                return arg1 + arg2;
            }

            const a = 1;
            const b = 3;
            
            // -------------------------------------------------------------------- //
            
            const wrapper = CallbackWrapper.make(callback, a, b);
            const result = wrapper.call();

            expect(result)
                .withContext('Invalid callback result')
                .toBe(a + b);
        });

        it('can invoke callback with binding', () => {

            const callback = function(name) {
                return this.sayHi(name);
            };

            class A {
                sayHi(name) {
                    return `Hi ${name}`;
                }
            }

            const name = 'Olivia';
            
            // -------------------------------------------------------------------- //

            const wrapper = CallbackWrapper.makeFor(new A(), callback, name);
            const result = wrapper.call();

            expect(result)
                .withContext('Invalid callback result')
                .toEqual(`Hi ${name}`);
        });
    }); 
});