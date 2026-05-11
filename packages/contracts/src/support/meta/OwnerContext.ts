/**
 * Owner Context
 */
export default interface OwnerContext {
    /**
     * Reference to the owner of a Meta Repository
     *
     * @type {WeakRef<object>}
     */
    readonly ownerRef: WeakRef<object>;
}
