/**
 * Arrayable
 * 
 * This interface is an adaptation of Laravel's Arrayable interface.
 * License MIT, Copyright (c) Taylor Otwell.
 * 
 * @see https://github.com/laravel/framework/blob/master/src/Illuminate/Contracts/Support/Arrayable.php
 * 
 * @template T
 */
export default interface Arrayable<T = unknown>
{
    /**
     * Returns an array representation of this object
     * 
     * @returns {T[]}
     */
    toArray(): T[];
}
