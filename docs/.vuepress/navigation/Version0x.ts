import Version from "./contracts/Version";
import {SidebarConfigArray} from "vuepress";

export default class Version0x implements Version
{
    name: string = 'v0.x';
    link: string = '/archive/v0x/'

    sidebar(): SidebarConfigArray {
        return [
            {
                text: 'Version 0.x',
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
