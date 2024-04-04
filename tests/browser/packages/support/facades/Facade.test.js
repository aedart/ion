import { Facade, Container as ContainerFacade } from "@aedart/support/facades";
import { CONTAINER } from "@aedart/contracts/container";
import { Container } from "@aedart/container";
import { AbstractClassError, LogicalError } from "@aedart/support/exceptions";

describe('@aedart/support/facades', () => {
    describe('Facade', () => {

        afterEach(() => {
            Facade.destroy();
        });
        
        it('fails when creating a new instance', () => {
            const callback = () => {
                return new ContainerFacade();    
            }
            
            expect(callback)
                .toThrowError(AbstractClassError);
        });

        it('fails when getIdentifier() not implemented', () => {
            
            class MyFacade extends Facade {}

            const callback = () => {
                return MyFacade.getIdentifier();    
            }
            
            expect(callback)
                .toThrowError(LogicalError);
        });

        it('fails when obtain() not implemented', () => {

            class MyFacade extends Facade {}

            const callback = () => {
                return MyFacade.obtain();
            }

            expect(callback)
                .toThrowError(LogicalError);
        });

        it('can set and get service container', () => {
            
            const container = new Container();
            
            Facade.setContainer(container);
            
            // --------------------------------------------------------------- // 
            
            const result = Facade.getContainer();
            
            expect(Facade.hasContainer())
                .withContext('Service Container not available in Facade')
                .toBeTrue();
            
            expect(result)
                .withContext('Incorrect Service Container instance')
                .toBe(container);

            expect(ContainerFacade.getContainer())
                .withContext('Service Container instance not available in concrete facade class')
                .toBe(container);
        });

        it('can forget service container', () => {

            const container = new Container();

            Facade.setContainer(container);
            
            // --------------------------------------------------------------- // 

            Facade.forgetContainer()

            expect(Facade.hasContainer())
                .withContext('Service Container still available in Facade')
                .toBeFalse();
        });

        it('returns identifier, when defined in concrete facade class', () => {
            class MyFacade extends Facade {
                static getIdentifier()
                {
                    return 'my_identifier';
                }
            }

            // --------------------------------------------------------------- //
            
            const result = MyFacade.getIdentifier();
            
            expect(result)
                .toBe('my_identifier');
        });

        it('can obtain underlying instance', () => {
            const container = new Container();
            container.instance(CONTAINER, container);
            
            Facade.setContainer(container);

            // --------------------------------------------------------------- //
            
            const result = ContainerFacade.obtain();
            expect(result)
                .toBe(container);

            expect(Facade.hasResolved(CONTAINER))
                .withContext('Facade does not have instance marked as resolved')
                .toBeTrue();
        });

        it('can forget resolved underlying instance', () => {
            const container = new Container();
            container.instance(CONTAINER, container);

            Facade.setContainer(container);

            // --------------------------------------------------------------- //

            const result = ContainerFacade.obtain();
            expect(result)
                .toBe(container);
            
            expect(Facade.forgetResolved(CONTAINER))
                .withContext('Unable to forget resoled')
                .toBeTrue();
            
            expect(Facade.hasResolved(CONTAINER))
                .withContext('Facade should NOT have instance marked as resolved')
                .toBeFalse();
        });

        it('can register spy for concrete facade', () => {
            const container = new Container();
            container.instance(CONTAINER, container);
            Facade.setContainer(container);

            // --------------------------------------------------------------- //
            
            class MyFacade extends Facade {
                static getIdentifier()
                {
                    return 'my_identifier';    
                }

                /**
                 * @return {Foo}
                 */
                static obtain() {
                    return this.resolveIdentifier();
                }
            }

            class Foo {
                bar() {
                    return 'bar';
                }
            }
            
            container.singleton('my_identifier', Foo);

            // --------------------------------------------------------------- //
            
            let spy = null;
            const registered = MyFacade.spy((container, identifier) => {
                const obj = container.get(identifier);
                
                spy = spyOn(obj, 'bar')
                    .and
                    .returnValue('done');
                
                // NOTE: return entire object in this case - not just the mocked
                // function...
                return obj;
            });

            // --------------------------------------------------------------- //
            
            expect(MyFacade.isSpy())
                .withContext('Concrete Facade should be marked as a spy')
                .toBeTrue();

            expect(ContainerFacade.isSpy())
                .withContext('Other concrete Facade should NOT be marked as a spy')
                .toBeFalse();
            
            const resolved = MyFacade.obtain();
            expect(resolved)
                .withContext('Resolved instance should be a spy object')
                .toBe(registered);

            const result = resolved.bar();
            expect(result)
                .withContext('Spy does not appear to have worked...!')
                .toBe('done');
            
            expect(spy)
                .withContext('Spy not invoked!')
                .toHaveBeenCalled();

            // --------------------------------------------------------------- //

            expect(MyFacade.forgetSpy())
                .withContext('Unable to forget spy')
                .toBeTrue();
            expect(MyFacade.isSpy())
                .withContext('Concrete Facade should NOT LONGER be marked as a spy')
                .toBeFalse();
        });
    });
});