import Version from "./contracts/Version";
import type {SidebarConfigArray, SidebarGroup, SidebarItem} from "vuepress";

/**
 * Base Version
 */
export default abstract class BaseVersion implements Version
{
    abstract link: string;

    abstract name: string;

    /**
     * Returns the sidebar groups and pages
     *
     * @returns {SidebarConfigArray}
     */
    abstract pages(): SidebarConfigArray;

    /**
     * @inheritdoc
     */
    sidebar(): SidebarConfigArray
    {
        return this.resolvePaths(
            this.pages()
        );
    }

    /**
     * Resolves the pages' paths
     *
     * @param {SidebarConfigArray} pages
     *
     * @returns {SidebarConfigArray}
     *
     * @protected
     */
    protected resolvePaths(pages: SidebarConfigArray): SidebarConfigArray
    {
        pages.forEach((page: string | SidebarItem | SidebarGroup, index: number, arr: (string | SidebarItem | SidebarGroup)[]) => {
            arr[index] = this.resolvePagePath(page);
        });

        return pages;
    }

    /**
     * Resolves given page's path
     *
     * @param {SidebarItem | SidebarGroup | string} page
     *
     * @returns {SidebarItem | SidebarGroup | string}
     *
     * @protected
     */
    protected resolvePagePath(page: SidebarItem | SidebarGroup | string): SidebarItem | SidebarGroup | string
    {
        if (typeof page === 'string') {
            return this.resolve(page);
        }

        if (!page.hasOwnProperty('children') || (page as SidebarGroup).children.length === 0) {
            return page;
        }

        (page as SidebarGroup).children.forEach((child: string | SidebarItem | SidebarGroup, index: number, children: (string | SidebarItem | SidebarGroup)[]) => {
            children[index] = this.resolvePagePath(child);
        });

        return page;
    }

    /**
     * Returns a resolved (prefixed) path
     *
     * @param {string} path E.g. package/install
     *
     * @returns {string} E.g. /archive/current/package/install
     *
     * @protected
     */
    protected resolve(path: string) {
        return this.link + path;
    }
}
