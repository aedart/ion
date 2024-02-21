import type {MergeCallback, MergeOptions} from "@aedart/contracts/support/objects";

/**
 * Objects Merger
 *
 * Able to merge (deep merge) multiple source objects into a single new object.
 */
export default interface ObjectsMerger
{
    /**
     * Use the following merge options or merge callback
     *
     * @param {MergeCallback | MergeOptions} [options] Merge callback or merge options.
     *
     * @return {this}
     *
     * @throws {MergeException}
     */
    using(options?: MergeCallback | MergeOptions): this;

    /**
     * Returns a merger of given source objects
     *
     * **Note**: _This method is responsible for returning [deep copy]{@link https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy}
     * of all given sources._
     *
     * @param {object} a
     *
     * @returns {object}
     *
     * @throws {MergeException}
     */
    of<
        SourceA extends object
    >(a: SourceA): SourceA;
    
    /**
     * Returns a merger of given source objects
     *
     * **Note**: _This method is responsible for returning [deep copy]{@link https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy}
     * of all given sources._
     *
     * @param {object} a
     * @param {object} b
     *
     * @returns {object}
     *
     * @throws {MergeException}
     */
    of<
        SourceA extends object,
        SourceB extends object,
    >(a: SourceA, b: SourceB): SourceA & SourceB;

    /**
     * Returns a merger of given source objects
     *
     * **Note**: _This method is responsible for returning [deep copy]{@link https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy}
     * of all given sources._
     *
     * @param {object} a
     * @param {object} b
     * @param {object} c
     *
     * @returns {object}
     *
     * @throws {MergeException}
     */
    of<
        SourceA extends object,
        SourceB extends object,
        SourceC extends object,
    >(a: SourceA, b: SourceB, c: SourceC): SourceA & SourceB & SourceC;

    /**
     * Returns a merger of given source objects
     *
     * **Note**: _This method is responsible for returning [deep copy]{@link https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy}
     * of all given sources._
     *
     * @param {object} a
     * @param {object} b
     * @param {object} c
     * @param {object} d
     *
     * @returns {object}
     *
     * @throws {MergeException}
     */
    of<
        SourceA extends object,
        SourceB extends object,
        SourceC extends object,
        SourceD extends object,
    >(a: SourceA, b: SourceB, c: SourceC, d: SourceD): SourceA & SourceB & SourceC & SourceD;

    /**
     * Returns a merger of given source objects
     *
     * **Note**: _This method is responsible for returning [deep copy]{@link https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy}
     * of all given sources._
     *
     * @param {object} a
     * @param {object} b
     * @param {object} c
     * @param {object} d
     * @param {object} e
     *
     * @returns {object}
     *
     * @throws {MergeException}
     */
    of<
        SourceA extends object,
        SourceB extends object,
        SourceC extends object,
        SourceD extends object,
        SourceE extends object,
    >(a: SourceA, b: SourceB, c: SourceC, d: SourceD, e: SourceE): SourceA & SourceB & SourceC & SourceD & SourceE;

    /**
     * Returns a merger of given source objects
     *
     * **Note**: _This method is responsible for returning [deep copy]{@link https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy}
     * of all given sources._
     *
     * @param {object} a
     * @param {object} b
     * @param {object} c
     * @param {object} d
     * @param {object} e
     * @param {object} f
     *
     * @returns {object}
     *
     * @throws {MergeException}
     */
    of<
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
     * **Note**: _This method is responsible for returning [deep copy]{@link https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy}
     * of all given sources._
     *
     * @param {object[]} sources
     *
     * @returns {object}
     *
     * @throws {MergeException}
     */
    of(...sources: object[]): object;
}