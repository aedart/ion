import ContainerException from "./ContainerException";

/**
 * Not Found Exception
 * 
 * To be thrown when no entry was found for a given binding identifier.
 * Inspired by Psr's `NotFoundExceptionInterface`.
 * 
 * @see https://www.php-fig.org/psr/psr-11/#33-psrcontainernotfoundexceptioninterface
 */
export default interface NotFoundException extends ContainerException {}