import { METADATA } from '@aedart/contracts/support/meta';

/**
 * Polyfill for Stage 3 Decorator Metadata
 *
 * Required for Node 24 / TS 6.0 until Symbol.metadata is natively available
 * in the global scope.
 */
if (typeof Symbol.metadata === 'undefined') {
    (Symbol as any).metadata = METADATA;
}

import MetaRepository from './MetaRepository.js';
export { MetaRepository };

export * from './meta.js';
