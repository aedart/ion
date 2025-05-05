import { describe, it } from 'node:test';
import * as assert from "node:assert";
import { AttributesExtractor } from "@aedart/cli";

describe('@aedart/cli', () => {

    describe('format', () => {

        describe('helpers', () => {
            
            describe('attributes extractor', () => {

                it('returns empty record when dom element has no attributes', () => {
                    const element = '<my_style>';

                    const result = AttributesExtractor.extract(element);
                    
                    assert.equal(Object.entries(result).length, 0);
                });

                it('can extract multiple attributes', () => {
                    const element = '<my_style attr-a="foo" attr-b=bar attr-c=\'zar\' attr-d>';

                    const result = AttributesExtractor.extract(element);

                    assert.equal(Reflect.has(result, 'attr-a'), true, 'attribute a was not extracted');
                    assert.equal(result['attr-a'], 'foo', 'attribute a value was not extracted');
                    
                    assert.equal(Reflect.has(result, 'attr-b'), true, 'attribute b was not extracted');
                    assert.equal(result['attr-b'], 'bar', 'attribute b value was not extracted');
                    
                    assert.equal(Reflect.has(result, 'attr-c'), true, 'attribute c was not extracted');
                    assert.equal(result['attr-c'], 'zar', 'attribute c value was not extracted');

                    assert.equal(Reflect.has(result, 'attr-d'), true, 'attribute d was not extracted');
                    assert.equal(result['attr-d'], true, 'attribute d (boolean) value was not extracted');
                });
            }); 
        });
    });
});