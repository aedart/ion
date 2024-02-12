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
            'upgrade-guide',
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
            {
                text: 'Contracts',
                collapsible: true,
                children: [
                    'packages/contracts/',
                    'packages/contracts/install',
                ]
            },
            {
                text: 'Support',
                collapsible: true,
                children: [
                    'packages/support/',
                    'packages/support/install',
                    'packages/support/mixins',
                    'packages/support/meta',
                    'packages/support/objects',
                    'packages/support/reflections',
                    'packages/support/misc',
                ]
            },
            {
                text: 'Vuepress Utils',
                collapsible: true,
                children: [
                    'packages/vuepress-utils/',
                    'packages/vuepress-utils/install',
                    {
                        text: 'Navigation',
                        collapsible: true,
                        children: [
                            // 'packages/vuepress-utils/navigation', // No index page...
                            'packages/vuepress-utils/navigation/archive',
                        ]
                    },
                    {
                        text: 'Plugins',
                        collapsible: true,
                        children: [
                            // 'packages/vuepress-utils/plugins', // No index page...
                            'packages/vuepress-utils/plugins/last-updated',
                        ]
                    },
                    {
                        text: 'Components',
                        collapsible: true,
                        children: [
                            // 'packages/vuepress-utils/components', // No index page...
                            'packages/vuepress-utils/components/version-disclaimer',
                        ]
                    },
                ]
            },
            
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