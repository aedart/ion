import { Key } from '@aedart/contracts/support';
import { MetaContext } from '@aedart/contracts/support/meta';
import MetaRepository from './MetaRepository.js';

/**
 * Associate metadata with the target class or member
 *
 * @param {Key} key
 * @param {any} value
 *
 * @returns {(target: any, context: MetaContext) => void}
 */
export function meta(key: Key, value: any)
{
    return (target: any, context: MetaContext): void => {
        // 1. Obtain the metadata shelf from context
        const shelf = context.metadata;

        // 2. Wrap the shelf in a repository for path-aware operations
        const repository = new MetaRepository(shelf);

        // 3. Persist the metadata
        repository.set(key, value);
    };
}
