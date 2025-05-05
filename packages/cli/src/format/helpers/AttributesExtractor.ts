/**
 * Attributes Extractor Helper
 */
export default class AttributesExtractor
{
    /**
     * Regex that extracts attributes and values from a DOM Element string
     * 
     * @type {RegExp}
     * 
     * @protected
     */
    protected static regex: RegExp = /\s+(?<attribute>[a-zA-Z0-9_-]+)(?:\s*=\s*(?:"(?<value_a>[^"]*)"|'(?<value_b>[^']*)'|(?<value_c>[^><"'\s]+)))?(?=(?:\s+\w+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\/>]|[^><"'\s]+))?)*\s*?\s*>)/dmig;

    /**
     * Extract attributes from given DOM Element string
     * 
     * @param {string} element E.g. <my_element highlight="#FF8811">
     * 
     * @return {Record<string, string | number | boolean>} Record with key-value pairs, where property keys are
     *                                                     the extracted attribute names.
     */
    public static extract(element: string): Record<string, string | number | boolean>
    {
        const output: Record<string, string | number | boolean> = {};

        const matches: RegExpStringIterator<RegExpExecArray> = element.matchAll(this.regex);
        
        for (const match of matches) {
            const attr: string | undefined = match.groups?.attribute;
            if (attr === undefined) {
                continue;
            }
            
            // By default, we assume that the attribute is of a boolean type.
            // E.g. <my_element highlight>, where the attribute "highlight" does
            // not have a value specified.
            let value: string | number | boolean = true;

            // But, if the attribute does have a value, then we extract it.
            // E.g. <my_element highlight="#FF8811">...
            if(match.groups?.value_a) {
                value = match.groups.value_a;
            } else if(match.groups?.value_b) {
                value = match.groups.value_b;
            } else if(match.groups?.value_c) {
                value = match.groups.value_c;
            }

            output[attr] = value;
        }
        
        return output;
    }
}