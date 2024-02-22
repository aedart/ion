/**
 * Callback that returns properties to be selected from the source object.
 * The target is the object intended to have source properties merged or assigned
 * into.
 */
export type SourceKeysCallback<
    SourceObj extends object = object,
    TargetObj extends object = object
> = (source: SourceObj, target: TargetObj) => PropertyKey|PropertyKey[];