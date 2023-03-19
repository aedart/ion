import {SidebarConfigArray} from "vuepress";
import BaseVersion from "./BaseVersion";

export default class Version1x extends BaseVersion
{
    name: string = 'v1.x';
    link: string = '/archive/v1x/'

    sidebar(): SidebarConfigArray {
        return [
            {
                text: 'Version 1.x',
                collapsible: true,
                children: [
                    this.resolve(''),
                    // this.resolve('upgrade-guide'),
                    // this.resolve('new'),
                    // this.resolve('contribution-guide'),
                    // this.resolve('security'),
                    // this.resolve('code-of-conduct'),
                    // this.resolve('origin'),
                ]
            },
        ];
    }
}
