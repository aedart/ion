import {SidebarConfigArray} from "vuepress";
import BaseVersion from "./BaseVersion";

export default class Version0x extends BaseVersion
{
    name: string = 'v0.x';
    link: string = '/archive/v0x/'

    /**
     * @inheritdoc
     */
    pages(): SidebarConfigArray {
        return [
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
        ];
    }
}
