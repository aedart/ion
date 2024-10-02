import type { Identifier } from "@aedart/contracts/container";
import type { Repository } from "@aedart/contracts/config";
import { CONFIG } from "@aedart/contracts/config";
import Facade from "./Facade";

/**
 * Configuration Facade
 */
export default class Config extends Facade
{
    /**
     * The "type" of the resolved object instance.
     *
     * **Note**: _This property is not used for anything other
     * than to provide a TypeScript return type for the `obtain()`
     * method._
     *
     * @type {import('@aedart/contracts/config').Repository}
     *
     * @protected
     * @static
     */
    protected static type: Repository;

    /**
     * Returns identifier to be used for resolving facade's underlying object instance
     *
     * @return {Identifier}
     *
     * @abstract
     *
     * @static
     */
    public static getIdentifier(): Identifier
    {
        return CONFIG;
    }
}