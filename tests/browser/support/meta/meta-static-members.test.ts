import { meta, Metadata } from '@aedart/support/meta';
import { getClassPropertyDescriptors } from '@aedart/support/reflections';
import { describe, expect, test } from 'vitest';

describe('@meta() decorator (static members)', () => {
    class BaseService
    {
        @meta('wip', 'wap')
        static myField = 'abc';

        @meta('fip', 'fup')
        static accessor value = 42;

        protected static _name = 'my-service';

        @meta('get_name', 'zar')
        static get name(): string {
            return this._name;
        }

        @meta('set_name', 'fin')
        static set name(n: string) {
            this._name = n;
        }

        @meta('foo', 'bar')
        static play()
        {/* empty */}
    }

    class AlphaService extends BaseService
    {}

    class BetaService extends AlphaService
    {}

    // TODO: WIP
    // class GammaService extends BetaService
    // {
    //     // Note: meta is sadly NOT automatically inherited for overridden static members.
    //     // This is because decorator's context.addInitializer() do not offer a late static
    //     // binding for `this` (this = BaseService in this case). For this reason, the only
    //     // way to ensure inheritance, is via the custom `@inheritMeta()`!
    //
    //     static override myField = 'cda';
    //
    //     static override accessor value = 51;
    //
    //     static override get name(): string {
    //         return this._name;
    //     }
    //
    //     static override set name(n: string) {
    //         this._name = n;
    //     }
    //
    //     static override play()
    //     {/* empty */}
    // }

    test('can get meta using static member reference', () => {
        // --------------------------------------------------------------------------------------------------- //
        // Field: Similar as for "instance" field, we can only obtain a static field's meta using the class and
        // full path.
        expect(
            Metadata.get(BaseService, 'static.fields.myField.wip'),
            'Unable to get meta for field',
        )
            .toBe('wap');

        // --------------------------------------------------------------------------------------------------- //
        // Accessor: Using a property descriptor of the class and the "accessor", then should be possible.

        const valueDescriptor = Object.getOwnPropertyDescriptor(
            BaseService,
            'value',
        )!;

        expect(
            Metadata.has(valueDescriptor.get as object, 'fip'), // eslint-disable-line @typescript-eslint/unbound-method
            'Unable to determine if has meta for accessor (get)',
        )
            .toBe(true);
        expect(
            Metadata.get(valueDescriptor.get as object, 'fip'), // eslint-disable-line @typescript-eslint/unbound-method
            'Incorrect meta value for accessor (get)',
        )
            .toBe('fup');
        expect(
            Metadata.has(valueDescriptor.set as object, 'fip'), // eslint-disable-line @typescript-eslint/unbound-method
            'Unable to determine if has meta for accessor (set)',
        )
            .toBe(true);
        expect(
            Metadata.get(valueDescriptor.set as object, 'fip'), // eslint-disable-line @typescript-eslint/unbound-method
            'Incorrect meta value for accessor (set)',
        )
            .toBe('fup');

        // --------------------------------------------------------------------------------------------------- //
        // Getter / Setter: Similar to the accessor

        const nameDescriptor = Object.getOwnPropertyDescriptor(
            BaseService,
            'name',
        )!;

        expect(
            Metadata.has(nameDescriptor.get as object, 'get_name'), // eslint-disable-line @typescript-eslint/unbound-method
            'Unable to determine if has meta for getter',
        )
            .toBe(true);
        expect(
            Metadata.get(nameDescriptor.get as object, 'get_name'), // eslint-disable-line @typescript-eslint/unbound-method
            'Incorrect meta value for getter',
        )
            .toBe('zar');
        expect(
            Metadata.has(nameDescriptor.get as object, 'set_name'), // eslint-disable-line @typescript-eslint/unbound-method
            'Unable to determine if has meta for setter',
        )
            .toBe(true);
        expect(
            Metadata.get(nameDescriptor.get as object, 'set_name'), // eslint-disable-line @typescript-eslint/unbound-method
            'Incorrect meta value for setter',
        )
            .toBe('fin');

        // --------------------------------------------------------------------------------------------------- //
        // Method: This should be straight forward...

        const { play } = BaseService; // eslint-disable-line @typescript-eslint/unbound-method
        expect(Metadata.has(play, 'foo'), 'Unable to determine if has meta for instance method')
            .toBe(true);
        expect(Metadata.get(play, 'foo'), 'Incorrect meta value for instance method')
            .toBe('bar');
    });

    test('inherits meta using static member reference', () => {
        // --------------------------------------------------------------------------------------------------- //
        // Field: The same as in previous test. We can only get meta for "field" kind, using the class reference.
        expect(
            Metadata.get(BetaService, 'static.fields.myField.wip'),
            'Unable to get meta for field',
        )
            .toBe('wap');

        // --------------------------------------------------------------------------------------------------- //
        // Get the class descriptors (static defined properties)

        const descriptors = getClassPropertyDescriptors(
            BetaService,
            true,
            false,
        );

        // Debug
        // console.log('descriptors', descriptors);

        // --------------------------------------------------------------------------------------------------- //
        // Accessor

        const valueDescriptor = descriptors.value;

        expect(
            Metadata.has(valueDescriptor.get as object, 'fip'), // eslint-disable-line @typescript-eslint/unbound-method
            'Unable to determine if has meta for accessor (get)',
        )
            .toBe(true);
        expect(
            Metadata.get(valueDescriptor.get as object, 'fip'), // eslint-disable-line @typescript-eslint/unbound-method
            'Incorrect meta value for accessor (get)',
        )
            .toBe('fup');
        expect(
            Metadata.has(valueDescriptor.set as object, 'fip'), // eslint-disable-line @typescript-eslint/unbound-method
            'Unable to determine if has meta for accessor (set)',
        )
            .toBe(true);
        expect(
            Metadata.get(valueDescriptor.set as object, 'fip'), // eslint-disable-line @typescript-eslint/unbound-method
            'Incorrect meta value for accessor (set)',
        )
            .toBe('fup');

        // --------------------------------------------------------------------------------------------------- //
        // Getter / Setter

        const nameDescriptor = descriptors.name;

        expect(
            Metadata.has(nameDescriptor.get as object, 'get_name'), // eslint-disable-line @typescript-eslint/unbound-method
            'Unable to determine if has meta for getter',
        )
            .toBe(true);
        expect(
            Metadata.get(nameDescriptor.get as object, 'get_name'), // eslint-disable-line @typescript-eslint/unbound-method
            'Incorrect meta value for getter',
        )
            .toBe('zar');
        expect(
            Metadata.has(nameDescriptor.get as object, 'set_name'), // eslint-disable-line @typescript-eslint/unbound-method
            'Unable to determine if has meta for setter',
        )
            .toBe(true);
        expect(
            Metadata.get(nameDescriptor.get as object, 'set_name'), // eslint-disable-line @typescript-eslint/unbound-method
            'Incorrect meta value for setter',
        )
            .toBe('fin');

        // --------------------------------------------------------------------------------------------------- //
        // Method: This should be straight forward...

        const { play } = BetaService; // eslint-disable-line @typescript-eslint/unbound-method
        expect(Metadata.has(play, 'foo'), 'Unable to determine if has meta for instance method')
            .toBe(true);
        expect(Metadata.get(play, 'foo'), 'Incorrect meta value for instance method')
            .toBe('bar');
    });

    // TODO: WIP
    // test('inherits meta using overridden static member reference (via @inheritMeta decorator)', () => {
    //
    //     // --------------------------------------------------------------------------------------------------- //
    //     // Field: Same as previous tests...
    //     expect(Metadata.get(GammaService, 'static.fields.myField.wip'), 'Unable to get meta for field')
    //         .toBe('wap');
    //
    //     // --------------------------------------------------------------------------------------------------- //
    //     // Get the class descriptors, just like in the previous test
    //     const overriddenDescriptors = getClassPropertyDescriptors(
    //         GammaService,
    //         true,
    //         false
    //     );
    //
    //     // Debug
    //     console.log('descriptors (overridden)', overriddenDescriptors);
    //
    //     // --------------------------------------------------------------------------------------------------- //
    //     // Accessor
    //
    //     const valueDescriptor = overriddenDescriptors.value;
    //
    //     expect(
    //         Metadata.has(valueDescriptor.get as object, 'fip'), // eslint-disable-line @typescript-eslint/unbound-method
    //         'Unable to determine if has meta for accessor (get)',
    //     )
    //         .toBe(true);
    //     expect(
    //         Metadata.get(valueDescriptor.get as object, 'fip'), // eslint-disable-line @typescript-eslint/unbound-method
    //         'Incorrect meta value for accessor (get)',
    //     )
    //         .toBe('fup');
    //     expect(
    //         Metadata.has(valueDescriptor.set as object, 'fip'), // eslint-disable-line @typescript-eslint/unbound-method
    //         'Unable to determine if has meta for accessor (set)',
    //     )
    //         .toBe(true);
    //     expect(
    //         Metadata.get(valueDescriptor.set as object, 'fip'), // eslint-disable-line @typescript-eslint/unbound-method
    //         'Incorrect meta value for accessor (set)',
    //     )
    //         .toBe('fup');
    //
    //     // --------------------------------------------------------------------------------------------------- //
    //     // Getter / Setter
    //
    //     const nameDescriptor = overriddenDescriptors.name;
    //
    //     expect(
    //         Metadata.has(nameDescriptor.get as object, 'get_name'), // eslint-disable-line @typescript-eslint/unbound-method
    //         'Unable to determine if has meta for getter',
    //     )
    //         .toBe(true);
    //     expect(
    //         Metadata.get(nameDescriptor.get as object, 'get_name'), // eslint-disable-line @typescript-eslint/unbound-method
    //         'Incorrect meta value for getter',
    //     )
    //         .toBe('zar');
    //     expect(
    //         Metadata.has(nameDescriptor.get as object, 'set_name'), // eslint-disable-line @typescript-eslint/unbound-method
    //         'Unable to determine if has meta for setter',
    //     )
    //         .toBe(true);
    //     expect(
    //         Metadata.get(nameDescriptor.get as object, 'set_name'), // eslint-disable-line @typescript-eslint/unbound-method
    //         'Incorrect meta value for setter',
    //     )
    //         .toBe('fin');
    //
    //     // --------------------------------------------------------------------------------------------------- //
    //     // Method: This should be straight forward...
    //
    //     const { play } = GammaService; // eslint-disable-line @typescript-eslint/unbound-method
    //     expect(Metadata.has(play, 'foo'), 'Unable to determine if has meta for instance method')
    //         .toBe(true);
    //     expect(Metadata.get(play, 'foo'), 'Incorrect meta value for instance method')
    //         .toBe('bar');
    // });
});
