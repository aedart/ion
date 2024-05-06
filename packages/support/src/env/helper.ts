import { default as Repo } from "./Env";

/**
 * Get value of an environment variable
 *
 * @template T
 * @template D=undefined
 * 
 * @param {PropertyKey} key
 * @param {D} [defaultValue]
 * 
 * @return {T | D}
 */
export function env<T, D = undefined>(key: PropertyKey, defaultValue?: D): T | D
{
    return Repo.get<T, D>(key, defaultValue);
}