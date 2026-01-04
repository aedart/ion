import type { StyleOptions } from '../types';

/**
 * Style
 * 
 * An output formatting "style".
 * This component is an adaptation of Symfony Console's `OutputFormatterStyleInterface` - Copyright Fabien Potencier
 * 2004-present, MIT License.
 *
 * @see https://github.com/symfony/console/blob/7.1/Formatter/OutputFormatterStyleInterface.php
 */
export default interface Style
{
    /**
     * Apply this formatting style to given text.
     * 
     * @param {string} text
     * @param {StyleOptions} [options] Defaults to empty object when none given.
     * 
     * @return {string}
     */
    apply(text: string, options?: StyleOptions): string;
}