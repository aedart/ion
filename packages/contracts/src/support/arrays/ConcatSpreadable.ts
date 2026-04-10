/**
 * Concat Spreadable
 *
 * Controls the behaviour of to treat this object's properties, when the object is concatenated via [`Array.concat()`]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat}
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/isConcatSpreadable
 */
export default interface ConcatSpreadable<T> extends ArrayLike<T>
{
    /**
     * Determines how [`Array.concat()`]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat}
     * should treat this object as an array-like object and flattened to its array elements, or not.
     * 
     * For array objects, the default behavior is to spread (flatten) elements (`[Symbol.isConcatSpreadable] === true`).
     * 
     * For array-like objects, the default behavior is no spreading or flattening (`[Symbol.isConcatSpreadable] === false`).
     * 
     * @type {boolean}
     */
    [Symbol.isConcatSpreadable]: boolean;

    /**
     * Length controls the number of properties to be added
     * when this object is concatenated via [`Array.concat()`]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat},
     * if [Symbol.isConcatSpreadable]{@link Symbol.isConcatSpreadable} is `true`. 
     * 
     * @type {number} Must be greater than or equal to 0
     */
    readonly length: number;
}