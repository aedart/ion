import type { Repository as RepositoryContract } from "@aedart/contracts/support/env";
import WriteError from "../exceptions/WriteError";

/**
 * Readonly Environment Variables Repository Adaptor
 */
export default class ReadonlyAdaptor implements RepositoryContract
{
    /**
     * Environment Variables Repository
     * 
     * @type {import('@aedart/contracts/support/env').Repository}
     * 
     * @private
     * @readonly
     */
    readonly #repository: RepositoryContract;
    
    /**
     * Create a new Adaptor instance
     *
     * @param {import('@aedart/contracts/support/env').Repository} repository
     */
    public constructor(repository: RepositoryContract)
    {
        this.#repository = repository;
    }

    /**
     * Set value for an environment variable
     *
     * @param {PropertyKey} key
     * @param {any} value
     *
     * @return {this}
     * 
     * @throws {WriteError}
     */
    set(key: PropertyKey, value: any): this /* eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
    {
        throw new WriteError(`Unable to write "${key.toString()}", env repository is readonly`);
    }

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
    public get<T, D = undefined>(key: PropertyKey, defaultValue?: D): T | D
    {
        return this.#repository.get(key, defaultValue);
    }

    /**
     * Determine if environment variable has been defined
     *
     * @param {PropertyKey} key
     *
     * @return {boolean}
     */
    public has(key: PropertyKey): boolean
    {
        return this.#repository.has(key);
    }

    /**
     * Delete environment variable
     *
     * @param {PropertyKey} key
     *
     * @return {boolean}
     *
     * @throws {WriteError}
     */
    public forget(key: PropertyKey): boolean
    {
        throw new WriteError(`Unable to delete "${key.toString()}", env repository is readonly`);
    }
}