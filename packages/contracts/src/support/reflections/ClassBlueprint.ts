/**
 * Class Blueprint
 */
export default interface ClassBlueprint
{
    /**
     * Properties or methods expected to exist in class as static members.
     * 
     * @type {PropertyKey[]}
     */
    staticMembers?: PropertyKey[];

    /**
     * Properties or methods expected to exist in class' prototype
     *
     * @type {PropertyKey[]}
     */
    members?: PropertyKey[];
}