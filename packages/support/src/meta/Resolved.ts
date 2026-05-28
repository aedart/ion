import { type Key } from '@aedart/contracts/support';

/**
 * Resolved target and key
 *
 * @internal
 */
export default interface Resolved {
    /**
     * The resolved target
     */
    resolvedTarget: object;

    /**
     * The resolved
     */
    resolvedKey: Key;
}
