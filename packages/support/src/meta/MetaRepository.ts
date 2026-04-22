import { Key } from '@aedart/contracts/support';
import { Repository } from '@aedart/contracts/support/meta';
import { get, has } from '../objects/index.js';

/**
 * Metadata Repository
 *
 * @see Repository
 */
export default class MetaRepository implements Repository
{
    protected shelf: DecoratorMetadata;
    protected readonly target: any;
    protected readonly targetName: PropertyKey | undefined;

    constructor(target: any, targetName?: PropertyKey)
    {
        this.target = target;
        this.shelf = target[Symbol.metadata] ?? target;
        this.targetName = targetName;
    }
    protected toParts(key: Key): string[]
    {
        return Array.isArray(key) ? key.map(String) : String(key).split('.');
    }

    public set(key: Key, value: any): void
    {
        // 1. REPAIR CLASS SHELF: If we share an instance with the parent,
        // we must branch it manually before doing anything else.
        this.ensureShelfIsOwned();

        // 2. BRANCH MEMBER NAMESPACE: Now that the shelf is unique,
        // ensure the member namespace is also a unique branch.
        this.ensureNamespaceIsOwned();

        let current: any = this.targetName !== undefined
            ? (this.shelf as any)[this.targetName]
            : this.shelf;

        const parts = this.toParts(key);
        const last = parts.pop()!;

        for (const part of parts) {
            // Path Branching: Ensure we don't mutate inherited nested objects
            if (!Object.hasOwn(current, part)) {
                const existing = current[part];
                current[part] = Array.isArray(existing)
                    ? [...(existing ?? [])]
                    : { ...(existing ?? {}) };
            }
            current = current[part];
        }
        current[last] = value;
    }

    protected ensureShelfIsOwned(): void
    {
        // Detect if the target class is sharing its metadata object with its parent
        if (this.target && this.target[Symbol.metadata]) {
            const parent = Object.getPrototypeOf(this.target);
            const parentMetadata = parent?.[Symbol.metadata];

            // If identities are shared, or prototype link is missing (the Nuclear leak)
            if (
                parentMetadata
                && (this.shelf === parentMetadata
                    || Object.getPrototypeOf(this.shelf) !== parentMetadata)
            ) {
                this.shelf = Object.create(parentMetadata);
                this.target[Symbol.metadata] = this.shelf;
            }
        }
    }

    protected ensureNamespaceIsOwned(): void
    {
        if (this.targetName && !Object.hasOwn(this.shelf, this.targetName)) {
            const inherited = (this.shelf as any)[this.targetName];
            (this.shelf as any)[this.targetName] = inherited !== undefined
                ? Object.create(inherited)
                : {};
        }
    }

    public get<T>(key: Key, defaultValue?: T): T | undefined
    {
        let current: any = this.targetName !== undefined
            ? (this.shelf as any)[this.targetName]
            : this.shelf;

        if (!current) return defaultValue;

        const parts = this.toParts(key);
        for (const part of parts) {
            if (current === null || current === undefined || current[part] === undefined) {
                return defaultValue;
            }
            current = current[part];
        }

        return current as T;
    }

    public has(key: Key): boolean
    {
        return this.get(key) !== undefined;
    }

    public all(merged: boolean = false): DecoratorMetadata
    {
        if (this.targetName === undefined) {
            const data = merged ? this.flatten(this.shelf) : { ...this.shelf };
            return Object.fromEntries(
                Object.entries(data).filter(([_, v]) => !this.isPlainObject(v)),
            );
        }

        const namespace = (this.shelf as any)[this.targetName];
        return namespace ? (merged ? this.flatten(namespace) : { ...namespace }) : {};
    }

    protected flatten(obj: object): Record<PropertyKey, any>
    {
        const result: Record<PropertyKey, any> = {};
        const chain: object[] = [];
        let proto = obj;

        while (proto && proto !== Object.prototype) {
            chain.push(proto);
            proto = Object.getPrototypeOf(proto);
        }

        for (let i = chain.length - 1; i >= 0; i--) {
            Object.assign(result, chain[i]);
        }
        return result;
    }

    protected isPlainObject(value: any): boolean
    {
        return typeof value === 'object' && value !== null && !Array.isArray(value);
    }
}
