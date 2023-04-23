import {Key} from "@aedart/contracts/support";

/**
 * Meta Entry
 */
export default interface MetaEntry
{
    /**
     * Key or path identifier
     * 
     * @type {Key}
     */
    key: Key,

    /**
     * Value to store
     * 
     * @type {unknown}
     */
    value: unknown
}