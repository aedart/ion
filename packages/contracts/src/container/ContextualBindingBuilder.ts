import { Constructor } from "@aedart/contracts";
import { Identifier, FactoryCallback } from "./types";

/**
 * Contextual Binding Builder
 * 
 * Adaptation of Laravel's Contextual Binding Builder.
 * 
 * @see https://github.com/laravel/framework/blob/master/src/Illuminate/Contracts/Container/ContextualBindingBuilder.php
 */
export default interface ContextualBindingBuilder
{
    /**
     * Define the target identifier in this context.
     * 
     * @param {Identifier} identifier
     * 
     * @return {this}
     */
    needs(identifier: Identifier): this;

    /**
     * Define the implementation to be resolved in this context.
     * 
     * @param {FactoryCallback | Constructor} implementation
     * 
     * @return {void}
     */
    give(implementation: FactoryCallback | Constructor): void;
}