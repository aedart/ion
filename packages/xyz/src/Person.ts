/**
 * Someone...
 */
export interface Someone {

    /**
     * Returns a message
     */
    message(): string;

}

/**
 * A person
 */
export default class Person implements Person
{
    message(): string {
        return 'hi...';
    }
}
