import { Key } from '@aedart/contracts/support';
import { Repository } from '@aedart/contracts/support/meta';
import { forget, get, has, set } from '../objects/index.js';

/**
 * Metadata Repository
 *
 * @see Repository
 */
export default class MetaRepository implements Repository
{
    // /**
    //  * Create a new Metadata Repository instance
    //  * 
    //  * @param {DecoratorMetadata} shelf the raw context.metadata obejct
    //  * @param {PropertyKey} [targetName] The "target" name of the member (if any)
    //  */
    // constructor(
    //     protected shelf: DecoratorMetadata,
    //     protected targetName?: PropertyKey
    // ) {}
    //
    // /**
    //  * @inheritDoc
    //  */
    // public set(key: Key, value: any): void
    // {
    //     const path = Array.isArray(key) ? key : [key];
    //     let current = this.shelf;
    //
    //     // 1. Isolate 'members' and the member name if applicable
    //     if (this.targetName !== undefined) {
    //         current = this.ensureOwn(current, 'members');
    //         current = this.ensureOwn(current, this.targetName);
    //     }
    //
    //     // 2. Recursively isolate each step of the path
    //     for (let i = 0; i < path.length - 1; i++) {
    //         current = this.ensureOwn(current, path[i]);
    //     }
    //
    //     // 3. Final assignment on the fully isolated leaf parent
    //     // Use a direct assignment here to avoid lodash potentially resetting the path
    //     current[path[path.length - 1]] = value;
    // }
    //
    // /**
    //  * Ensures the property is an "own" property by shallow-copying
    //  * the inherited value if necessary.
    //  */
    // protected ensureOwn(target: any, key: PropertyKey): any
    // {
    //     // If the property is not an 'own' property, shallow copy it from the prototype
    //     if (!Object.prototype.hasOwnProperty.call(target, key)) {
    //         target[key] = (target[key] !== undefined && target[key] !== null)
    //             ? { ...target[key] }
    //             : {};
    //     }
    //     return target[key];
    // }
    //
    // /**
    //  * @inheritDoc
    //  */
    // public get<T>(key: Key, defaultValue?: T): T | undefined
    // {
    //     const path = Array.isArray(key) ? key : [key];
    //     const fullPath = this.targetName !== undefined
    //         ? ['members', this.targetName, ...path]
    //         : path;
    //
    //     return get(this.shelf, fullPath, defaultValue) as T;
    // }
    //
    // /**
    //  * @inheritDoc
    //  */
    // public has(key: Key): boolean
    // {
    //     const fullPath = this.targetName !== undefined
    //         ? ['members', this.targetName, ...(Array.isArray(key) ? key : [key])]
    //         : key;
    //
    //     return has(this.shelf, fullPath);
    // }
    //
    // /**
    //  * @inheritDoc
    //  */
    // public forget(key: Key): boolean
    // {
    //     const path = Array.isArray(key) ? key : [key];
    //     let current = this.shelf;
    //
    //     if (this.targetName !== undefined) {
    //         // We only forget if the path actually exists as an "own" property
    //         if (!Object.prototype.hasOwnProperty.call(this.shelf, 'members')) return false;
    //         current = this.shelf.members as DecoratorMetadataObject;
    //
    //         if (!Object.prototype.hasOwnProperty.call(current, this.targetName)) return false;
    //         current = current[this.targetName as any] as DecoratorMetadataObject;
    //     }
    //
    //     // Navigate to the parent of the leaf we want to forget
    //     for (let i = 0; i < path.length - 1; i++) {
    //         if (!Object.prototype.hasOwnProperty.call(current, path[i])) return false;
    //         current = current[path[i]] as DecoratorMetadataObject;
    //     }
    //
    //     return forget(current, path[path.length - 1]);
    // }
    //
    // /**
    //  * @inheritDoc
    //  */
    // public all(): DecoratorMetadata
    // {
    //     const data = this.targetName
    //         ? get(this.shelf, ['members', this.targetName])
    //         : this.shelf;
    //
    //     return data ? { ...data } : {};
    // }
    //
    // /**
    //  * @inheritdoc
    //  */
    // getShelf(): DecoratorMetadata
    // {
    //     return this.shelf;
    // }

    constructor(
        protected shelf: DecoratorMetadata,
        protected targetName?: PropertyKey
    ) {}

    public set(key: Key, value: any): void
    {
        // Copy-on-write isolation: ensures we don't mutate parent objects
        if (this.targetName !== undefined) {
            this.ensureOwn(this.shelf, 'members');
            this.ensureOwn(this.shelf.members, this.targetName);
        }

        set(this.shelf, this.resolveKey(key), value);
    }

    public get<T>(key: Key, defaultValue?: T): T | undefined
    {
        return get(this.shelf, this.resolveKey(key), defaultValue);
    }

    protected resolveKey(key: Key): Key {
        if (this.targetName === undefined) return key;
        return Array.isArray(key)
            ? ['members', this.targetName, ...key as (PropertyKey)[]]
            : ['members', this.targetName, key as PropertyKey];
    }

    protected ensureOwn(target: any, key: PropertyKey): void {
        if (!Object.prototype.hasOwnProperty.call(target, key)) {
            // Shallow copy to isolate but keep inherited values
            target[key] = target[key] ? { ...target[key] } : {};
        }
    }
    
    public has(key: Key): boolean
    {
        return this.get(key, Symbol.for('not_found')) !== Symbol.for('not_found');
    }

    public forget(key: Key): boolean
    {
        const path = Array.isArray(key) ? key : [key];
        let current = this.shelf;

        if (this.targetName !== undefined) {
            if (!Object.prototype.hasOwnProperty.call(this.shelf, 'members')) return false;
            // @ts-expect-error TODO
            current = this.shelf.members;
            if (!Object.prototype.hasOwnProperty.call(current, this.targetName)) return false;
            // @ts-expect-error TODO
            current = current[this.targetName];
        }

        for (let i = 0; i < path.length - 1; i++) {
            const segment = path[i];
            if (!Object.prototype.hasOwnProperty.call(current, segment)) return false;
            // @ts-expect-error TODO
            current = current[segment];
        }

        const last = path[path.length - 1];
        if (Object.prototype.hasOwnProperty.call(current, last)) {
            delete current[last];
            return true;
        }

        return false;
    }

    public all(): DecoratorMetadata
    {
        const data = this.targetName
            // @ts-expect-error TODO
            ? (this.shelf?.['members']?.[this.targetName])
            : this.shelf;

        return data ? { ...data } : {};
    }

    public getShelf(): DecoratorMetadata
    {
        return this.shelf;
    }
}
