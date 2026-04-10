import type { ConstructorLike } from '@aedart/contracts';
import { descTag } from '../misc/descTag.js';
import { getConstructorName } from './getConstructorName.js';

/**
 * Return target class' constructor name or default to target's description tag if unavailable
 *
 * @see getConstructorName
 * @see descTag
 *
 * @param {ConstructorLike} target
 *
 * @return {string}
 */
export function getNameOrDesc(target: ConstructorLike): string
{
    const name: string | null = getConstructorName(target);

    if (name !== null) {
        return name;
    }

    return descTag(target);
}
