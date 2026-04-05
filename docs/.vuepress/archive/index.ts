import {PagesCollection} from "@aedart/vuepress-utils/contracts";
import {Archive} from "@aedart/vuepress-utils/navigation";
import Version0x from "./Version0x";
import Version1x from "./Version1x";

/**
 * The "current" version
 * 
 * @type {PagesCollection}
 */
const CURRENT: PagesCollection = Version0x;

/**
 * The "next" version
 * 
 * @type {PagesCollection}
 */
const NEXT: PagesCollection = Version1x;

/**
 * List of versions
 * 
 * @type {PagesCollection[]}
 */
const VERSIONS: PagesCollection[] = [
    NEXT,
    CURRENT
];

export default Archive.make(CURRENT, NEXT, VERSIONS);