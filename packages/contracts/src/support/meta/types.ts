import type { Key } from "@aedart/contracts/support";
import MetaEntry from "./MetaEntry";

/**
 * Decorator context types for any decorator
 */
export type Context = DecoratorContext;

/**
 * Callback that returns a meta entry object.
 */
export type MetaCallback = (target: object, context: Context, owner: object) => MetaEntry;

/**
 * Metadata Record
 */
export type MetadataRecord = DecoratorMetadata;

/**
 * Reference to the owner object that contains metadata 
 */
export type MetaOwnerReference = WeakRef<object>;

/**
 * Initializer callback
 * 
 * @see ClassDecoratorContext.addInitializer
 */
export type InitializerCallback = (
    this: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
) => void;

/**
 * A location (key or path) to a metadata entry, in a given owner object 
 */
export type MetaAddress = [
    MetaOwnerReference,
    Key
];