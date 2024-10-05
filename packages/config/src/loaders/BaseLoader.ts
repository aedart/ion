import type { AbstractConstructor } from "@aedart/contracts";
import type { Items, Loader } from "@aedart/contracts/config";
import { AbstractClassError } from "@aedart/support/exceptions";

/**
 * @deprecated TODO: Remove this...
 * 
 * Base Configuration Loader
 * 
 * @see {Loader}
 */
export default abstract class BaseLoader implements Loader
{
    /**
     * Create new loader instance
     * 
     * @param {...any} [args]
     * 
     * @protected
     */
    protected constructor(...args: any[] /* eslint-disable-line @typescript-eslint/no-unused-vars */)
    {
        if (new.target === BaseLoader) {
            throw new AbstractClassError(BaseLoader as AbstractConstructor);
        }
    }
    
    /**
     * Load configuration {@link Items}
     *
     * @return {Promise<Items>}
     *
     * @throws {import('@aedart/contracts/config').LoaderException}
     */
    abstract load(): Promise<Items>;
}