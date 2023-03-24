import type {NavbarGroup, NavbarItem, SidebarConfig} from "vuepress";
import PagesCollection from "./PagesCollection.js";


/**
 * Archive
 */
export default interface Archive
{
    /**
     * Set the name of this archive
     *
     * @param {string} name E.g. "Archive"
     */
    set name(name: string);

    /**
     * Get the name of this archive
     *
     * @returns {string} E.g. "Archive"
     */
    get name(): string;

    /**
     * Set this archive's path
     *
     * @param {string} path E.g. "/archive"
     */
    set path(path: string)

    /**
     * get this archive's path
     *
     * @returns {string} E.g. "/archive"
     */
    get path(): string

    /**
     * Set the pages collection to be marked as "current"
     *
     * @param {PagesCollection} collection
     */
    set current(collection: PagesCollection);

    /**
     * Get the pages collection that is marked as "current"
     *
     * @returns {PagesCollection}
     */
    get current(): PagesCollection;

    /**
     * Set the pages collection to be marked as "next"
     *
     * @param {PagesCollection} collection
     */
    set next(collection: PagesCollection);

    /**
     * Get the pages collection that is marked as "next"
     *
     * @returns {PagesCollection}
     */
    get next(): PagesCollection;

    /**
     * Set the collections in this archive
     *
     * @param {PagesCollection[]} pageCollections
     */
    set collections(pageCollections: PagesCollection[]);

    /**
     * Get the collections in this archive
     *
     * @returns {PagesCollection[]}
     */
    get collections(): PagesCollection[];

    /**
     * Set the navigation label for the "current" collection
     *
     * @param {string} name
     */
    set currentLabel(name: string);

    /**
     * Get the navigation label for the "current" collection
     *
     * @returns {string}
     */
    get currentLabel(): string;

    /**
     * Set the navigation label for the "next" collection
     *
     * @param {string} name
     */
    set nextLabel(name: string);

    /**
     * Get the navigation label for the "next" collection
     *
     * @returns {string}
     */
    get nextLabel(): string;

    /**
     * Set the relative path for the "current" collection,
     * in this archive
     *
     * @param {string} path E.g. "/current"
     */
    set currentPath(path: string);

    /**
     * Get the relative path for the "current" collection,
     * in this archive
     *
     * @returns {string} E.g. "/current"
     */
    get currentPath(): string;

    /**
     * Get the full path of the "current" collection
     *
     * @returns {string} E.g. "/archive/current"
     */
    get currentFullPath(): string;

    /**
     * Set the relative path for the "next" collection,
     * in this archive
     *
     * @param {string} path E.g. "/next"
     */
    set nextPath(path: string);

    /**
     * Get the relative path for the "current" collection,
     * in this archive
     *
     * @returns {string} E.g. "/next"
     */
    get nextPath(): string;

    /**
     * Get the full path of the "current" collection
     *
     * @returns {string} E.g. "/archive/next"
     */
    get nextFullPath(): string;

    /**
     * Returns a navigation "bar item" or "group" representation of this archive
     * 
     * @returns {NavbarItem | NavbarGroup}
     */
    asNavigationItem(): NavbarItem | NavbarGroup;

    /**
     * Returns sidebar configuration (all collections' pages)
     *
     * @returns {SidebarConfig}
     */
    sidebarConfiguration(): SidebarConfig;
}
