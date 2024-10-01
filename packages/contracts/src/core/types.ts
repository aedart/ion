import Application from "./Application";
import Configurator from './configuration/Configurator';

/**
 * Callback that is provided with a "default" [Application Configurator]{@link Configurator}.
 */
export type ConfiguratorCallback = (configurator: Configurator) => Configurator;

/**
 * Callback used to detect the application's current environment.
 */
export type DetectEnvironmentCallback = (app: Application) => string;

/**
 * Callback to be invoked before or after the application has
 * been booted.
 */
export type BootCallback = (app: Application) => void;

/**
 * Callback to be invoked when the application is terminating.
 */
export type TerminationCallback = (app: Application) => Promise<boolean>;

/**
 * Callback to be invoked just before the application is destroyed.
 */
export type DestroyCallback = (app: Application) => void;