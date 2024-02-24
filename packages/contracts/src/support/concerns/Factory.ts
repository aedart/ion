import ConcernConstructor from "./ConcernConstructor";
import Configuration from './Configuration';

/**
 * Concern Configuration Factory
 * 
 * Able to make new {@link Configuration} from a given concern "entry".
 */
export default interface Factory
{
    /**
     * Returns a new normalised concern configuration for given concern "entry"
     *
     * **Note**: _"normalised" in this context means:_
     * 
     * _**A**: If a concern class is given, then a new concern configuration made._
     * 
     * _**B**: If configuration is given, then a new concern configuration and given
     * configuration is merged into the new configuration._
     * 
     * _**C**: Configuration's `aliases` are automatically populated. When a concern
     * configuration is provided, its evt. aliases merged with the default ones,
     * unless `allowAliases` is set to `false`, in which case all aliases are removed._
     * 
     * @param {object} target
     * @param {ConcernConstructor | Configuration} entry
     * 
     * @returns {Configuration}
     *
     * @throws {InjectionException} If entry is unsupported or invalid
     */
    make(target: object, entry: ConcernConstructor | Configuration): Configuration;
}