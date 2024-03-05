import {AbstractConcern, use} from "@aedart/support/concerns";

describe('@aedart/support/concerns', () => {
    describe('JSDoc ', () => {

        // NOTE: These test are NOT produce any JSDOC - they are just for tinkering
        // in the IDE (PHPStorm / IntelliJ) to see what works in plain JavaScript.
        
        it('@property', () => {

            // @property = documentation of static properties of a class, namespace or other object!
            // @see https://jsdoc.app/tags-property
            
            class Armor extends AbstractConcern {

                /**
                 * Returns the armor level
                 * 
                 * @returns {number}
                 */
                get armor() {
                    return 8;
                }
            }

            /**
             * @property {number} armor
             */
            @use(Armor)
            class Hero {}

            // --------------------------------------------------------------------------- //

            const instance = new Hero();
            
            // Works... but "armor" is now static on Hero, and not the instance of Hero!
            // E.g. Hero.armor !!!
            // Another downside is that we cannot reuse JSDoc defined in the concern class.
            
            expect(instance.armor)
                .toBe(8);
        });

        it('@member / @var', () => {
            // @var and @member can be used to document "virtual" properties
            // @see https://jsdoc.app/tags-member

            class Sword extends AbstractConcern {

                /**
                 * Returns amount of damage
                 *
                 * @returns {number}
                 */
                get damage() {
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


            @use(Sword)
            class Enemy {

                /**
                 * Virtual property
                 *
                 * @public
                 * @member {number} damage  Alias for {@link Sword#damage}
                 * @memberof Enemy.prototype
                 */

                /**
                 * @public
                 * @var {string} type Alias for {@link Sword#type}
                 * @instance
                 * @memberof Enemy
                 */

                /**
                 * Fight
                 * 
                 * @return {void}
                 */
                fight() {
                    // this.damage; // works
                    // this.type; // works also
                }
            }

            // --------------------------------------------------------------------------- //

            const instance = new Enemy();
            
            // Works, but can be much more cumbersome do define.
            // Notice the "@name" usage in the concern. That is important so that @link can reference the element!
            // Downside, concern's JSDoc is not used. It's only referenced to via a @link

            // instance.type = 321; // Type check will complain here...
            
            expect(instance.damage)
                .toBe(3);
            expect(instance.type)
                .toBe('unique');
        });

        it('@borrows', () => {
            // Using @borrows in combination with @member or @var, "virtual" properties can also be documented
            // @see https://jsdoc.app/tags-borrows

            /**
             * @extends AbstractConcern
             */
            class Spell extends AbstractConcern {

                /**
                 * Returns amount of damage
                 *
                 * @name damage
                 * @returns {number}
                 */
                get damage() {
                    return 1;
                }

                /**
                 * Returns the spell's name
                 *
                 * @name name
                 * @return {string}
                 */
                get name() {
                    return 'sleep';
                }

                /**
                 * Cast the spell
                 * 
                 * @name cast
                 * @returns {number} Damage done
                 */
                cast() {
                    return this.damage;
                }
            }

            /**
             * @borrows Spell#damage as damage Spell damage
             */
            @use(Spell)
            class Npc {
                
                /**
                 * Alias for {@link Spell#damage}
                 * @var damage
                 * @readonly
                 * @instance
                 * @memberof Npc
                 */

                /**
                 * @borrows Spell#name as name
                 * @member {string} name Alias for {@link Spell#name}
                 * @instance
                 * @memberof Npc
                 */

                /**
                 * Alias for {@link Spell#cast}
                 * 
                 * @borrows Spell#cast as cast
                 * @function cast
                 * @return {number}
                 * @instance
                 * @memberof Npc
                 */
            }

            /**
             * @extends Npc
             */
            class MageNpc extends Npc {}
            
            // --------------------------------------------------------------------------- //

            const instance = new MageNpc();
            
            // Works... but still cumbersome.
            // Downside, concern's JSDoc is not used. It's only referenced to via a @link.
            // Also, the {type} MUST still be provided or no type assistance is given.

            // instance.damage = 'fish'; // Ah... somehow the property is now lost is lost.
            
            expect(instance.damage)
                .toBe(1);
            expect(instance.name)
                .toBe('sleep');
            expect(instance.cast())
                .toBe(instance.damage);
        });

        it('@mixin and @mixes', () => {
            // @see https://jsdoc.app/tags-mixes

            /**
             * @mixin
             * @extends AbstractConcern (bad here, because `concernOwner` is suggested by IDE. But @extend required for some reason!!!)
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
            @use({
                concern: Shield,
                aliases: {
                    'throw': 'fight'
                }
            })
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

            // --------------------------------------------------------------------------- //

            const instance = new Monster();
            
            // Works, but it seems that all props / methods are also available statically.
            // JSDoc is automatically inherited, so less cumbersome.
            // Downside:
            //      - @extends AbstractConcern MUST be stated or IDE fails to understand!?
            //      - Cumbersome to define alias!

            expect(instance.armor)
                .toBe(8);
            expect(instance.fight({}))
                .toBe(3);
        });
    });
});