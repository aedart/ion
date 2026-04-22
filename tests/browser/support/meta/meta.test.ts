import { meta, MetaRepository } from '@aedart/support/meta';
import { describe, expect, test } from 'vitest';

describe('NUCLEAR DIAGNOSTIC: Shelf Identity', () => {
    test('IDENTITY CHECK', () => {
        class Base
        {
            @meta('a', 1)
            m()
            {}
        }
        class Sub extends Base
        {}

        const baseShelf = (Base as any)[Symbol.metadata];
        const subShelf = (Sub as any)[Symbol.metadata];

        console.log('--- Nuclear Diagnostic ---');
        console.log('Identity: Are shelves literally the same object?', baseShelf === subShelf);
        console.log(
            'Prototype: Is Base the proto of Sub?',
            Object.getPrototypeOf(subShelf) === baseShelf,
        );

        // Let's test a raw mutation
        if (subShelf !== baseShelf) {
            subShelf.leak_test = 'mutated';
            console.log(
                'After raw mutation - Sub owns leak_test?',
                Object.hasOwn(subShelf, 'leak_test'),
            );
            console.log('After raw mutation - Base has leak_test?', 'leak_test' in baseShelf);
        }

        expect(baseShelf).not.toBe(subShelf);
    });
});
//
// describe('@meta decorator & Target-Bound MetaRepository', () =>
// {
//     describe('Diagnostic & Inheritance Isolation', () =>
//     {
//         test('DIAGNOSE: verify prototype-based branching for members', () =>
//         {
//             class Base { @meta('key', 'base-value') m() {} }
//             class Sub extends Base { @meta('key', 'sub-value') override m() {} }
//
//             const baseShelf = (Base as any)[Symbol.metadata];
//             const subShelf = (Sub as any)[Symbol.metadata];
//
//             console.log('--- Prototype Diagnostic ---');
//             console.log('Sub Metadata:', JSON.stringify(subShelf, null, 2));
//             console.log('Base Metadata:', JSON.stringify(baseShelf, null, 2));
//
//             // Verify top-level shelf inheritance
//             expect(Object.getPrototypeOf(subShelf)).toBe(baseShelf);
//             console.log('Class Shelf Prototype Linked: ✅');
//
//             // Verify member-namespace branching (Isolation)
//             expect(subShelf.m).not.toBe(baseShelf.m);
//             expect(Object.getPrototypeOf(subShelf.m)).toBe(baseShelf.m);
//             console.log('Member Namespace Prototype Branched: ✅');
//
//             // Verify that Sub did not mutate Base
//             const baseRepo = new MetaRepository(baseShelf, 'm');
//             const subRepo = new MetaRepository(subShelf, 'm');
//             expect(baseRepo.get('key')).toBe('base-value');
//             expect(subRepo.get('key')).toBe('sub-value');
//         });
//
//         test('DIAGNOSE: verify deep path isolation via repository set()', () =>
//         {
//             class Base { @meta(['config', 'timeout'], 1000) setup() {} }
//             class Sub extends Base {}
//
//             const baseShelf = (Base as any)[Symbol.metadata];
//             const subShelf = (Sub as any)[Symbol.metadata];
//
//             const subRepo = new MetaRepository(subShelf, 'setup');
//             const baseRepo = new MetaRepository(baseShelf, 'setup');
//
//             console.log('--- Deep Path Diagnostic: Initial State ---');
//             console.log('Sub owns "setup"?', Object.hasOwn(subShelf, 'setup'));
//             console.log('Base owns "setup"?', Object.hasOwn(baseShelf, 'setup'));
//
//             if (subShelf.setup && baseShelf.setup) {
//                 console.log('Shared "setup" reference?', subShelf.setup === baseShelf.setup);
//                 console.log('Shared "config" reference?', subShelf.setup.config === baseShelf.setup.config);
//             }
//
//             // Perform the write that causes the leak
//             subRepo.set(['config', 'timeout'], 5000);
//
//             console.log('--- Deep Path Diagnostic: After Write ---');
//             console.log('Sub setup config timeout:', subRepo.get(['config', 'timeout']));
//             console.log('Base setup config timeout:', baseRepo.get(['config', 'timeout']));
//
//             console.log('Sub owns "setup" now?', Object.hasOwn(subShelf, 'setup'));
//             if (subShelf.setup) {
//                 console.log('Sub "setup" owns "config"?', Object.hasOwn(subShelf.setup, 'config'));
//             }
//
//             // This is the failing assertion
//             expect(baseRepo.get(['config', 'timeout'])).toBe(1000);
//             expect(subRepo.get(['config', 'timeout'])).toBe(5000);
//         });
//     });
//
//     describe('Merged Metadata & Filtering', () =>
//     {
//         test('all(true) returns merged hierarchy, all(false) returns own only', () =>
//         {
//             class Base { @meta('a', 1) @meta('shared', 'parent') m() {} }
//             class Sub extends Base { @meta('b', 2) @meta('shared', 'child') override m() {} }
//
//             const repo = new MetaRepository((Sub as any)[Symbol.metadata], 'm');
//
//             // Own only
//             const own = repo.all(false);
//             console.log('all(false):', own);
//             expect(own).toEqual({ b: 2, shared: 'child' });
//             expect(own).not.toHaveProperty('a');
//
//             // Merged
//             const merged = repo.all(true);
//             console.log('all(true):', merged);
//             expect(merged).toEqual({ a: 1, b: 2, shared: 'child' });
//         });
//
//         test('all() correctly filters class metadata vs member namespaces', () =>
//         {
//             @meta('version', '2.0')
//             class Service { @meta('role', 'admin') run() {} }
//
//             const classRepo = new MetaRepository((Service as any)[Symbol.metadata]);
//             const result = classRepo.all();
//
//             console.log('Class repo all():', result);
//             expect(result).toHaveProperty('version', '2.0');
//             expect(result).not.toHaveProperty('run'); // 'run' is an object namespace, should be filtered
//         });
//     });
//
//     describe('Deep Path Support', () =>
//     {
//         test('supports array and string paths consistently', () =>
//         {
//             class App { @meta(['ui', 'theme', 'color'], 'blue') render() {} }
//             const repo = new MetaRepository((App as any)[Symbol.metadata], 'render');
//
//             expect(repo.get('ui.theme.color')).toBe('blue');
//             expect(repo.get(['ui', 'theme', 'color'])).toBe('blue');
//             expect(repo.has(['ui', 'theme'])).toBe(true);
//         });
//     });
// });

