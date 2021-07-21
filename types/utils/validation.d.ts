/**
 * Regular expression testing for URI formats.
 *
 * Passes: /some/v4lu3s-go/here
 * Fails: no/prefix/and/$ymbols
 */
export declare const RegexpURI: RegExp;
/**
 * Tests that the given input is a string and
 * matches the URI format.
 * @param input string to test
 * @param allowEmpty boolean whether to allow empty strings
 * @returns boolean true if the string is valid
 */
export declare function testURI(input: string, allowEmpty?: boolean): boolean;
/**
 * Regular expression matching kabob-case text
 *
 * Passes: any-values01-here
 * Fails: Caps_and-symbols
 */
export declare const RegexpKabob: RegExp;
/**
 * Tests that the given input is a string and
 * matches the kabob-case format.
 * @param input string to test
 * @param allowEmpty boolean whether to allow empty strings
 * @returns boolean true if the string is valid
 */
export declare function testKabob(input: string, allowEmpty?: boolean): boolean;
/**
 * Tests that the given input object is an integer number
 * @param input any object
 * @returns boolean true if the supplied value is an integer number
 */
export declare const testIfInteger: (input: any) => boolean;
/**
 * Tests that the given input object is a positive integer number
 * @param input any object
 * @returns boolean true if the supplied value is a positive integer number
 */
export declare const testIfPositiveInteger: (input: any) => boolean;
