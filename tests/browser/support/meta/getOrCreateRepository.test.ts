import { getOrCreateRepository, MetaRepository, findRepository } from "@aedart/support/meta";
import { describe, expect, test } from 'vitest';

describe('getOrCreateRepository()', () => {
    
    describe('basic creation', () => {
        test('returns a Repository instance', () => {
            class A {}
            const repo = getOrCreateRepository(A);
            expect(repo).toBeInstanceOf(MetaRepository);
        });

        test('sets the correct owner on the repository', () => {
            class A {}
            const repo = getOrCreateRepository(A);
            expect(repo.owner).toBe(A);
        });

        test('returns undefined parent for a root class', () => {
            class A {}
            const repo = getOrCreateRepository(A);
            expect(repo.parent).toBeUndefined();
        });

        test('makes the repository findable via findRepository() after creation', () => {
            class A {}
            const ctor = A;
            getOrCreateRepository(ctor);
            expect(findRepository(ctor)).toBeInstanceOf(MetaRepository);
        });

        test('findRepository() returns undefined before getOrCreateRepository() is called', () => {
            class A {}
            expect(findRepository(A)).toBeUndefined();
        });
    });

    describe('identity — no overwriting', () => {
        test('returns the exact same instance on repeated calls', () => {
            class A {}
            class B extends A {}
            class C extends B {}
            const ctor = C;

            const first  = getOrCreateRepository(ctor);
            const second = getOrCreateRepository(ctor);
            expect(first).toBe(second);
        });

        test('does not overwrite an ancestor repo when a descendant is requested later', () => {
            class A {}
            class B extends A {}
            class C extends B {}
            class D extends C {}

            const repoA = getOrCreateRepository(A);
            getOrCreateRepository(D);

            expect(findRepository(A)).toBe(repoA);
        });

        test('does not overwrite an intermediate repo when a deeper descendant is requested', () => {
            class A {}
            class B extends A {}
            class C extends B {}
            class D extends C {}

            const repoB = getOrCreateRepository(B);
            getOrCreateRepository(D);

            expect(findRepository(B)).toBe(repoB);
        });
    });
    
    describe('inheritance chain linkage', () => {
        test('links a direct child to its parent repository', () => {
            class A {}
            class B extends A {}

            const repoA = getOrCreateRepository(A);
            const repoB = getOrCreateRepository(B);

            expect(repoB.parent).toBe(repoA);
        });

        test('builds the full chain when only the deepest class is requested first', () => {
            class A {}
            class B extends A {}
            class C extends B {}
            class D extends C {}
            class E extends D {}

            getOrCreateRepository(E);

            const repoA = findRepository(A)!;
            const repoB = findRepository(B)!;
            const repoC = findRepository(C)!;
            const repoD = findRepository(D)!;
            const repoE = findRepository(E)!;

            expect(repoB.parent).toBe(repoA);
            expect(repoC.parent).toBe(repoB);
            expect(repoD.parent).toBe(repoC);
            expect(repoE.parent).toBe(repoD);
        });

        test('all ancestors are registered as a side-effect of requesting the deepest class', () => {
            class A {}
            class B extends A {}
            class C extends B {}
            class D extends C {}

            getOrCreateRepository(D);

            expect(findRepository(A)).toBeInstanceOf(MetaRepository);
            expect(findRepository(B)).toBeInstanceOf(MetaRepository);
            expect(findRepository(C)).toBeInstanceOf(MetaRepository);
        });

        test('produces the same chain regardless of request order (A → D → C scenario)', () => {
            class A {}
            class B extends A {}
            class C extends B {}
            class D extends C {}

            const repoA = getOrCreateRepository(A);
            const repoD = getOrCreateRepository(D);
            const repoC = getOrCreateRepository(C); // fast-path hit

            const repoB = findRepository(B)!;

            expect(repoD.parent).toBe(repoC);
            expect(repoC.parent).toBe(repoB);
            expect(repoB.parent).toBe(repoA);
        });
    });
    
    describe('parallel inheritance branches', () => {
        test('gives sibling branches their own distinct repository instances', () => {
            class A {}
            class B extends A {}
            class X extends A {}

            const repoB = getOrCreateRepository(B);
            const repoX = getOrCreateRepository(X);

            expect(repoB).not.toBe(repoX);
        });

        test('shares the common ancestor repository across sibling branches', () => {
            class A {}
            class B extends A {}
            class X extends A {}

            const repoB = getOrCreateRepository(B);
            const repoX = getOrCreateRepository(X);

            expect(repoB.parent).toBe(repoX.parent);
        });

        test('does not cross-link sibling repos as parents of each other', () => {
            class A {}
            class B extends A {}
            class X extends A {}
            class Y extends X {}

            getOrCreateRepository(Y);

            const repoY = findRepository(Y)!;
            const repoX = findRepository(X)!;
            const repoB = getOrCreateRepository(B);

            expect(repoY.parent).toBe(repoX);
            expect(repoX.parent).not.toBe(repoB);
        });
    });

    describe('edge cases', () => {
        test('handles two completely unrelated class hierarchies independently', () => {
            class Alpha {}
            class Beta {}

            const repoAlpha = getOrCreateRepository(Alpha);
            const repoBeta  = getOrCreateRepository(Beta );

            expect(repoAlpha).not.toBe(repoBeta);
            expect(repoAlpha.parent).toBeUndefined();
            expect(repoBeta.parent).toBeUndefined();
        });

        test('rapid repeated calls produce only one Repository per class', () => {
            class A {}
            class B extends A {}
            class C extends B {}

            const ctor = C;
            const results = Array.from({ length: 10 }, () => getOrCreateRepository(ctor));
            const unique = new Set(results);

            expect(unique.size).toBe(1);
        });

        test('every class in a chain has its own distinct repository', () => {
            class A {}
            class B extends A {}
            class C extends B {}
            class D extends C {}
            class E extends D {}

            const ctors = [A, B, C, D, E];
            getOrCreateRepository(ctors[4]); // trigger full chain

            const repos = ctors.map(findRepository) as MetaRepository[];
            const unique = new Set(repos);

            expect(unique.size).toBe(5);
        });

        test('every repository in a chain references the correct owner', () => {
            class A {}
            class B extends A {}
            class C extends B {}
            class D extends C {}

            const ctors = [A, B, C, D];
            getOrCreateRepository(ctors[3]);

            for (const ctor of ctors) {
                expect(findRepository(ctor)!.owner).toBe(ctor);
            }
        });
    });
});

