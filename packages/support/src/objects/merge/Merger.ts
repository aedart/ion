import type {
    Cloneable,
    MergeCallback,
    MergeOptions,
    MergeSourceInfo,
    NextCallback,
    SkipKeyCallback,
    ObjectsMerger
} from "@aedart/contracts/support/objects";
import { DANGEROUS_PROPERTIES } from "@aedart/contracts/support/objects";
import DefaultMergeOptions from "./DefaultMergeOptions";
import { MergeError } from "../exceptions";
import { getErrorMessage } from "@aedart/support/exceptions";
import { isCloneable } from "@aedart/support/objects";
import { descTag } from "@aedart/support/misc";

/**
 * Objects Merger
 * 
 * @see ObjectsMerger
 */
export default class Merger implements ObjectsMerger
{
    /**
     * The merge options to be applied
     *
     * @private
     * 
     * @type {Readonly<DefaultMergeOptions | MergeOptions>}
     */
    #options: Readonly<DefaultMergeOptions | MergeOptions>;

    /**
     * Callback to perform the merging of nested objects.
     * 
     * @private
     * 
     * @type {NextCallback}
     */
    readonly #next: NextCallback;
    
    /**
     * Create a new objects merger instance
     * 
     * @param {MergeCallback | MergeOptions} [options]
     *
     * @throws {MergeError}
     */
    public constructor(options?: MergeCallback | MergeOptions) {
        // @ts-expect-error Need to init options, however they are resolved via "using".
        this.#options = null;
        this.#next = this.merge;
        
        this.using(options);
    }

    /**
     * Returns the merge options that are to be applied
     * 
     * @return {Readonly<DefaultMergeOptions | MergeOptions>}
     */
    get options(): Readonly<DefaultMergeOptions | MergeOptions>
    {
        return this.#options;
    }

    /**
     * Returns the "next" callback that performs merging of nested objects.
     */
    get nextCallback(): NextCallback
    {
        return this.#next;
    }
    
    /**
     * Use the following merge options or merge callback
     *
     * @param {MergeCallback | MergeOptions} [options]
     * 
     * @return {this}
     *
     * @throws {MergeError}
     */
    public using(options?: MergeCallback | MergeOptions): this
    {
        this.#options = this.resolveOptions(options);
        
        return this;
    }
    
    public of(...sources: object[]): object
    {
        try {
            return this.nextCallback(sources, this.options, 0);
        } catch (error) {
            if (error instanceof MergeError) {
                // @ts-expect-error Error SHOULD have a cause object set - support by all browsers now!
                error.cause.sources = sources;
                // @ts-expect-error Error SHOULD have a cause object set - support by all browsers now!
                error.cause.options = this.options;

                throw error;
            }

            const reason: string = getErrorMessage(error);
            throw new MergeError(`Unable to merge objects: ${reason}`, {
                cause: {
                    previous: error,
                    sources: sources,
                    options: this.options
                }
            });
        }
    }

    /**
     * Merge given source objects into a single object
     * 
     * @param {object[]} sources
     * @param {Readonly<MergeOptions>} options
     * @param {number} [depth] Current recursion depth
     * 
     * @return {object}
     * 
     * @throws {MergeError}
     */
    public merge(sources: object[], options: Readonly<MergeOptions>, depth: number = 0): object
    {
        // Abort if maximum depth has been reached
        this.assertMaxDepthNotExceeded(depth, sources, options);
        
        // Resolve callbacks to apply
        const nextCallback: NextCallback = this.nextCallback.bind(this);
        const skipCallback: SkipKeyCallback = (options.skip as SkipKeyCallback).bind(this);
        const mergeCallback: MergeCallback = (options.callback as MergeCallback).bind(this);
        
        // Loop through the sources and merge them into a single object
        return sources.reduce((result: object, source: object, index: number) => {
            // Abort if source is invalid...
            this.assertSourceObject(source, index, depth);

            // If allowed and source implements "Cloneable" interface, favour "clone()" method's resulting object.
            const resolved: object = this.resolveSourceObject(source, options);

            // Loop through all the source's properties, including symbols
            const keys: PropertyKey[] = Reflect.ownKeys(resolved);
            for (const key of keys){
                // Skip key if needed ...
                if (DANGEROUS_PROPERTIES.includes(key) || skipCallback(key, resolved, result)) {
                    continue;
                }
                
                // Resolve the value via callback and set it in resulting object.
                // @ts-expect-error Safe to set the value in result object!
                result[key] = mergeCallback(
                    {
                        result,
                        key,
                        // @ts-expect-error Value can be of any type
                        value: resolved[key],
                        source: resolved,
                        sourceIndex: index,
                        depth: depth,
                    } as MergeSourceInfo,
                    nextCallback,
                    options
                );
            }

            return result;
        }, Object.create(null));
    }

    /**
     * Resolves the source object
     * 
     * @param {object} source
     * @param {MergeOptions} options
     * 
     * @protected
     * 
     * @return {object}
     */
    protected resolveSourceObject(source: object, options: MergeOptions): object
    {
        let output: object = source;
        if (options.useCloneable && isCloneable(source)) {
            output = this.cloneSource(source as Cloneable);
        }
        
        return output;
    }
    
    /**
     * Invokes the "clone()" method on given cloneable object
     * 
     * @param {Cloneable} source
     * 
     * @protected
     * 
     * @return {object}
     * 
     * @return {MergeError} If unable to
     */
    protected cloneSource(source: Cloneable): object
    {
        const clone: object = source.clone();
    
        // Abort if resulting value from "clone()" is not a valid value...
        if (!clone || typeof clone != 'object' || Array.isArray(clone)) {
            throw new MergeError(`Expected clone() method to return object for source, ${descTag(clone)} was returned`, {
                cause: {
                    source: source,
                    clone: clone,
                }
            });
        }
    
        return clone;
    }

    /**
     * Resolves provided merge options
     * 
     * @param {MergeCallback | MergeOptions} [options]
     * 
     * @protected
     * 
     * @return {Readonly<DefaultMergeOptions | MergeOptions>}
     * 
     * @throws {MergeError}
     */
    protected resolveOptions(options?: MergeCallback | MergeOptions): Readonly<DefaultMergeOptions | MergeOptions>
    {
        return DefaultMergeOptions.from(options);
    }

    /**
     * Assert that current recursion depth has now exceeded the maximum depth
     *
     * @param {number} currentDepth
     * @param {object[]} sources
     * @param {MergeOptions} [options] Defaults to this Merger's options when none given
     *
     * @protected
     *
     * @throws {MergeError}
     */
    protected assertMaxDepthNotExceeded(currentDepth: number, sources: object[], options?: MergeOptions): void
    {
        const max: number | undefined = options?.depth || this.options.depth;

        if (max && currentDepth > max) {
            throw new MergeError(`Maximum merge depth (${max}) has been exceeded`, {
                cause: {
                    source: sources,
                    depth: currentDepth
                }
            });
        }
    }

    /**
     * Assert given source is a valid object
     *
     * @param {unknown} source
     * @param {number} index
     * @param {number} currentDepth
     *
     * @protected
     *
     * @throws {MergeError}
     */
    protected assertSourceObject(source: unknown, index: number, currentDepth: number): void
    {
        if (!source || typeof source != 'object' || Array.isArray(source)) {
            throw new MergeError(`Unable to merge source of invalid type "${descTag(source)}" (source index: ${index})`, {
                cause: {
                    source: source,
                    index: index,
                    depth: currentDepth
                }
            });
        }
    }
}