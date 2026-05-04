import type {
    ArrayMergeCallback,
    ArrayMergeOptions,
    ArrayMerger,
    IntersectArrays,
} from '@aedart/contracts/support/arrays';
import { getErrorMessage } from '../../exceptions/getErrorMessage.js';
import ArrayMergeError from '../exceptions/ArrayMergeError.js';
import DefaultArrayMergeOptions from './DefaultArrayMergeOptions.js';

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
     * @protected
     */
    protected _options!: Readonly<DefaultArrayMergeOptions | ArrayMergeOptions>;

    /**
     * Create new Array Merger instance
     *
     * @param {ArrayMergeCallback | ArrayMergeOptions} [options]
     */
    public constructor(options?: ArrayMergeCallback | ArrayMergeOptions)
    {
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
        this._options = this.resolveOptions(options);

        return this;
    }

    /**
     * Merge options to be applied
     *
     * @type {Readonly<DefaultArrayMergeOptions | ArrayMergeOptions>}
     */
    public get options(): Readonly<DefaultArrayMergeOptions | ArrayMergeOptions> {
        return this._options;
    }

    /**
     * Returns a merger of given source arrays
     *
     * @param {...unknown[]} sources
     *
     * @return {unknown[]}
     *
     * @throws {ArrayMergeException}
     */
    public of<T extends unknown[][]>(...sources: T): IntersectArrays<T>
    {
        try {
            const options = this._options;
            const callback = options.callback;

            // 1. Calculate total length first to pre-allocate array (V8 optimization)
            let totalLength = 0;
            const sourcesLength = sources.length;
            for (let i = 0; i < sourcesLength; i++) {
                totalLength += sources[i].length;
            }

            const result = new Array(totalLength);
            let resultIndex = 0;

            // 2. Single pass merge using nested index loops
            for (let i = 0; i < sourcesLength; i++) {
                const currentSource = sources[i];
                const currentSourceLength = currentSource.length;

                for (let j = 0; j < currentSourceLength; j++) {
                    // Pass currentSource as the 'array' context per ArrayMergeCallback spec
                    result[resultIndex] = (callback as ArrayMergeCallback)(
                        currentSource[j],
                        j,
                        currentSource as unknown[],
                        options,
                    );
                    resultIndex++;
                }
            }

            return result as IntersectArrays<T>;
        } catch (e) {
            throw new ArrayMergeError(`Unable to merge arrays: ${getErrorMessage(e)}`, {
                cause: { previous: e, sources },
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
    protected resolveOptions(
        options?: ArrayMergeCallback | ArrayMergeOptions,
    ): Readonly<DefaultArrayMergeOptions | ArrayMergeOptions>
    {
        return DefaultArrayMergeOptions.from(options);
    }
}
