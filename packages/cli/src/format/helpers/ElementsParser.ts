import AttributesExtractor from "./AttributesExtractor";

/**
 * Elements Parser
 * 
 * Able to parse DOM-like elements and replace them with
 * formatted content.
 * 
 * This helper is heavily inspired by Symfony's `formatAndWrap` method,
 * in the `OutputFormatter` component - - Copyright Fabien Potencier
 * 2004-present, MIT License.
 *
 * @see https://github.com/symfony/console/blob/7.1/Formatter/OutputFormatter.php#L120C21-L120C34
 */
export default class ElementsParser
{
    /**
     * Regex to extract DOM-like elements
     * 
     * @type {RegExp}
     * 
     * @protected
     */
    protected static regex: RegExp = /(?<open_token>\\<|<)(?<name>[a-z]+)(?![^>]*\/>)[^>]*>/dimg; 
    
    public static parse(text: string): string
    {
        let output = text;
        
        const matches: RegExpStringIterator<RegExpExecArray> = text.matchAll(this.regex);
        
        for (const match of matches) {

            // Skip if starts with escaped open tag symbol.
            if (match[1].startsWith('\\<')) {
                // Debug
                //console.log('Skipping:', match[0]);
                continue;
            }

            const openTagEndPos = match.index + match[0].length;
            const textWithoutOpenTag = text.substring(openTagEndPos);

            // The expected close tag, e.g. </warning> to look for.
            let closeTag = `</${match[2]}>`;

            // If the expected close tag does not exist, then default to a
            // shorthand version of the closing tag.
            if(!output.includes(closeTag)) {
                closeTag = '</>';
            }

            // Skip element, if no closing tag was found in the given text.
            let closeTagPosition = text.indexOf(closeTag);
            if(closeTagPosition === -1) {
                // Debug
                //console.log('Skipping:', match[0], 'no close tag found');
                continue;
            }

            // Extract the content between the open and close tags.
            const textWithoutTags = text.substring(openTagEndPos, closeTagPosition);
            
            // Obtain the content to be replaced (this includes the open and close tags)
            const replaceTarget = text.substring(match.index, closeTagPosition + closeTag.length);

            // Extract eventual attributes from the element.
            const attributes = AttributesExtractor.extract(match[0]);
            
            
            console.log({
                full: match[0],
                open: match[1],
                close: closeTag,
                name: match[2],
                index: match.index,
                input: match.input,
                groups: match.groups,
                indices: match.indices,
                attributes: attributes,
                text_without_open_tag: textWithoutOpenTag,
                text_without_open_close_tags: textWithoutTags,
                replace_target: replaceTarget
            });

            // This is where a callback for handling a "tag" and "style" could be placed...
            // The "replace target" can be formatted or styled with whatever is needed...
            // TODO: Replace this with a callback mechanism...
            switch(match[2]) {

                case 'warning':
                    output = output.replace(replaceTarget, 'WARNING: ' + textWithoutTags);
                    break;

                case 'strong':
                case 'b':
                    output = output.replace(replaceTarget, textWithoutTags.toUpperCase());
                    break;

                // Do nothing, when the tag is unknown...
                default:
                    continue;
            }
        }

        // TODO: Well, this might seem a bit off...
        output = output
            .replace('\0', '\\')
            .replace('\\<', '<')
            //.replace('\<', '<')
            .replace('\\>', '>');
            //.replace('\>', '>');

        // Debug
        //console.log('Final output:', output);
        
        return output;
    }
}