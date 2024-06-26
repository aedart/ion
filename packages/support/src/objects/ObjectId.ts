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
     * 
     * @protected
     * @static
     */
    protected static _count: number = 0;

    /**
     * Weak Map of objects and their associated id
     * 
     * @type {WeakMap<object, number>}
     * 
     * @protected
     * @readonly
     */
    protected static _map: WeakMap<object, number> = new WeakMap<object, number>();

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
        const id: number | undefined = ObjectId._map.get(target);
        if (id !== undefined) {
            return id;
        }

        ObjectId._count += 1;
        ObjectId._map.set(target, ObjectId._count);
        
        return ObjectId._count;
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
        return ObjectId._map.has(target);
    }
}