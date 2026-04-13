import type { ArrayMergeOptions } from '@aedart/contracts/support/arrays';
import type {
    MergeCallback,
    MergeOptions,
    SkipKeyCallback,
} from '@aedart/contracts/support/objects';
import { DEFAULT_MAX_MERGE_DEPTH } from '@aedart/contracts/support/objects';
import MergeError from '../exceptions/MergeError.js';
import { populate } from '../populate.js';
import { defaultMergeCallback } from './defaultMergeCallback.js';
import { makeSkipCallback } from './makeSkipCallback.js';

/**
 * Default Merge Options
 *
 * @see MergeOptions
 */
export default class DefaultMergeOptions implements MergeOptions
{
    /**
     * @inheritdoc
     */
    depth: number = DEFAULT_MAX_MERGE_DEPTH;

    /**
     * @inheritdoc
     */
    skip: PropertyKey[] | SkipKeyCallback = [];

    /**
     * @inheritdoc
     */
    overwriteWithUndefined: boolean = true;

    /**
     * @inheritdoc
     */
    clone: boolean = false;

    /**
     * @inheritdoc
     */
    mergeArrays: boolean = false;

    /**
     * @inheritdoc
     */
    arrayMergeOptions: ArrayMergeOptions = {};

    /**
     * @inheritdoc
     */
    callback: MergeCallback;

    /**
     * Creates a new Merge Options instance
     *
     * @param {MergeCallback | MergeOptions} [options]
     */
    public constructor(options?: MergeCallback | MergeOptions)
    {
        if (options !== undefined && options !== null && typeof options === 'object') {
            populate(this, options);
        }

        if (this.depth < 0) {
            throw new MergeError('Invalid maximum "depth" merge option value', {
                cause: { options: this },
            });
        }

        // Resolve merge callback: prioritize function argument, then options property, then default.
        this.callback = (typeof options === 'function')
            ? options
            : (options as MergeOptions)?.callback ?? defaultMergeCallback;

        // Resolve skip callback: ensure it is always a function to avoid type-checking during merge loops.
        if (typeof this.skip !== 'function') {
            this.skip = makeSkipCallback(this.skip as PropertyKey[]);
        }
    }

    /**
     * Create new default merge options from given options
     *
     * @param {MergeCallback | MergeOptions} [options]
     *
     * @return {Readonly<DefaultMergeOptions>}
     *
     * @throws {MergeError}
     */
    public static from(options?: MergeCallback | MergeOptions): Readonly<DefaultMergeOptions>
    {
        return Object.freeze(new this(options));
    }
}
