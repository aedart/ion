import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import { isset } from "@aedart/support/objects";

/**
 * Returns target class' constructor name, if available
 * 
 * @param {ConstructorOrAbstractConstructor} target
 * @param {string|null} [defaultValue=null] A default string value to return if target has no constructor name 
 * 
 * @return {string|null} Constructor name, or default value
 */
export function getConstructorName(target: ConstructorOrAbstractConstructor, defaultValue: string|null = null): string|null
{
    if (!isset(target, [ 'prototype', 'constructor', 'name' ])) {
        return defaultValue;    
    }

    const name: string = target.prototype.constructor.name; 
    
    return name.length > 0
        ? name
        : defaultValue;
}