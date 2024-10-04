import Loader from './Loader';

/**
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