import { isViewingOther } from '@aedart/vuepress-utils';
import { Archive, PagesCollection } from '@aedart/vuepress-utils/navigation';
import { describe, expect, test } from 'vitest';
import type { PageDataRef } from 'vuepress/client';

describe('@aedart/vuepress-utils/utils', () => {
    describe('isViewingOther', () => {
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
                    path: '/archive/current/code-of-conduct',
                },
            } as PageDataRef;

            const pageB = {
                value: {
                    path: '/archive/v2/upgrade-guide',
                },
            } as PageDataRef;

            const resultA = isViewingOther(pageA, archive);
            const resultB = isViewingOther(pageB, archive);

            expect(resultA, 'Should NOT be viewing other')
                .toBeFalsy();

            expect(resultB, 'Should be viewing other')
                .toBeTruthy();
        });
    });
});
