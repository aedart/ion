---
title: Merge
description: Merge multiple objects into a new object.
sidebarDepth: 0
---

# `merge` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Merges objects recursively into a new object. The properties and values of the source objects are copied, using [deep copy techniques](https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy), when possible.
Behind the scene, most value types are deep copied via [`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone).

[[TOC]]

**Example**

```js
import { merge } from "@aedart/support/objects";

const person = {
    'name': 'Alice',
};

const address = {
    'address': {
        'street': 'Somewhere Street 43'
    },
};

const result = merge(person, address);

console.log(result);
```

The above shown example results in a new object that looks like this:

```json
{
    "name": "Alice",
    "address": {
        "street": "Somewhere Street 43"
    }
}
```

## Shallow Copied Types

Be default, the following value types are only [shallow copied](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy):

- [function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)
- [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

```js
const a = {
    'foo': null,
    'bar': Symbol('my_symbol')
};

const b = {
    'foo': function() {},
};

const result = merge(a, b);

console.log(result.foo === b.foo); // true
console.log(result.bar === a.bar); // true
```

## Unsafe Keys

Property keys that are considered "unsafe", are never copied.

```js
const a = {
    'foo': 'bar'
};
const b = {
    __proto__: { 'is_admin': true }
}

const result = merge(a, b);

console.log(result); // { 'foo': 'bar' }
console.log(Reflect.has(result, '__proto__')); // false
```

_See [`isUnsafeKey()`](../reflections/isKeyUnsafe.md) for additional details._

## Merge Options

`merge()` supports a number of options. To specify thom, use the `using()` method.

```js
merge()
    .using({ /** option: value */ })
    .of(objA, objB, objC);
```

::: tip Note
When invoking `merge()` without any arguments, an underlying objects `Merger` instance is returned.
:::

### `depth`

The `depth` option specifies the maximum merge depth.

* Default maximum depth: `512`

A `MergeError` is thrown, if the maximum depth is exceeded.

```js
const a = {
    'person': {
        'name': 'Una'
    }
};

const b = {
    'person': {         // Level 0
        'age': 24,      // Level 1
        'address': {
            'street': 'Somewhere Str. 654' // Level 2
        }
    }
};

const result = merge()
    .using({
        depth: 1
    })
    .of(a, b); // MergeError - Maximum merge depth (1) has been exceeded
```

### `skip`

`skip` defines property keys that must not be merged.

It accepts an array of property keys or a callback.

#### List of property keys

```js
const a = {
    'person': {
        'name': 'Ulrik'
    }
};

const b = {
    'person': {
        'age': 36,
        'address': {
            'street': 'Nowhere Str. 12'
        }
    }
};

const result = merge()
    .using({
        skip: [ 'age' ]
    })
    .of(a, b);
```

The above example results in the following new object:

```json
{
    "person": {
        "name": "Ulrik",
        "address": {
            "street": "Nowhere Str. 12"
        }
    }
}
```

::: tip Note
When specifying a list of property keys, then the depth level in which the property key is found does not matter.
:::

#### Skip Callback

You can use a callback, if you need to handle more advanced skip logic.
The callback accepts the the following arguments:

- `key: PropertyKey` - The current property that is being processed.
- `source: object` - The source object that contains the key.
- `result: object` - The resulting object (_relative to the current depth that is being processed_).

The callback MUST return a boolean value; `true` if given key must be skipped, `false` otherwise.

```js
const a = {
    'person': {
        'name': 'Jane'
    }
};

const b = {
    'person': {
        'name': 'James',
        'address': {
            'street': 'Sunview Palace 88'
        }
    }
};

const b = {
    'person': {
        'name': 'White',
    }
};

const result = merge()
    .using({
        skip: (key, source, result) => {
            return key === 'name'
                && source[key] !== null
                && !Reflect.has(result, key); 
        }
    })
    .of(a, b);
```

The above example results in the following new object:

```json
{
    "person": {
        "name": "Jane",
        "address": {
            "street": "Sunview Palace 88"
        }
    }
}
```

### `overwriteWithUndefined`

Determines if a property value should be overwritten with `undefined`.

**Note**: _By default, all values are overwritten, even when they are `undefined`!_

```js
const a = { 'foo': true };
const b = { 'foo': undefined };

merge(a, b); // { 'foo': undefined }

merge()
    .using({ overwriteWithUndefined: false })
    .of(a, b) // { 'foo': true }
```

### `useCloneable`

Determines if an object's return value from a `clone()` method (_see [`Cloneable`](../objects/isCloneable.md)_) should be used for merging,
rather than the source object itself.

**Note**: _By default, if an object is cloneable, then its return value from `clone()` is used._

```js
const a = { 'foo': { 'name': 'John Doe' } };
const b = { 'foo': {
     'name': 'Jane Doe',
     clone() {
         return {
             'name': 'Rick Doe',
             'age': 26
         }
     }
} };

merge(a, b); // { 'foo': { 'name': 'Rick Doe', 'age': 26 } }

merge()
    .using({ useCloneable: false })
    .of(a, b); // { 'foo': { 'name': 'Jane Doe', clone() {...} } }
```

### `mergeArrays`

When enabled, arrays, [array-like](../arrays/isArrayLike.md), and [concat spreadable](../arrays/isConcatSpreadable.md) objects are merged.  

**Note**: _By default, existing array values are NOT merged._

```js
const a = { 'foo': [ 1, 2, 3 ] };
const b = { 'foo': [ 4, 5, 6 ] };

merge(a, b); // { 'foo': [ 4, 5, 6 ] }

merge()
    .using({ mergeArrays: true })
    .of(a, b); // { 'foo': [ 1, 2, 3, 4, 5, 6 ] }
```

Behind the scene, the [array merge](../arrays/merge.md) utility is used for merging arrays.

### `arrayMergeOptions` <Badge type="tip" text="Available since v0.11" vertical="middle" />

_See [Array Merge Options](../arrays/merge.md#merge-options)._

### `callback`

In situations when you need more advanced merge logic, you may specify a custom callback.

The callback is _**responsible**_ for returning the value to be merged, from a given source object. 

```js
const a = {
    'a': 1
};

const b = {
    'b': 2
};

const result = merge()
    .using({
        callback: (target, next, options) => {
            const { key, value } = target;
            if (key === 'b') {
                return value + 1;
            }

            return value;
        }
    })
    .of(a, b); // { 'a': 1, 'b': 3 }
```

If you do not have other merge options to specify, then you can simply provide a merge callback directly as argument for
the `using()` method.

```js
const result = merge()
    .using((target, next, options) => {
        const { key, value } = target;
        if (key === 'b') {
            return value + 1;
        }

        return value;
    })
    .of(a, b);
```

#### Arguments

The merge callback is given the following arguments:

- `target: MergeSourceInfo` - The source target information (_see below_).
- `next: NextCallback` - Callback to invoke for merging nested objects (_next depth level_).
- `options: Readonly<MergeOptions>` - The merge options to be applied.

**`target: MergeSourceInfo`**

The source target information object contains the following properties:

- `result: object` - The resulting object (_relative to object depth_)
- `key: PropertyKey` - The target property key in source object to.
- `value: any` - Value of the property in source object.
- `source: object` - The source object that holds the property key and value.
- `sourceIndex: number` - Source object's index (_relative to object depth_).
- `depth: number` - The current recursion depth.

**`next: NextCallback`**

The callback to perform the merging of nested objects.
It accepts the following arguments:

- `sources: object[]` - The nested objects to be merged.
- `options: Readonly<MergeOptions>` - The merge options to be applied.
- `nextDepth: number` - The next recursion depth number.

#### Onward

For additional information about the merge callback, please review the source code of the `defaultMergeCallback()`, inside `@aedart/support/objects`.