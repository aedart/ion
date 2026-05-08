import {
    type ConcernConstructor,
} from '@aedart/contracts/support/concerns';
import {
    AbstractConcern,
    AlreadyAppliedError,
    InjectionConflictError,
    InvalidConcernError,
    use,
    usesConcerns,
} from '@aedart/support/concerns';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/concerns', () => {
    describe('use() Decorator', () => {
        /**
         * Mock Concern: Timestamp
         */
        class TimestampConcern extends AbstractConcern
        {
            public getCreated(): number
            {
                return 12345;
            }
        }

        /**
         * Mock Concern: Logger
         */
        class LoggerConcern extends AbstractConcern
        {
            public log(msg: string): string
            {
                return `Log: ${msg}`;
            }
        }

        /**
         * Mock Concern: SecurityConcern
         */
        class SecurityConcern extends AbstractConcern
        {
            someMethod()
            {
                return 'safe';
            }
        }

        test('can inject concern properties into target class', () => {
            
            // eslint-disable-next-line @typescript-eslint/no-empty-object-type
            interface MyService extends TimestampConcern {}
            
            @use(TimestampConcern)
            class MyService
            {
            }

            const service = new MyService();

            expect(service.getCreated()).toBe(12345);
        });

        test('can inject multiple concerns', () => {
            
            interface MultiService extends TimestampConcern, LoggerConcern {}
            
            @use(TimestampConcern, LoggerConcern)
            class MultiService
            {
            }

            const service = new MultiService();

            expect(service.getCreated()).toBe(12345);
            expect(service.log('test')).toBe('Log: test');
        });

        test('throws InvalidConcernError if target is not a valid concern', () => {
            const action = () => {
                class NotAConcern
                {
                }
                
                @use(NotAConcern as ConcernConstructor) // Ignore "bad" type cast here - it's for failure testing!
                class FailingClass // eslint-disable-line @typescript-eslint/no-unused-vars
                {
                }
            };

            expect(action).toThrow(InvalidConcernError);
        });

        test('throws InjectionConflictError when property already exists on target', () => {
            const action = () => {
                @use(TimestampConcern)
                class ConflictingClass // eslint-disable-line @typescript-eslint/no-unused-vars
                {
                    public getCreated(): number
                    {
                        return 999;
                    }
                }
            };

            expect(action).toThrow(InjectionConflictError);
        });

        test('can alias properties to avoid conflicts', () => {
            
            interface AliasedService extends TimestampConcern {
                getTimestamp(): number;
            }
            
            @use({
                concern: TimestampConcern,
                aliases: { getCreated: 'getTimestamp' },
            })
            class AliasedService
            {
            }

            const service = new AliasedService();

            expect(service.getTimestamp()).toBe(12345);
            
            // Ensure that "getCreated" method does not exist!
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(service.getCreated).toBeUndefined();
        });

        test('can alias properties using shorthand configuration', () => {

            interface AliasedService extends TimestampConcern {
                getTimestamp(): number;
            }
            
            @use(
                [TimestampConcern, { getCreated: 'getTimestamp' }],
            )
            class AliasedService
            {
            }

            const service = new AliasedService();

            expect(service.getTimestamp()).toBe(12345);

            // Ensure that "getCreated" method does not exist!
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(service.getCreated).toBeUndefined();
        });

        test('can exclude specific properties', () => {

            // eslint-disable-next-line @typescript-eslint/no-empty-object-type
            interface ExcludedService extends LoggerConcern {}
            
            @use({
                concern: LoggerConcern,
                excludes: ['log'],
            })
            class ExcludedService
            {
            }

            const service = new ExcludedService();

            // Ensure that "log" is not defined / excluded.
            // eslint-disable-next-line @typescript-eslint/unbound-method
            expect(service.log).toBeUndefined();
        });

        test('throws AlreadyAppliedError if concern is already applied to parent', () => {
            @use(TimestampConcern)
            class Parent
            {}

            const action = () => {
                @use(TimestampConcern)
                class Child extends Parent // eslint-disable-line @typescript-eslint/no-unused-vars
                {}
            };

            expect(action).toThrow(AlreadyAppliedError);
        });

        test('throws error when aliasing to "constructor"', () => {
            const action = () => {
                @use([SecurityConcern, { someMethod: 'constructor' }])
                class DangerousClass // eslint-disable-line @typescript-eslint/no-unused-vars
                {}
            };

            expect(action).toThrow(InjectionConflictError);
            expect(action).toThrow(/Illegal alias target: constructor/);
        });

        test('throws error when aliasing to "__proto__"', () => {
            const action = () => {
                @use([SecurityConcern, { someMethod: '__proto__' }])
                class DangerousClass // eslint-disable-line @typescript-eslint/no-unused-vars
                {}
            };

            expect(action).toThrow(InjectionConflictError);
            expect(action).toThrow(/Illegal alias target: __proto__/);
        });

        test('throws error when aliasing to "prototype"', () => {
            const action = () => {
                @use([SecurityConcern, { someMethod: 'prototype' }])
                class DangerousClass // eslint-disable-line @typescript-eslint/no-unused-vars
                {}
            };

            expect(action).toThrow(InjectionConflictError);
            expect(action).toThrow(/Illegal alias target: prototype/);
        });
    });

    describe('Nested Concerns', () => {
        /**
         * Level 1: The "Base" behavior
         */
        class BaseBehavior extends AbstractConcern
        {
            public ping(): string
            {
                return 'pong';
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        interface CompositeConcern extends BaseBehavior {}
        
        /**
         * Level 2: A Concern that uses another Concern
         */
        @use(BaseBehavior)
        class CompositeConcern extends AbstractConcern
        {
            public hello(): string
            {
                return 'world';
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        interface FinalService extends CompositeConcern {}
        
        /**
         * Level 3: The Target Class
         */
        @use(CompositeConcern)
        class FinalService
        {}

        test('can access methods from nested concerns', () => {
            const service = new FinalService();

            // Directly from the primary concern
            expect(service.hello()).toBe('world');

            // Injected via the nested concern (BaseBehavior -> CompositeConcern -> FinalService)
            expect(service.ping()).toBe('pong');
        });

        test('registry identifies all concerns in the chain due to flattening', () => {
            // 1. Check primary application
            expect(usesConcerns(FinalService, CompositeConcern)).toBe(true);

            // 2. Check nested application (BaseBehavior should be in FinalService's registry)
            expect(usesConcerns(FinalService, BaseBehavior)).toBe(true);

            // 3. Check the blueprint itself still knows what it used
            expect(usesConcerns(CompositeConcern, BaseBehavior)).toBe(true);
        });

        test('throws AlreadyAppliedError if nested concern is already applied to target', () => {
            const action = () => {
                // BaseBehavior is already part of CompositeConcern.
                // Applying both manually should trigger the check.
                @use(BaseBehavior, CompositeConcern)
                class DoubleAppliedService // eslint-disable-line @typescript-eslint/no-unused-vars
                {}
            };

            expect(action).toThrow(AlreadyAppliedError);
        });

        test('throws AlreadyAppliedError if target parent already uses a nested concern', () => {
            @use(BaseBehavior)
            class ParentService
            {}

            const action = () => {
                // CompositeConcern also brings in BaseBehavior,
                // but ParentService already has it.
                @use(CompositeConcern)
                class ChildService extends ParentService // eslint-disable-line @typescript-eslint/no-unused-vars
                {}
            };

            expect(action).toThrow(AlreadyAppliedError);
        });

        test('deeply nested concerns are flattened correctly', () => {
            @use(CompositeConcern)
            class DeeplyNestedConcern extends AbstractConcern
            {}

            @use(DeeplyNestedConcern)
            class MassiveService
            {}

            expect(usesConcerns(MassiveService, BaseBehavior)).toBe(true);
            expect(usesConcerns(MassiveService, CompositeConcern)).toBe(true);
            expect(usesConcerns(MassiveService, DeeplyNestedConcern)).toBe(true);
        });
    });
});
