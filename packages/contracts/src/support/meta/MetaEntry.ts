import {Key} from "@aedart/contracts/support";

/**
 * Meta Entry
 */
export default interface MetaEntry
{
    /**
     * Key or path identifier
     */
    key: Key,

    /**
     * Value to store
     */
    value: unknown
}