import type { ConstructorLike } from '@aedart/contracts';
import type { ClassBlueprint } from '@aedart/contracts/support/reflections';
import { classLooksLike } from './classLooksLike.js';
import { isSubclass } from './isSubclass.js';

/**
 * Determine if target class is a subclass of given superclass, or if it looks like given blueprint
 *
 * **Note**: _Method is an alias for `isSubclass(target, superclass) || classLooksLike(target, blueprint)`._
 *
 * @see isSubclass
 * @see classLooksLike
 *
 * @param {object} target
 * @param {ConstructorLike} superclass
 * @param {ClassBlueprint} blueprint
 *
 * @throws {TypeError}
 */
export function isSubclassOrLooksLike(
    target: object,
    superclass: ConstructorLike,
    blueprint: ClassBlueprint,
): boolean
{
    if (target === null || typeof target !== 'function' && typeof target !== 'object') {
        throw new TypeError('Target must be an object or constructor');
    }

    return isSubclass(target, superclass) || classLooksLike(target, blueprint);
}
