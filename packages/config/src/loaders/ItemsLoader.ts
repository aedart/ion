import BaseLoader from "./BaseLoader";
import type { Items } from "@aedart/contracts/config";

/**
 * Items Loader
 * 
 * @see {BaseLoader}
 */
export default class ItemsLoader extends BaseLoader
{
    /**
     * Configuration Items
     * 
     * @type {Items}
     * 
     * @protected
     */
    protected items: Items;

    /**
     * Create new Configuration Loader instance
     * 
     * @param {Items} items
     */
    public constructor(items: Items)
    {
        super(items);
        
        this.items = items;
    }

    /**
     * Load configuration {@link Items}
     *
     * @return {Promise<Items>}
     *
     * @throws {import('@aedart/contracts/config').LoaderException}
     */
    public async load(): Promise<Items>
    {
        return Promise.resolve(this.items);
    }
}