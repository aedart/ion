import type { ConcernConstructor, Container, Owner } from "@aedart/contracts/support/concerns";
import { getConcernsContainer } from "./getConcernsContainer";

/**
 * Boot given concerns for [owner]{@link Owner} instance 
 * 
 * @param {object|Owner} instance
 * @param {...ConcernConstructor[]} concerns
 *
 * @return {void}
 * 
 * @throws {TypeError} If `instance` is not of the type [Concerns Owner]{@link import('@aedart/contracts/support/concerns').Owner}
 * @throws {NotRegisteredError} If a concern class is not registered in this container
 * @throws {BootError} If a concern is unable to be booted, e.g. if already booted
 */
export function bootConcerns(instance: object|Owner, ...concerns: ConcernConstructor[]): void
{
    const container: Container = getConcernsContainer(instance);
    for (const concern of concerns) {
        container.boot(concern);
    }
}