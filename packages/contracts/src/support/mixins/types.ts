import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";

// TODO: Describe this type...
export type ClassDecorator<
    T extends ConstructorOrAbstractConstructor<any> = any,
    U extends ConstructorOrAbstractConstructor<any> = any,
> = (superclass: T) => ConstructorOrAbstractConstructor<U>;