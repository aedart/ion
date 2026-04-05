---
title: Class Looks Like
description: Determine if a class looks like blueprint.
sidebarDepth: 0
---

# `classLooksLike` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Determines if a target class _"looks like"_ the provided class "blueprint".

[[TOC]]

## Arguments

`classLooksLike()` accepts the following arguments:

- `target: object` - the target class object.
- `blueprint: ClassBlueprint` - a blueprint that defines the expected members of a class (_see [Class Blueprint](#class-blueprint) for details._). 

```js
import { classLooksLike } from '@aedart/support/reflections';

class A {}

class B {
    foo() {}
}

const blueprint = { members: [ 'foo' ] };

classLooksLike(A, blueprint); // false
classLooksLike(B, blueprint); // true
```

## Class Blueprint

The class "blueprint" is an object that defines the expected members (_property keys_) of a target class.
All defined members must exist in target class' prototype, before the `classLooksLike()` returns `true`. 

You can specify either or both of the following properties in a class blueprint object:

- `members: PropertyKey[]` - (_optional_) Properties or methods expected to exist in class' prototype.
- `staticMembers: PropertyKey[]` - (_optional_) Properties or methods expected to exist in class as static members.

**Note:** _If you do not specify either `members` or `staticMembers`, then a `TypeError` is thrown._

```js
class A {
    foo() {}

    bar() {}
}

class B {
    foo() {}
    
    static bar() {}
}

const blueprint = { members: [ 'foo' ], staticMembers: [ 'bar' ] };

classLooksLike(A, blueprint); // false
classLooksLike(B, blueprint); // true
```

## Recursive

`classLooksLike()` traverses target class' prototype chain. This means that you can compare a subclass against a blueprint
and inherited members will automatically be included in the check.

```js
class A {
    foo() {}
}

class B extends A {
    bar() {}
}

const blueprint = { members: [ 'foo', 'bar' ]};

classLooksLike(A, blueprint); // false
classLooksLike(B, blueprint); // true
```
