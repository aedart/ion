---
title: JSDoc
description: A wat to document what concerns a targer class uses.
sidebarDepth: 0
---

# JSDoc

Most modern IDEs support [JSDoc](https://jsdoc.app/). They can improve your coding experience via code suggestions,
highlights and other features. In this chapter, you will find a few ways that you can document your concerns and
target class, via JSDoc.

[[TOC]]

::: tip Help wanted!
_If you are an expert in JSDoc, then you are most welcome to help improve this chapter.
Please see the [contribution guide](../../../contribution-guide.md) for details on how you can contribute._
:::

## `@mixin` and `@mixes`

Possibly the easiest way to document your concern and target class that uses the concern, is via the
[`@mixin` and `@mixes`](https://jsdoc.app/tags-mixes) tags.

**Downside**: _Documenting "aliases" (known as virtual fields in the context of JSDoc) is not possible via `@mixin` and `@mixes`.
You can describe an alias via [`@function`](https://jsdoc.app/tags-function) or [`@member`](https://jsdoc.app/tags-member) tag._

```js
import { use, AbstractConcern } from "@aedart/support/concerns";

/**
 * @mixin
 * @extends AbstractConcern
 */
class Shield extends AbstractConcern {

    /**
     * Returns the armor level
     *
     * @returns {number}
     */
    get armor() {
        return 8;
    }

    /**
     * Throw shield towards a target
     *
     * @param {object} target
     *
     * @returns {number} Damage given to target
     */
    throw(target) {
        // target ignored here...
        return 3;
    }
}

/**
 * @mixes Shield
 */
@use([Shield, {
    'throw': 'fight'
}])
class Monster {

    /**
     * Alias for {@link Shield#throw}
     *
     * @function fight
     * @param {object} target The target to throw at...
     * @return {number} Damage taken by target
     * @instance
     * @memberof Monster
     */

    /**
     * Do stuff...
     */
    do() {
        this.fight({});
    }
}
```

## `@property`

Another possibility is to describe properties and methods available in a target, via the [`@property`](https://jsdoc.app/tags-property) tag.
Doing so allows you to immediately describe the "alias" name.

**Downside**: _Properties and methods described via `@property` are listed as "static" on the target class.
Also, it is not possible to reuse existing JSDoc from your concern._

```js
import { use, AbstractConcern } from "@aedart/support/concerns";

class Armor extends AbstractConcern {

    /**
     * Returns the armor level
     *
     * @returns {number}
     */
    get level() {
        return 8;
    }
}

/**
 * @property {number} armor Returns the armor level
 */
@use([Armor, {
    'level': 'armor'
}])
class Hero {}
```

## `@borrows`

The [`@borrows`](https://jsdoc.app/tags-borrows) tag does also offer a possible way to describe aliases.

**Downside**: _You are still required to use [`@member`](https://jsdoc.app/tags-member) tag to describe the actual
aliases inside your target class._ 

```js
import { use, AbstractConcern } from "@aedart/support/concerns";

/**
 * @extends AbstractConcern
 */
class Spell extends AbstractConcern {
    
    /**
     * Cast the spell
     *
     * @name cast
     * 
     * @returns {number} Damage done
     */
    cast() {
        return 7;
    }
}

/**
 * @borrows Spell#cast as damage
 */
@use([Spell, {
    'cast': 'damage'
}])
class Mage {
    
    /**
     * @function damage
     * @return {number}
     * @instance
     * @memberof Npc
     */
}
```

## `@member`

Lastly, you can use [`@member`](https://jsdoc.app/tags-member) to describe all aliases directly, without relying on the [`@borrows`](https://jsdoc.app/tags-borrows) tag.

**Downside**: _This approach can be very cumbersome. Also, reuse of JSDoc is not possible._

```js
import { use, AbstractConcern } from "@aedart/support/concerns";

class Sword extends AbstractConcern {

    /**
     * Returns amount of damage
     *
     * @returns {number}
     */
    get slash() {
        return 3;
    }

    /**
     * Returns the sword type
     *
     * @name type
     * @return {string}
     */
    get type() {
        return 'unique';
    }
}


@use([Sword, {
    'slash': 'damage'
}])
class Enemy {

    /**
     * @public
     * @member {number} damage  Alias for {@link Sword#slash}
     * @memberof Enemy
     */

    /**
     * @public
     * @member {string} type Alias for {@link Sword#type}
     * @memberof Enemy
     */
}
```