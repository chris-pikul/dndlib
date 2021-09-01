import type {
  ValidateArrayCB,
  ValidateObjectCB,
  ValidationErrors,
} from '../interfaces';
import { inPlaceConcat } from './arrays';
import {
  enumHas,
  enumValuesToString,
  StringEnum,
} from './enums';
import { isPlainObject } from './json-object';

/**
 * Regular expression testing for URI formats.
 * 
 * Passes: /some/v4lu3s-go/here
 * Fails: no/prefix/and/$ymbols
 */
export const RegexpURI = /^(?:\/[a-z0-9\-_]+)+$/gi;

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
export const RegexpKabob = /^[a-z0-9-]+$/g;

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

export const testIfMultipleOf = (input:number, multiplier:number):boolean => (
  (input % multiplier) === 0
);

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
export const validateBoolean = (
  errs:ValidationErrors,
  className:string,
  propName:string,
  prop:any,
  optional = false,
):void => {
  if(!optional && !prop)
    inPlaceConcat(errs, [ `${className}.${propName} is a required boolean.` ]);

  if(prop && typeof prop !== 'boolean')
    inPlaceConcat(errs, [ `${className}.${propName} is not a boolean type, instead found "${typeof prop}".` ]);
};

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
export const validateInteger = (
  errs:ValidationErrors,
  className:string,
  propName:string,
  prop:any,
  options:({
    positive?:boolean,
    minValue?:number,
    maxValue?:number,
    multiple?:number,
  }) = {},
  optional = false,
):void => {
  const newErrs:ValidationErrors = [];

  if(!optional && !prop)
    newErrs.push(`${className}.${propName} is a required integer number.`);

  if(prop) {
    if(typeof prop === 'number') {
      if(testIfInteger(prop) === false)
        newErrs.push(`${className}.${propName} "${prop}" is not an whole integer, remove any floating point decimals.`);

      if(options.positive && testIfPositiveInteger(prop) === false)
        newErrs.push(`${className}.${propName} "${prop}" should be a positive value.`);

      if(options.minValue && prop < options.minValue)
        newErrs.push(`${className}.${propName} "${prop}" is under the minimum allowed value ${options.minValue}.`);
      
      if(options.maxValue && prop > options.maxValue)
        newErrs.push(`${className}.${propName} "${prop}" is over the maximum allowed value ${options.minValue}.`);
    
      if(options.multiple && testIfMultipleOf(prop, options.multiple) === false)
        newErrs.push(`${className}.${propName} "${prop}" is not a multiplier of "${options.multiple}".`);
    } else {
      newErrs.push(`${className}.${propName} should be a number type, instead found "${typeof prop}".`);
    }
  }

  inPlaceConcat<string>(errs, newErrs);
};

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
export const validateString = (
  errs:ValidationErrors,
  className:string,
  propName:string,
  prop:any,
  options:({
    minLength?:number,
    maxLength?:number,
    absLength?:number,
    regexp?:RegExp,
  }) = {},
  optional = false,
):void => {
  const newErrs:ValidationErrors = [];

  if(!optional && (!prop || (typeof prop === 'string' && prop.length === 0)))
    newErrs.push(`${className}.${propName} is a required string.`);

  if(prop) {
    if(typeof prop !== 'string') {
      newErrs.push(`${className}.${propName} should be a string type, instead found "${typeof prop}".`);
    } else if(options.regexp && options.regexp.test(prop) === false) {
      newErrs.push(`${className}.${propName} failed the regular expression test "${options.regexp.toString()}".`);
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
export const validateEnum = (
  errs:ValidationErrors,
  className:string,
  propName:string,
  prop:any,
  enumClass:StringEnum,
  optional = false,
):void => {
  const newErrs:ValidationErrors = [];

  if(!optional && (!prop || (typeof prop === 'string' && prop.length === 0)))
    newErrs.push(`${className}.${propName} is a required enumerated string.`);

  if(prop) {
    if(typeof prop !== 'string')
      newErrs.push(`${className}.${propName} should be an enumerated string type, instead found "${typeof prop}".`);
    else if(enumHas(enumClass, prop) === false)
      newErrs.push(`${className}.${propName} "${prop}" is not a valid enumerated string, accepted values are ${enumValuesToString(enumClass)}.`);
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
 * @param optional Is this prop optional (null or undefined)?
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
      const subErrs = prop.map(cb).filter((ent:ValidationErrors) => ent.length > 0);
      inPlaceConcat<string>(newErrs, ...subErrs);
    } else {
      newErrs.push(`${className}.${propName} should be an array type, instead found "${typeof prop}".`);
    }
  }

  inPlaceConcat<string>(errs, newErrs);
};

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
export const validateObject = (
  errs:ValidationErrors,
  className:string,
  propName:string,
  prop:any,
  cb:ValidateObjectCB,
  optional = false,
):void => {
  const newErrs:ValidationErrors = [];

  if(!optional && !prop)
    newErrs.push(`${className}.${propName} is a required object.`);

  if(prop) {
    if(isPlainObject(prop))
      newErrs.push(...cb(prop));
    else
      newErrs.push(`${className}.${propName} should be an object type, instead found "${typeof prop}".`);
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
export const validateArrayOfObjects = (
  errs:ValidationErrors,
  className:string,
  propName:string,
  prop:any,
  cb:ValidateObjectCB,
  optional = false,
):void => {
  const newErrs:ValidationErrors = [];

  if(!optional && !prop)
    newErrs.push(`${className}.${propName} is a required array.`);

  if(prop) {
    if(Array.isArray(prop)) {
      prop.forEach((ent:any, ind:number) => {
        const entErrs = cb(ent);
        if(entErrs.length > 0)
          newErrs.push(...entErrs.map((err:string) => `${className}.${propName}[${ind}]: ${err}`));
      });
    } else {
      newErrs.push(`${className}.${propName} should be an array type, instead found "${typeof prop}".`);
    }
  }

  inPlaceConcat<string>(errs, newErrs);
};
