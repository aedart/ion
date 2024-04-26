import Application from "./Application";

/**
 * Callback to be invoked before or after the application has
 * been booted.
 */
export type BootCallback = (app: Application) => void;