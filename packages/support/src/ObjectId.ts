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
     * Returns ID for target object.
     * 
     * If no ID exists for object, then a new id is generated and
     * returned.
     * 
     * @param {object} target
     * @returns {number}
     */
    static get(target: object): number
    {
        const id: number | undefined = this.#map.get(target);
        if (id !== undefined) {
            return id;
        }
        
        this.#count += 1;
        this.#map.set(target, this.#count);
        
        return this.#count;
    }

    /**
     * Determine if an ID exists for target object
     * 
     * @param {object} target
     * 
     * @returns {boolean}
     */
    static has(target: object): boolean
    {
        return this.#map.has(target);
    }
}