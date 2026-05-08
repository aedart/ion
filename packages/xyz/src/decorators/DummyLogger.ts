/**
 * A "dummy" logger
 */
export default class DummyLogger
{
    /**
     * Log entries
     * @type {unknown[]}
     */
    static entries: unknown[] = [];

    /**
     * Log an entry...
     *
     * @param {...unknown[]} args
     */
    static log(...args: unknown[]): void
    {
        this.entries.push(args);
    }

    /**
     * Clear all entries
     */
    static clear(): void
    {
        this.entries = [];
    }
}
