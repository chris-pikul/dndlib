/**
 * An acceptable JSON value
 */
export declare type JSONValue = string | number | boolean | null | JSONValue[] | Record<string, unknown>;
/**
 * Interface for plain ol' JSON objects.
 * This helps in typing JSON serializable data.
 */
export interface JSONObject {
    [key: string]: JSONValue;
}
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
