/**
 * Performs an in-place concatenation using Array.prototype.push.
 * This is useful for constant array variables.
 * Accepts multiple parameters, each array will be added
 * @param target The "this" or target array
 * @params argArr Array of values to concat
 * @returns New length of the target array
 */
export declare function inPlaceConcat<Type>(target: Array<Type>, ...argArr: Array<Array<Type>>): number;
export declare function strictValidateCountedArrayElem(props: any, elemType?: string): void;
export declare function strictValidateCountedArray(props: Array<any>, elemType?: string): void;
