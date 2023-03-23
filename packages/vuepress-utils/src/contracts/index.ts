import Archive from "./Archive.js";
import PagesCollection from "./PagesCollection.js";

/**
 * Contracts identifier
 *
 * @type {typeof VUEPRESS_UTILS_CONTRACTS}
 */
const VUEPRESS_UTILS_CONTRACTS: unique symbol = Symbol('@aedart/vuepress-utils/contracts');

export {
    Archive,
    PagesCollection,
    VUEPRESS_UTILS_CONTRACTS
};
