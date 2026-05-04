import InvalidConcernException from './InvalidConcernException.js';

/**
 * Already Applied Exception
 */
export default interface AlreadyAppliedException extends InvalidConcernException
{
    readonly name: 'AlreadyAppliedException';
    
    /**
     * The target class where the conflict occurred
     */
    readonly target: object;
}
