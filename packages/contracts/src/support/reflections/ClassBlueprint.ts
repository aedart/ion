/**
 * Class Blueprint
 */
export default interface ClassBlueprint
{
    /**
     * Properties or methods that are statically defined in class
     * 
     * @type {PropertyKey[]}
     */
    staticMembers?: PropertyKey[];

    /**
     * Properties or methods defined on class' prototype
     *
     * @type {PropertyKey[]}
     */
    members: PropertyKey[];
}