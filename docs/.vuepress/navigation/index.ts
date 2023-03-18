import Version from "./contracts/Version";
import Version0x from "./Version0x";
import Version1x from "./Version1x";
import {SidebarConfig} from "vuepress";

/**
 * Current version
 *
 * @type {Version}
 */
const CURRENT: Version = new Version0x();

/**
 * Next version
 *
 * @type {Version}
 */
const NEXT: Version = new Version1x();

/**
 * List of versions
 *
 * @type {Version[]}
 */
const VERSIONS: Version[] = [
    NEXT,
    CURRENT,
    // All previous...
];

/**
 * Docs Navigation
 */
class Navigation
{
    /**
     * Identifier of "current" (supported) version
     *
     * @type {string}
     */
    current: string;

    /**
     * Identifier of "next" version
     *
     * @type {string}
     */
    next: string;

    /**
     * List of "archive" versions
     *
     * @type {Version[]}
     */
    versions: Version[];

    /**
     * "Current major version" label
     */
    currentName: string = 'current';

    /**
     * "Next major version" label
     *
     * @type {string}
     */
    nextName: string = 'next';

    /**
     * Link to "Current major version" version
     *
     * @type {string}
     */
    currentLink: string = '/archive/current/';

    /**
     * Link to "Next major version" version
     *
     * @type {string}
     */
    nextLink: string = '/archive/next/';

    /**
     * Creates new navigation instance
     *
     * @param {Version} current
     * @param {Version} next
     * @param {Version[]} versions
     */
    constructor(current: Version, next: Version, versions: Version[]) {
        this.current = current.name;
        this.next = next.name;
        this.versions = versions;
    }

    /**
     * Generates "archive" navigation items
     *
     * @returns {any[]}
     */
    archiveItems(): any[]
    {
        let output = [];

        this.versions.forEach((version: Version) => {
            // If version is next
            if(version.name === this.next){
                version.name = this.nextName;
                version.link = this.nextLink;
            }

            // If version is current
            if(version.name === this.current){
                version.name = this.currentName;
                version.link = this.currentLink;
            }

            output.push(this.makeArchiveItem(version));
        });

        return output;
    }

    /**
     * Generates sidebar items
     *
     * @param {{}} additional
     *
     * @returns {SidebarConfig}
     */
    sidebarItems(additional = {}): SidebarConfig
    {
        let output = {};

        if(!additional){
            additional = {};
        }

        this.versions.forEach((version: Version) => {
            // If version is next
            if(version.name === this.next){
                version.link = this.nextLink;
            }

            // If version is current
            if(version.name === this.current){
                version.link = this.currentLink;
            }

            let sidebarItem = this.makeSidebarItem(version);

            output = Object.assign(output, sidebarItem);
        });

        // Add evt. additional sidebar items
        return  Object.assign(output, additional);
    }

    /**
     * Makes a new "archive" navigation item
     *
     * @param {Version} version
     * @returns {object}
     *
     * @protected
     */
    protected makeArchiveItem(version: Version): object
    {
        return {
            text: version.name,
            link: version.link
        };
    }

    /**
     * Extracts sidebar item for given version item
     *
     * @param {Version} version
     * @returns {object}
     * @protected
     */
    protected makeSidebarItem(version: Version): object
    {
        return {
            [version.link] : version.sidebar()
        }
    }
}

export default new Navigation(CURRENT, NEXT, VERSIONS);
