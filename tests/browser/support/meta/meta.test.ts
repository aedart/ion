import { meta, MetaRepository } from '@aedart/support/meta';
import { describe, expect, test } from 'vitest';

describe('@meta decorator & MetaRepository', () => {
    describe('Inheritance (Parent -> Child -> GrandChild)', () => {
        @meta('tags', ['base'])
        @meta(['config', 'version'], '1.0.0')
        class Parent
        {}

        @meta('tags', ['child-override']) // Overwrites 'tags'
        class Child extends Parent
        {}

        class GrandChild extends Child
        {}

        test('can retrieve metadata from parent', () => {
            const repo = new MetaRepository(Parent[Symbol.metadata]!);
            expect(repo.get('tags')).toEqual(['base']);
            expect(repo.get(['config', 'version'])).toBe('1.0.0');
        });

        test('shadows (overwrites) metadata in child without affecting parent', () => {
            const childRepo = new MetaRepository(Child[Symbol.metadata]!);
            const parentRepo = new MetaRepository(Parent[Symbol.metadata]!);

            expect(childRepo.get('tags')).toEqual(['child-override']);
            expect(parentRepo.get('tags')).toEqual(['base']);
        });

        test('inherits deeply nested paths in child from parent', () => {
            const childRepo = new MetaRepository(Child[Symbol.metadata]!);
            // 'config.version' was not overwritten in Child, so it bubbles up to Parent
            expect(childRepo.get(['config', 'version'])).toBe('1.0.0');
        });

        test('bubbles up metadata to grand child through the prototype chain', () => {
            const grandRepo = new MetaRepository(GrandChild[Symbol.metadata]!);

            // GrandChild inherits from Child (which overrode tags) and Parent (version)
            expect(grandRepo.get('tags')).toEqual(['child-override']);
            expect(grandRepo.get(['config', 'version'])).toBe('1.0.0');
        });
    });

    describe('Class Members (Methods & Properties)', () => {
        class Service
        {
            @meta('role', 'admin')
            public doSomething()
            {}

            @meta(['ui', 'visible'], false)
            public title: string = 'Hello';
        }

        test('can associate metadata with methods', () => {
            const repo = new MetaRepository(Service[Symbol.metadata]!);
            // Note: Our implementation of @meta simply sets the key on the shared shelf.
            // If you want to namespace by member name automatically, we can adjust the decorator.
            expect(repo.get('role')).toBe('admin');
        });

        test('can associate metadata with properties', () => {
            const repo = new MetaRepository(Service[Symbol.metadata]!);
            expect(repo.get(['ui', 'visible'])).toBe(false);
        });
    });

    describe('Deep Path Operations', () => {
        @meta(['a', 'b', 'c'], 'deep-value')
        class DeepClass
        {}

        test('supports deep path lookups using MetaRepository', () => {
            const repo = new MetaRepository(DeepClass[Symbol.metadata]!);
            expect(repo.get(['a', 'b', 'c'])).toBe('deep-value');
            expect(repo.has(['a', 'b'])).toBe(true);
        });

        test('returns default value for non-existent deep paths', () => {
            const repo = new MetaRepository(DeepClass[Symbol.metadata]!);
            expect(repo.get(['a', 'x', 'y'], 'fallback')).toBe('fallback');
        });
    });
});
