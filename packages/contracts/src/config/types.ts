import { ModuleName } from "@aedart/contracts";
import Loader from "./loaders/Loader";
import LoaderConstructor from "./loaders/LoaderConstructor";

/**
 * A key-value store containing configuration items for an application, its service, and or component.
 */
export type Items = Record<PropertyKey, any>; /* eslint-disable-line @typescript-eslint/no-explicit-any */

/**
 * Path ([module-name]{@link ModuleName}) from where to load configuration {@link Items}. 
 */
export type Path = ModuleName;

/**
 * Callback that is responsible for loading configuration {@link Items}.
 */
export type LoaderCallback = () => Promise<Items>;

/**
 * A source that ultimately must resolve into configuration {@link Items}.
 */
export type Source = Items | Path | Loader | LoaderConstructor | LoaderCallback;