import Person, { Someone } from "./Person";

/**
 * Something to export...
 */
export type Something = string;

/**
 * A sweet message...
 */
export const Sweet: Something = 'Something';

export {
    Someone,
    Person as default
}
