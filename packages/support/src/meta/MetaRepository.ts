import Repository from '@aedart/contracts/support/meta/Repository.js';
import { Key } from '@aedart/contracts/support/types.js';
import { get, has, set, toParts } from '../objects/index.js';
import { isKeyUnsafe } from '../reflections/isKeyUnsafe.js';

/**
 * Meta Repository implementation
 */
export default class MetaRepository implements Repository
{
    /**
     * The target this repository is bound to.
     */
    readonly #owner: object;

    /**
     * The parent repository.
     */
    readonly #parent: Repository | undefined;

    /**
     * The actual metadata store for this specific owner.
     */
    readonly #data: Record<PropertyKey, unknown> = Object.create(null) as Record<
        PropertyKey,
        unknown
    >;

    /**
     * Create a new Metadata Repository instance.
     *
     * @param {object} owner
     * @param {Repository} [parent]
     */
    constructor(owner: object, parent?: Repository)
    {
        this.#owner = owner;
        this.#parent = parent;
    }

    /**
     * @inheritdoc
     */
    set(key: Key, value: unknown): void
    {
        // Explicit security validation
        // We parse the parts to check every segment of the path
        const parts = toParts(key);
        const len = parts.length;

        for (let i = 0; i < len; i++) {
            if (isKeyUnsafe(parts[i])) {
                throw new TypeError(`Unsafe metadata key/path detected: ${String(key)}`);
            }
        }

        // Set key-value only after key is determined safe...
        set(this.#data, key, value);
    }

    /**
     * @inheritdoc
     */
    get<T>(key: Key, defaultValue?: T): T | undefined
    {
        if (has(this.#data, key)) {
            return get(this.#data, key);
        }

        if (this.#parent !== undefined) {
            return this.#parent.get<T>(key, defaultValue);
        }

        return defaultValue;
    }

    /**
     * @inheritdoc
     */
    has(key: Key): boolean
    {
        if (has(this.#data, key)) {
            return true;
        }

        return this.#parent?.has(key) ?? false;
    }

    /**
     * @inheritdoc
     */
    all(inherited = true): Record<PropertyKey, unknown>
    {
        const current = {
            ...this.#data,
        };

        if (!inherited || this.#parent === undefined) {
            return current;
        }

        return {
            ...this.#parent.all(inherited),
            ...current,
        };
    }
    
    /**
     * @inheritdoc
     */
    get owner(): object {
        return this.#owner;
    }

    /**
     * @inheritdoc
     */
    get parent(): Repository | undefined {
        return this.#parent;
    }
}
