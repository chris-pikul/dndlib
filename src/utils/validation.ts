import type { ValidateArrayCB, ValidationErrors } from '../interfaces';
import { inPlaceConcat } from './arrays';

/**
 * Regular expression testing for URI formats.
 * 
 * Passes: /some/v4lu3s-go/here
 * Fails: no/prefix/and/$ymbols
 */
const RegexpURI = /^(?:\/[a-z0-9\-_]+)+$/gi;

/**
 * Tests that the given input is a string and
 * matches the URI format.
 * @param input string to test
 * @param allowEmpty boolean whether to allow empty strings
 * @returns boolean true if the string is valid
 */
export function testURI(input:string, allowEmpty = false):boolean {
  if(allowEmpty && input.length === 0)
    return true;
  else if(input.length === 0)
    return false;
  return RegexpURI.test(input);
}

/**
 * Regular expression matching kabob-case text
 * 
 * Passes: any-values01-here
 * Fails: Caps_and-symbols
 */
const RegexpKabob = /^[a-z0-9-]+$/g;

/**
 * Tests that the given input is a string and
 * matches the kabob-case format.
 * @param input string to test
 * @param allowEmpty boolean whether to allow empty strings
 * @returns boolean true if the string is valid
 */
export function testKabob(input:string, allowEmpty = false):boolean {
  if(allowEmpty && input.length === 0)
    return true;
  else if(input.length === 0)
    return false;
  return RegexpKabob.test(input);
}

/**
 * Tests that the given input object is an integer number
 * @param input any object
 * @returns boolean true if the supplied value is an integer number
 */
export const testIfInteger = (input:any):boolean => (
  input !== null
    && typeof input === 'number'
    && Number.isInteger(input)
);

/**
 * Tests that the given input object is a positive integer number
 * @param input any object
 * @returns boolean true if the supplied value is a positive integer number
 */
export const testIfPositiveInteger = (input:any):boolean => (testIfInteger(input) && input >= 0);

/**
 * Adds validation errors for the given property to the supplied array of
 * errors. This operation acts IN PLACE and is not immutable.
 * 
 * Checks that the prop is a string, and optionally it's length.
 * If both the `minLength` and `maxLength` properties are the same,
 * then it insures the string is that length. This has a different error message
 * then the other processes.
 * 
 * @param errs Existing validation errors array
 * @param className The name of the class validating
 * @param propName The name of the prop being validated
 * @param prop The property itself
 * @param options Additional validation options
 * @param required Is this prop required (non-null)?
 */
export const validateString = (
  errs:ValidationErrors,
  className:string,
  propName:string,
  prop:any,
  options:({
    minLength?:number,
    maxLength?:number,
    absLength?:number,
  }) = {},
  optional = false,
):void => {
  const newErrs:ValidationErrors = [];

  if(!optional && !prop)
    newErrs.push(`${className}.${propName} is a required string.`);

  if(prop) {
    if(typeof prop !== 'string') {
      newErrs.push(`${className}.${propName} should be a string type, instead found "${typeof prop}".`);
    } else if(options.absLength) {
      if(prop.length !== options.absLength)
        newErrs.push(`${className}.${propName} "${prop}" should have an exact length of ${options.absLength}, instead it has a length of ${prop.length}.`);
    } else if(options.minLength || options.maxLength) {
      if(options.minLength && prop.length < options.minLength)
        newErrs.push(`${className}.${propName} "${prop}" should have a minumum length of ${options.minLength}, instead it has a length of ${prop.length}.`);
    
      if(options.maxLength && prop.length > options.maxLength)
        newErrs.push(`${className}.${propName} "${prop}" should have a maximum length of ${options.maxLength}, instead it has a length of ${prop.length}.`);
    }
  }

  inPlaceConcat<string>(errs, newErrs);
};

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
 * @param required Is this prop required (non-null)?
 * @returns Array of string errors
 */
export const validateArray = (
  errs:ValidationErrors,
  className:string,
  propName:string,
  prop:any,
  cb:ValidateArrayCB,
  optional = false,
):void => {
  const newErrs:ValidationErrors = [];

  if(!optional && !prop)
    newErrs.push(`${className}.${propName} is a required array.`);

  if(prop) {
    if(Array.isArray(prop)) {
      const subErrs = prop.map(cb);
      inPlaceConcat<string>(newErrs, ...subErrs);
    } else {
      newErrs.push(`${className}.${propName} should be an array type, instead found "${typeof prop}".`);
    }
  }

  inPlaceConcat<string>(errs, newErrs);
};
