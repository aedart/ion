/**
 * Populatable
 * 
 * Able to be populated (hydrated) with data
 */
export default interface Populatable
{
    /**
     * Populate this component with data
     * 
     * **Note**: _When no `data` is provided, then nothing is populated_
     * 
     * @param {any} [data] E.g. key-value pair (object), array, or any other kind
     *                     of data.
     * 
     * @throws {TypeError} When unable to populate with given data. Or, if type of data is
     *                     not supported.
     */
    populate(
        data?: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): this
}