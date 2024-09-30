import { isBindingIdentifier } from "@aedart/support/container";

/**
 * Determine if given entry is a [Binding Tuple]{@link import('@aedart/contracts/container').BindingTuple}.
 * 
 * @param {unknown} entry
 * 
 * @return {boolean}
 */
export function isBindingTuple(entry: unknown): boolean
{
    if (!Array.isArray(entry)) {
        return false;
    }
    
    const tuple: ArrayLike<any> = entry; /* eslint-disable-line @typescript-eslint/no-explicit-any */

    // A binding tuple must at least consist of:
    //  a) identifier
    //  b) factory callback / constructor
    //  c) shared state (optional)
    const isValid = (tuple.length > 1 && tuple.length < 4)
        && isBindingIdentifier(tuple[0])
        && (typeof tuple[1] === 'function'); 
    
    // When shared state given...
    if (tuple.length === 3) {
        return isValid && typeof tuple[2] === 'boolean';
    }
    
    // Otherwise, determined via first and second entry.
    return isValid;
}