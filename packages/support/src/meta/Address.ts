import { type Key } from '@aedart/contracts/support';
import {
    type MemberAddress,
    type OwnerContext,
} from '@aedart/contracts/support/meta';
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
    constructor(ctx: OwnerContext | undefined, isStatic: boolean, kind: string, name: string | symbol)
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

        const output = toParts(this.basePath);
        const parts = toParts(key);
        const len = parts.length;

        for (let i = 0; i < len; ++i) {
            output.push(parts[i]);
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
        // Base path is resolved as an array because a member's name can
        // be a symbol, and not just a string!

        const kind = this.kind === 'method'
            ? 'methods'
            : 'fields';

        // E.g. [ 'methods', 'playSound' ], or [ 'fields', 'foo' ]
        const path = [kind, this.name];

        // E.g. [ 'static', 'methods', 'playSound' ], or [ 'static', 'fields', 'foo' ]
        if (this.static) {
            path.unshift('static');
        }

        return path;
    }
}
