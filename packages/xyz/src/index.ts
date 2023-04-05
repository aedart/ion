import Person, { Someone } from "./Person";

/**
 * Something to export...
 */
export type Something = string;

/**
 * A sweet message...
 *
 * @type {string}
 */
export const Sweet: Something = 'Something';

export {
    type Someone,
    Person as default
}
