/**
 * Checks Enumeration classes for the existance of keys
 * @param enumClass The Enum object/class itself
 * @param key The key being searched for
 * @returns True if the key exists within the Enum object
 */
export const enumHas = (enumClass: any, key: string): boolean =>
    Object.keys(enumClass).findIndex((objk: string) => objk === key) !== -1;

/**
 * A StringEnum is a object map of string keys, matching string values only.
 */
export type StringEnum = { [key: string]: string };

/**
 * Returns the valid keys from a Enum class.
 *
 * @param enumClass The Enum object/class itself
 * @returns Array of enum values allowed
 */
export const enumValues = (enumClass: any): Array<string> =>
    Object.keys(enumClass);

/**
 * Returns the valid keys from a Enum class as a comma separated string.
 *
 * @param enumClass The Enum object/class itself
 * @returns Comma separated string
 */
export const enumValuesToString = (enumClass: any): string =>
    enumValues(enumClass).join(', ');
