import {SidebarConfigArray} from "vuepress";
import BaseVersion from "./BaseVersion";

export default class Version0x extends BaseVersion
{
    name: string = 'v0.x';
    link: string = '/archive/v0x/'

    sidebar(): SidebarConfigArray {
        return [
            {
                text: 'Version 0.x',
                collapsible: true,
                children: [
                    this.resolve(''),
                    // this.resolve('upgrade-guide'),
                    // this.resolve('new'),
                    this.resolve('contribution-guide'),
                    this.resolve('security'),
                    this.resolve('code-of-conduct'),
                    this.resolve('origin'),
                ]
            },
            {
                text: 'Packages',
                collapsible: true,
                children: [
                    this.resolve('packages/'),

                    // TEST Package... should not contain anything special..
                    //this.resolve('packages/'), // No index for packages...
                    // {
                    //     text: 'XYZ (Test package)',
                    //     collapsible: true,
                    //     children: [
                    //         this.resolve('packages/xyz/'),
                    //     ]
                    // }

                    this.resolve('packages/xyz/')
                ]
            },
        ];
    }
}
