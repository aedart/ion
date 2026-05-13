import { type Key } from '@aedart/contracts/support';
import { type MemberAddress, type OwnerContext } from '@aedart/contracts/support/meta';
import { toParts } from '../objects/toParts.js';

/**
 * Member Address
 */
export default class Address implements MemberAddress
{
    /**
     * @inheritdoc
     */
    ctx: OwnerContext | undefined;

    /**
     * @inheritdoc
     */
    readonly static: boolean;

    /**
     * @inheritdoc
     */
    readonly kind: string;

    /**
     * @inheritdoc
     */
    readonly name: string | symbol;

    /**
     * @inheritdoc
     */
    readonly basePath: Key;

    /**
     * Create a new member address instance
     *
     * @param {OwnerContext | undefined} ctx
     * @param {boolean} isStatic
     * @param {string} kind
     * @param {string | symbol} name
     */
    constructor(
        ctx: OwnerContext | undefined,
        isStatic: boolean,
        kind: string,
        name: string | symbol,
    )
    {
        this.ctx = ctx;
        this.static = isStatic;
        this.kind = kind;
        this.name = name;
        this.basePath = this.resolveBasePath();
    }

    /**
     * @inheritdoc
     */
    path(key?: Key): Key
    {
        if (key === undefined || key === null) {
            return this.basePath;
        }

        const base = this.basePath as PropertyKey[];
        const parts = toParts(key);

        if (parts.length === 0) {
            return this.basePath;
        }

        // Pre-allocate the exact array size needed.
        // This avoids V8 inner-loop array resizing and memory reallocation steps.
        const output = new Array<PropertyKey>(base.length + parts.length);

        // Linear copy operations (highly optimized by V8 runtime JIT)
        for (let i = 0; i < base.length; ++i) {
            output[i] = base[i];
        }

        for (let i = 0; i < parts.length; ++i) {
            output[base.length + i] = parts[i];
        }

        return output;
    }

    /**
     * Resolves the base path
     *
     * @returns {Key}
     *
     * @protected
     */
    protected resolveBasePath(): Key
    {
        const kind = this.kind === 'method' ? 'methods' : 'fields';

        // Direct layout construction avoids slow unshift structural re-indexes
        // E.g. [ 'static', 'methods', 'playSound' ], or [ 'methods', 'playSound' ]
        const path = this.static
            ? ['static', kind, this.name]
            : [kind, this.name];

        // Freezing stops V8 from keeping hidden "growth memory buffers" 
        return Object.freeze(path) as unknown as Key;
    }
}
