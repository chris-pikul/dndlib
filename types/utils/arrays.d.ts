/**
 * An array of strings, intended as paragraphs of text.
 */
export declare type StringArray = string[];
/**
 * Performs an in-place concatenation using Array.prototype.push.
 * This is useful for constant array variables.
 * Accepts multiple parameters, each array will be added
 * @param target The "this" or target array
 * @params argArr Array of values to concat
 * @returns New length of the target array
 */
export declare function inPlaceConcat<Type>(target: Array<Type>, ...argArr: Array<Array<Type>>): number;
/**
 * An element of a CountedArray, uses the properties of type and number
 */
export declare type CountedArrayElem<Type> = {
    /**
     * Enum of the type.
     */
    type: Type;
    count: number;
};
export declare function strictValidateCountedArrayElem(props: any, elemType?: string): void;
/**
 * Contains an array of objects. Each object
 * has a "type" property of type provided,
 * and a count number. The type property
 * is expected to be an enum.
 */
export declare type CountedArray<Type> = Array<CountedArrayElem<Type>>;
export declare function strictValidateCountedArray(props: Array<any>, elemType?: string): void;
