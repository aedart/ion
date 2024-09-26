import {Archive, PagesCollection as PagesCollectionContract} from "@aedart/vuepress-utils/contracts";
import {prefixPath} from "@aedart/vuepress-utils";
import type { NavGroup, NavbarLinkOptions, SidebarObjectOptions, SidebarArrayOptions, SidebarItemOptions, SidebarGroupOptions } from "@vuepress/theme-default";

/**
 * Pages Collection
 * 
 * @typedef {import('@vuepress/theme-default').NavGroup} NavGroup
 * @typedef {import('@vuepress/theme-default').NavbarLinkOptions} NavbarLinkOptions
 * @typedef {import('@vuepress/theme-default').SidebarObjectOptions} SidebarObjectOptions
 * @typedef {import('@vuepress/theme-default').SidebarArrayOptions} SidebarArrayOptions
 * @typedef {import('@vuepress/theme-default').SidebarItemOptions} SidebarItemOptions
 * @typedef {import('@vuepress/theme-default').SidebarGroupOptions} SidebarGroupOptions
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
     * @type {SidebarArrayOptions}
     */
    public pages: SidebarArrayOptions;

    /**
     * Creates a new pages collection instance
     * 
     * @param {string} name
     * @param {string} path
     * @param {SidebarArrayOptions} [pages=[]]
     */
    constructor(name: string, path: string, pages: SidebarArrayOptions = [])
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
     * @param {SidebarArrayOptions} [pages=[]]
     * 
     * @returns {PagesCollection}
     */
    static make(name: string, path: string, pages: SidebarArrayOptions = [])
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
    asNavigationItem(): NavbarLinkOptions | NavGroup<NavbarLinkOptions>
    {
        return {
            text: this.name,
            link: this.fullPath
        };
    }

    /**
     * @inheritdoc
     */
    asSidebarObject(): SidebarObjectOptions
    {
        return {
            [this.fullPath]: this.sidebar()
        };
    }

    /**
     * @inheritdoc
     */
    sidebar(): SidebarArrayOptions
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
     * @param {SidebarArrayOptions} pages
     * 
     * @returns {SidebarArrayOptions}
     * @protected
     */
    protected resolvePages(pages: SidebarArrayOptions): SidebarArrayOptions
    {
        pages.forEach((page: SidebarItemOptions, index: number, array: SidebarItemOptions[]) => {
            array[index] = this.resolvePage(page);
        })

        return pages;
    }

    /**
     * Resolves given page's path
     *
     * @param {SidebarItemOptions} page
     *
     * @returns {SidebarItemOptions}
     *
     * @protected
     */
    protected resolvePage(page: SidebarItemOptions): SidebarItemOptions
    {
        if (typeof page === 'string') {
            return this.prefixWillFullPath(page);
        }

        if (!Reflect.has(page, 'children') || (page as SidebarGroupOptions).children.length === 0) {
            return page;
        }

        (page as SidebarGroupOptions).children.forEach((child: SidebarItemOptions, index: number, children: (SidebarItemOptions)[]) => {
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
