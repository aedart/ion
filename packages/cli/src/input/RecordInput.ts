import type { Definition } from "@aedart/contracts/cli";
import MapInput from "./MapInput"

/**
 * Record Input
 * 
 * Cli input represented as a "record" - an object that contains keys and values.
 * 
 * @see {MapInput}
 */
export default class RecordInput extends MapInput
{
    /**
     * Create new instance of "record" input
     * 
     * @param {Record<string, string | number | boolean | (string | number | boolean)[] | null>} record
     * @param {Definition} [definition]
     */
    public constructor(
        record: Record<string, string | number | boolean | (string|number|boolean)[] | null>,
        definition?: Definition
    ) {
        super(
            new Map(Object.entries(record)),
            definition
        );
    }
}