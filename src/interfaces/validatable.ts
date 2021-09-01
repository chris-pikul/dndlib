export type ValidationErrors = Array<string>;

/**
 * A promise of validation.
 * These promises SHOULD NOT reject, and instead they resolve to the array
 * of error strings. In this case, an empty return is considered passing.
 */
export type PromiseValidation = Promise<ValidationErrors>;

/**
 * Allows the object to have its data validated
 */
export interface IValidatable {
  
    /**
     * Performs a validation sweep on the properties within.
     * Returns an array of error messages if any where encountered.
     * @returns string[] of errors if any where found
     */
    validate():PromiseValidation;

    /**
     * Performs a validation sweep on the properties within.
     * Returns true if no errors where found, otherwise false.
     * This shortcuts to the validate() method and checks the results,
     * so it isn't any more performant then the standard validate().
     * @returns boolean true if the object is ok
     */
    isValid():Promise<boolean>;
}

/**
 * Callback signature for the function used in validating array properties.
 * Should return it's own immutable array of errors that will be processed
 * down.
 */
export type ValidateArrayCB = (prop:any, ind?:number) => ValidationErrors;

/**
 * Callback signature for the function used in validating object properties.
 * Should return it's own immutable array of errors that will be processed
 * down.
 */
export type ValidateObjectCB = (prop:any) => ValidationErrors;
