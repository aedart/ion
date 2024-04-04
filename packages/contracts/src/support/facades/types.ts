import { Container, Identifier } from "@aedart/contracts/container";

/**
 * Callback used to create a "spy" (e.g. mocked object), for testing purposes.
 */
export type SpyFactoryCallback<
    T = any /* eslint-disable-line @typescript-eslint/no-explicit-any */
> = (container: Container, identifier: Identifier) => T;