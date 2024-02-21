import type { MergeCallback, SkipKeyCallback } from "./types";

/**
 * Merge Options
 */
export default interface MergeOptions
{
    /**
     * The maximum merge depth
     * 
     * **Note**: _Value must be greater than or equal zero._
     * 
     * **Note**: _Defaults to [DEFAULT_MAX_MERGE_DEPTH]{@link import('@aedart/contracts/support/objects').DEFAULT_MAX_MERGE_DEPTH}
     * when not specified._
     * 
     * @type {number}
     */
    depth?: number;
    
    /**
     * Property Keys that must not be merged.
     * 
     * **Note**: _Defaults to [DEFAULT_MERGE_SKIP_KEYS]{@link import('@aedart/contracts/support/objects').DEFAULT_MERGE_SKIP_KEYS}
     * when not specified._
     * 
     * **Callback**: _A callback can be specified to determine if a given key,
     * in a source object should be skipped._
     * 
     * **Example:**
     * ```js
     * const a { 'foo': true };
     * const a { 'bar': true, 'zar': true };
     * 
     * merge([ a, b ], { skip: [ 'zar' ] }); // { 'foo': true, 'bar': true }
     * 
     * merge([ a, b ], { skip: (key, source) => {
     *      return key === 'bar' && Reflect.has(source, key);
     * } }); // { 'foo': true, 'zar': true }
     * ```
     * 
     * @type {PropertyKey[] | SkipKeyCallback}
     */
    skip?: PropertyKey[] | SkipKeyCallback;

    /**
     * Flag, overwrite property values with `undefined`.
     * 
     * **When `true` (_default behaviour_)**: _If an existing property value is not `undefined`, it will be overwritten
     * with new value, even if the new value is `undefined`._
     * 
     * **When `false`**: _If an existing property value is not `undefined`, it will NOT be overwritten
     * with new value, if the new value is `undefined`._
     *
     * **Example:**
     * ```js
     * const a { 'foo': true };
     * const a { 'foo': undefined };
     *
     * merge([ a, b ]); // { 'foo': undefined }
     *
     * merge([ a, b ], { overwriteWithUndefined: false }); // { 'foo': true }
     * ```
     * 
     * @type {boolean}
     */
    overwriteWithUndefined?: boolean;

    /**
     * Flag, if source object is [`Cloneable`]{@link import('@aedart/contracts/support/objects').Cloneable}, then the
     * resulting object from the `clone()` method is used.
     *
     * **When `true` (_default behaviour_)**: _If source object is cloneable then the resulting object from `clone()`
     * method is used. Its properties are then iterated by the merge function._
     *
     * **When `false`**: _Cloneable objects are treated like any other objects, the `clone()` method is ignored._
     *
     * **Example:**
     * ```js
     * const a = { 'foo': { 'name': 'John Doe' } };
     * const b = { 'foo': {
     *      'name': 'Jane Doe',
     *      clone() {
     *          return {
     *              'name': 'Rick Doe',
     *              'age': 26
     *          }
     *      }
     * } };
     *
     * merge([ a, b ]); // { 'foo': { 'name': 'Rick Doe', 'age': 26 } }
     * merge([ a, b ], { useCloneable: false }); // { 'foo': { 'name': 'Jane Doe', clone() {...} } }
     * ```
     * 
     * @see [`Cloneable`]{@link import('@aedart/contracts/support/objects').Cloneable}
     * 
     * @type {boolean}
     */
    useCloneable?: boolean;
    
    /**
     * Flag, whether to merge array, array-like, and [concat spreadable]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/isConcatSpreadable}
     * properties or not.
     *
     * **When `true`**: _existing property is merged with new property value._
     *
     * **When `false` (_default behaviour_)**: _existing property is overwritten with new property value_
     *
     * **Example:**
     * ```js
     * const a = { 'foo': [ 1, 2, 3 ] };
     * const b = { 'foo': [ 4, 5, 6 ] };
     *
     * merge([ a, b ]); // { 'foo': [ 4, 5, 6 ] }
     * merge([ a, b ], { mergeArrays: true }); // { 'foo': [ 1, 2, 3, 4, 5, 6 ] }
     * ```
     * 
     * **Note**: _`String()` (object) and [Typed Arrays]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray}
     * are not merged, even though they are considered to be "array-like" (they offer a `length` property).
     * You need to manually handle these, via a custom [callback]{@link MergeCallback}, if such value types must be merged._
     * 
     * @see [merge (array)]{@link import('@aedart/support/arrays').merge}
     * 
     * @type {boolean}
     */
    mergeArrays?: boolean;

    /**
     * The merge callback that must be applied
     * 
     * **Note**: _When no callback is provided, then the merge function's default
     * callback is used._
     * 
     * @type {MergeCallback}
     */
    callback?: MergeCallback;
}