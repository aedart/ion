import {Key} from '@aedart/contracts/support';
import {set} from '../objects/set';

/**
 * Associate metadata with the target class or member
 *
 * @param {Key} key
 * @param {any} value
 *
 * @returns {(target: any, context: DecoratorContext) => void}
 */
export function meta(key: Key, value: any)
{
    // Use 'any' for target to support both Class and Members
    return (target: any, context: DecoratorContext): void =>
    {
        const metadata = context.metadata as Record<PropertyKey, any>;
        const toParts = (k: Key): string[] => Array.isArray(k) ? k.map(String) : String(k).split('.');

        let current: any;
        if (context.kind === 'class') {
            current = metadata;
        } else {
            const name = context.name;
            // Branch namespace: Since context.metadata might be shared across classes,
            // we MUST use Object.hasOwn to check if we already branched this member.
            if (!Object.hasOwn(metadata, name)) {
                metadata[name] = metadata[name] !== undefined
                    ? Object.create(metadata[name])
                    : {};
            }
            current = metadata[name];
        }

        const parts = toParts(key);
        const last = parts.pop()!;

        for (const part of parts) {
            if (!Object.hasOwn(current, part)) {
                const existing = current[part];
                current[part] = Array.isArray(existing) ? [...(existing ?? [])] : { ...(existing ?? {}) };
            }
            current = current[part];
        }

        current[last] = value;

        // Return target for classes to satisfy spec requirements
        if (context.kind === 'class') {
            return target;
        }
    };
}
