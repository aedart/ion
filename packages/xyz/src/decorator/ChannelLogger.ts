/**
 * Channel Logger
 * 
 * FOR TESTING PURPOSES ONLY
 */
export default class ChannelLogger
{
    /**
     * Channels
     * 
     * @type {Map<string| symbol, unknown[]>}
     */
    static channels: Map<string| symbol, unknown[]> = new Map<string, unknown[]>();

    /**
     * Log messages to a specific channel
     * 
     * @param {string} channel
     * @param {...any} args
     */
    static log(channel: string| symbol, ...args: any): void
    {
        let existing = ChannelLogger.channels.get(channel) ?? [];
        existing.push(args);

        ChannelLogger.channels.set(channel, existing);
    }

    /**
     * Get all entries for given channel
     * 
     * @param {string | symbol} channel
     * 
     * @returns {any[]}
     */
    static entries(channel: string | symbol): any[]
    {
        return ChannelLogger.channels.get(channel) ?? [];
    }
    
    /**
     * Clear messages for given channel
     * 
     * @param {string} channel
     */
    static clear(channel: string| symbol): void
    {
        if (ChannelLogger.channels.has(channel)) {
            ChannelLogger.channels.delete(channel);
        }
    }

    /**
     * Clear all channels
     */
    static clearAll(): void
    {
        ChannelLogger.channels.clear();
    }
}