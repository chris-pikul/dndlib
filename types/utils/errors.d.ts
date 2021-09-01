import type { JSONObject, ArrayIteratorCB } from '../interfaces';
export declare type StrictArrayPropValidationCB = string | ArrayIteratorCB;
export declare const makeStrictValidateMissingProps: (className: string) => Error;
export declare const makeStrictValidateMissingProp: (className: string, propName: string) => Error;
export declare const makeStrictValidateWrongType: (className: string, propName: string, expected: string, real: string) => Error;
export declare const makeStrictValidateArrayWrongType: (className: string, propName: string, index: number, expected: string, real: string) => Error;
/**
 * Ensures the incoming props parameter is an object, or throws the appropriate
 * error.
 *
 * @throws TypeError for any conflicts
 * @param props The props object as supplied by parameter
 * @param className The name of the class
 */
export declare const strictValidatePropsParameter: (props: any, className: string) => void;
/**
 * Checks that the given object contains a property of given name and type.
 *
 * @throws TypeError for any conflicts
 * @param props The object to search
 * @param className Name of the class
 * @param propName Property name
 * @param expectedType The type expected
 */
export declare const strictValidateRequiredProp: (props: JSONObject, className: string, propName: string, expectedType: string) => void;
/**
 * Checks that the given object contains a property of given name and that the
 * property is an object (plain object by JSON standards).
 *
 * The given validation callback will validate it further.
 *
 * @throws TypeError for any conflicts
 * @param props The object to search
 * @param className Name of the class
 * @param propName Property name
 * @param objValidation Callback to validate the property itself
 */
export declare const strictValidateRequiredObjectProp: (props: JSONObject, className: string, propName: string, objValidation: (prop: JSONObject) => void) => void;
/**
 * Checks the given properties object for a required array member of given
 * name and type. Additionally validates the array entries given the
 * `arrValidation` parameter.
 *
 * If the `arrValidation` parameter is a string, it is a standard type check.
 * If the `arrValidation` is a callback function, it is treated as an iterator
 * callback for an `Array.forEach()`.
 *
 * @param props Object whos properties we are searching
 * @param className Class name that this validation belongs to
 * @param propName The name of the property
 * @param arrValidation Either a string, or function to validate entries against
 */
export declare const strictValidateRequiredArrayProp: (props: JSONObject, className: string, propName: string, arrValidation: StrictArrayPropValidationCB) => void;
/**
 * Checks that the given object optionally contains a property of given name
 * and type.
 *
 * @throws TypeError for any conflicts
 * @param props The object to search
 * @param className Name of the class
 * @param propName Property name
 * @param expectedType The type expected
 */
export declare const strictValidateOptionalProp: (props: JSONObject, className: string, propName: string, expectedType: string) => void;
/**
 * Checks that the given object optionally contains a property of given name
 * and that the property is an object (plain object by JSON standards).
 *
 * The given validation callback will validate it further.
 *
 * @throws TypeError for any conflicts
 * @param props The object to search
 * @param className Name of the class
 * @param propName Property name
 * @param objValidation Callback to validate the property itself
 */
export declare const strictValidateOptionalObjectProp: (props: JSONObject, className: string, propName: string, objValidation: (prop: JSONObject) => void) => void;
/**
 * Checks the given properties object for an optional array member of given
 * name and type. Additionally validates the array entries given the
 * `arrValidation` parameter.
 *
 * If the `arrValidation` parameter is a string, it is a standard type check.
 * If the `arrValidation` is a callback function, it is treated as an iterator
 * callback for an `Array.forEach()`.
 *
 * @param props Object whos properties we are searching
 * @param className Class name that this validation belongs to
 * @param propName The name of the property
 * @param arrValidation Either a string, or function to validate entries against
 */
export declare const strictValidateOptionalArrayProp: (props: JSONObject, className: string, propName: string, arrValidation: StrictArrayPropValidationCB) => void;
