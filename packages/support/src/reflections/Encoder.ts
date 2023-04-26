import type { Constructor } from "@aedart/contracts";
import type {Context} from "@aedart/contracts/support/meta";
import type { Reflection } from "@aedart/contracts/support/reflections";
import {Kind} from "@aedart/contracts/support/meta";
import { targetToWeakReference } from "./targetToWeakReference";

/**
 * Encoder
 */
export default class Encoder
{
    /**
     * "Encode" a decorator context object and target directly to an array
     *
     * @param {Context} context
     * @param {WeakRef<object> | object | undefined} [target=undefined]
     *
     * @returns {unknown[]}
     *
     * @throws {TypeError} If context kind is not supported
     */
    static encodeContext(context: Context, target: WeakRef<object> | object | undefined = undefined): unknown[]
    {
        return Encoder.encode(
            context.kind,
            context.kind === 'class' ? false : context.private,
            context.kind === 'class' ? false : context.static,
            context.name,
            target
        )
    }
    
    /**
     * "Encode" reflection attributes to an array
     * 
     * @see decode
     * 
     * @param {string} kind
     * @param {boolean} isPrivate
     * @param {boolean} isStatic
     * @param {string | symbol | undefined} name
     * @param {WeakRef<object> | object | undefined} [target=undefined]
     *
     * @returns {unknown[]}
     *
     * @throws {TypeError} If element kind is not supported
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
            Encoder.encodeElementKind(kind as keyof typeof Kind),   // 0 = kind
            Number(isPrivate),                                      // 1 = private
            Number(isStatic),                                       // 2 = static
            name,                                                   // 3 = name
            targetToWeakReference(target)                           // 4 = target reference
        ];
    }
    
    /**
     * "Decode" array and create a new instance of given Reflection class
     * 
     * @see encode
     * @see Reflection
     * 
     * @template T
     * @param {unknown[]} arr
     * @param {Constructor<Reflection>} reflectionClass
     * 
     * @returns {Reflection} Reflection instance
     *
     * @throws {TypeError}
     */
    static decode(arr: unknown[], reflectionClass: Constructor<Reflection>): Reflection
    {
        const min: number = 4;
        if (arr.length < min) {
            throw new TypeError(`Insufficient elements in array. Expected at least ${min}`);
        }
        
        return Reflect.construct(reflectionClass, [
            Encoder.decodeElementKind(arr[0] as number),
            Boolean(arr[1]),
            Boolean(arr[2]),
            arr[3] as (string | symbol | undefined),
            targetToWeakReference(arr[4] ?? undefined)            
        ])
    }
    
    /*****************************************************************
     * Internals
     ****************************************************************/

    /**
     * Encode "element kind" to a numeric value
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
     * Decode "element kind" from a numeric value
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
}