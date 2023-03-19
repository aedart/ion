import Version from "./contracts/Version";
import {SidebarConfigArray} from "vuepress";

/**
 * Base Version
 */
export default abstract class BaseVersion implements Version
{
    abstract link: string;
    abstract name: string;

    abstract sidebar(): SidebarConfigArray ;

    /**
     * Returns a resolved (prefixed) path
     *
     * @param {string} path E.g. package/install
     *
     * @returns {string} E.g. /archive/current/package/install
     */
    resolve(path: string) {
        return this.link + path;
    }
}
