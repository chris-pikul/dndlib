import { JSONObject } from './json';

/**
 * Says that a class can have it's properties
 * assigned using a JSON Object.
 */
export interface IAssignable {

    /**
     * Applies the properties within the JSON Object
     * parameter to the class's member properties.
     * 
     * Should do it's best to conform the data, or
     * not apply it if it cannot.
     * 
     * Does NOT throw exceptions. Leave the error
     * checking to the validation layers.
     * 
     * @param props JSON Object
     */
    assign(props:JSONObject):void;
}
