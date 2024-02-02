import type { MetadataRecord } from "./types";

/**
 * @deprecated Replaced by {@link DecoratorMetadata}
 * 
 * Metadata Context
 * 
 * @see https://github.com/tc39/proposal-decorator-metadata
 */
export default interface MetadataContext
{
    /**
     * Contains arbitrary information
     */
    metadata?: MetadataRecord;
}