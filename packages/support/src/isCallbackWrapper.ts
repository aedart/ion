import CallbackWrapper from "./CallbackWrapper";

/**
 * Determine if given value is a [CallbackWrapper]{@link import('@aedart/contracts/support').CallbackWrapper}
 * 
 * @param {unknown} value
 * 
 * @return {boolean}
 */
export function isCallbackWrapper(value: unknown): boolean
{
    if (!value || typeof value != 'object') {
        return false;
    }
    
    if (value instanceof CallbackWrapper) {
        return true;
    }
    
    // Determine if value "looks like" a callback wrapper object
    const blueprint: PropertyKey[] = [
        'callback',
        'binding',
        'arguments',
        'with',
        'hasArguments',
        'bind',
        'hasBinding',
        'call'
    ];

    for (const property of blueprint) {
        if (!Reflect.has(value, property)) {
            return false;
        }
    }
    
    return true;
}