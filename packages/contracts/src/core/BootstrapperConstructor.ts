import Bootstrapper from "./Bootstrapper";

/**
 * Application Bootstrapper Constructor
 */
export default interface BootstrapperConstructor
{
    /**
     * Create a new Application Bootstrapper instance
     * 
     * @param {...any} arg
     * 
     * @return {Bootstrapper}
     */
    new (
        ...arg: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): Bootstrapper;
}