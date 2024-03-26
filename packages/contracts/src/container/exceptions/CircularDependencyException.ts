import type ContainerException from "./ContainerException";

/**
 * Circular Dependency Exception
 * 
 * To be thrown in situations when a binding has a circular dependency.
 */
export default interface CircularDependencyException extends ContainerException {}