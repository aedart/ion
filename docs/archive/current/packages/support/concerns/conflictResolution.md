---
title: Conflict Resolution
description: How to deal with naming conflicts
sidebarDepth: 0
---

# Conflict Resolution

[[TOC]]

## Naming Conflicts

A concern class may _**ONLY**_ occur once in a target class' prototype chain. This is a core feature of the concerns
mechanism and cannot be circumvented. However, sometimes you may find yourself in situations where
different injected concern classes define the same property or method name. When this happens an `AliasConflictError`
is thrown.

```js
class Label extends AbstractConcern {
    get name() { /* ...not shown.. */ }
    set name(v) { /* ...not shown.. */ }
}

class Category extends AbstractConcern {
    get name() { /* ...not shown.. */ }
    set name(v) { /* ...not shown.. */ }
}

@use(
    Label,
    Category // AliasConflictError: Alias "name" for property ...
)
class Battery {}
```

## Resolve Naming Conflicts

To resolve the previous shown naming conflict, you can specify custom "aliases" when
injecting a concern class, via an injection configuration object.

```js
// ... Label and Category concerns not shown ...

@use(
    Label,
    {
        concern: Category,
        aliases: {
            'name': 'category' // Alias Category's "name" property as "category"
        }
    }
)
class Battery {}

const instance = new Battery();
instance.name = 'AAA';
instance.category = 'Rechargeable';
```

The `aliases` option is key-value record, where;
- key = property key in the concern class.
- value = property key (_alias_) to define in the target class.

## Prevent Aliases

To prevent a concern class from defining any aliases inside a target class, set the `allowAliases` option to `false`. 

```js
import { getConcernsContainer } from "@aedart/support/concerns";

@use(
    Label,
    {
        concern: Category,
        allowAliases: false // Category's "name" is NOT aliased in target
    }
)
class Battery {}

const instance = new Battery();
instance.name = 'AA';

// Interact with Category concern to set "name"
getConcernsContainer(instance).get(Category).name = 'Rechargeable';
```

## Shorthand Configuration

You can also use a shorthand version to specify a concern injection configuration, via an array.
The first array value must always be the concern class that must be injected.
The second value can either be an `aliases` object, or boolean value for setting the `allowAliases` option. 

```js
@use(
    Label,
    [Category, {
        'name': 'category'
    }]
)
class Battery {}
```

And to prevent a concern from defining aliases in a target:

```js
@use(
    Label,
    [Category, false]
)
class Battery {}
```