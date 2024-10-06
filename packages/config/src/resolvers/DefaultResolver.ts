import type { Items, Resolver, Source, ResolveCallback } from "@aedart/contracts/config";
import { isPromise, isCallable } from "@aedart/support/reflections";
import { getErrorMessage } from "@aedart/support/exceptions";
import ResolveError from "../exceptions/ResolveError";
import UnsupportedSourceError from "../exceptions/UnsupportedSourceError";

/**
 * Default Configuration Resolver
 * 
 * @see {Resolver}
 */
export default class DefaultResolver implements Resolver
{
    /**
     * Resolves configuration items from the given source
     *
     * @param {Source} source
     *
     * @returns {Promise<Items>}
     *
     * @throws {ResolveException}
     */
    public async resolve(source: Source): Promise<Items>
    {
        if (isPromise(source)) {
            return this.resolveItems(source as Promise<Items>);
        }
        
        if (typeof source === 'object') {
            return this.resolveItems(new Promise<Items>((resolve) => {
                resolve(source as Items);
            }));
        }
        
        if (isCallable(source)) {
            return this.resolveItems((source as ResolveCallback)());
        }
        
        throw new UnsupportedSourceError('Unable to resolve configuration items from source', { cause: { source: source } });
    }

    /**
     * Resolves configuration items from the given promise
     * 
     * @param {Promise<Items>} promise
     * 
     * @returns {Promise<Items>}
     * 
     * @protected
     */
    protected async resolveItems(promise: Promise<Items>): Promise<Items>
    {
        try {
            return await promise;
        } catch (e) {
            const reason: string = getErrorMessage(e);
            throw new ResolveError(`Unable to resolve configuration items: ${reason}`, { cause: { source: promise } });
        }
    }
}