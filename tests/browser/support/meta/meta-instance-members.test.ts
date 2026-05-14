import { type ConstructorLike} from "@aedart/contracts";
import { meta, Metadata } from '@aedart/support/meta';
import { getClassPropertyDescriptors } from "@aedart/support/reflections";
import { describe, expect, test } from 'vitest';

describe('@meta() decorator (instance members)', () => {

    class BaseService
    {
        @meta('wip', 'wap') myField = 'abc';
        
        @meta('fip', 'fup') accessor value = 42;
        
        protected _name: string = 'my-service';

        @meta('get_name', 'zar')
        get name(): string
        {
            return this._name;
        }

        @meta('set_name', 'fin')
        set name(n: string)
        {
            this._name = n;
        }

        @meta('foo', 'bar')
        play()
        {/* empty */}

        // TODO: Static field
        // TODO: Static accessor
        // TODO: Static getter / setter?
        // TODO: Static method
    }
    
    class AlphaService extends BaseService
    {}

    class BetaService extends AlphaService
    {}

    class GammaService extends BetaService
    {
        override myField = 'cda';

        override accessor value = 51;
        
        override get name(): string
        {
            return this._name;
        }
        
        override set name(n: string)
        {
            this._name = n;
        }
        
        override play()
        {/* empty */}

        // TODO: override Static field
        // TODO: override Static accessor
        // TODO: override Static getter / setter?
        // TODO: override Static method
    }
    
    test('can get meta using instance member reference', () => {
        
        const instance = new BaseService();

        // --------------------------------------------------------------------------------------------------- //
        // Field: In current version, we cannot obtain meta using property descriptors / reference to a field.
        // The only way to do this, is via the class.
        expect(Metadata.get(BaseService, 'fields.myField.wip'), 'Unable to get meta for field')
            .toBe('wap');
        
        // --------------------------------------------------------------------------------------------------- //
        // Accessor: A bit tricky because we have to use property descriptor, using the instance's prototype

        const valueDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(instance), 'value') as PropertyDescriptor;
        expect(Metadata.has(valueDescriptor.get as object, 'fip'), 'Unable to determine if has meta for accessor (get)')
            .toBe(true);
        expect(Metadata.get(valueDescriptor.get as object, 'fip'), 'Incorrect meta value for accessor (get)')
            .toBe('fup');
        expect(Metadata.has(valueDescriptor.set as object, 'fip'), 'Unable to determine if has meta for accessor (set)')
            .toBe(true);
        expect(Metadata.get(valueDescriptor.set as object, 'fip'), 'Incorrect meta value for accessor (set)')
            .toBe('fup');
        
        // --------------------------------------------------------------------------------------------------- //
        // Getter / Setter: Similar to the accessor 

        const nameDescriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(instance), 'name') as PropertyDescriptor;
        expect(Metadata.has(nameDescriptor.get as object, 'get_name'), 'Unable to determine if has meta for getter')
            .toBe(true);
        expect(Metadata.get(nameDescriptor.get as object, 'get_name'), 'Incorrect meta value for getter')
            .toBe('zar');
        expect(Metadata.has(nameDescriptor.get as object, 'set_name'), 'Unable to determine if has meta for setter')
            .toBe(true);
        expect(Metadata.get(nameDescriptor.get as object, 'set_name'), 'Incorrect meta value for setter')
            .toBe('fin');

        // --------------------------------------------------------------------------------------------------- //
        // Method: This should be straight forward...

        const { play } = instance; // eslint-disable-line @typescript-eslint/unbound-method
        expect(Metadata.has(play, 'foo'), 'Unable to determine if has meta for instance method')
            .toBe(true);
        expect(Metadata.get(play, 'foo'), 'Incorrect meta value for instance method')
            .toBe('bar');
    });

    test('can get meta using instance member reference (inherited)', () => {

        const instance = new BetaService();

        // --------------------------------------------------------------------------------------------------- //
        // Field: The same as in previous test. We can only get meta for "field" kind, using the class reference.
        expect(Metadata.get(BetaService, 'fields.myField.wip'), 'Unable to get meta for field')
            .toBe('wap');

        // --------------------------------------------------------------------------------------------------- //
        // Get the class descriptors. Unlike previous test, we cannot obtain property descriptors directory from
        // the instance's prototype. We need to obtain them from the "base" class, so this util comes in handy.
        const descriptors = getClassPropertyDescriptors(
            instance.constructor as ConstructorLike,
            true
        );
        
        // Debug
        //console.log('descriptors', descriptors);
        
        // --------------------------------------------------------------------------------------------------- //
        // Accessor
        
        const valueDescriptor = descriptors['value'] as PropertyDescriptor;
        expect(Metadata.has(valueDescriptor.get as object, 'fip'), 'Unable to determine if has meta for accessor (get)')
            .toBe(true);
        expect(Metadata.get(valueDescriptor.get as object, 'fip'), 'Incorrect meta value for accessor (get)')
            .toBe('fup');
        expect(Metadata.has(valueDescriptor.set as object, 'fip'), 'Unable to determine if has meta for accessor (set)')
            .toBe(true);
        expect(Metadata.get(valueDescriptor.set as object, 'fip'), 'Incorrect meta value for accessor (set)')
            .toBe('fup');

        // --------------------------------------------------------------------------------------------------- //
        // Getter / Setter

        const nameDescriptor = descriptors['name'] as PropertyDescriptor;
        expect(Metadata.has(nameDescriptor.get as object, 'get_name'), 'Unable to determine if has meta for getter')
            .toBe(true);
        expect(Metadata.get(nameDescriptor.get as object, 'get_name'), 'Incorrect meta value for getter')
            .toBe('zar');
        expect(Metadata.has(nameDescriptor.get as object, 'set_name'), 'Unable to determine if has meta for setter')
            .toBe(true);
        expect(Metadata.get(nameDescriptor.get as object, 'set_name'), 'Incorrect meta value for setter')
            .toBe('fin');

        // --------------------------------------------------------------------------------------------------- //
        // Method: This should be straight forward...

        const { play } = instance; // eslint-disable-line @typescript-eslint/unbound-method
        expect(Metadata.has(play, 'foo'), 'Unable to determine if has meta for instance method')
            .toBe(true);
        expect(Metadata.get(play, 'foo'), 'Incorrect meta value for instance method')
            .toBe('bar');
    });

    test('can get meta using instance member reference (overridden)', () => {

        const instance = new GammaService();

        // --------------------------------------------------------------------------------------------------- //
        // Field: Same as previous tests...
        expect(Metadata.get(GammaService, 'fields.myField.wip'), 'Unable to get meta for field')
            .toBe('wap');

        // --------------------------------------------------------------------------------------------------- //
        // Get the class descriptors, just like in the previous test
        const overriddenDescriptors = getClassPropertyDescriptors(
            instance.constructor as ConstructorLike,
            true
        );

        // Debug
        //console.log('descriptors (overridden)', overriddenDescriptors);

        // --------------------------------------------------------------------------------------------------- //
        // Accessor

        const valueDescriptor = overriddenDescriptors['value'] as PropertyDescriptor;
        expect(Metadata.has(valueDescriptor.get as object, 'fip'), 'Unable to determine if has meta for accessor (get)')
            .toBe(true);
        expect(Metadata.get(valueDescriptor.get as object, 'fip'), 'Incorrect meta value for accessor (get)')
            .toBe('fup');
        expect(Metadata.has(valueDescriptor.set as object, 'fip'), 'Unable to determine if has meta for accessor (set)')
            .toBe(true);
        expect(Metadata.get(valueDescriptor.set as object, 'fip'), 'Incorrect meta value for accessor (set)')
            .toBe('fup');

        // --------------------------------------------------------------------------------------------------- //
        // Getter / Setter

        const nameDescriptor = overriddenDescriptors['name'] as PropertyDescriptor;
        expect(Metadata.has(nameDescriptor.get as object, 'get_name'), 'Unable to determine if has meta for getter')
            .toBe(true);
        expect(Metadata.get(nameDescriptor.get as object, 'get_name'), 'Incorrect meta value for getter')
            .toBe('zar');
        expect(Metadata.has(nameDescriptor.get as object, 'set_name'), 'Unable to determine if has meta for setter')
            .toBe(true);
        expect(Metadata.get(nameDescriptor.get as object, 'set_name'), 'Incorrect meta value for setter')
            .toBe('fin');

        // --------------------------------------------------------------------------------------------------- //
        // Method: This should be straight forward...

        const { play } = instance; // eslint-disable-line @typescript-eslint/unbound-method
        expect(Metadata.has(play, 'foo'), 'Unable to determine if has meta for instance method')
            .toBe(true);
        expect(Metadata.get(play, 'foo'), 'Incorrect meta value for instance method')
            .toBe('bar');
    });
    
    // TODO: Static method meta, ... obtain via static member directly.
    // TODO: Inherit static method meta, ... obtain via static member directly.
    // TODO: Static getter / setter (field) meta, ... obtain via member directly.


});
