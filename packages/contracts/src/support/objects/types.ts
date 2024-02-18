import MergeOptions from "./MergeOptions";

/**
 * Merge callback function
 */
export type MergeCallback = (
    result: object,
    key: PropertyKey,
    value: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
    source: object,
    sourceIndex: number,
    options: MergeOptions
) => any; /* eslint-disable-line @typescript-eslint/no-explicit-any */