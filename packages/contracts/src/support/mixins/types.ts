import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";

// TODO: Describe this type...
export type ClassDecorator<
    T extends ConstructorOrAbstractConstructor<any> = any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
    U extends ConstructorOrAbstractConstructor<any> = any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
> = (superclass: T) => ConstructorOrAbstractConstructor<U>;