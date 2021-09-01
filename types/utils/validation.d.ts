import type { ValidateArrayCB, ValidateObjectCB, ValidationErrors } from '../interfaces';
import { StringEnum } from './enums';
/**
 * Tests that the given input is a string and
 * matches the URI format.
 * @param input string to test
 * @param allowEmpty boolean whether to allow empty strings
 * @returns boolean true if the string is valid
 */
export declare function testURI(input: string, allowEmpty?: boolean): boolean;
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
export declare const testIfMultipleOf: (input: number, multiplier: number) => boolean;
/**
 * Adds validation errors for the given property to the supplied array of
 * errors. This operation acts IN PLACE and is not immutable.
 *
 * Checks that the prop is a boolean.
 *
 * @param errs Existing validation errors array
 * @param className The name of the class validating
 * @param propName The name of the prop being validated
 * @param prop The property itself
 * @param optional Is this prop optional (null or undefined)?
 */
export declare const validateBoolean: (errs: ValidationErrors, className: string, propName: string, prop: any, optional?: boolean) => void;
/**
 * Adds validation errors for the given property to the supplied array of
 * errors. This operation acts IN PLACE and is not immutable.
 *
 * Checks that the prop is a number, and that it is a whole integer.
 * Additional options include testing that it is positive, and that it falls
 * within an acceptable range of values.
 *
 * @param errs Existing validation errors array
 * @param className The name of the class validating
 * @param propName The name of the prop being validated
 * @param prop The property itself
 * @param options Additional validation options
 * @param optional Is this prop optional (null or undefined)?
 */
export declare const validateInteger: (errs: ValidationErrors, className: string, propName: string, prop: any, options?: ({
    positive?: boolean;
    minValue?: number;
    maxValue?: number;
    multiple?: number;
}), optional?: boolean) => void;
/**
 * Adds validation errors for the given property to the supplied array of
 * errors. This operation acts IN PLACE and is not immutable.
 *
 * Checks that the prop is a string, and optionally it's length.
 * If both the `minLength` and `maxLength` properties are the same,
 * then it insures the string is that length. This has a different error message
 * then the other processes.
 *
 * If the value is required (default), then empty strings are also rejected.
 *
 * @param errs Existing validation errors array
 * @param className The name of the class validating
 * @param propName The name of the prop being validated
 * @param prop The property itself
 * @param options Additional validation options
 * @param optional Is this prop optional (null or undefined)?
 */
export declare const validateString: (errs: ValidationErrors, className: string, propName: string, prop: any, options?: ({
    minLength?: number;
    maxLength?: number;
    absLength?: number;
    regexp?: RegExp;
}), optional?: boolean) => void;
/**
 * Adds validation errors for the given property to the supplied array of
 * errors. This operation acts IN PLACE and is not immutable.
 *
 * Checks that the prop is a string, and that it is an acceptable enum value
 * fitting the enum class provided.
 *
 * @param errs Existing validation errors array
 * @param className The name of the class validating
 * @param propName The name of the prop being validated
 * @param prop The property itself
 * @param enumClass The TypeScript enum class providing the values
 * @param optional Is this prop optional (null or undefined)?
 */
export declare const validateEnum: (errs: ValidationErrors, className: string, propName: string, prop: any, enumClass: StringEnum, optional?: boolean) => void;
/**
 * Adds validation errors for the given property to the supplied array of
 * errors. This operation acts IN PLACE and is not immutable.
 *
 * Checks that the prop is an array, and additionally validates each entry
 * in that array using the provided callback function.
 *
 * All the errors returned by the callbacks will be reduced and added to the
 * master `errs` array.
 *
 * @param errs Existing validation errors array
 * @param className The name of the class validating
 * @param propName The name of the prop being validated
 * @param prop The property itself
 * @param cb Function called on each entry, returning an array of errors
 * @param optional Is this prop optional (null or undefined)?
 * @returns Array of string errors
 */
export declare const validateArray: (errs: ValidationErrors, className: string, propName: string, prop: any, cb: ValidateArrayCB, optional?: boolean) => void;
/**
 * Adds validation errors for the given property to the supplied array of
 * errors. This operation acts IN PLACE and is not immutable.
 *
 * Checks that the prop is an object (by JSON standards). It will use the
 * callback `cb` provided to check for errors within the object. Outside of the
 * callback, it provides the remaining optional and type validation.
 *
 * @param errs Existing validation errors array
 * @param className The name of the class validating
 * @param propName The name of the prop being validated
 * @param prop The property itself
 * @param cb Function called on each entry, returning an array of errors
 * @param optional Is this prop optional (null or undefined)?
 * @returns Array of string errors
 */
export declare const validateObject: (errs: ValidationErrors, className: string, propName: string, prop: any, cb: ValidateObjectCB, optional?: boolean) => void;
/**
 * Adds validation errors for the given property to the supplied array of
 * errors. This operation acts IN PLACE and is not immutable.
 *
 * Checks that the prop is an array, and additionally validates each entry
 * in that array using the provided callback function.
 *
 * All the errors returned by the callbacks will be reduced and added to the
 * master `errs` array, prefixed by their respective index and parent class and
 * property names.
 *
 * @param errs Existing validation errors array
 * @param className The name of the class validating
 * @param propName The name of the prop being validated
 * @param prop The property itself
 * @param cb Function called on each entry, returning an array of errors
 * @param optional Is this prop optional (null or undefined)?
 * @returns Array of string errors
 */
export declare const validateArrayOfObjects: (errs: ValidationErrors, className: string, propName: string, prop: any, cb: ValidateObjectCB, optional?: boolean) => void;
