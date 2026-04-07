import type {ConstructorLike} from "@aedart/contracts";

/**
 * Traverses the inheritance chain and yields each parent class.
 *
 * @param {ConstructorLike} target
 * @param {boolean} [includeTarget=false] If `true`, then given target is included in the output as the first element.
 *
 * @yields {ConstructorLike}
 *
 * @throws {TypeError} If target is null or undefined.
 */
export function* walkParents(
    target: ConstructorLike,
    includeTarget: boolean = false
): Generator<ConstructorLike>
{
    if (target == null) {
        throw new TypeError('walkParents() expects a target class as argument');
    }

    let current: any = includeTarget
        ? target
        : Object.getPrototypeOf(target);

    while (current !== null && current !== Function.prototype && current !== Object.prototype) {
        yield current;
        current = Object.getPrototypeOf(current);
    }
}
