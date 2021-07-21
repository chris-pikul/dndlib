/**
 * Checks Enumeration classes for the existance of keys
 * @param enumClass The Enum object/class itself
 * @param key The key being searched for
 * @returns True if the key exists within the Enum object
 */
export const enumHas = (enumClass:any, key:string):boolean => (
  Object.keys(enumClass).findIndex((objk:string) => (objk === key)) !== -1
);

/**
 * A StringEnum is a object map of string keys, matching string values only.
 */
export type StringEnum = {[key:string]: string};
