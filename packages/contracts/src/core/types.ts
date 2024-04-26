import Application from "./Application";

/**
 * Callback to be invoked before or after the application has
 * been booted.
 */
export type BootCallback = (app: Application) => void;

/**
 * Callback to be invoked when the application is terminating.
 */
export type TerminationCallback = (app: Application) => void;