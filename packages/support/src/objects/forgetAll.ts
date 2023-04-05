import {forget} from "./forget";
import {PropertyPath} from "lodash";

/**
 * Remove all values in object that match given paths
 *
 * @typedef {import('lodash').PropertyPath} PropertyPath
 * @template T
 *
 * @param {T} object Target object
 * @param {PropertyPath[]} paths List of property paths
 */
export function forgetAll<T>(object: T, paths: PropertyPath[]): void
{
    for (const path of paths) {
        forget(object, path);
    }
}