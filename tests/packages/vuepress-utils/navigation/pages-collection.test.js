import {PagesCollection} from "@aedart/vuepress-utils/navigation";

describe('@aedart/vuepress-utils/navigation', () => {
    describe('Pages Collection', () => {

        it('can create instance', function () {
            
            let name = 'Collection A';
            let path = '/collection-a';
            let collection = PagesCollection.make(name, path);

            expect(collection.name)
                .withContext('Incorrect collection name')
                .toBe(name);

            expect(collection.path)
                .withContext('Incorrect collection path')
                .toBe(path);
        });

        it('can get full path', function () {
            
            /** @type {import('@aedart/vuepress-utils/contracts').Archive} */
            let archiveMock = {
                path: '/archive'
            };
            
            let path = '/collection-a';
            let collection = PagesCollection.make('Collection A', path);
            collection.archive = archiveMock;

            let expected = archiveMock.path + path;
            expect(collection.fullPath)
                .withContext('Incorrect full path')
                .toBe(expected);
        });

        it('can be exported as navigation item', function () {
            /** @type {import('@aedart/vuepress-utils/contracts').Archive} */
            let archiveMock = {
                path: '/archive'
            };

            let path = '/collection-a';
            let collection = PagesCollection.make('Collection A', path);
            collection.archive = archiveMock;
            
            let expected = {
                text: collection.name,
                link: archiveMock.path + path
            };
            let result = collection.asNavigationItem();
            expect(result)
                .withContext('Incorrect navigation item')
                .toEqual(expected);
        });

        it('can exported as sidebar config object ', function () {
            /** @type {import('@aedart/vuepress-utils/contracts').Archive} */
            let archiveMock = {
                path: '/archive'
            };

            let path = '/collection-a';
            let collection = PagesCollection.make('Collection A', path, [
                {
                    text: 'Version 0.x',
                    children: [
                        '',
                        'contribution-guide',
                        'security',
                        'code-of-conduct',
                    ]
                },
            ]);
            collection.archive = archiveMock;
            
            // ------------------------------------------------------------------------ //
            
            let result = collection.asSidebarObject();
            //console.log(result);
            
            let fullPath = archiveMock.path + path;
            let hasFullPathKey = result.hasOwnProperty(fullPath);
            expect(hasFullPathKey)
                .withContext('Full path key does not exist in sidebar config object')
                .toBeTrue();
            
            /** @type {import('vuepress').SidebarConfigArray} */
            let pages = result[fullPath];
            expect(pages.length)
                .withContext('No pages are exported')
                .not
                .toBe(0);
            
            let children = pages[0].children;
            children.forEach((page, index) => {
                // console.log(page);
                
                let isPrefixed = page.startsWith(fullPath);
                expect(isPrefixed)
                    .withContext(`Page path at index ${index} is not prefixed: ${page}`)
                    .toBeTrue();
            });
        });
    });
});