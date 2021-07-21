/**
 * Allows the object to have its data validated
 */
export interface IValidatable {
    /**
     * Performs a validation sweep on the properties within.
     * Returns an array of error messages if any where encountered.
     * @returns string[] of errors if any where found
     */
    validate(): Array<string>;
    /**
     * Performs a validation sweep on the properties within.
     * Returns true if no errors where found, otherwise false.
     * This shortcuts to the validate() method and checks the results,
     * so it isn't any more performant then the standard validate().
     * @returns boolean true if the object is ok
     */
    isValid(): boolean;
}
