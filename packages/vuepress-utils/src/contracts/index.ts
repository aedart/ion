import Archive from "./Archive.js";
import PagesCollection from "./PagesCollection.js";

/**
 * Contracts identifier
 *
 * @type {typeof VUEPRESS_UTILS}
 */
const VUEPRESS_UTILS: unique symbol = Symbol('@aedart/vuepress-utils');

export {
    Archive,
    PagesCollection,
    VUEPRESS_UTILS
};
