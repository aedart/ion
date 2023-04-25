import type { Reflection as ReflectionContract } from "@aedart/contracts/support/reflections";
import { Kind } from "@aedart/contracts/support/meta";
import { isset } from "@aedart/support/misc";
import Encoder from "./Encoder";

/**
 * Reflection
 * 
 * @see import('@aedart/contracts/support/reflections').Reflection
 */
export default class Reflection implements ReflectionContract
{
    /**
     * The kind of element
     * 
     * @type {string}
     * @private
     */
    readonly #kind: string;

    /**
     * The name of the element
     * 
     * @type {string | symbol | undefined}
     * @private
     */
    readonly #name: string | symbol | undefined;

    /**
     * If element is declared as private
     * 
     * @type {boolean}
     * @private
     */
    readonly #private: boolean;

    /**
     * If element is declared as static
     * 
     * @type {boolean}
     * @private
     */
    readonly #static: boolean;

    /**
     * Reference to target element
     * 
     * @type {WeakRef<object> | undefined}
     * @private
     */
    readonly #target: WeakRef<object> | undefined;

    /**
     * Create new Reflection instance
     * 
     * @see fromArray
     * @see fromContext
     * 
     * @param {string} kind
     * @param {boolean} isPrivate
     * @param {boolean} isStatic
     * @param {string | symbol | undefined} name
     * @param {WeakRef<object> | undefined} target
     * 
     * @throws {TypeError} If target is not WeakRef or undefined
     */
    constructor(
        kind: string,
        isPrivate: boolean,
        isStatic: boolean,
        name: string | symbol | undefined,
        target: WeakRef<object> | undefined,
    )
    {
        if (isset(target) && !(target instanceof WeakRef)) {
            throw new TypeError('Target must be a WeakRef or undefined');
        }

        this.#kind = kind;
        this.#name = name;
        this.#private = isPrivate;
        this.#static = isStatic;
        this.#target = target;
    }

    /**
     * Create a new Reflection instance from given array
     *
     * @see Encoder
     * 
     * @param {any[]} arr Encoded array of reflection attributes
     *
     * @returns {import('@aedart/contracts/support/reflections').Reflection}
     *
     * @throws {TypeError}
     */
    static fromArray(arr: unknown[]): ReflectionContract
    {
        return Encoder.decode(arr, Reflection);
    }

    /**
     * @inheritdoc
     */
    get kind(): string
    {
        return this.#kind;
    }

    /**
     * @inheritdoc
     */
    get name(): string | symbol | undefined
    {
        return this.#name;
    }

    /**
     * @inheritdoc
     */
    get private(): boolean
    {
        return this.#private;
    }

    /**
     * @inheritdoc
     */
    get public(): boolean
    {
        return !this.private;
    }

    /**
     * @inheritdoc
     */
    get static(): boolean
    {
        return this.#static;
    }

    /**
     * @inheritdoc
     */
    get target(): WeakRef<object> | undefined
    {
        return this.#target;
    }

    /**
     * @inheritdoc
     */
    hasTarget(): boolean
    {
        return this.target?.deref() !== undefined;
    }
    
    /**
     * @inheritdoc
     * 
     * @see Encoder.encode
     */
    toArray(): unknown[]
    {
        return Encoder.encode(
            this.kind as keyof typeof Kind,
            this.private,
            this.static,
            this.name,
            this.target            
        );
    }
}