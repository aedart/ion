import type {Context} from "@aedart/contracts/support/meta";
import type { Reflection as ReflectionContract } from "@aedart/contracts/support/reflections";
import {Kind} from "@aedart/contracts/support/meta";
import { toWeakReference } from "./toWeakReference";
import Reflection from "./Reflection";

/**
 * "Encoded" Reflection object 
 * 
 * ```
 * 0 = kind,
 * 1 = private,
 * 2 = static,
 * 3 = name,
 * 4 = target reference,
 * 5 = target owner reference,
 * ```
 */
export type EncodedReflection = [
    number,                         // 0
    number,                         // 1
    number,                         // 2
    string | symbol | undefined,    // 3
    WeakRef<object> | undefined,    // 4
    WeakRef<object> | undefined     // 5
];

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
     * @param {WeakRef<object> | object | undefined} [owner=undefined]
     *
     * @returns {EncodedReflection}
     *
     * @throws {TypeError} If context kind is not supported
     */
    static encodeContext(
        context: Context,
        target: WeakRef<object> | object | undefined = undefined,
        owner: WeakRef<object> | object | undefined = undefined,
    ): EncodedReflection
    {
        return Encoder.encode(
            context.kind,
            context.kind === 'class' ? false : context.private,
            context.kind === 'class' ? false : context.static,
            context.name,
            target,
            owner
        )
    }
    
    /**
     * "Encode" reflection attributes to an array
     * 
     * @param {string} kind
     * @param {boolean} isPrivate
     * @param {boolean} isStatic
     * @param {string | symbol | undefined} name
     * @param {WeakRef<object> | object | undefined} [target=undefined]
     * @param {WeakRef<object> | object | undefined} [owner=undefined]
     *
     * @returns {EncodedReflection}
     *
     * @throws {TypeError} If element kind is not supported
     */
    static encode(
        kind: string,
        isPrivate: boolean,
        isStatic: boolean,
        name: string | symbol | undefined,
        target: WeakRef<object> | object | undefined = undefined,
        owner: WeakRef<object> | object | undefined = undefined,
    ): EncodedReflection
    {
        return [
            Encoder.encodeElementKind(kind as keyof typeof Kind),   // 0
            Number(isPrivate),                                      // 1
            Number(isStatic),                                       // 2
            name,                                                   // 3
            toWeakReference(target),                                // 4
            toWeakReference(owner)                                  // 5
        ];
    }
    
    /**
     * "Decode" array and create a new instance of given Reflection class
     * 
     * @template T
     * @param {EncodedReflection} arr
     * 
     * @returns {import('@aedart/contracts/support/reflections')} Reflection instance
     *
     * @throws {TypeError}
     */
    static decode(arr: EncodedReflection): ReflectionContract
    {
        const min: number = 4;
        if (arr.length < min) {
            throw new TypeError(`Insufficient elements in array. Expected at least ${min}`);
        }
        
        return new Reflection(
            Encoder.decodeElementKind(arr[0] as number),
            Boolean(arr[1]),
            Boolean(arr[2]),
            arr[3] as (string | symbol | undefined),
            toWeakReference(arr[4] ?? undefined),
            toWeakReference(arr[5] ?? undefined),
        )
    }

    /**
     * Encode "element kind" to a numeric value
     *
     * @param {keyof typeof Kind} kind
     *
     * @returns {number}
     *
     * @throws {TypeError} If kind is not supported
     */
    static encodeElementKind(kind: keyof typeof Kind): number
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
     *
     * @throws {TypeError} If kind is not supported
     */
    static decodeElementKind(kind: number): string
    {
        if (!Reflect.has(Kind, kind)) {
            throw new TypeError(`Kind: "${kind}" is unsupported`);
        }

        return Kind[kind];
    }
}