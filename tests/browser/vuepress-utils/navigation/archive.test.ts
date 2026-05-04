import { Archive, PagesCollection } from '@aedart/vuepress-utils/navigation';
import { AutoLinkOptions, NavbarGroupOptions } from '@vuepress/theme-default';
import { describe, expect, test } from 'vitest';

describe('@aedart/vuepress-utils/navigation', () => {
    describe('Archive', () => {
        test('can create instance', () => {
            const current = PagesCollection.make('Version 1', '/v1x');
            const next = PagesCollection.make('Version 2', '/v2x');

            const archive = Archive.make(current, next);

            const name = 'My Archive';
            const path = '/my-archive';

            archive.name = name;
            archive.path = path;

            // ------------------------------------------------------------------------------ //

            expect(archive, 'Invalid archive created')
                .not
                .toBeNull();

            expect(archive.name, 'Invalid name')
                .toBe(name);

            expect(archive.path, 'Invalid path')
                .toBe(path);

            expect(archive.current, 'Incorrect "current" collection')
                .toBe(current);

            expect(archive.next, 'Incorrect "next" collection')
                .toBe(next);
        });

        test('can be exported as navigation item', () => {
            const current = PagesCollection.make('Version 1', '/v1x');
            const next = PagesCollection.make('Version 2', '/v2x');

            const archive = Archive.make(current, next, [
                next,
                current,
            ]);

            // ------------------------------------------------------------------------------ //

            const result = archive.asNavigationItem() as NavbarGroupOptions;

            // Debug
            // console.log(result);

            expect(result, 'Invalid navigation item')
                .not
                .toBeUndefined();

            expect(result.text, 'Incorrect archive text')
                .toBe(archive.name);

            expect(result.link, 'Incorrect archive path')
                .toBe(archive.path);

            expect(result.children.length, 'Missing children')
                .toBe(2);

            result.children.forEach((child, index) => {
                // Debug
                // console.log(child);

                expect(result.text.length, `Child at index ${index} is missing "text"`)
                    .toBeGreaterThan(0);

                expect(
                    (result as AutoLinkOptions).link.length,
                    `Child at index ${index} is missing "link"`,
                )
                    .toBeGreaterThan(0);
            });
        });

        test('can export sidebar configuration', () => {
            const current = PagesCollection.make('Version 1', '/v1x', [
                {
                    text: 'Version 1.x',
                    children: [
                        '',
                        'contribution-guide',
                    ],
                },
            ]);
            const next = PagesCollection.make('Version 2', '/v2x', [
                {
                    text: 'Version 2.x',
                    children: [
                        '',
                        'contribution-guide',
                    ],
                },
            ]);

            const archive = Archive.make(current, next, [
                next,
                current,
            ]);

            // ------------------------------------------------------------------------------ //

            const result = archive.sidebarConfiguration();

            // Debug
            // console.log(result);

            expect(result, 'Invalid sidebar configuration')
                .not
                .toBeUndefined();

            for (const [link, arr] of Object.entries(result)) {
                // Debug
                // console.log(link, arr);

                expect(arr.length, `${link} appears to have no children`)
                    .toBeGreaterThan(0);

                (arr as Record<PropertyKey, any>[]).forEach((child, index) => {
                    // Debug
                    // console.log(child);

                    // Ensure that all "children" of arr items are prefixed...
                    const children = child.children as string[];
                    children.forEach((link) => {
                        expect(
                            link.startsWith(archive.path),
                            `${link} was not prefixed with archive path (${archive.path})`,
                        )
                            .toBeTruthy();
                    });
                });
            }
        });
    });
});
