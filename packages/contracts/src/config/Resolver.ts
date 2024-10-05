import { Items, Source } from './types';

/**
 * Configuration Resolver
 */
export default interface Resolver
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
    resolve(source: Source): Promise<Items>;
}