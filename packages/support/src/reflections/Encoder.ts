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
 * 4 = target owner reference,
 * ```
 */
export type EncodedReflection = [
    number,                         // 0
    number,                         // 1
    number,                         // 2
    string | symbol | undefined,    // 3
    WeakRef<object> | undefined,    // 4
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
     * @param {WeakRef<object> | object | undefined} [owner=undefined]
     *
     * @returns {EncodedReflection}
     *
     * @throws {TypeError} If context kind is not supported
     */
    static encodeContext(
        context: Context,
        owner: WeakRef<object> | object | undefined = undefined,
    ): EncodedReflection
    {
        return Encoder.encode(
            context.kind,
            context.kind === 'class' ? false : context.private,
            context.kind === 'class' ? false : context.static,
            context.name,
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
        owner: WeakRef<object> | object | undefined = undefined,
    ): EncodedReflection
    {
        return [
            Encoder.encodeElementKind(kind as keyof typeof Kind),   // 0
            Number(isPrivate),                                      // 1
            Number(isStatic),                                       // 2
            name,                                                   // 3
            toWeakReference(owner)                                  // 4
        ];
    }

    /**
     * "Decode" array and create a new instance of given Reflection class
     * 
     * @param {EncodedReflection} arr
     * @param {object} target
     * @param {{name?: string | symbol | undefined, owner?: object}} [overwrites]
     * 
     * @returns {import('@aedart/contracts/support/reflections')} Reflection instance
     *
     * @throws {TypeError}
     */
    static decode(arr: EncodedReflection, target: object, overwrites: { name?: string | symbol | undefined, owner?: object } = {}): ReflectionContract
    {
        const min: number = 4;
        if (arr.length < min) {
            throw new TypeError(`Insufficient elements in array. Expected at least ${min}`);
        }
        
        const name: string | symbol | undefined = (overwrites.name !== undefined)
            ? overwrites.name
            : arr[3];
        
        const owner = (overwrites.owner !== undefined)
            ? toWeakReference(overwrites.owner)
            : toWeakReference(arr[4] ?? undefined);
        
        return new Reflection(
            Encoder.decodeElementKind(arr[0] as number),
            Boolean(arr[1]),
            Boolean(arr[2]),
            name,
            toWeakReference(target),
            owner,
        );
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