//
// describe('@meta decorator & Target-Bound MetaRepository', () =>
// {
//     describe('Class vs. Member Isolation', () =>
//     {
//         @meta('version', '1.0.0')
//         class Service
//         {
//             @meta('role', 'admin')
//             public doSomething() {}
//
//             @meta('role', 'guest')
//             public title: string = 'Hello';
//         }
//
//         test('class metadata is stored at root level', () =>
//         {
//             const repo = new MetaRepository(Service[Symbol.metadata]!);
//             expect(repo.get('version')).toBe('1.0.0');
//             expect(repo.get('role')).toBeUndefined();
//         });
//
//         test('method metadata is namespaced and isolated', () =>
//         {
//             const methodRepo = new MetaRepository(Service[Symbol.metadata]!, 'doSomething');
//             expect(methodRepo.get('role')).toBe('admin');
//             expect(methodRepo.get('version')).toBeUndefined();
//         });
//     });
//
//     describe('Inheritance & Shadowing (Isolation)', () =>
//     {
//         class Parent
//         {
//             @meta('tags', ['base'])
//             public action() {}
//         }
//
//         class Child extends Parent
//         {
//             @meta('tags', ['child-override'])
//             public override action() {}
//         }
//
//         test('child shadows parent member metadata without polluting parent', () =>
//         {
//             const parentRepo = new MetaRepository(Parent[Symbol.metadata]!, 'action');
//             const childRepo = new MetaRepository(Child[Symbol.metadata]!, 'action');
//
//             expect(childRepo.get('tags')).toEqual(['child-override']);
//             expect(parentRepo.get('tags')).toEqual(['base']);
//         });
//
//         test('deeply nested inheritance is preserved until overwritten', () =>
//         {
//             class Base
//             {
//                 @meta(['config', 'secure'], true)
//                 @meta(['config', 'retries'], 3)
//                 public setup() {}
//             }
//             class Sub extends Base
//             {
//                 @meta(['config', 'retries'], 5)
//                 public override setup() {}
//             }
//
//             const subRepo = new MetaRepository(Sub[Symbol.metadata]!, 'setup');
//             const baseRepo = new MetaRepository(Base[Symbol.metadata]!, 'setup');
//
//             // Sub has its own retries
//             expect(subRepo.get(['config', 'retries'])).toBe(5);
//             // Sub inherits secure from Base
//             expect(subRepo.get(['config', 'secure'])).toBe(true);
//             // Base remains unchanged
//             expect(baseRepo.get(['config', 'retries'])).toBe(3);
//         });
//
//         test('forget() shadows parent metadata in child', () =>
//         {
//             class Base
//             {
//                 @meta('shared', true)
//                 public data() {}
//             }
//             class Sub extends Base {}
//
//             const subRepo = new MetaRepository(Sub[Symbol.metadata]!, 'data');
//             const baseRepo = new MetaRepository(Base[Symbol.metadata]!, 'data');
//
//             expect(subRepo.get('shared')).toBe(true);
//
//             // Shadow the inherited value
//             subRepo.forget('shared');
//
//             expect(subRepo.get('shared')).toBeUndefined();
//             expect(baseRepo.get('shared')).toBe(true);
//         });
//     });
//
//     describe('Merged Metadata (all)', () =>
//     {
//         test('all(true) flattens inheritance for members', () =>
//         {
//             class A { @meta('a', 1) @meta('b', 1) m() {} }
//             class B extends A { @meta('b', 2) @meta('c', 2) override m() {} }
//
//             const repo = new MetaRepository(B[Symbol.metadata]!, 'm');
//             const merged = repo.all(true);
//
//             expect(merged).toEqual({
//                 a: 1, // Inherited from A
//                 b: 2, // Overridden by B
//                 c: 2  // Defined in B
//             });
//         });
//
//         test('all(false) only returns own metadata for members', () =>
//         {
//             class A { @meta('a', 1) m() {} }
//             class B extends A { @meta('b', 2) override m() {} }
//
//             const repo = new MetaRepository(B[Symbol.metadata]!, 'm');
//
//             expect(repo.all(false)).toEqual({ b: 2 });
//             expect(repo.all(false)).not.toHaveProperty('a');
//         });
//     });
//
//     describe('Deep Path Operations', () =>
//     {
//         class DeepService
//         {
//             @meta(['permissions', 'groups', 'admin'], { canWrite: true })
//             public context: any;
//         }
//
//         test('supports complex deep paths within members', () =>
//         {
//             const repo = new MetaRepository(DeepService[Symbol.metadata]!, 'context');
//             expect(repo.get(['permissions', 'groups', 'admin', 'canWrite'])).toBe(true);
//         });
//
//         test('has() correctly identifies namespaced paths', () =>
//         {
//             const repo = new MetaRepository(DeepService[Symbol.metadata]!, 'context');
//             expect(repo.has(['permissions', 'groups'])).toBe(true);
//             expect(repo.has(['permissions', 'unknown'])).toBe(false);
//         });
//     });
// });
