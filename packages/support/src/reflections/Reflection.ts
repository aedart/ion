import type { Reflection as ReflectionContract } from "@aedart/contracts/support/reflections";
import type { Context } from "@aedart/contracts/support/meta";
import { Kind } from "@aedart/contracts/support/meta";
import { isset } from "@aedart/support/misc";

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
     * @see encode
     */
    toArray(): unknown[]
    {
        return Reflection.encode(
            this.kind as keyof typeof Kind,
            this.private,
            this.static,
            this.name,
            this.target
        )
    }

    /**
     * "Encode" attributes to an array representation of a Reflection
     *
     * Method does not create a new Reflection instance.
     * 
     * @param {string} kind
     * @param {boolean} isPrivate
     * @param {boolean} isStatic
     * @param {string | symbol | undefined} name
     * @param {WeakRef<object> | object | undefined} [target=undefined]
     * 
     * @returns {unknown[]}
     *
     * @throws {TypeError} If kind is not supported
     */
    static encode(
        kind: string,
        isPrivate: boolean,
        isStatic: boolean,
        name: string | symbol | undefined,
        target: WeakRef<object> | object | undefined = undefined,
    ): unknown[]
    {
        return [
            Reflection.encodeElementKind(kind as keyof typeof Kind),  // 0 = kind
            Number(isPrivate),                                        // 1 = private
            Number(isStatic),                                         // 2 = static
            name,                                                     // 3 = name
            Reflection.resolveTargetReference(target)                 // 4 = target reference
        ];
    }
    
    /**
     * Create a new Reflection instance from given array
     * 
     * @see toArray
     * @see encode
     * 
     * @param {any[]} arr
     * 
     * @returns {Reflection}
     *
     * @throws {TypeError} If kind is not supported
     */
    static fromArray(arr: unknown[])
    {
        const min: number = 4;
        if (arr.length < min) {
            throw new TypeError(`Insufficient elements in array. Expected at least ${min}`);
        }

        return new this(
            Reflection.decodeElementKind(arr[0] as number),
            Boolean(arr[1]),
            Boolean(arr[2]),
            arr[3] as (string | symbol | undefined),
            Reflection.resolveTargetReference(arr[4] ?? undefined)
        );
    }

    /**
     * Create a new Reflection instance from a decorator context object and
     * a target reference
     * 
     * @see encodeContext
     * 
     * @param {Context} context
     * @param {WeakRef<object> | object | undefined} [target=undefined]
     * 
     * @returns {Reflection}
     */
    static fromContext(context: Context, target: WeakRef<object> | object | undefined = undefined)
    {
        return new this(
            context.kind,
            context.kind === 'class' ? false : context.private,
            context.kind === 'class' ? false : context.static,
            context.name,
            Reflection.resolveTargetReference(target)
        );
    }

    /**
     * "Encode" a decorator context object and target directly to an array
     * representation of a Reflection.
     * 
     * Method does not create a new Reflection instance.
     * 
     * @see encode
     * @see fromArray
     * 
     * @param {Context} context
     * @param {WeakRef<object> | object | undefined} [target=undefined]
     * 
     * @returns {unknown[]}
     *
     * @throws {TypeError} If kind is not supported
     */
    static encodeContext(context: Context, target: WeakRef<object> | object | undefined = undefined): unknown[]
    {
        return Reflection.encode(
            context.kind,
            context.kind === 'class' ? false : context.private,
            context.kind === 'class' ? false : context.static,
            context.name,
            target
        )
    }
    
    /*****************************************************************
     * Internals
     ****************************************************************/

    /**
     * Encode element kind to a numeric value
     * 
     * @param {keyof typeof Kind} kind
     * 
     * @returns {number}
     * @protected
     * 
     * @throws {TypeError} If kind is not supported
     */
    protected static encodeElementKind(kind: keyof typeof Kind): number
    {
        if (!Reflect.has(Kind, kind)) {
            throw new TypeError(`Kind: "${kind}" is unsupported`);
        }
        
        return Kind[kind];
    }

    /**
     * Decode element kind from a numeric value
     * 
     * @param {number} kind
     * @returns {string}
     * @protected
     *
     * @throws {TypeError} If kind is not supported
     */
    protected static decodeElementKind(kind: number): string
    {
        if (!Reflect.has(Kind, kind)) {
            throw new TypeError(`Kind: "${kind}" is unsupported`);
        }

        return Kind[kind];
    }

    /**
     * Resolves the given target
     * 
     * @param {WeakRef<object> | object | undefined} [target=undefined]
     * 
     * @returns {WeakRef<object> | undefined}
     * @protected
     */
    protected static resolveTargetReference(target: WeakRef<object> | object | undefined = undefined): WeakRef<object> | undefined
    {
        if (target instanceof WeakRef) {
            return target;
        }
        
        if (isset(target) && typeof target === 'object') {
            return new WeakRef(target);
        }
        
        return undefined;
    }
}