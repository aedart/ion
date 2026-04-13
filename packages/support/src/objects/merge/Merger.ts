import {
    DEFAULT_MAX_MERGE_DEPTH,
    MergeCallback,
    MergeOptions,
    MergeSourceInfo,
    NextCallback,
    ObjectsMerger,
} from '@aedart/contracts/support/objects';
import { isKeyUnsafe } from '../../reflections/isKeyUnsafe.js';
import DefaultMergeOptions from './DefaultMergeOptions.js';
import MergeError from "../exceptions/MergeError.js";

/**
 * Merger
 *
 * @see ObjectsMerger
 */
export default class Merger implements ObjectsMerger
{
    /**
     * The merge options to be applied
     *
     * @type {Readonly<DefaultMergeOptions>}
     */
    readonly #options: Readonly<DefaultMergeOptions>;

    /**
     * Creates a new Merger instance
     *
     * @param {MergeCallback | MergeOptions} [options]
     */
    constructor(options?: MergeCallback | MergeOptions)
    {
        this.#options = DefaultMergeOptions.from(options);
    }

    /**
     * @inheritDoc
     */
    public using(options?: MergeCallback | MergeOptions): this
    {
        return new (this.constructor as any)(options);
    }

    /**
     * @inheritDoc
     */
    public of(...sources: object[]): any
    {
        const totalSources: number = sources.length;
        if (totalSources === 0) {
            return Object.create(null);
        }

        // Ensure we don't mutate the first source by merging into a fresh object
        return this.merge(
            [Object.create(null), ...sources],
            this.#options,
            0,
        );
    }

    /**
     * Perform deep merge of given sources
     *
     * @param {object[]} sources
     * @param {Readonly<MergeOptions>} options
     * @param {number} depth
     *
     * @returns {object}
     * 
     * @throws {MergeError}
     */
    protected merge(
        sources: object[],
        options: Readonly<MergeOptions>,
        depth: number,
    ): object
    {
        const totalSources: number = sources.length;
        const result: object = sources[0];

        for (let i = 1; i < totalSources; i++) {
            const source: object = sources[i];
            if (source === null || typeof source !== 'object') {
                continue;
            }

            this.mergeSource(result, source, i, options, depth);
        }

        return result;
    }

    /**
     * Merge properties from source into result
     */

    /**
     * Merge the given source into the resulting object
     * 
     * @param {object} result
     * @param {object} source
     * @param {number} sourceIndex
     * @param {Readonly<MergeOptions>} options
     * @param {number} depth
     * 
     * @throws {MergeError}
     * 
     * @protected
     */
    protected mergeSource(
        result: object,
        source: object,
        sourceIndex: number,
        options: Readonly<MergeOptions>,
        depth: number,
    ): void
    {
        const keys: PropertyKey[] = Reflect.ownKeys(source);
        const totalKeys: number = keys.length;
        const maxDepth = options.depth ?? DEFAULT_MAX_MERGE_DEPTH;

        for (let j = 0; j < totalKeys; j++) {
            const key: PropertyKey = keys[j];

            // Use the reflection utility to check for unsafe keys (prototype pollution)
            if (isKeyUnsafe(key)) {
                continue;
            }

            if (typeof options.skip === 'function' && options.skip(key, source, result)) {
                continue;
            }

            const value: any = Reflect.get(source, key);
            const target: MergeSourceInfo = {
                result,
                key,
                value,
                source,
                sourceIndex,
                depth,
            };

            const next: NextCallback = (nestedSources, nestedOptions, nextDepth) => {
                return this.merge(nestedSources, nestedOptions, nextDepth);
            };

            // Depth Enforcement
            if (depth >= maxDepth) {
                throw new MergeError(`Maximum merge depth (${maxDepth}) exceeded at key "${String(key)}"`, {
                    cause: { target, options },
                });
            }
            
            const mergedValue: any = options.callback!(target, next, options);

            Reflect.set(result, key, mergedValue);
        }
    }
}
