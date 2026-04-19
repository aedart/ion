import { Key } from '@aedart/contracts/support';
import MetaRepository from './MetaRepository.js';

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
    return (target: any, context: DecoratorContext): void => {

        // Debug
        // console.warn('META', context);
        
        const repository = new MetaRepository(
            context.metadata,
            context.kind === 'class' ? undefined : context.name
        );
        repository.set(key, value);

        // Return target explicitly for classes to ensure definition completion
        if (context.kind === 'class') {
            return target;
        }
    };
}
