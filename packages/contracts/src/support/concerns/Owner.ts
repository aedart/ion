import Container from "./Container";
import { CONCERNS } from "./index";

/**
 * Concerns Owner
 */
export default interface Owner
{
    /**
     * The concerns container for this class
     * 
     * @readonly
     * 
     * @type {Container}
     */
    readonly [CONCERNS]: Container;
}