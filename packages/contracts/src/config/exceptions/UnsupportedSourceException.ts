import ResolveException from './ResolveException';

/**
 * Unsupported Configuration Source Exception
 * 
 * To be thrown whenever a [Resolver]{@link import('@aedart/contracts/config').Resolver} is unable to
 * resolve configuration items, due to an unsupported [source]{@link import('@aedart/contracts/config').Source}.
 */
export default interface UnsupportedSourceException extends ResolveException
{}