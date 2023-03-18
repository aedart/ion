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
     * @returns {SidebarConfigArray}
     */
    sidebar(): SidebarConfigArray;
}
