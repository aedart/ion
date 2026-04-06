import { isViewingNext } from "@aedart/vuepress-utils";
import { Archive, PagesCollection } from '@aedart/vuepress-utils/navigation';
import type { PageDataRef } from 'vuepress/client';
import { describe, test, expect } from "vitest";

describe('@aedart/vuepress-utils/utils', () => {

    describe('isViewingNext', () => {

        test('can determine if next', () => {
            const current = PagesCollection.make('Version 1', '/v1x', [
                {
                    text: 'Version 1.x',
                    collapsible: true,
                    children: [
                        '',
                        'upgrade-guide',
                        'code-of-conduct',
                    ],
                },
            ]);

            const next = PagesCollection.make('Version 2', '/v2x', [
                {
                    text: 'Version 2.x',
                    collapsible: true,
                    children: [
                        '',
                        'upgrade-guide',
                        'code-of-conduct',
                    ],
                },
            ]);

            const archive = Archive.make(current, next);

            const pageA = {
                value: {
                    path: '/archive/current/code-of-conduct'
                }
            } as PageDataRef;

            const pageB = {
                value: {
                    path: '/archive/next/upgrade-guide'
                }
            } as PageDataRef;


            const resultA = isViewingNext(pageA, archive);
            const resultB = isViewingNext(pageB, archive);

            expect(resultA, 'Should be viewing next')
                .toBeFalsy();

            expect(resultB, 'Should be viewing next')
                .toBeTruthy();
        });
    });
});