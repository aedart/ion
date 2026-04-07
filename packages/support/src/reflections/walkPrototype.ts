/**
 * Traverses the prototype chain and yields own keys of each level.
 *
 * @param {object} target
 *
 * @yields {PropertyKey}
 */
export function* walkPrototype(target: object): Generator<PropertyKey>
{
    let current: object | null = target;
    while (current !== null && current !== Object.prototype) {
        const keys: PropertyKey[] = Reflect.ownKeys(current);
        const len: number = keys.length;

        for (let i = 0; i < len; i++) {
            yield keys[i];
        }

        current = Object.getPrototypeOf(current);
    }
}
