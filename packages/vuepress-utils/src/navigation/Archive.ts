import {Archive as ArchiveContract, PagesCollection} from "@aedart/vuepress-utils/contracts";
import {prefixPath} from "@aedart/vuepress-utils";
import type {NavbarGroup, NavbarItem, NavLink, SidebarConfig} from "vuepress";

/**
 * Archive
 *
 * @typedef {import('vuepress').NavbarItem} NavbarItem
 * @typedef {import('vuepress').NavbarGroup} NavbarGroup
 * @typedef {import('vuepress').NavLink} NavLink
 * @typedef {import('vuepress').SidebarConfig} SidebarConfig
 */
export default class Archive implements ArchiveContract
{
    /**
     * Name of this archive
     *
     * @type {string}
     * @private
     */
    private _name: string = 'Archive'

    /**
     * Archive's path
     *
     * @type {string}
     * @private
     */
    private _path: string = '/archive'

    /**
     * Collection to be marked as "current"
     *
     * @type {PagesCollection}
     * @private
     */
    private _current: PagesCollection;

    /**
     * Collection to be marked as "next"
     *
     * @type {PagesCollection}
     * @private
     */
    private _next: PagesCollection;

    /**
     * Collections in this archive
     *
     * @type {PagesCollection[]}
     * @private
     */
    private _collections: PagesCollection[] = [];

    /**
     * Navigation label for the "current" collection
     *
     * @type {string}
     * @private
     */
    private _currentLabel = 'current';

    /**
     * Navigation label for the "next" collection
     *
     * @type {string}
     * @private
     */
    private _nextLabel = 'next';

    /**
     * Relative path for the "current" collection, in archive
     *
     * @type {string}
     * @private
     */
    private _currentPath = '/current';

    /**
     * Relative path for the "next" collection, in archive
     *
     * @type {string}
     * @private
     */
    private _nextPath = '/next';

    /**
     * Creates a new Archive instance
     *
     * @param {PagesCollection} current
     * @param {PagesCollection} next
     * @param {PagesCollection[]} [collections=[]]
     */
    constructor(
        current: PagesCollection,
        next: PagesCollection,
        collections: PagesCollection[] = []
    )
    {
        this._current = current;
        this._next = next;

        this.collections = collections;
    }

    /**
     * Creates a new Archive instance
     *
     * @param {PagesCollection} current
     * @param {PagesCollection} next
     * @param {PagesCollection[]} [collections=[]]
     *
     * @returns {Archive}
     */
    static make(
        current: PagesCollection,
        next: PagesCollection,
        collections: PagesCollection[] = []
    )
    {
        return new this(current, next, collections);
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
        this._path = path
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
    set current(collection: PagesCollection)
    {
        this._current = collection;
    }

    /**
     * @inheritdoc
     */
    get current(): PagesCollection
    {
        return this._current;
    }

    /**
     * @inheritdoc
     */
    set next(collection: PagesCollection)
    {
        this._next = collection;
    }

    /**
     * @inheritdoc
     */
    get next(): PagesCollection
    {
        return this._next;
    }

    /**
     * @inheritdoc
     */
    set collections(pageCollections: PagesCollection[])
    {
        pageCollections.forEach((collection: PagesCollection) =>
        {
            collection.archive = this;
        });

        this._collections = pageCollections;
    }

    /**
     * @inheritdoc
     */
    get collections(): PagesCollection[]
    {
        return this.markCurrentAndNextCollections(
            this._collections
        );
    }

    /**
     * @inheritdoc
     */
    set currentLabel(name: string)
    {
        this._currentLabel = name;
    }

    /**
     * @inheritdoc
     */
    get currentLabel(): string
    {
        return this._currentLabel;
    }

    /**
     * @inheritdoc
     */
    set nextLabel(name: string)
    {
        this._nextLabel = name;
    }

    /**
     * @inheritdoc
     */
    get nextLabel(): string
    {
        return this._nextLabel;
    }

    /**
     * @inheritdoc
     */
    set currentPath(path: string)
    {
        this._currentPath = path;
    }

    /**
     * @inheritdoc
     */
    get currentPath(): string
    {
        return this._currentPath;
    }

    /**
     * @inheritdoc
     */
    get currentFullPath(): string
    {
        return prefixPath(this.path, this.currentPath);
    }

    /**
     * @inheritdoc
     */
    set nextPath(path: string)
    {
        this._nextPath = path;
    }

    /**
     * @inheritdoc
     */
    get nextPath(): string
    {
        return this._nextPath;
    }

    /**
     * @inheritdoc
     */
    get nextFullPath(): string
    {
        return prefixPath(this.path, this.nextPath);
    }

    /**
     * @inheritdoc
     */
    asNavigationItem(): NavbarItem | NavbarGroup
    {
        return {
            text: this.name,
            link: this.path,
            children: this.makeNavbarItemChildren(),
        };
    }

    /**
     * @inheritdoc
     */
    sidebarConfiguration(): SidebarConfig
    {
        let output = {};

        this.collections.forEach((collection: PagesCollection) =>
        {
            output = Object.assign(output, collection.asSidebarObject());
        });

        return output;
    }

    /*****************************************************************
     * Internals
     ****************************************************************/

    /**
     * Returns collections as list of navbar item
     *
     * @returns {NavLink[]}
     * @protected
     */
    protected makeNavbarItemChildren(): NavLink[]
    {
        const output: NavLink[] = [];

        this.collections.forEach((collection: PagesCollection) =>
        {
            output.push(collection.asNavigationItem());
        });

        return output;
    }

    /**
     * "Mark" the current and next collections
     *
     * @param {PagesCollection[]} collections
     *
     * @returns {PagesCollection[]}
     * @protected
     */
    protected markCurrentAndNextCollections(collections: PagesCollection[]): PagesCollection[]
    {
        collections.forEach((collection: PagesCollection) =>
        {
            // Mark as "next" if matches...
            if (collection === this.next) {
                collection.name = this.nextLabel;
                collection.path = this.nextPath;
            }

            // Mark as "current" if matches...
            if (collection === this.current) {
                collection.name = this.currentLabel;
                collection.path = this.currentPath;
            }
        });

        return collections;
    }
}