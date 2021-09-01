/**
 * An array of strings, intended as paragraphs of text.
 */
export declare type StringArray = string[];
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
/**
 * Contains an array of objects. Each object
 * has a "type" property of type provided,
 * and a count number. The type property
 * is expected to be an enum.
 */
export declare type CountedArray<Type> = Array<CountedArrayElem<Type>>;
/**
 * Signature for a standard Array.forEach() callback.
 */
export declare type ArrayIteratorCB = (prop: any, ind?: number) => void;
/**
 * Signature for a standard Array.map() callback.
 */
export declare type ArrayMapIteratorCB<InputType = any, ReturnType = any> = (props: InputType, ind?: number) => ReturnType;
/**
 * Signature for a finding operation like Array.find() or Array.includes()
 * callback.
 */
export declare type ArrayBooleanIteratorCB<InputType = any> = (props: InputType, ind?: number) => boolean;
