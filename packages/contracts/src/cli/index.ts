/**
 * Cli identifier
 *
 * @type {Symbol}
 */
export const CLI: unique symbol = Symbol('@aedart/contracts/cli');

import CliApplication from "./CliApplication";
export {
    type CliApplication
}

export * from './format/index';
export * from './input/index';
export * from './types';