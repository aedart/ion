import {Archive, PagesCollection} from "@aedart/vuepress-utils/navigation";

describe('@aedart/vuepress-utils/navigation', () => {
    describe('Archive', () => {

        it('can create instance', function () {
            
            const current = PagesCollection.make('Version 1', '/v1x');
            const next = PagesCollection.make('Version 2', '/v2x');
            
            const archive = Archive.make(current, next);
            
            // ------------------------------------------------------------------------------ //
            
            expect(archive)
                .withContext('Invalid archive created')
                .not
                .toBeNull();
            
            expect(archive.current)
                .withContext('Incorrect "current" collection')
                .toBe(current);

            expect(archive.next)
                .withContext('Incorrect "next" collection')
                .toBe(next);
        });
        
        it('can be exported as navigation item', function () {
            const current = PagesCollection.make('Version 1', '/v1x');
            const next = PagesCollection.make('Version 2', '/v2x');

            const archive = Archive.make(current, next, [
                next,
                current,
            ]);

            // ------------------------------------------------------------------------------ //
            
            let result = archive.asNavigationItem();
            
            // Debug
            // console.log(result);
            
            expect(result)
                .withContext('Invalid navigation item')
                .not
                .toBeUndefined();
            
            expect(result.text)
                .withContext('Incorrect archive text')
                .toBe(archive.name);

            expect(result.link)
                .withContext('Incorrect archive path')
                .toBe(archive.path);
            
            expect(result.children.length)
                .withContext('Missing children')
                .toBe(2);
            
            result.children.forEach((child, index) => {
                // Debug
                //console.log(child);
                
                expect(result.text.length)
                    .withContext(`Child at index ${index} is missing "text"`)
                    .toBeGreaterThan(0);

                expect(result.link.length)
                    .withContext(`Child at index ${index} is missing "link"`)
                    .toBeGreaterThan(0);
            });
        });

        it('can export sidebar configuration', function () {
            const current = PagesCollection.make('Version 1', '/v1x', [
                {
                    text: 'Version 1.x',
                    children: [
                        '',
                        'contribution-guide',
                    ]
                },
            ]);
            const next = PagesCollection.make('Version 2', '/v2x', [
                {
                    text: 'Version 2.x',
                    children: [
                        '',
                        'contribution-guide',
                    ]
                },
            ]);

            const archive = Archive.make(current, next, [
                next,
                current,
            ]);

            // ------------------------------------------------------------------------------ //

            let result = archive.sidebarConfiguration();

            // Debug
            //console.log(result);

            expect(result)
                .withContext('Invalid sidebar configuration')
                .not
                .toBeUndefined();
            
            for (const [link, arr] of Object.entries(result)) {
                // Debug
                // console.log(link, arr);
                
                expect(arr.length)
                    .withContext(`${link} appears to have no children`)
                    .toBeGreaterThan(0);

                arr.forEach((child, index) => {
                    // Debug
                    //console.log(child);

                    // Ensure that all "children" of arr items are prefixed...
                    let children = child.children;
                    children.forEach((link) => {
                       
                        expect(link.startsWith(archive.path))
                            .withContext(`${link} was not prefixed with archive path (${archive.path})`)
                            .toBeTrue();
                    });
                });
            }
        });
    });
});