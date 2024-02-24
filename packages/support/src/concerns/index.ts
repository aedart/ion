import {DANGEROUS_PROPERTIES} from "@aedart/contracts/support/objects";
import {
    CONCERN_CLASSES,
    CONCERNS,
    PROVIDES
} from "@aedart/contracts/support/concerns";

/**
 * List of "unsafe" property keys, which should NOT be aliased
 * 
 * @type {PropertyKey[]}
 */
export const UNSAFE_PROPERTY_KEYS: PropertyKey[] = [
    ...DANGEROUS_PROPERTIES,

    // ----------------------------------------------------------------- //
    // Defined by Concern interface / Abstract Concern:
    // ----------------------------------------------------------------- //

    // It is NOT possible, nor advised to attempt to alias a Concern's
    // constructor into a target class.
    'constructor',

    // The concernOwner property (getter) shouldn't be aliased either
    'concernOwner',
    
    // The static properties and methods (just in case...)
    PROVIDES,

    // ----------------------------------------------------------------- //
    // Other properties and methods:
    // ----------------------------------------------------------------- //

    // In case that a concern class uses other concerns, prevent them
    // from being aliased.
    CONCERN_CLASSES,
    CONCERNS,
]

import AbstractConcern from "./AbstractConcern";
import { ConcernClassBlueprint } from "./ConcernClassBlueprint";
import ConcernsContainer from "./ConcernsContainer";
import ConcernsInjector from "./ConcernsInjector";


export {
    AbstractConcern,
    ConcernClassBlueprint,
    ConcernsContainer,
    ConcernsInjector
};

export * from './exceptions';
export * from './isConcernConfiguration';
export * from './isConcernConstructor';
export * from './isUnsafeKey';
export * from './use';