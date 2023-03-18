import Version from "./contracts/Version";
import {SidebarConfigArray} from "vuepress";

export default class Version1x implements Version
{
    name: string = 'v1.x';
    link: string = '/archive/v1x/'

    sidebar(): SidebarConfigArray {
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
