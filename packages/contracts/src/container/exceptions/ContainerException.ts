import {Throwable} from "@aedart/contracts/support/exceptions";

/**
 * Container Exception
 * 
 * General exception to be thrown when something went wrong inside
 * a service container. Inspired by Psr's `ContainerExceptionInterface`.
 * 
 * @see https://www.php-fig.org/psr/psr-11/#32-psrcontainercontainerexceptioninterface
 */
export default interface ContainerException extends Throwable {}