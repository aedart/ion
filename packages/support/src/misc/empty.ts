import { isEmpty } from "lodash-es";

/**
 * Determine if value is empty
 * (Alias for Lodash' {@link import('lodash').isEmpty isEmpty}) method
 *
 * @typedef {import('lodash').EmptyObjectOf} EmptyObjectOf
 * 
 * @type {{<T extends {__trapAny: any}>(value?: T): boolean, (value: string): value is "", (value: (Map<any, any> | Set<any> | List<any> | null | undefined)): boolean, (value: object): boolean, <T extends object>(value: (T | null | undefined)): value is EmptyObjectOf<T> | null | undefined, (value?: any): boolean}}
 */
export const empty = isEmpty;