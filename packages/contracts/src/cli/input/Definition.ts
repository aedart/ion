import type Argument from "./Argument";
import type Option from "./Option";

/**
 * Input Definition
 *
 * A representation of the input arguments and options for a command.
 * This component is an adaptation of Symfony Console's `InputDefinition` - Copyright Fabien Potencier
 * 2004-present, MIT License.
 *
 * @see https://github.com/symfony/console/blob/7.1/Input/InputDefinition.php
 */
export default interface Definition
{
    /**
     * Set the definition of the input
     * 
     * @param {(Argument | Option)[]} input
     * 
     * @return {this}
     */
    setDefinition(input: (Argument|Option)[]): this;

    /**
     * Set the input arguments
     * 
     * @param {Argument[]} [args]
     * 
     * @return {this}
     */
    setArguments(args?: Argument[]): this;

    /**
     * Add input arguments
     * 
     * @param {Argument[]} args
     * 
     * @return {this}
     */
    addArguments(args: Argument[]): this;

    /**
     * Add input argument
     * 
     * @param {Argument} argument
     * 
     * @return {this}
     */
    addArgument(argument: Argument): this;

    /**
     * Determine if input argument exists
     * 
     * @param {string} name
     * 
     * @return {boolean}
     */
    hasArgument(name: string): boolean;

    /**
     * Returns input argument that matches given name
     * 
     * @param {string} name
     * 
     * @return {Argument}
     * 
     * @throws {TypeError}
     */
    getArgument(name: string): Argument;

    /**
     * The input arguments
     * 
     * @type {Map<string, Argument>}
     */
    get arguments(): Map<string, Argument>

    /**
     * Amount of input arguments
     * 
     * @type {number}
     */
    get amountOfArguments(): number;

    /**
     * Amount of required input arguments
     * 
     * @type {number}
     */
    get amountOfRequiredArguments(): number;

    /**
     * Set the input options
     * 
     * @param {Option[]} [options]
     * 
     * @return {this}
     */
    setOptions(options?: Option[]): this;

    /**
     * Add input options
     * 
     * @param {Option[]} options
     * 
     * @return {this}
     */
    addOptions(options: Option[]): this;

    /**
     * Add input option
     * 
     * @param {Option} option
     * 
     * @return {this}
     */
    addOption(option: Option): this;

    /**
     * Determine if input option exists
     * 
     * @param {string} name
     * 
     * @return {boolean}
     */
    hasOption(name: string): boolean;

    /**
     * Returns input option that matches given name
     * 
     * @param {string} name
     * 
     * @return {Option}
     * 
     * @throws {TypeError}
     */
    getOption(name: string): Option;

    /**
     * Determine if input option exists using its shortcut name 
     * 
     * @param {string} name
     * 
     * @return {boolean}
     */
    hasShortcut(name: string): boolean;

    /**
     * Determine if input option exists using its negated name
     * 
     * @param {string} name
     * 
     * @return {boolean}
     */
    hasNegation(name: string): boolean;
    
    /**
     * Returns the input option's name that matches given shortcut
     * 
     * @param {string} shortcut
     * 
     * @return {string}
     * 
     * @throws {TypeError}
     */
    shortcutToName(shortcut: string): string;

    /**
     * Returns the input option's name that matches given negated name
     *
     * @param {string} negated
     *
     * @return {string}
     *
     * @throws {TypeError}
     */
    negationToName(negated: string): string;
    
    /**
     * Returns input option that matches given shortcut
     * 
     * @param {string} shortcut
     * 
     * @return {Option}
     * 
     * @throws {TypeError}
     */
    getOptionForShortcut(shortcut: string): Option;

    /**
     * The input options
     * 
     * @type {Map<string, Option>}
     */
    get options(): Map<string, Option>;

    /**
     * Amount of input options
     * 
     * @type {number}
     */
    get amountOfOptions(): number;
}