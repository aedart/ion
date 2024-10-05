import Loader from './Loader';

/**
 * @deprecated TODO: Remove this...
 * 
 * Configuration Loader Constructor
 */
export default interface LoaderConstructor
{
    /**
     * Create a new configuration loader instance
     * 
     * @param {...any} [args]
     * 
     * @return {Loader}
     */
    new (...args: any[]): Loader;  
}