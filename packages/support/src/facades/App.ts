import type { Identifier } from "@aedart/contracts/container";
import type { Application } from "@aedart/contracts/core";
import { APPLICATION } from "@aedart/contracts/core";
import Facade from "./Facade";

/**
 * Core Application Facade
 */
export default class App extends Facade
{
    /**
     * The "type" of the resolved object instance.
     *
     * **Note**: _This property is not used for anything other
     * than to provide a TypeScript return type for the `obtain()`
     * method._
     *
     * @type {import('@aedart/contracts/core').Application}
     *
     * @protected
     * @static
     */
    protected static type: Application;

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
        return APPLICATION;
    }
}