/**
 * Merge Source Info
 * 
 * Contains information about what key-value must be merged from a target source object,
 * along with other meta information.
 */
export default interface MergeSourceInfo
{
    /**
     * The resulting object (relative to object depth)
     *
     * @type {object}
     */
    result: object,

    /**
     * The target property key in source object to
     *
     * @type {PropertyKey}
     */
    key: PropertyKey,

    /**
     * Value of the property in source object
     *
     * @type {any}
     */
    value: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */

    /**
     * The source object that holds the property key and value
     *
     * @type {object}
     */
    source: object,

    /**
     * Source object's index (relative to object depth)
     *
     * @type {number}
     */
    sourceIndex: number,

    /**
     * The current recursion depth
     */
    depth: number,
}