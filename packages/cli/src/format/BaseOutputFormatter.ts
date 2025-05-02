import type { OutputFormatter, Style } from "@aedart/contracts/cli";
import { AbstractClassError } from "@aedart/support/exceptions";

/**
 * Base Output Formatter
 *
 * This component is an adaptation of Symfony Console's `OutputFormatter` - Copyright Fabien Potencier
 * 2004-present, MIT License.
 *
 * @see https://github.com/symfony/console/blob/7.2/Formatter/OutputFormatter.php
 * @see {import('@aedart/contracts/cli').OutputFormatter}
 * 
 * @abstract
 */
export default abstract class BaseOutputFormatter implements OutputFormatter
{
    /**
     * Map of all the styles available in this formatter
     * 
     * @type {Map<string, Style>}
     * 
     * @protected
     */
    protected styles: Map<string, Style>;

    /**
     * The decoration state of this formatter
     * 
     * @type {boolean}
     * 
     * @protected
     */
    protected decorated: boolean = false;

    /**
     * Create a new Output Formatter instance
     * 
     * @param {Record<string, Style>} [styles]
     * @param {boolean} [decorated]
     * 
     * @throws {AbstractClassError}
     */
    public constructor(styles: Record<string, Style> = {}, decorated: boolean = false)
    {
        if (new.target === BaseOutputFormatter) {
            throw new AbstractClassError(BaseOutputFormatter);
        }
        
        this.styles = new Map();
        this
            .setDecorated(decorated)
            .setStylesFromRecord(styles);
    }

    /**
     * Format given message according to given styles
     *
     * @param {string} [message]
     *
     * @return {string | undefined}
     */
    public format(message?: string): string|undefined
    {
        // TODO: ... Hmmm... a general <tag>xyz</[tag]> parser, able to handle nested tags.
        // TODO: This will / SHOULD be similar to what Symfony does,...
        
        // TODO: Possible regex for matching "open tags": <([a-z]+)(?![^>]*\/>)[^>]*>
        
        /* TODO: Experiment: ... use https://jsfiddle.net/ (browser), https://www.jdoodle.com/execute-nodejs-online (nodes JS) and https://regex101.com/
        // TODO: EXPERIMENT RESULT: This appears to be doable. But, perhaps this should be extracted into its own class.    
const text = '<warning my-attr="attributes-ignored-in-this-version" italic>This is a <strong bg="#FFbb45" fg=red style=\'underline\'>test</strong> \\<ignore>that should work</ignore>! Some tags should <self-closing /> <other><b>NOT</b> be selected.</>';

let output = text;

const regex = /(?<open_token>\\<|<)(?<name>[a-z]+)(?![^>]*\/>)[^>]*>/dimg;
// const regex = /(?<open_token>[\\]{2}<|<)(?<name>[a-z]+)(?![^>]*\/>)[^>]*>/dimg; // ALTERNATIVE... that SHOULD work, but unclear why not...

const attributtesRegex = /\s+(?<attribute>[a-zA-Z0-9_-]+)(?:\s*=\s*(?:"(?<value_a>[^"]*)"|'(?<value_b>[^']*)'|(?<value_c>[^><"'\s]+)))?(?=(?:\s+\w+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\/>]|[^><"'\s]+))?)*\s*?\s*>)/dmig;

const matches = text.matchAll(regex);
for (const match of matches) {
  
  // Skip if starts with...
  if (match[1].startsWith('\\<')) {
    console.log('Skipping:', match[0]);
    continue;
  }
  
  const openTagEndPos = match.index + match[0].length;
  const textWithoutOpenTag = text.substring(openTagEndPos);
  
  let closeTag = `</${match[2]}>`; // E.g. </warning>
  
  // Determine if close tag exists in the output text
  // if(!text.includes(closeTag)) {
  //   closeTag = '</>';
  // }
    if(!output.includes(closeTag)) {
    closeTag = '</>';
  }
  
  let closeTagPosition = text.indexOf(closeTag);
  if(closeTagPosition === -1) {
    console.log('Skipping:', match[0], 'no close tag found');
    continue;
  }
  
  const textWithoutOpenCloseTags = text.substring(openTagEndPos, closeTagPosition);
  const replaceTarget = text.substring(match.index, closeTagPosition + closeTag.length);
  
  // ATTRIBUTES
  const attrMatches = match[0].matchAll(attributtesRegex);
  const attributes = {};
  for (const attrMatch of attrMatches) {
    const attr = attrMatch.groups.attribute;
    let attrValue = true;
    
    if(attrMatch.groups?.value_a) {
      attrValue = attrMatch.groups.value_a;
    } else if(attrMatch.groups?.value_b) {
      attrValue = attrMatch.groups.value_b;
    } else if(attrMatch.groups?.value_c) {
      attrValue = attrMatch.groups.value_c;
    }
    
    attributes[attr] = attrValue;
  }

  // ATTRIBUTES-END
  
  console.log({
  	full: match[0],
    open: match[1],
    close: closeTag,
    name: match[2],
    index: match.index,
    input: match.input,
    groups: match.groups, // works
    indices: match.indices,
    attributes: attributes,
    text_without_open_tag: textWithoutOpenTag,
    text_without_open_close_tags: textWithoutOpenCloseTags,
    replace_target: replaceTarget
  });
  
  // This is where a callback for handling a "tag" and "style" could be placed...
  // The "replace target" can be formatted or styled with whatever is needed...
  switch(match[2]) {
    
    case 'warning':
      output = output.replace(replaceTarget, 'WARNING: ' + textWithoutOpenCloseTags);
      break;
    
    case 'strong':
    case 'b':
      output = output.replace(replaceTarget, textWithoutOpenCloseTags.toUpperCase());
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

console.log('Final output:', output);
        * */
        
        return undefined;
    }

    /**
     * Set a new style
     *
     * @param {string} name
     * @param {Style} style
     *
     * @return {this}
     */
    public setStyle(name: string, style: Style): this
    {
        this.styles.set(name, style);
        
        return this;
    }

    /**
     * Determine if style exists
     *
     * @param {string} name
     *
     * @return {boolean}
     */
    public hasStyle(name: string): boolean
    {
        return this.styles.has(name);
    }

    /**
     * Returns the style that matches given name
     * 
     * @param {string} name
     *
     * @return {Style}
     *
     * @throws {TypeError} If not style exists for given name
     */
    public getStyle(name: string): Style
    {
        if (!this.hasStyle(name)) {
            throw new TypeError(`Undefined style: "${name}"`);
        }

        return this.styles.get(name) as Style;
    }

    /**
     * Set the decoration state of this formatter
     *
     * @param {boolean} state True if messages must be decorated / formatted,
     *                        false otherwise.
     *
     * @return {this}
     */
    public setDecorated(state: boolean): this
    {
        this.decorated = state;
        
        return this;
    }

    /**
     * Determine if output must be decorated by formatter or not
     *
     * @see {setDecorated}
     *
     * @return {boolean}
     */
    public isDecorated(): boolean
    {
        return this.decorated;
    }

    /**
     * Set multiple styles from given object
     *
     * @see {setStyle}
     *
     * @param {Record<string, Style>} styles
     *
     * @return {this}
     *
     * @protected
     */
    protected setStylesFromRecord(styles: Record<string, Style>): this
    {
        for (const [ name, style ] of Object.entries(styles)) {
            this.setStyle(name, style);
        }

        return this;
    }
}