/**
 * Checks Enumeration classes for the existance of keys
 * @param enumClass The Enum object/class itself
 * @param key The key being searched for
 * @returns True if the key exists within the Enum object
 */
export const enumHas = (enumClass, key) => (Object.keys(enumClass).findIndex((objk) => (objk === key)) !== -1);
/**
 * Returns the valid keys from a Enum class.
 *
 * @param enumClass The Enum object/class itself
 * @returns Array of enum values allowed
 */
export const enumValues = (enumClass) => Object.keys(enumClass);
/**
 * Returns the valid keys from a Enum class as a comma separated string.
 *
 * @param enumClass The Enum object/class itself
 * @returns Comma separated string
 */
export const enumValuesToString = (enumClass) => (enumValues(enumClass).join(', '));
//# sourceMappingURL=enums.js.map