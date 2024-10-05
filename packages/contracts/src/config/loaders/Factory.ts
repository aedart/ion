import { Source } from '../types';
import Loader from './Loader';

/**
 * @deprecated TODO: Remove this...
 * 
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
     * @throws {import('@aedart/contracts/config').UnsupportedSourceException}
     */
    make(source: Source): Loader;
}