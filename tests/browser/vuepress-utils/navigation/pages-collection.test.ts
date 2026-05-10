import { Archive, PagesCollection } from '@aedart/vuepress-utils/navigation';
import { SidebarGroupOptions } from '@vuepress/theme-default';
import { describe, expect, test } from 'vitest';

describe('@aedart/vuepress-utils/navigation', () => {
    describe('Pages Collection', () => {
        test('can create instance', () => {
            const name = 'Collection A';
            const path = '/collection-a';
            const collection = PagesCollection.make(name, path);

            expect(collection.name, 'Incorrect collection name')
                .toBe(name);

            expect(collection.path, 'Incorrect collection path')
                .toBe(path);
        });

        test('can get full path', () => {
            const archiveMock = {
                path: '/archive',
            } as Archive;

            const path = '/collection-a';
            const collection = PagesCollection.make('Collection A', path);
            collection.archive = archiveMock;

            const expected = archiveMock.path + path;
            expect(collection.fullPath, 'Incorrect full path')
                .toBe(expected);
        });

        test('can be exported as navigation item', () => {
            const archiveMock = {
                path: '/archive',
            } as Archive;

            const path = '/collection-a';
            const collection = PagesCollection.make('Collection A', path);
            collection.archive = archiveMock;

            const expected = {
                text: collection.name,
                link: archiveMock.path + path,
            };
            const result = collection.asNavigationItem();
            expect(result, 'Incorrect navigation item')
                .toEqual(expected);
        });

        test('can exported as sidebar config object ', () => {
            const archiveMock = {
                path: '/archive',
            } as Archive;

            const path = '/collection-a';
            const collection = PagesCollection.make('Collection A', path, [
                {
                    text: 'Version 0.x',
                    children: [
                        '',
                        'contribution-guide',
                        'security',
                        'code-of-conduct',
                    ],
                },
            ]);
            collection.archive = archiveMock;

            // ------------------------------------------------------------------------ //

            const result = collection.asSidebarObject();
            // console.log(result);

            const fullPath = archiveMock.path + path;
            const hasFullPathKey = Reflect.has(result, fullPath);
            expect(hasFullPathKey, 'Full path key does not exist in sidebar config object')
                .toBeTruthy();

            const pages = result[fullPath] as SidebarGroupOptions[];
            expect((pages as unknown[]).length, 'No pages are exported')
                .not
                .toBe(0);

            const children = pages[0].children;
            children.forEach((page, index) => {
                // console.log(page);

                const isPrefixed = (page as string).startsWith(fullPath);
                expect(
                    isPrefixed,
                    `Page path at index ${index} is not prefixed: ${String(page.link)}`,
                )
                    .toBeTruthy();
            });
        });
    });
});
