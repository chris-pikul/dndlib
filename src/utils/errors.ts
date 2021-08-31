import type { JSONObject, ArrayIteratorCB } from '../interfaces';
import { isPlainObject } from './json-object';

export type StrictArrayPropValidationCB = string | ArrayIteratorCB;

export const makeStrictValidateMissingProps = (className:string):Error => new TypeError(`${className}.StrictValidateProps requires a valid parameter to check, none was given.`);

export const makeStrictValidateMissingProp = (className:string, propName:string):Error => new TypeError(`Missing "${propName}" property for ${className}.`);

export const makeStrictValidateWrongType = (className:string, propName:string, expected:string, real:string):Error => new TypeError(`${className} "${propName}" property must be a(n) ${expected}. Instead found "${real}".`);

export const makeStrictValidateArrayWrongType = (className:string, propName:string, index:number, expected:string, real:string):Error => new TypeError(`${className} "${propName}" array property must have index ${index} be a(n) ${expected}. Instead found "${real}".`);

/**
 * Ensures the incoming props parameter is an object, or throws the appropriate
 * error.
 * 
 * @throws TypeError for any conflicts
 * @param props The props object as supplied by parameter
 * @param className The name of the class
 */
export const strictValidatePropsParameter = (props:any, className:string):void => {
  if(!isPlainObject(props))
    throw makeStrictValidateMissingProps(className);
};

/**
 * Checks that the given object contains a property of given name and type.
 * 
 * @throws TypeError for any conflicts
 * @param props The object to search
 * @param className Name of the class
 * @param propName Property name
 * @param expectedType The type expected
 */
export const strictValidateRequiredProp = (
  props:JSONObject,
  className:string,
  propName:string,
  expectedType:string
):void => {
  if(!props[propName])
    throw makeStrictValidateMissingProp(className, propName);
  
  if(typeof props[propName] !== expectedType)
    throw makeStrictValidateWrongType(className, propName, expectedType, typeof props[propName]);
};

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
export const strictValidateRequiredObjectProp = (
  props:JSONObject,
  className:string,
  propName:string,
  objValidation:(prop:JSONObject) => void,
):void => {
  if(!props[propName])
    throw makeStrictValidateMissingProp(className, propName);

  if(!isPlainObject(props[propName]))
    throw makeStrictValidateWrongType(className, propName, 'object', typeof props[propName]);

  objValidation(props[propName] as JSONObject);
};

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
export const strictValidateRequiredArrayProp = (
  props:JSONObject,
  className:string,
  propName:string,
  arrValidation:StrictArrayPropValidationCB,
):void => {
  if(!props[propName])
    throw makeStrictValidateMissingProp(className, propName);

  if(!Array.isArray(props[propName]))
    throw makeStrictValidateWrongType(className, propName, 'array', typeof props[propName]);

  if(typeof arrValidation === 'string') {
    (props[propName] as Array<any>).forEach((ent:any, ind:number) => {
      if(typeof ent !== arrValidation)
        throw makeStrictValidateArrayWrongType(className, propName, ind, arrValidation, typeof ent);
    });
  } else {
    (props[propName] as Array<any>).forEach(arrValidation);
  }
};

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
export const strictValidateOptionalProp = (
  props:JSONObject,
  className:string,
  propName:string,
  expectedType:string
):void => {
  if(props[propName]) {
    if(typeof props[propName] !== expectedType)
      throw makeStrictValidateWrongType(className, propName, expectedType, typeof props[propName]);
  }
};

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
export const strictValidateOptionalObjectProp = (
  props:JSONObject,
  className:string,
  propName:string,
  objValidation:(prop:JSONObject) => void,
):void => {
  if(props[propName]) {
    if(!isPlainObject(props[propName]))
      throw makeStrictValidateWrongType(className, propName, 'object', typeof props[propName]);

    objValidation(props[propName] as JSONObject);
  }
};

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
export const strictValidateOptionalArrayProp = (
  props:JSONObject,
  className:string,
  propName:string,
  arrValidation:StrictArrayPropValidationCB,
):void => {
  if(props[propName]) {
    if(!Array.isArray(props[propName]))
      throw makeStrictValidateWrongType(className, propName, 'array', typeof props[propName]);

    if(typeof arrValidation === 'string') {
      (props[propName] as Array<any>).forEach((ent:any, ind:number) => {
        if(typeof ent !== arrValidation)
          throw makeStrictValidateArrayWrongType(className, propName, ind, arrValidation, typeof ent);
      });
    } else {
      (props[propName] as Array<any>).forEach(arrValidation);
    }
  }
};
