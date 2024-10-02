/**
 * Returns a merger of given source objects
 *
 * **Caution**: _Method performs a [shallow copy](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy)
 * of given source objects!_
 * 
 * @template SourceA extends object
 * 
 * @param {SourceA} a
 * 
 * @return {SourceA} New object
 */
export function shallowMerge<
    SourceA extends object
>(a: SourceA): SourceA;

/**
 * Returns a merger of given source objects
 *
 * **Caution**: _Method performs a [shallow copy](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy)
 * of given source objects!_
 *
 * @template SourceA extends object
 * @template SourceB extends object
 *
 * @param {SourceA} a
 * @param {SourceB} b
 *
 * @return {SourceA & SourceB} New object
 */
export function shallowMerge<
    SourceA extends object,
    SourceB extends object,
>(a: SourceA, b: SourceB): SourceA & SourceB;

/**
 * Returns a merger of given source objects
 *
 * **Caution**: _Method performs a [shallow copy](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy)
 * of given source objects!_
 *
 * @template SourceA extends object
 * @template SourceB extends object
 * @template SourceC extends object
 *
 * @param {SourceA} a
 * @param {SourceB} b
 * @param {SourceC} c
 *
 * @return {SourceA & SourceB & SourceC} New object
 */
export function shallowMerge<
    SourceA extends object,
    SourceB extends object,
    SourceC extends object,
>(a: SourceA, b: SourceB, c: SourceC): SourceA & SourceB & SourceC;

/**
 * Returns a merger of given source objects
 *
 * **Caution**: _Method performs a [shallow copy](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy)
 * of given source objects!_
 *
 * @template SourceA extends object
 * @template SourceB extends object
 * @template SourceC extends object
 * @template SourceD extends object
 *
 * @param {SourceA} a
 * @param {SourceB} b
 * @param {SourceC} c
 * @param {SourceD} d
 *
 * @return {SourceA & SourceB & SourceC & SourceD} New object
 */
export function shallowMerge<
    SourceA extends object,
    SourceB extends object,
    SourceC extends object,
    SourceD extends object,
>(a: SourceA, b: SourceB, c: SourceC, d: SourceD): SourceA & SourceB & SourceC & SourceD;

/**
 * Returns a merger of given source objects
 *
 * **Caution**: _Method performs a [shallow copy](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy)
 * of given source objects!_
 *
 * @template SourceA extends object
 * @template SourceB extends object
 * @template SourceC extends object
 * @template SourceD extends object
 * @template SourceE extends object
 *
 * @param {SourceA} a
 * @param {SourceB} b
 * @param {SourceC} c
 * @param {SourceD} d
 * @param {SourceE} e
 *
 * @return {SourceA & SourceB & SourceC & SourceD & SourceE} New object
 */
export function shallowMerge<
    SourceA extends object,
    SourceB extends object,
    SourceC extends object,
    SourceD extends object,
    SourceE extends object,
>(a: SourceA, b: SourceB, c: SourceC, d: SourceD, e: SourceE): SourceA & SourceB & SourceC & SourceD & SourceE;

/**
 * Returns a merger of given source objects
 *
 * **Caution**: _Method performs a [shallow copy](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy)
 * of given source objects!_
 *
 * @template SourceA extends object
 * @template SourceB extends object
 * @template SourceC extends object
 * @template SourceD extends object
 * @template SourceE extends object
 * @template SourceF extends object
 *
 * @param {SourceA} a
 * @param {SourceB} b
 * @param {SourceC} c
 * @param {SourceD} d
 * @param {SourceE} e
 * @param {SourceF} f
 *
 * @return {SourceA & SourceB & SourceC & SourceD & SourceE & SourceF} New object
 */
export function shallowMerge<
    SourceA extends object,
    SourceB extends object,
    SourceC extends object,
    SourceD extends object,
    SourceE extends object,
    SourceF extends object,
>(a: SourceA, b: SourceB, c: SourceC, d: SourceD, e: SourceE, f: SourceF): SourceA & SourceB & SourceC & SourceD & SourceE & SourceF;

/**
 * Returns a merger of given source objects
 * 
 * **Caution**: _Method performs a [shallow copy](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy)
 * of given source objects!_
 * 
 * @param {...object} sources
 * 
 * @return {object} New object
 */
export function shallowMerge(...sources: object[])
{
    return Object.assign(Object.create(null), ...sources);
}