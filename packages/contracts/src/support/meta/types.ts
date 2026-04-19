/**
 * A record representing the raw metadata "shelf" provided by the JS engine.
 */
export type MetadataRecord = Record<PropertyKey, any>;

/**
 * Defines the target of a metadata association.
 */
export type MetaTarget = object | Function;
