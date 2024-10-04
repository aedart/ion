import LoaderException from "./LoaderException";

/**
 * Unsupported Configuration Source Exception
 * 
 * To be thrown whenever a configuration loader factory is unable to resolve an appropriate
 * configuration loader, for the given [source]{@link import('@aedart/contracts/config').Source}.
 */
export default interface UnsupportedSourceException extends LoaderException
{}