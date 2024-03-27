import type {
    ArrayMerger,
    ArrayMergeOptions,
    ArrayMergeCallback
} from "@aedart/contracts/support/arrays";
import DefaultArrayMergeOptions from './DefaultArrayMergeOptions';
import {getErrorMessage} from "@aedart/support/exceptions";
import {ArrayMergeError} from "@aedart/support/arrays";

/**
 * Array Merger
 */
export default class Merger implements ArrayMerger
{
    /**
     * Merge options to be applied
     * 
     * @type {Readonly<DefaultArrayMergeOptions | ArrayMergeOptions>}
     * 
     * @private
     */
    #options: Readonly<DefaultArrayMergeOptions | ArrayMergeOptions>;

    /**
     * Create new Array Merger instance
     * 
     * @param {ArrayMergeCallback | ArrayMergeOptions} [options]
     */
    public constructor(options?: ArrayMergeCallback | ArrayMergeOptions) {
        // @ts-expect-error Need to init options, however they are resolved via "using".
        this.#options = null;
        
        this.using(options);
    }
    
    /**
     * Use the following merge options
     *
     * @param {ArrayMergeCallback | ArrayMergeOptions} [options]
     *
     * @return {this}
     *
     * @throws {ArrayMergeException}
     */
    using(options?: ArrayMergeCallback | ArrayMergeOptions): this
    {
        this.#options = this.resolveOptions(options);
        
        return this;
    }

    /**
     * Merge options to be applied
     * 
     * @type {Readonly<DefaultArrayMergeOptions | ArrayMergeOptions>}
     */
    public get options(): Readonly<DefaultArrayMergeOptions | ArrayMergeOptions>
    {
        return this.#options;
    }
    
    /**
     * Returns a merger of given source arrays
     *
     * @param {...any[]} sources
     *
     * @return {any[]}
     *
     * @throws {ArrayMergeException}
     */
    public of(...sources: any[]): any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        try {
            const options = this.options;
            const callback = (options.callback as ArrayMergeCallback).bind(this);

            // Array.concat only performs shallow copies of the array values, which might
            // fine in some situations. However, this version must ensure to perform a
            // deep copy of the values...
            
            return [].concat(...sources).map((element, index, array) => {
                return callback(element, index, array, options);
            });
        } catch (e) {
            const reason = getErrorMessage(e);

            throw new ArrayMergeError('Unable to merge arrays: ' + reason, {
                cause: {
                    previous: e,
                    sources: sources
                }
            });
        }
    }

    /**
     * Resolves options
     * 
     * @param {ArrayMergeCallback | ArrayMergeOptions} options
     * 
     * @return {Readonly<ArrayMergeOptions>}
     * 
     * @protected
     */
    protected resolveOptions(options?: ArrayMergeCallback| ArrayMergeOptions): Readonly<DefaultArrayMergeOptions | ArrayMergeOptions>
    {
        return DefaultArrayMergeOptions.from(options);
    }
}