/**
 * Populatable
 *
 * Able to be populated (hydrated) with data
 */
export default interface Populatable {
    /**
     * Populate this component with data
     *
     * **Note**: _When no `data` is provided, then nothing is populated_
     *
     * @param {Record<PropertyKey, any>} [data]
     *
     * @returns {this}
     *
     * @throws {TypeError} When unable to populate with given data
     */
    populate(
        data?: Record<
            PropertyKey,
            any
        >, /* eslint-disable-line @typescript-eslint/no-explicit-any */
    ): this;
}
