/**
 * Input Option Value Mode
 */
enum ValueMode
{
    /**
     * Option does not allow a value, e.g. --foo. This is the default behaviour.
     * 
     * @type {ValueMode.NONE}
     */
    NONE = 0,

    /**
     * Option requires a value, e.g. --foo=bar or -f=bar.
     * 
     * @type {ValueMode.REQUIRED}
     */
    REQUIRED = 1,

    /**
     * Option might have a value when used, e.g. --foo or --foo=bar.
     * 
     * @type {ValueMode.OPTIONAL}
     */
    OPTIONAL = 2,
}

export default ValueMode;