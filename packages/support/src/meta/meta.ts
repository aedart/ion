import { Key } from '@aedart/contracts/support';
import { MetaCallback, MetaEntry } from '@aedart/contracts/support/meta';
import { getOrCreateRepository } from './getOrCreateRepository.js';

/**
 * Store metadata on a class or class member.
 */
export function meta(keyOrCallback: Key | MetaCallback, value?: any)
{
    return function(target: any, context: ClassDecoratorContext | ClassMemberDecoratorContext): void
    {
        const isClass = context.kind === 'class';
        const isStatic = (context as any).static ?? false;

        // 1. Stage the metadata immediately
        // @ts-expect-error TODO: Why...
        context.metadata ??= Object.create(null);
        const { key, val } = resolveKeyValue(keyOrCallback, value, target, context);

        if (!isClass) {
            const kind = context.kind === 'method' ? 'methods' : 'fields';
            const prefix = isStatic ? 'static.' : '';
            const path = `${prefix}${kind}.${String(context.name)}.${String(key)}`;
            (context.metadata as any)[path] = val;

            // NEW: If it's a static member, we can flush it immediately using addInitializer
            // because static initializers run during class definition!
            if (isStatic) {
                context.addInitializer(function(this: any) {
                    getOrCreateRepository(this).set(path, val);
                });
            }
            return;
        }

        // 2. Class Flush (Constructor & Prototype)
        const constructor = target;
        const prototype = target.prototype;

        getOrCreateRepository(constructor).set(key, val);

        const staged = context.metadata as Record<string, any>;
        for (const path in staged) {
            const destination = path.startsWith('static.') ? constructor : prototype;
            getOrCreateRepository(destination).set(path, staged[path]);
        }
    };
    
    // TODO: C - works, if new Level1() is invoked....
    // return function(target: any, context: ClassDecoratorContext | ClassMemberDecoratorContext): void
    // {
    //     const isClass = context.kind === 'class';
    //     const isStatic = (context as any).static ?? false;
    //
    //     // 1. Classes: Target is already the constructor
    //     if (isClass)
    //     {
    //         const { key, val } = resolveKeyValue(keyOrCallback, value, target, context);
    //         getOrCreateRepository(target).set(key, val);
    //         return;
    //     }
    //
    //     // 2. Members
    //     context.addInitializer(function(this: any)
    //     {
    //         // PIVOT: If this is an instance member, 'this' is the instance.
    //         // We MUST use the prototype for shared member metadata.
    //         const owner = isStatic
    //             ? this
    //             : (Object.getPrototypeOf(this) ?? this);
    //
    //         const { key, val } = resolveKeyValue(keyOrCallback, value, owner, context);
    //         const repo = getOrCreateRepository(owner);
    //
    //         const kind = context.kind === 'method' ? 'methods' : 'fields';
    //         const namespace = isStatic ? `static.${kind}` : kind;
    //
    //         repo.set(`${namespace}.${String(context.name)}.${String(key)}`, val);
    //     });
    // };
    
    // // TODO: B
    // return function(target: any, context: ClassDecoratorContext | ClassMemberDecoratorContext): void
    // {
    //     const isClass = context.kind === 'class';
    //
    //     // 1. Immediate resolution for Class Decorators
    //     if (isClass)
    //     {
    //         const { key, val } = resolveKeyValue(keyOrCallback, value, target, context);
    //         getOrCreateRepository(target).set(key, val);
    //         return;
    //     }
    //
    //     // 2. Member Decorators (Static vs Instance)
    //     const isStatic = (context as ClassMemberDecoratorContext).static ?? false;
    //
    //     // For Static members, we can attach to the 'this' context if it's 
    //     // available, or we use an initializer that runs during class definition.
    //     // To ensure the DI container sees it immediately after class load:
    //     context.addInitializer(function(this: any)
    //     {
    //         // 'this' is the Constructor for static members, 
    //         // or the Prototype for instance members.
    //         const owner = isStatic
    //             ? this
    //             : (this.prototype ?? this);
    //
    //         console.log(`Decorating ${String(context.name)} on`, owner);
    //
    //         const repo = getOrCreateRepository(owner);
    //         const { key, val } = resolveKeyValue(keyOrCallback, value, target, context);
    //
    //         const kind = context.kind === 'method' ? 'methods' : 'fields';
    //         const namespace = isStatic ? `static.${kind}` : kind;
    //
    //         repo.set(`${namespace}.${String(context.name)}.${String(key)}`, val);
    //
    //         console.log(`Repository for ${String(context.name)} parent is:`, (repo as any).parent);
    //     });
    // }
    
    // TODO: A
    // return function(target: any, context: DecoratorContext)
    // {
    //     const isClass = context.kind === 'class';
    //
    //     // 1. Immediate resolution for classes
    //     if (isClass) {
    //         const { key, val } = resolveKeyValue(keyOrCallback, value, target, context);
    //         getOrCreateRepository(target).set(key, val);
    //         return;
    //     }
    //
    //     // 2. Initializer-based resolution for all members
    //     context.addInitializer(function(this: any)
    //     {
    //         const owner = context.static
    //             ? this
    //             : (this.prototype ?? Object.getPrototypeOf(this) ?? this);
    //
    //         const repo = getOrCreateRepository(owner);
    //         const { key, val } = resolveKeyValue(keyOrCallback, value, target, context);
    //
    //         // Differentiate namespace based on static flag
    //         const kind = context.kind === 'method'
    //             ? 'methods'
    //             : 'fields';
    //
    //         const namespace = context.static
    //             ? `static.${kind}`
    //             : kind;
    //        
    //         repo.set(`${namespace}.${String(context.name)}.${String(key)}`, val);
    //     });
    // };
}

function resolveKeyValue(koc: Key | MetaCallback, v: any, target: any, context: DecoratorContext)
{
    if (typeof koc === 'function') {
        const entry: MetaEntry = (koc as MetaCallback)(target, context);
        return { key: entry.key, val: entry.value };
    }
    return { key: koc, val: v };
}
