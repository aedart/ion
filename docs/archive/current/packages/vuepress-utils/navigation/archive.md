---
title: Archive
description: Archive Structure and Navigation
sidebarDepth: 0
---

# Archive

The `Archive` component is a helper that keeps track of collections of pages in an "archive" (_exactly like this site_).
It operates on the notion that there is always a "current" and "next" collection of pages.
It can be used to structure documentation for various versions of your application, components, packages...etc. 

[[TOC]]

## Directory Structure

The following illustrates a possible archive structure of your documentation.
Notice the "current" and "next" directories. These two directories are essential for the `Archive` component. 
Their names can be configured (_shown later_). Each of the directories contains a collection of pages.

```{2,12,15}
/.vuepress
    /my_archive
        index.ts
        v3x.ts
        v4x.ts
        v5x.ts
        ...
    client.ts
    config.ts

/my_archive
    /current
        README.md
        ...
    /next
        README.md
        ...
    /v4x
        README.md
        ...
    /v3x
        README.md
        ...
    README.md
```

## Collections

Each `Archive` component is dependent on having its structure defined by means of `PagesCollection` components.
As such, to represent the "current" collection, you must create a new `PagesCollection` instance.
Use the static `make()` method to create a new instance. It accepts 3 arguments:

* `name: string` Name or title of the collection.
* `path: string` The relative path in the archive to the collection.
* `pages: SidebarArrayOptions = []` An array of pages or group of pages. Each page's path is relative to the collection's path.

```ts
// E.g. inside /.vuepress/my_archive/v5x.ts
import {PagesCollection} from "@aedart/vuepress-utils/navigation";

export default PagesCollection.make('v5.x', '/v5x', [
    {
        text: 'Version 5.x',
        collapsible: true,
        children: [
            '',
            'contribution-guide',
            'security',
            'code-of-conduct',
        ]
    },
    {
        text: 'Packages',
        collapsible: true,
        children: [
            'packages/',

            // ...remaining not shown here...
        ]
    },

    // ...etc
]);
```

::: tip PagesCollection `path`

The `path` argument of a pages collection will automatically be changed, by the `Archive` component, if the collection
is marked as the "current" or "next" collection (_covered in next section_).

:::

## Archive Instance

Once you have your "current" and "next" collections defined, you can create a new `Archive` instance.
Use the static `make()` method to create a new instance. It accepts 3 arguments:

* `current: PagesCollection` The collection to be marked as the "current".
* `next: PagesCollection` The collection to be marked as the "next".
* `collections: PagesCollection[] = []` Array of all available collections, including "next" and "current".

```ts
// E.g. inside /.vuepress/my_archive/index.ts
import {PagesCollection} from "@aedart/vuepress-utils/contracts";
import {Archive} from "@aedart/vuepress-utils/navigation";
import v3x from "./v3x.ts";
import v4x from "./v4x.ts";
import v5x from "./v5x.ts";
import v6x from "./v6x.ts";

// Defined the "current" colelction 
const CURRENT: PagesCollection = v5x;

// Defined the "next" colelction
const NEXT: PagesCollection = v6x;

// Define all collections... next and current should also be part of this...
const ALL: PagesCollection[] = [
    NEXT,
    CURRENT,
    v4x,
    v3x,
    // ... etc
];

// Finally, create and export your archive with "current" and "next" 
const archive = Archive.make(CURRENT, NEXT, ALL);
archive.path = '/my_archive';

export default archive;
```

### Name & Path

As shown in the previous example, the archive's path was set to `/my_archive` by explicitly setting the `path` property.
You can do the same for its name: 

```ts
// ...previous not shown ... 
const archive = Archive.make(CURRENT, NEXT, ALL);
archive.name = 'Good old stuff';
archive.path = '/old_stuff';
```

::: warning
Your archive's directory structure must match the specified `path` or vuepress will not be able to find it and display a "404 Not Found". 

```{1}
/old_stuff
    /current
        README.md
        ...
    /next
        README.md
        ...
    ...
```
:::

### Current & Next

Whenever a collection is marked as "current" or "next", its `path` is automatically changed to `/current/` or `/next/`.
This means that the full path of those collections will be the archive's `path` + current or next, e.g.

* `/archive/current`
* `/archive/next`

To change these paths, specify the `currentPath` and `nextPath` properties in your `Archive` instance. 

```ts
archive.currentPath = '/live/';
archive.nextPath = '/upcoming/';
```

::: warning
When you change the "current" and "next" paths in your archive, then the directory structure  **MUST**
reflect these names. From the above example, the archive's directory structure should now be the following:

```{2,5}
/my_archive
    /live
        README.md
        ...
    /upcoming
        README.md
        ...
    ...
```
:::

#### Labels

You may also change the labels for "current" and "next", in a similar way as for changing their paths.

```ts
archive.currentLabel = 'Live'
archive.nextLabel = 'What\'s Next?'
```

## Vuepress Config File

To put it all together, in your [Config File](https://v2.vuepress.vuejs.org/guide/configuration.html#config-file), import your archive instance.
Inside your `theme` settings, you can create a dropdown representation of your archive, by invoking the `asNavigationItem()` method. 
A sidebar configuration can be created via the `sidebarConfiguration()` method.

```ts
import {defineUserConfig} from 'vuepress';
import defaultTheme from "@vuepress/theme-default"
import archive from './my_archive'

export default defineUserConfig({
    
    // ...other settings not shown...

    theme: defaultTheme({
        
        // ... other theme settings not shown ...
        
        navbar: [
            archive.asNavigationItem(),
        ],

        sidebar: archive.sidebarConfiguration()
    }),
});
```

## Onward

Use can review the source code and configuration of this site, as a complete example of how the `Archive` component can be used.