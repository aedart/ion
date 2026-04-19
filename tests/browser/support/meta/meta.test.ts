import { meta, MetaRepository } from '@aedart/support/meta';
import { describe, expect, test } from 'vitest';

describe('@meta decorator & Target-Bound MetaRepository', () => {
    describe('Class vs. Member Isolation', () => {
        @meta('version', '1.0.0')
        class Service
        {
            @meta('role', 'admin')
            public doSomething() {}

            @meta('role', 'guest')
            public title: string = 'Hello';
        }

        test('class metadata is stored at root level', () => {
            const repo = new MetaRepository(Service[Symbol.metadata]!);
            expect(repo.get('version')).toBe('1.0.0');
            expect(repo.get('role')).toBeUndefined();
        });

        test('method metadata is namespaced and isolated', () => {
            const methodRepo = new MetaRepository(Service[Symbol.metadata]!, 'doSomething');
            expect(methodRepo.get('role')).toBe('admin');
            expect(methodRepo.get('version')).toBeUndefined();
        });

        test('all() returns a shallow clone of target-specific metadata', () => {
            const methodRepo = new MetaRepository(Service[Symbol.metadata]!, 'doSomething');
            const result = methodRepo.all();

            expect(result).toEqual({ role: 'admin' });

            // Mutation of the result should NOT affect the repository
            (result as any).role = 'hacked';
            expect(methodRepo.get('role')).toBe('admin');
        });
    });

    describe('Inheritance & Shadowing (Isolation)', () => {
        class Parent {
            @meta('tags', ['base'])
            public action() {}
        }

        class Child extends Parent {
            @meta('tags', ['child-override'])
            public override action() {}
        }

        test('child shadows parent member metadata without polluting parent', () => {
            const parentRepo = new MetaRepository(Parent[Symbol.metadata]!, 'action');
            const childRepo = new MetaRepository(Child[Symbol.metadata]!, 'action');

            expect(childRepo.get('tags')).toEqual(['child-override']);
            expect(parentRepo.get('tags')).toEqual(['base']);
        });

        test('deeply nested inheritance is preserved until overwritten', () => {
            class Base {
                @meta(['config', 'secure'], true)
                @meta(['config', 'retries'], 3)
                public setup() {}
            }
            class Sub extends Base {
                @meta(['config', 'retries'], 5)
                public override setup() {}
            }

            const subRepo = new MetaRepository(Sub[Symbol.metadata]!, 'setup');

            // Debug here...
            console.warn('subRepo metadata', subRepo);
            console.warn('Are context.metadata linked?', Object.getPrototypeOf(Sub[Symbol.metadata]) === Base[Symbol.metadata]);
            
            // Overwritten value
            expect(subRepo.get(['config', 'retries'])).toBe(5);
            // Inherited value (should still be accessible)
            expect(subRepo.get(['config', 'secure'])).toBe(true);

            // Verify Base is unchanged
            const baseRepo = new MetaRepository(Base[Symbol.metadata]!, 'setup');
            expect(baseRepo.get(['config', 'retries'])).toBe(3);
        });

        test('forget() shadows parent metadata in child', () => {
            class Base {
                @meta('shared', true)
                public data() {}
            }
            class Sub extends Base {}

            const subRepo = new MetaRepository(Sub[Symbol.metadata]!, 'data');
            expect(subRepo.get('shared')).toBe(true);

            // Deletes from Sub's shelf. 
            // Because we used Object.create, the key on Sub is removed, 
            // but the Base version is still reachable via prototype.
            subRepo.forget('shared');

            const baseRepo = new MetaRepository(Base[Symbol.metadata]!, 'data');
            expect(baseRepo.get('shared')).toBe(true);
        });
    });

    describe('Deep Path Operations', () => {
        class DeepService {
            @meta(['permissions', 'groups', 'admin'], { canWrite: true })
            public context: any;
        }

        test('supports complex deep paths within members', () => {
            const repo = new MetaRepository(DeepService[Symbol.metadata]!, 'context');
            expect(repo.get(['permissions', 'groups', 'admin', 'canWrite'])).toBe(true);
        });

        test('has() correctly identifies namespaced paths', () => {
            const repo = new MetaRepository(DeepService[Symbol.metadata]!, 'context');
            expect(repo.has(['permissions', 'groups'])).toBe(true);
            expect(repo.has(['permissions', 'unknown'])).toBe(false);
        });
    });
});
