/**
 * Tests if the given input is a valid object member for JSON.
 *
 * @param input Any object
 * @returns True if the input is a valid JSON object member
 */
export declare const isPlainObjectMember: (input: any) => boolean;
/**
 * Tests if the given input is a plain object.
 * These conditions are:
 *  - Is an "object"
 *  - Is not null
 *  - Has the Object constructor
 *  - Is not an Array, Map, Set, etc.
 *  - Is not from the standard library (Math, Date, etc.)
 *  - Each member is a valid object
 * @param input Any object
 * @returns True if the input is a plain object
 */
export declare const isPlainObject: (input: any) => boolean;
