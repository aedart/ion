/**
 * Metadata Context
 * 
 * @see https://github.com/tc39/proposal-decorator-metadata
 */
export default interface MetadataContext {
    
    /**
     * Contains arbitrary information
     */
    metadata?: Record<string | number | symbol, unknown>;
}