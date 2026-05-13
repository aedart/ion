import { type OwnerContext as OwnerContextContract } from '@aedart/contracts/support/meta';

/**
 * Owner Context
 */
export default class OwnerContext implements OwnerContextContract
{
    /**
     * Reference to the owner of a Meta Repository
     *
     * @type {WeakRef<object>}
     *
     * @private
     */
    readonly #owner: WeakRef<object>;

    /**
     * Create a new owner context
     *
     * @param {object} owner
     */
    constructor(owner: object)
    {
        this.#owner = new WeakRef(owner);
    }

    /**
     * @inheritdoc
     */
    get ownerRef(): WeakRef<object> {
        return this.#owner;
    }
}
