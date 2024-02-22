/**
 * Determine if given target object contains all given methods
 * 
 * @param {object} target
 * @param {...PropertyKey} [methods]
 * 
 * @return {boolean}
 */
export function hasAllMethods(target: object, ...methods: PropertyKey[]): boolean
{
    if (!target || typeof target != 'object' || Array.isArray(target) || methods.length === 0) {
        return false;
    }
    
    for (const method of methods) {
        if (!Reflect.has(target, method) || typeof (target as Record<PropertyKey, any>)[method] != 'function') {
            return false;
        }
    }
    
    return true;
}