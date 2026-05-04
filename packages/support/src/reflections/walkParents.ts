import type { ConstructorLike } from '@aedart/contracts';

/**
 * Traverses the inheritance chain and yields each parent class.
 *
 * @param {ConstructorLike} target - The target class to traverse.
 * @param {boolean} [includeTarget=false] - If `true`, the target itself is yielded as the first element.
 *
 * @yields {ConstructorLike}
 *
 * @throws {TypeError} If target is `null` or `undefined`.
 */
export function* walkParents(
    target: ConstructorLike,
    includeTarget = false,
): Generator<ConstructorLike>
{
    if (target == null) {
        throw new TypeError('walkParents() expects a target class as argument');
    }

    let current: ConstructorLike | null = includeTarget
        ? target
        : Object.getPrototypeOf(target) as ConstructorLike | null;

    while (current !== null && current !== Function.prototype && current !== Object.prototype) {
        yield current;
        current = Object.getPrototypeOf(current) as ConstructorLike | null;
    }
}
