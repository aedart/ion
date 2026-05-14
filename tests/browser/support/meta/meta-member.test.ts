import { meta, Metadata } from '@aedart/support/meta';
import { describe, expect, test } from 'vitest';

describe('@meta() decorator (member)', () => {
    
    test('can get meta using instance method reference', () => {
        class MyService
        {
            @meta('foo', 'bar')
            play()
            {/* empty */}
        }

        // Debug
        const instance = new MyService();
        const { play } = instance; // eslint-disable-line @typescript-eslint/unbound-method

        expect(Metadata.has(play, 'foo'), 'Unable to determine if has meta for instance method')
            .toBe(true);

        expect(Metadata.get(play, 'foo'), 'Incorrect meta value for instance method')
            .toBe('bar');
    });

    // TODO: Inherit instance method meta, ... obtain via member directly.
    // TODO: getter / setter (field) meta, ... obtain via member directly.
    // TODO: Static method meta, ... obtain via static member directly.
    // TODO: Inherit static method meta, ... obtain via static member directly.
    // TODO: Static getter / setter (field) meta, ... obtain via member directly.


});
