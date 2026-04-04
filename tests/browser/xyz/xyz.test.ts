import { setElementText } from '@aedart/xyz';
import { multiply } from '@aedart/xyz/utils';
import { beforeEach, expect, test } from 'vitest';

beforeEach(() => {
    document.body.innerHTML = '<div id="test-el">Original</div>';
});

test('@aedart/xyz: updates DOM in headless browsers', () => {
    const result = setElementText('test-el', 'Updated!');
    expect(result).toBe(true);
    expect(document.getElementById('test-el')?.textContent).toBe('Updated!');
});

test('@aedart/xyz/utils: nested utility works in browser', () => {
    expect(multiply(10, 5)).toBe(50);
});
