import Container from "./Container";
import { CONCERNS } from "./index";

/**
 * Concerns Owner
 * 
 * An owner is an object, e.g. instance of a class, that offers a concerns {@link Container}.
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