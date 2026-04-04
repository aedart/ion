import { multiply } from '@aedart/xyz/utils';
import { expect, test } from 'vitest';

test('@aedart/xyz/utils: nested utility works in node', () => {
    expect(multiply(2, 3)).toBe(6);
});
