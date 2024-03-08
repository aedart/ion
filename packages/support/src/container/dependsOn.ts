import type { Identifier } from "@aedart/contracts/container";
import { dependencies } from "./dependencies";

/**
 * Alias for [dependencies()]{@link import('@aedart/support/container').dependencies}
 * 
 * @param {...Identifier[]} identifiers
 *
 * @return {ClassDecorator | ClassMethodDecorator}
 */
export function dependsOn(...identifiers: Identifier[])
{
    return dependencies(...identifiers);
}