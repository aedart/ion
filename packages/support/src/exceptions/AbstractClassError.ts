import type { AbstractConstructor } from "@aedart/contracts";
import LogicalError from "./LogicalError";
import { getNameOrDesc } from "@aedart/support/reflections";
import { configureCustomError } from "./configureCustomError";

/**
 * Abstract Class Error
 * 
 * To be thrown whenever an abstract class is attempted instantiated directly.
 */
export default class AbstractClassError extends LogicalError
{
    /**
     * The abstract class that was attempted instantiated
     * 
     * @type {AbstractConstructor}
     */
    target: AbstractConstructor;

    /**
     * Create new instance of Abstract Class Error
     * 
     * @param {AbstractConstructor} target The abstract class that was attempted instantiated directly
     * @param {ErrorOptions} [options]
     */
    constructor(target: AbstractConstructor, options?: ErrorOptions) {
        super(`Unable to create new instance of abstract class ${getNameOrDesc(target)}`, options || { cause: { target: target } });

        configureCustomError(this);

        this.target = target;
    }
}