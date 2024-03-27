import type {
    ArrayMergeCallback,
    ArrayMergeOptions
} from "@aedart/contracts/support/arrays";
import { populate } from "@aedart/support/objects";
import { defaultArrayMergeCallback } from "./defaultArrayMergeCallback";

/**
 * Default Array Merge Options
 */
export default class DefaultArrayMergeOptions implements ArrayMergeOptions
{
    /**
     * Transfer functions
     *
     * **When `true`**: _functions are transferred into resulting array._
     *
     * **When `false` (_default behaviour_)**: _The merge operation will fail when a function
     * is encountered (functions are not cloneable by default)._
     *
     * @type {boolean}
     */
    transferFunctions: boolean = false;

    /**
     * Merge callback to be applied
     *
     * **Note**: _When no callback is provided, then the merge function's default
     * callback is used._
     */
    callback: ArrayMergeCallback;
    
    /**
     * Create new default merge options from given options
     * 
     * @param {ArrayMergeCallback | ArrayMergeOptions} [options]
     */
    constructor(options?: ArrayMergeCallback | ArrayMergeOptions) {
        // Merge provided options, if any given
        if (options && typeof options == 'object') {
            populate(this, options);
        }

        // Resolve merge callback
        this.callback = (options && typeof options == 'function')
            ? options
            : defaultArrayMergeCallback;
    }

    /**
     * Create new default merge options from given options
     * 
     * @param {ArrayMergeOptions} [options]
     * 
     * @return {Readonly<DefaultArrayMergeOptions|ArrayMergeOptions>}
     */
    public static from(options?: ArrayMergeCallback | ArrayMergeOptions): Readonly<DefaultArrayMergeOptions|ArrayMergeOptions>
    {
        const resolved = new this(options);
        
        return Object.freeze(resolved);
    }
}