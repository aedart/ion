import {
    Repository,
    MetadataRecord
} from '@aedart/contracts/support/meta';
import { Key } from "@aedart/contracts/support";
import {
    get,
    set,
    has,
    forget
} from '../objects/index.js';

/**
 * Metadata Repository
 *
 * @see Repository
 */
export default class MetaRepository implements Repository
{
    /**
     * Create a new Metadata Repository instance
     *
     * @param {MetadataRecord} shelf The raw context.metadata object
     */
    constructor(protected shelf: MetadataRecord)
    {
    }

    /**
     * @inheritDoc
     */
    public set(key: Key, value: any): void
    {
        set(this.shelf, key, value);
    }

    /**
     * @inheritDoc
     */
    public get<T>(key: Key, defaultValue?: T): T | undefined
    {
        return get(this.shelf, key, defaultValue);
    }

    /**
     * @inheritDoc
     */
    public has(key: Key): boolean
    {
        return has(this.shelf, key);
    }

    /**
     * @inheritDoc
     */
    public forget(key: Key): boolean
    {
        return forget(this.shelf, key);
    }

    /**
     * @inheritDoc
     */
    public all(): MetadataRecord
    {
        return this.shelf;
    }
}
