import {SidebarConfigArray} from "vuepress";
import BaseVersion from "./BaseVersion";

export default class Version1x extends BaseVersion
{
    name: string = 'v1.x';
    link: string = '/archive/v1x/'

    /**
     * @inheritdoc
     */
    pages(): SidebarConfigArray {
        return [
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
        ];
    }
}
