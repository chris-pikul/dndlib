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
     * Performs a asynchronous validation by returning a Promise resolving
     * to an array of validation errors.
     * 
     * In most cases, this just wraps the validateSync() function into a 
     * promise for use async.
     * 
     * @returns Promise<ValidationErrors>
     */
    validate():PromiseValidation;


    /**
     * Performs a validation sweep on the properties within.
     * Returns an array of error messages if any where encountered.
     * 
     * The optional parameter is supplied if you want to use your own parent
     * or super errors array to be concatenated to. This is most helpful in
     * the async versions to allow the super class to run it's validation
     * async and then pass them to this sync version validator.
     * 
     * @returns string[] of errors if any where found
     */
    validateSync(parentErrs?:ValidationErrors):ValidationErrors;

    /**
     * Performs a validation sweep on the properties within.
     * Returns true if no errors where found, otherwise false.
     * This shortcuts to the validate() method and checks the results,
     * so it isn't any more performant then the standard validate().
     * 
     * @returns Promise resolving to a boolean true if everything is ok
     */
    isValid():Promise<boolean>;

    /**
     * Performs a validation sweep on the properties within.
     * Returns true if no errors where found, otherwise false.
     * This shortcuts to the validate() method and checks the results,
     * so it isn't any more performant then the standard validate().
     * 
     * This is a syncronous option if the standard async isValid is not
     * suitable
     * 
     * @return boolean true if the object is ok
     */
    isValidSync():boolean;
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
