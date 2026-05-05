import type { Wildcard } from '../types.js';

/**
 * Allowed property keys
 */
export type AllowedKeys =
    | PropertyKey
    | PropertyKey[]
    | Wildcard
    | AllowedKeysCallback;

/**
 * Callback that returns a list of properties that are "allowed" to be processed.
 * The callback is given a target and a source object, which can be used to
 * produce complex selection of properties logic, if needed.
 */
export type AllowedKeysCallback<
    TargetObj extends object = object,
    SourceObj extends object = object,
> = (target: TargetObj, source: SourceObj) => PropertyKey[];
