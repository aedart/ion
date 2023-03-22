import Archive from "./Archive.js";
import type {NavbarItem, SidebarConfigArray, SidebarConfigObject} from "vuepress";

/**
 * Pages Collection
 */
export default interface PagesCollection
{
    /**
     * Set the name of this collection
     *
     * @param {string} name E.g. "v2.x"
     */
    set name(name: string);

    /**
     * Get the name of this collection
     *
     * @returns {string} E.g. "v2.x"
     */
    get name(): string;

    /**
     * Set this collection's relative path inside an archive
     *
     * @param {string} path E.g. "/v2x"
     */
    set path(path: string)

    /**
     * get this collection's relative path inside an archive
     *
     * @returns {string} E.g. "/v2x"
     */
    get path(): string

    /**
     * Returns the full path of this collection
     *
     * Method depends on {@link Archive.path}.
     *
     * @returns {string} E.g. "/archive/v2x"
     */
    get fullPath(): string

    /**
     * Set the archive that this collection belongs to
     *
     * @param {Archive | null} archive
     */
    set archive(archive: Archive|null);

    /**
     * Get the archive that this collection belongs to
     *
     * @returns {Archive}
     */
    get archive(): Archive|null;

    /**
     * Returns a "navigation link" representation of this collection
     *
     * @returns {NavbarItem}
     */
    asNavigationItem(): NavbarItem;

    /**
     * Returns a "sidebar configuration object" representation of this collection
     *
     * @returns {SidebarConfigObject}
     */
    asSidebarObject(): SidebarConfigObject;

    /**
     * Returns sidebar configuration (all pages in this collection)
     *
     * @returns {SidebarConfigArray}
     */
    sidebar(): SidebarConfigArray;
}
