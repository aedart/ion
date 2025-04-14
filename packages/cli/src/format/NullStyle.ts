import type { Style } from "@aedart/contracts/cli";

/**
 * Null Output Style
 * 
 * This component is an adaptation of Symfony Console's `NullOutputFormatterStyle` - Copyright Fabien Potencier
 * 2004-present, MIT License.
 *
 * @see https://github.com/symfony/console/blob/7.2/Formatter/NullOutputFormatterStyle.php
 */
export default class NullStyle implements Style
{
    /**
     * Apply this formatting style to given text.
     *
     * @param {string} text
     *
     * @return {string}
     */
    public apply(text: string): string
    {
        return text;
    }
}
