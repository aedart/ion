import type { ArrayMergeCallback, ArrayMergeOptions } from '@aedart/contracts/support/arrays';
import { populate } from '../../objects/populate.js';
import { defaultArrayMergeCallback } from './defaultArrayMergeCallback.js';

/**
 * Default Array Merge Options
 */
export default class DefaultArrayMergeOptions implements ArrayMergeOptions
{
    /**
     * @inheritdoc
     */
    transferFunctions = false;

    /**
     * @inheritdoc
     */
    callback: ArrayMergeCallback;

    /**
     * @inheritdoc
     */
    clone = false;

    /**
     * Create new default merge options from given options
     *
     * @param {ArrayMergeCallback | ArrayMergeOptions} [options]
     */
    constructor(options?: ArrayMergeCallback | ArrayMergeOptions)
    {
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
    public static from(
        options?: ArrayMergeCallback | ArrayMergeOptions,
    ): Readonly<DefaultArrayMergeOptions | ArrayMergeOptions>
    {
        return Object.freeze(new this(options));
    }
}
