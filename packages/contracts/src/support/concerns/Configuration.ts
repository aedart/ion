import Concern from "./Concern";
import type {
    Aliases 
} from "./types";

/**
 * Concern Configuration
 * 
 * Defines the Concern class that must be injected into a target class,
 * along with what aliases to be created in the target class.
 */
export default interface Configuration<T extends Concern>
{
    /**
     * The target Concern Class this configuration is for
     */
    concern: T;

    /**
     * Aliases for Concern's properties or methods.
     */
    aliases?: Aliases<T>
}