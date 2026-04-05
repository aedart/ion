---
title: Hooks
description: How to use registration hooks
sidebarDepth: 0
---

# Hooks

Concerns offer a few hook methods. These can be used to perform advanced setup or initialisation logic.   

[[TOC]]

## `BEFORE` Registration

To perform pre-registration logic, use the static `BEFORE` method in your concern class.
This hook method is invoked before the concern container and aliases are defined in the target class. 

The method accepts the following arguments:

- `target: UsesConcerns` - the target class (_class constructor!_).

```js
import { BEFORE } from "@aedart/contracts/support/concerns";
import { AbstractConcern } from "@aedart/support/concerns";
import { isSubclass } from '@aedart/support/reflections';

import { JobHandler } from '@acme/jobs';

class RecordsJobs extends AbstractConcern {
    
    static [BEFORE](target) {
        // E.g. prevent this concern from being used by all kinds of targets...
        if (!isSubclass(target, JobHandler)) {
            throw new TypeError('RecordsJobs can only be used by JobHandler');
        }
    }
}
```

## `AFTER` Registration

To perform post-registration logic, use the static `AFTER` method in your concern class.
This method is invoked after the concern container and aliases have been defined in target's prototype.

The method accepts the following arguments:

- `target: UsesConcerns` - the target class (_class constructor!_).

```js
import { AFTER } from "@aedart/contracts/support/concerns";
import { AbstractConcern } from "@aedart/support/concerns";

import { ApiConnection } from '@acme/api';

class RecordsJobs extends AbstractConcern {
    
    static [AFTER](target) {
        // E.g. init or setup static resources...
        ApiConnection.init();
    }
}
```