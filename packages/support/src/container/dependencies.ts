import type { ClassDecorator, ClassMethodDecorator } from "@aedart/contracts";
import type { Identifier } from "@aedart/contracts/container";
import { DEPENDENCIES } from "@aedart/contracts/container";
import { targetMeta } from "@aedart/support/meta";

// TODO: ... INCOMPLETE...
export function dependencies(...identifiers: Identifier[]): ClassDecorator | ClassMethodDecorator
{
    return targetMeta(DEPENDENCIES, identifiers);
}