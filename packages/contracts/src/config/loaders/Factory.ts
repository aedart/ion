import { Source } from '../types';
import Loader from './Loader';

/**
 * Configuration Loader Factory
 */
export default interface Factory
{
    /**
     * Returns a new configuration loader for given source
     * 
     * @param {Source} source
     * 
     * @return {Loader}
     * 
     * @throws {import('@aedart/contracts/config').LoaderException}
     */
    make(source: Source): Loader;
}