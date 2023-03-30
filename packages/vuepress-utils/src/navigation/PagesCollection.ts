import {Archive, PagesCollection as PagesCollectionContract} from "@aedart/vuepress-utils/contracts";
import {prefixPath} from "@aedart/vuepress-utils";
import type {NavbarItem, SidebarConfigArray, SidebarConfigObject} from "vuepress";
import {SidebarGroup, SidebarItem} from "vuepress";

/**
 * Pages Collection
 * 
 * @typedef {import('vuepress').NavbarItem} NavbarItem
 * @typedef {import('vuepress').SidebarConfigArray} SidebarConfigArray
 * @typedef {import('vuepress').SidebarConfigObject} SidebarConfigObject
 * @typedef {import('vuepress').SidebarItem} SidebarItem
 * @typedef {import('vuepress').SidebarGroup} SidebarGroup
 */
export default class PagesCollection implements PagesCollectionContract
{
    /**
     * Name of this collection
     *
     * @type {string}
     *
     * @private
     */
    private _name: string;

    /**
     * Relative path of this collection inside an archive
     *
     * @type {string}
     * @private
     */
    private _path: string;

    /**
     * Archive that this collection belongs to
     *
     * @type {Archive | null}
     * @private
     */
    private _archive: Archive | null = null;

    /**
     * The pages in this collection
     * 
     * @type {SidebarConfigArray}
     */
    public pages: SidebarConfigArray;

    /**
     * Creates a new pages collection instance
     * 
     * @param {string} name
     * @param {string} path
     * @param {SidebarConfigArray} [pages=[]]
     */
    constructor(name: string, path: string, pages: SidebarConfigArray = [])
    {
        this._name = name;
        this._path = path;
        this.pages = pages;
    }

    /**
     * Creates a new pages collection instance
     * 
     * @param {string} name
     * @param {string} path
     * @param {SidebarConfigArray} [pages=[]]
     * 
     * @returns {PagesCollection}
     */
    static make(name: string, path: string, pages: SidebarConfigArray = [])
    {
        return new this(name, path, pages);
    }

    /**
     * @inheritdoc
     */
    set name(name: string)
    {
        this._name = name;
    }

    /**
     * @inheritdoc
     */
    get name(): string
    {
        return this._name;
    }

    /**
     * @inheritdoc
     */
    set path(path: string)
    {
        this._path = path;
    }

    /**
     * @inheritdoc
     */
    get path(): string
    {
        return this._path;
    }

    /**
     * @inheritdoc
     */
    get fullPath(): string
    {
        return this.prefixWithArchivePath(this.path);
    }

    /**
     * @inheritdoc
     */
    set archive(archive: Archive | null)
    {
        this._archive = archive;
    }

    /**
     * @inheritdoc
     */
    get archive(): Archive | null
    {
        return this._archive;
    }

    /**
     * @inheritdoc
     */
    asNavigationItem(): NavbarItem
    {
        return {
            text: this.name,
            link: this.fullPath
        };
    }

    /**
     * @inheritdoc
     */
    asSidebarObject(): SidebarConfigObject
    {
        return {
            [this.fullPath]: this.sidebar()
        };
    }

    /**
     * @inheritdoc
     */
    sidebar(): SidebarConfigArray
    {
        return this.resolvePages(
            this.pages
        );
    }

    /*****************************************************************
     * Internals
     ****************************************************************/

    /**
     * Resolves pages' path
     * 
     * @param {SidebarConfigArray} pages
     * 
     * @returns {SidebarConfigArray}
     * @protected
     */
    protected resolvePages(pages: SidebarConfigArray): SidebarConfigArray
    {
        pages.forEach((page: string | SidebarItem | SidebarGroup, index: number, arr: (string | SidebarItem | SidebarGroup)[]) => {
            arr[index] = this.resolvePage(page);
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
    protected resolvePage(page: SidebarItem | SidebarGroup | string): SidebarItem | SidebarGroup | string
    {
        if (typeof page === 'string') {
            return this.prefixWillFullPath(page);
        }

        if (!Reflect.has(page, 'children') || (page as SidebarGroup).children.length === 0) {
            return page;
        }

        (page as SidebarGroup).children.forEach((child: string | SidebarItem | SidebarGroup, index: number, children: (string | SidebarItem | SidebarGroup)[]) => {
            children[index] = this.resolvePage(child);
        });

        return page;
    }

    /**
     * Prefix given path with {@link fullPath}
     * 
     * @param {string} path
     * 
     * @returns {string}
     * @protected
     */
    protected prefixWillFullPath(path: string): string
    {
        return prefixPath(this.fullPath, path);
    }
    
    /**
     * Prefix given path with {@link Archive.path}
     * 
     * @param {string} path
     * @returns {string}
     * 
     * @protected
     */
    protected prefixWithArchivePath(path: string): string
    {
        const prefix: string = (this.archive !== null)
            ? this.archive.path
            : '';
        
        return prefixPath(prefix, path);
    }
}
