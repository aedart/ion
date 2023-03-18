/**
 * A "dummy" logger
 */
export default class DummyLogger
{
    /**
     * Log entries
     * @type {string[]}
     */
    static entries: string[] = [];

    /**
     * Log an entry...
     *
     * @param {any} args
     */
    static log(...args: any): void
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
