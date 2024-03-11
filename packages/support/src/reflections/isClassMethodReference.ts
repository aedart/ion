import { hasPrototypeProperty } from "./hasPrototypeProperty";
import { isMethod } from "./isMethod";

/**
 * Determine if value is a [Class Method Reference]{@link import('@aedart/constracts').ClassMethodReference}
 * 
 * @param {unknown} value
 * 
 * @return {boolean}
 */
export function isClassMethodReference(value: unknown): boolean
{
    if (!Array.isArray(value) || (value as Array<unknown>).length != 2) {
        return false;
    }
    
    const targetType: string = typeof value[0];
    
    // If target appears to be a class constructor...
    if (targetType == 'function' && hasPrototypeProperty(value[0])) {
        // Method must exist in class' prototype
        return isMethod(value[0].prototype, value[1]);
    }
    
    // If target is an object (class instance)
    if (targetType == 'object') {
        // Method must exist in class instance
        return isMethod(value[0], value[1]);
    }
    
    // Otherwise target is not valid
    return false;
}