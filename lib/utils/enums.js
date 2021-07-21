/**
 * Checks Enumeration classes for the existance of keys
 * @param enumClass The Enum object/class itself
 * @param key The key being searched for
 * @returns True if the key exists within the Enum object
 */
export const enumHas = (enumClass, key) => (Object.keys(enumClass).findIndex((objk) => (objk === key)) !== -1);
//# sourceMappingURL=enums.js.map