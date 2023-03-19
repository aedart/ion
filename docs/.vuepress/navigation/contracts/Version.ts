import {SidebarConfigArray} from "vuepress";

/**
 * Documentation Version
 */
export default interface Version
{
    /**
     * Version name (identifier)
     */
    name: string;

    /**
     * Link to version
     */
    link: string;

    /**
     * Returns this version's sidebar configuration
     *
     * @see https://v2.vuepress.vuejs.org/reference/default-theme/config.html#sidebar
     *
     * @returns {SidebarConfigArray}
     */
    sidebar(): SidebarConfigArray;
}
