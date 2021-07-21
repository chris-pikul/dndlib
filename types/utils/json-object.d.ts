/**
 * Tests if the given input is a plain object.
 * These conditions are:
 *  - Is an "object"
 *  - Is not null
 *  - Has the Object constructor
 *  - Is not an Array, Map, Set, etc.
 *  - Is not from the standard library (Math, Date, etc.)
 * @param input Any object
 * @returns True if the input is a plain object
 */
export declare const isPlainObject: (input: any) => boolean;
