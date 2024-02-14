import Container from "./Container";
import { CONCERNS } from "./index";

/**
 * Concerns Owner
 */
export default interface Owner
{
    /**
     * Get the concerns container for this class
     * 
     * @type {Container}
     */
    readonly [CONCERNS](): Container;
}