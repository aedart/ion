import {forget} from "./forget";
import type {Key} from "@aedart/contracts/support";

/**
 * Remove all values in object that match given paths
 *
 * @template T
 *
 * @param {T} object Target object
 * @param {...Key} paths Property path(s)
 */
export function forgetAll<T>(object: T, ...paths: (Key)[]): void
{
    for (const path of paths) {
        forget(object, path);
    }
}