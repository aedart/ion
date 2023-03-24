import {PagesCollection} from "@aedart/vuepress-utils/navigation";

/**
 * Version 1.x
 */
export default PagesCollection.make('v1.x', '/v1x', [
    {
        text: 'Version 1.x',
        collapsible: true,
        children: [
            '',
            // 'upgrade-guide',
            // 'new',
            // 'contribution-guide',
            // 'security',
            // 'code-of-conduct',
            // 'origin',
        ]
    },
]);