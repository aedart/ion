import MetaEntry from './MetaEntry.js';

/**
 * Callback that returns a meta entry object.
 */
export type MetaCallback = (
    target: object,
    context: DecoratorContext,
) => MetaEntry;
