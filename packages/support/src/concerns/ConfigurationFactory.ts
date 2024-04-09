import { ConstructorLike } from "@aedart/contracts";
import type {
    Aliases,
    ConcernConstructor,
    Configuration,
    ShorthandConfiguration,
    Factory
} from "@aedart/contracts/support/concerns";
import { PROVIDES } from "@aedart/contracts/support/concerns";
import { getNameOrDesc } from "@aedart/support/reflections";
import { merge } from "@aedart/support/objects";
import InjectionError from "./exceptions/InjectionError";
import { isConcernConfiguration } from "./isConcernConfiguration";
import { isShorthandConfiguration } from "./isShorthandConfiguration";
import { isConcernConstructor } from "./isConcernConstructor";
import { isUnsafeKey } from "./isUnsafeKey";

/**
 * Concern Configuration Factory
 * 
 * @see Factory
 */
export default class ConfigurationFactory implements Factory
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
     * @param {ConcernConstructor | Configuration | ShorthandConfiguration} entry
     *
     * @returns {Configuration}
     *
     * @throws {InjectionException} If entry is unsupported or invalid
     */
    make(target: object, entry: ConcernConstructor | Configuration | ShorthandConfiguration): Configuration {
        // A) Make new configuration when concern class is given
        if (isConcernConstructor(entry)) {
            return this.makeConfiguration(entry as ConcernConstructor);
        }

        if (isShorthandConfiguration(entry)) {
            entry = this.makeFromShorthand(entry as ShorthandConfiguration);
        }

        // B) Make new configuration and merge provided configuration into it
        if (isConcernConfiguration(entry)) {
            // C) Merge given configuration with a new one, which has default aliases populated...
            const configuration: Configuration = merge()
                .using({ overwriteWithUndefined: false })
                .of(
                    this.makeConfiguration((entry as Configuration).concern),
                    entry
                )

            // Clear all aliases, if not allowed
            if (!configuration.allowAliases) {
                configuration.aliases = Object.create(null);
                return configuration;
            }

            // Otherwise, filter off evt. "unsafe" keys.
            return this.removeUnsafeKeys(configuration);
        }

        // Fail if entry is neither a concern class nor a concern configuration
        const reason: string = `${getNameOrDesc(entry as ConstructorLike)} must be a valid Concern class or Concern Configuration`
        throw new InjectionError(target as ConstructorLike, null, reason, { cause: { entry: entry } });
    }

    /**
     * Casts the shorthand configuration to a configuration object
     * 
     * @param {ShorthandConfiguration} config
     * 
     * @return {Configuration}
     * 
     * @protected
     */
    protected makeFromShorthand(config: ShorthandConfiguration): Configuration
    {
        const aliases = (typeof config[1] == 'object') 
            ? config[1]
            : undefined;
        
        const allowAliases = (typeof config[1] == 'boolean')
            ? config[1]
            : undefined;
        
        return {
            concern: config[0],
            aliases: aliases,
            allowAliases: allowAliases
        };
    }
    
    /**
     * Returns a new concern configuration for the given concern class
     * 
     * @param {ConcernConstructor} concern
     * 
     * @returns {Configuration}
     * 
     * @protected
     */
    protected makeConfiguration(concern: ConcernConstructor): Configuration
    {
        return {
            concern: concern,
            aliases: this.makeDefaultAliases(concern),
            allowAliases: true
        }
    }

    /**
     * Returns the default aliases that are provided by the given concern class
     * 
     * @param {ConcernConstructor} concern
     * 
     * @returns {Aliases}
     * 
     * @protected
     */
    protected makeDefaultAliases(concern: ConcernConstructor): Aliases
    {
        const provides: PropertyKey[] = concern[PROVIDES]()
            .filter((key: PropertyKey) => !this.isUnsafe(key));
        
        const aliases: Aliases = Object.create(null);
        for (const key of provides) {
            // @ts-expect-error Type error is caused because we do not know the actual concern instance...
            aliases[key] = key;
        }
        
        return aliases;
    }
    
    /**
     * Removes evt. "unsafe" keys from configuration's aliases
     * 
     * @param {Configuration} configuration
     * 
     * @returns {Configuration}
     * 
     * @protected
     */
    protected removeUnsafeKeys(configuration: Configuration): Configuration
    {
        const keys: PropertyKey[] = Reflect.ownKeys(configuration.aliases as Aliases);
        for (const key of keys) {
            if (this.isUnsafe(key)) {
                delete (configuration.aliases as Aliases)[key as keyof typeof configuration.aliases];
            }
        }
        
        return configuration;
    }
    
    /**
     * Determine if key is "unsafe"
     * 
     * @param {PropertyKey} key
     * 
     * @returns {boolean}
     * 
     * @protected
     */
    protected isUnsafe(key: PropertyKey): boolean
    {
        return isUnsafeKey(key);
    }
}