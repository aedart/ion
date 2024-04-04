import type {
    Container,
    ContextualBindingBuilder,
    FactoryCallback,
    Identifier
} from "@aedart/contracts/container";
import type { Constructor } from "@aedart/contracts";
import { castArray } from 'lodash-es';

/**
 * Contextual Binding Builder
 * 
 * Adaptation of Laravel Contextual Binding Builder
 * 
 * @see https://github.com/laravel/framework/blob/master/src/Illuminate/Container/ContextualBindingBuilder.php
 */
export default class Builder implements ContextualBindingBuilder
{
    /**
     * The service container to be used in this context.
     * 
     * @type {Container}
     * 
     * @protected
     */
    protected container: Container;

    /**
     * The concrete constructor(s)
     * 
     * @type {Constructor | Constructor[]}
     * 
     * @protected
     */
    protected concrete: Constructor | Constructor[];

    /**
     * The target identifier in this context.
     * 
     * @type {Identifier}
     * 
     * @protected
     */
    protected identifier: Identifier | undefined = undefined;
    
    /**
     * Create a new Contextual Binding Builder instance
     * 
     * @param {Container} container
     * @param {Constructor | Constructor[]} concrete
     */
    constructor(container: Container, concrete: Constructor | Constructor[]) {
        this.container = container;
        this.concrete = concrete;
    }
    
    /**
     * Define the target identifier in this context.
     *
     * @param {Identifier} identifier
     *
     * @return {this}
     */
    public needs(identifier: Identifier): this
    {
        this.identifier = identifier;

        return this;
    }

    /**
     * Define the implementation to be resolved in this context.
     *
     * @param {FactoryCallback | Constructor} implementation
     *
     * @return {void}
     */
    public give(implementation: FactoryCallback | Constructor): void
    {
        const constructors: Constructor[] = castArray(this.concrete);
        
        for(const concrete of constructors) {
            this.container.addContextualBinding(concrete, this.identifier as Identifier, implementation);
        }
    }
}