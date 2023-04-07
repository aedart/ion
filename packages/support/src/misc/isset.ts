/**
 * Determine if value(s) are different from undefined and null
 * 
 * @param {...any} values
 * 
 * @returns {boolean}
 */
export function isset(...values: any[]): boolean
{
    if (arguments.length === 0) {
        return false;
    }
    
    for (const value of values) {
        if (value === undefined || value === null) {
            return false;
        }
    }
    
    return true;
}