/* eslint no-use-before-define: 'off' */
/**
 * Tests if the given input is a valid object member for JSON.
 *
 * @param input Any object
 * @returns True if the input is a valid JSON object member
 */
export const isPlainObjectMember = (input) => {
    if (typeof input === 'undefined')
        return false;
    if (input == null)
        return true;
    switch (typeof input) {
        case 'string':
            return true;
        case 'number':
            return true;
        case 'boolean':
            return true;
        case 'object':
            if (Array.isArray(input)) {
                // Ensure each member of the array is also a valid member
                return input.findIndex((ent) => !isPlainObjectMember(ent)) === -1;
            }
            return isPlainObject(input);
        default:
            return false;
    }
};
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
export const isPlainObject = (input) => (typeof input === 'object'
    && input !== null
    && input.constructor === Object
    && Object.prototype.toString.call(input) === '[object Object]'
    && (Object.keys(input).findIndex((key) => !isPlainObjectMember(input[key])) === -1));
//# sourceMappingURL=json-object.js.map