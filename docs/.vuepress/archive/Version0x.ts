import {PagesCollection} from "@aedart/vuepress-utils/navigation";

/**
 * Version 0.x
 */
export default PagesCollection.make('v0.x', '/v0x', [
    {
        text: 'Version 0.x',
        collapsible: true,
        children: [
            '',
            // 'upgrade-guide',
            // 'new',
            'contribution-guide',
            'security',
            'code-of-conduct',
            'origin',
        ]
    },
    {
        text: 'Packages',
        collapsible: true,
        children: [
            'packages/',

            // TEST Package... should not contain anything special..
            // {
            //     text: 'XYZ (Test package)',
            //     collapsible: true,
            //     children: [
            //         'packages/xyz/',
            //     ]
            // }

            'packages/xyz/'
        ]
    }, 
]);