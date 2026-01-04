import { BaseInput } from "@aedart/cli";

/**
 * Dummy Input 
 * 
 * FOR TESTING PURPOSES ONLY
 */
export default class DummyInput extends BaseInput
{
    /**
     * The raw input arguments
     * 
     * @type {Map<string, string | number | boolean | (string|number|boolean)[] | null>}
     * 
     * @protected
     */
    rawArguments;

    /**
     * The raw input options
     *
     * @type {Map<string, string | number | boolean | (string|number|boolean)[] | null>}
     * 
     * @protected
     */
    rawOptions;

    /**
     * Create new instance of "Dummy" Input
     * 
     * @param {Map<string, string | number | boolean | (string|number|boolean)[] | null>} rawArguments
     * @param {Map<string, string | number | boolean | (string|number|boolean)[] | null>} rawOptions
     * @param {Definition} [definition]
     */
    constructor(rawArguments, rawOptions, definition)
    {
        super(definition);
        
        this.rawArguments = rawArguments;
        this.rawOptions = rawOptions;
    }

    /**
     * @inheritDoc
     */
    parse() {
        this.rawArguments.forEach((value, name) => {
            this.setArgument(name, value);
        });

        this.rawOptions.forEach((value, name) => {
            this.setOption(name, value);
        });
    }
}