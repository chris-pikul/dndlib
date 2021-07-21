/**
 * Regular expression testing for URI formats.
 *
 * Passes: /some/v4lu3s-go/here
 * Fails: no/prefix/and/$ymbols
 */
export const RegexpURI = /^(?:\/[A-Za-z0-9\-_]+)+$/g;
/**
 * Tests that the given input is a string and
 * matches the URI format.
 * @param input string to test
 * @param allowEmpty boolean whether to allow empty strings
 * @returns boolean true if the string is valid
 */
export function testURI(input, allowEmpty = false) {
    if (allowEmpty && input.length === 0)
        return true;
    else if (input.length === 0)
        return false;
    return RegexpURI.test(input);
}
/**
 * Regular expression matching kabob-case text
 *
 * Passes: any-values01-here
 * Fails: Caps_and-symbols
 */
export const RegexpKabob = /^[a-z0-9-]+$/g;
/**
 * Tests that the given input is a string and
 * matches the kabob-case format.
 * @param input string to test
 * @param allowEmpty boolean whether to allow empty strings
 * @returns boolean true if the string is valid
 */
export function testKabob(input, allowEmpty = false) {
    if (allowEmpty && input.length === 0)
        return true;
    else if (input.length === 0)
        return false;
    return RegexpURI.test(input);
}
/**
 * Tests that the given input object is an integer number
 * @param input any object
 * @returns boolean true if the supplied value is an integer number
 */
export const testIfInteger = (input) => (input !== null
    && typeof input === 'number'
    && Number.isInteger(input));
/**
 * Tests that the given input object is a positive integer number
 * @param input any object
 * @returns boolean true if the supplied value is a positive integer number
 */
export const testIfPositiveInteger = (input) => (testIfInteger(input) && input >= 0);
//# sourceMappingURL=validation.js.map