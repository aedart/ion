import { ConcernsInjector } from "@aedart/support/concerns";

/**
 * Returns a new Concerns Injector instance
 * 
 * @param {object} target
 * 
 * @returns {ConcernsInjector<object>}
 */
export default function makeConcernsInjector(target)
{
    return new ConcernsInjector(target);
}