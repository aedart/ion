import {PagesCollection} from "@aedart/vuepress-utils/navigation";

/**
 * Version 0.x
 */
export default PagesCollection.make('v0.x', '/v0x', [
    {
        text: 'Version 0.x',
        collapsible: true,
        children: [
            '',
            'upgrade-guide',
            // 'new',
            'contribution-guide',
            'security',
            'code-of-conduct',
            'origin',
        ]
    },
    {
        text: 'Packages',
        collapsible: true,
        children: [
            'packages/',
            {
                text: 'Container',
                collapsible: true,
                children: [
                    'packages/container/',
                    'packages/container/prerequisites',
                    'packages/container/install',
                    'packages/container/container-instance',
                    'packages/container/bindings',
                    'packages/container/dependencies',
                    'packages/container/resolving',
                    'packages/container/contextual-bindings',
                ]
            },
            {
                text: 'Contracts',
                collapsible: true,
                children: [
                    'packages/contracts/',
                    'packages/contracts/install',
                ]
            },
            {
                text: 'Support',
                collapsible: true,
                children: [
                    'packages/support/',
                    'packages/support/install',
                    {
                        text: 'Arrays',
                        collapsible: true,
                        children: [
                            'packages/support/arrays/',
                            'packages/support/arrays/includesAll',
                            'packages/support/arrays/includesAny',
                            'packages/support/arrays/isArrayLike',
                            'packages/support/arrays/isConcatSpreadable',
                            'packages/support/arrays/isSafeArrayLike',
                            'packages/support/arrays/isTypedArray',
                            'packages/support/arrays/merge',
                        ]
                    },
                    {
                        text: 'Concerns',
                        collapsible: true,
                        children: [
                            'packages/support/concerns/',
                            'packages/support/concerns/prerequisites',
                            'packages/support/concerns/concernClass',
                            'packages/support/concerns/usage',
                            'packages/support/concerns/aliases',
                            'packages/support/concerns/conflictResolution',
                            'packages/support/concerns/booting',
                            'packages/support/concerns/hooks',
                            'packages/support/concerns/edgeCases',
                            'packages/support/concerns/jsdoc',
                        ]
                    },
                    {
                        text: 'Exceptions',
                        collapsible: true,
                        children: [
                            'packages/support/exceptions/',
                            'packages/support/exceptions/configureCustomError',
                            'packages/support/exceptions/configureStackTrace',
                            'packages/support/exceptions/getErrorMessage',
                            'packages/support/exceptions/customErrors',
                        ]
                    },
                    {
                        text: 'Facades',
                        collapsible: true,
                        children: [
                            'packages/support/facades/',
                        ]
                    },
                    {
                        text: 'Meta',
                        collapsible: true,
                        children: [
                            'packages/support/meta/',
                            'packages/support/meta/prerequisites',
                            'packages/support/meta/supported',
                            'packages/support/meta/setAndGet',
                            'packages/support/meta/inheritance',
                            'packages/support/meta/outsideChanges',
                            'packages/support/meta/tc39',
                            'packages/support/meta/targetMeta',
                        ]
                    },
                    {
                        text: 'Mixins',
                        collapsible: true,
                        children: [
                            'packages/support/mixins/',
                            'packages/support/mixins/newMixin',
                            'packages/support/mixins/apply',
                            'packages/support/mixins/instanceof',
                            'packages/support/mixins/inheritance',
                            'packages/support/mixins/onward',
                        ]
                    },
                    {
                        text: 'Object',
                        collapsible: true,
                        children: [
                            'packages/support/objects/',
                            'packages/support/objects/forget',
                            'packages/support/objects/forgetAll',
                            'packages/support/objects/get',
                            'packages/support/objects/has',
                            'packages/support/objects/hasAll',
                            'packages/support/objects/hasAny',
                            'packages/support/objects/hasUniqueId',
                            'packages/support/objects/isCloneable',
                            'packages/support/objects/isPopulatable',
                            'packages/support/objects/isset',
                            'packages/support/objects/merge',
                            'packages/support/objects/populate',
                            'packages/support/objects/set',
                            'packages/support/objects/uniqueId',
                        ]
                    },
                    {
                        text: 'Reflections',
                        collapsible: true,
                        children: [
                            'packages/support/reflections/',
                            'packages/support/reflections/assertHasPrototypeProperty',
                            'packages/support/reflections/classLooksLike',
                            'packages/support/reflections/classOwnKeys',
                            'packages/support/reflections/getAllParentsOfClass',
                            'packages/support/reflections/getClassPropertyDescriptor',
                            'packages/support/reflections/getClassPropertyDescriptors',
                            'packages/support/reflections/getConstructorName',
                            'packages/support/reflections/getNameOrDesc',
                            'packages/support/reflections/getParentOfClass',
                            'packages/support/reflections/hasAllMethods',
                            'packages/support/reflections/hasMethod',
                            'packages/support/reflections/hasPrototypeProperty',
                            'packages/support/reflections/isCallable',
                            'packages/support/reflections/isClassConstructor',
                            'packages/support/reflections/isClassMethodReference',
                            'packages/support/reflections/isConstructor',
                            'packages/support/reflections/isKeySafe',
                            'packages/support/reflections/isKeyUnsafe',
                            'packages/support/reflections/isMethod',
                            'packages/support/reflections/isSubclass',
                            'packages/support/reflections/isSubclassOrLooksLike',
                            'packages/support/reflections/isWeakKind',
                        ]
                    },
                    {
                        text: 'Misc',
                        collapsible: true,
                        children: [
                            'packages/support/misc/',
                            'packages/support/misc/descTag',
                            'packages/support/misc/empty',
                            'packages/support/misc/isKey',
                            'packages/support/misc/isPrimitive',
                            'packages/support/misc/isPropertyKey',
                            'packages/support/misc/isset',
                            'packages/support/misc/mergeKeys',
                            'packages/support/misc/toWeakRef',
                        ]
                    },
                    'packages/support/CallbackWrapper',
                ]
            },
            {
                text: 'Vuepress Utils',
                collapsible: true,
                children: [
                    'packages/vuepress-utils/',
                    'packages/vuepress-utils/install',
                    {
                        text: 'Navigation',
                        collapsible: true,
                        children: [
                            // 'packages/vuepress-utils/navigation', // No index page...
                            'packages/vuepress-utils/navigation/archive',
                        ]
                    },
                    {
                        text: 'Plugins',
                        collapsible: true,
                        children: [
                            // 'packages/vuepress-utils/plugins', // No index page...
                            'packages/vuepress-utils/plugins/last-updated',
                        ]
                    },
                    {
                        text: 'Components',
                        collapsible: true,
                        children: [
                            // 'packages/vuepress-utils/components', // No index page...
                            'packages/vuepress-utils/components/version-disclaimer',
                        ]
                    },
                ]
            },
            
            // TEST Package... should not contain anything special..
            // {
            //     text: 'XYZ (Test package)',
            //     collapsible: true,
            //     children: [
            //         'packages/xyz/',
            //     ]
            // }
            'packages/xyz/'
        ]
    }, 
]);