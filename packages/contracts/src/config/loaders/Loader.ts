import { Items } from '../types';

/**
 * @deprecated TODO: Remove this...
 * 
 * Configuration Loader
 */
export default interface Loader
{
    /**
     * Load configuration {@link Items}
     * 
     * @return {Promise<Items>}
     *
     * @throws {import('@aedart/contracts/config').LoaderException}
     */
    load(): Promise<Items>;
}