import type { ClassBlueprint } from '@aedart/contracts/support/reflections';
import { LOOKUP_THRESHOLD } from "../arrays/index.js";
import { hasPrototypeProperty } from './hasPrototypeProperty.js';
import { walkPrototype } from './walkPrototype.js';

/**
 * Determine if target class looks like given blueprint.
 *
 * @param {object} target
 * @param {ClassBlueprint} blueprint
 *
 * @throws {TypeError} If blueprint is invalid.
 */
export function classLooksLike(target: object, blueprint: ClassBlueprint): boolean
{
    const staticMembers = blueprint?.staticMembers;
    const members = blueprint?.members;

    const isStaticArray: boolean = Array.isArray(staticMembers);
    const isMembersArray: boolean = Array.isArray(members);

    if (!isStaticArray && !isMembersArray) {
        throw new TypeError('Blueprint must define "members" or "staticMembers" as arrays');
    }

    const numStatic: number = isStaticArray ? (staticMembers as PropertyKey[]).length : 0;
    const numMembers: number = isMembersArray ? (members as PropertyKey[]).length : 0;

    if (numStatic === 0 && numMembers === 0) {
        throw new TypeError('Blueprint must contain at least one member to check');
    }

    if (!hasPrototypeProperty(target)) {
        return false;
    }

    // 1. Check Static Members
    if (numStatic > 0) {
        const list = staticMembers as PropertyKey[];
        for (let i = 0; i < numStatic; i++) {
            if (!Reflect.has(target, list[i])) {
                return false;
            }
        }
    }

    // 2. Check Instance Members (Deep Traversal)
    if (numMembers > 0) {
        const proto: object = (target as any).prototype;
        const list = members as PropertyKey[];

        // Use Set for lookups if above threshold (16) to balance allocation overhead
        if (numMembers > LOOKUP_THRESHOLD) {
            const remaining = new Set(list);
            for (const key of walkPrototype(proto)) {
                remaining.delete(key);
                if (remaining.size === 0) break;
            }
            if (remaining.size > 0) return false;
        } else {
            // Manual tracking array to avoid mutation of blueprint and minimize GC
            const found = new Array(numMembers).fill(false);
            let foundCount = 0;

            for (const key of walkPrototype(proto)) {
                for (let j = 0; j < numMembers; j++) {
                    if (!found[j] && list[j] === key) {
                        found[j] = true;
                        foundCount++;
                        break;
                    }
                }
                if (foundCount === numMembers) break;
            }
            if (foundCount < numMembers) return false;
        }
    }

    return true;
}
