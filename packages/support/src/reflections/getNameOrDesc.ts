import type { ConstructorLike } from "@aedart/contracts";
import { descTag } from "@aedart/support/misc";
import { getConstructorName } from "./getConstructorName";

/**
 * Return target class' constructor name or default to target's description tag if a name is unavailable 
 * 
 * **Note**: _Method is a shortcut for the following:_
 * ```js
 * getConstructorName(target, descTag(target));
 * ```
 * 
 * @see getConstructorName
 * @see descTag
 * 
 * @param {ConstructorLike} target
 * 
 * @return {string}
 */
export function getNameOrDesc(target: ConstructorLike): string
{
    return getConstructorName(target, descTag(target)) as string;
}