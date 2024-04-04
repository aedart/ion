import { Container, Identifier } from "@aedart/contracts/container";

/**
 * Callback used to create a "spy" (e.g. mocked object), for testing purposes.
 */
export type SpyFactoryCallback<
    T = any
> = (container: Container, identifier: Identifier) => T;