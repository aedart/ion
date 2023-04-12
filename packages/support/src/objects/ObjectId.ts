/**
 * Object ID
 * 
 * Utility that is able to return a numeric ID for objects.
 * 
 * Source is heavily inspired by Nicolas Gehlert's blog post:
 * "Get object reference IDs in JavaScript/TypeScript" (September 28, 2022)
 * @see https://developapa.com/object-ids/
 * @see https://github.com/ngehlert/developapa/blob/master/content/blog/object-ids/index.md
 */
export default class ObjectId
{
    /**
     * Internal counter
     * 
     * @type {number}
     * @private
     */
    static #count: number = 0;

    /**
     * Weak Map of objects and their associated id
     * 
     * @type {WeakMap<object, number>}
     * @private
     */
    static #map: WeakMap<object, number> = new WeakMap<object, number>();

    /**
     * Returns a unique ID for target object.
     * 
     * If no ID exists for the given object, then a new ID is
     * generated and returned. Subsequent calls to this method using
     * the same object will return the same ID.
     * 
     * @param {object} target
     * @returns {number}
     */
    static get(target: object): number
    {
        const id: number | undefined = ObjectId.#map.get(target);
        if (id !== undefined) {
            return id;
        }

        ObjectId.#count += 1;
        ObjectId.#map.set(target, ObjectId.#count);
        
        return ObjectId.#count;
    }

    /**
     * Determine if a unique ID exists for target object
     * 
     * @param {object} target
     * 
     * @returns {boolean}
     */
    static has(target: object): boolean
    {
        return ObjectId.#map.has(target);
    }
}