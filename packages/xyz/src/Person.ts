/**
 * Someone...
 */
export interface Someone {

    /**
     * Returns a message
     *
     * @returns {string}
     */
    message(): string;

}

/**
 * A person
 */
export default class Person implements Someone
{
    /**
     * @inheritdoc
     */
    message(): string {
        return 'hi...';
    }
}
