/**
 * An array of strings, intended as paragraphs of text.
 */
export type StringArray = string[];

/**
 * An element of a CountedArray, uses the properties of type and number
 */
export type CountedArrayElem<Type> = {

  /**
   * Enum of the type.
   */
  type : Type;

  count : number;
};

/**
 * Contains an array of objects. Each object
 * has a "type" property of type provided,
 * and a count number. The type property
 * is expected to be an enum.
 */
export type CountedArray<Type> = Array<CountedArrayElem<Type>>;
