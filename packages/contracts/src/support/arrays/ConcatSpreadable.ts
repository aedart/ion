/**
 * Concat Spreadable
 *
 * Controls the behavior of how to treat an object's properties when
 * concatenated via Array.prototype.concat().
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/isConcatSpreadable
 */
export default interface ConcatSpreadable<T> extends ArrayLike<T>
{
    /**
     * Optional override for spreading behavior.
     *
     * If true, the object is flattened to its array elements.
     * If false, the object is treated as a single entity.
     */
    [Symbol.isConcatSpreadable]?: boolean;

    /**
     * Number of indexed properties to be read during concatenation.
     */
    readonly length: number;

    /**
     * Indexed elements to be retrieved when [Symbol.isConcatSpreadable] is true.
     */
    readonly [index: number]: T;
}
