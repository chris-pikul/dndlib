/**
 * An array of strings, intended as paragraphs of text.
 */
export type StringArray = string[];

/**
 * Performs an in-place concatenation using Array.prototype.push.
 * This is useful for constant array variables.
 * Accepts multiple parameters, each array will be added
 * @param target The "this" or target array
 * @params argArr Array of values to concat
 * @returns New length of the target array
 */
export function inPlaceConcat<Type>(target:Array<Type>, ...argArr:Array<Array<Type>>):number {
  return Math.max.apply(
    null,
    argArr.map((arr:Array<Type>) => (Array.prototype.push.apply(target, arr)))
  );
}

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

export function strictValidateCountedArrayElem(props:any, elemType?:string):void {
  if(!props || typeof props !== 'object')
    throw new TypeError(`StrictValidateCountedArrayElem requires a valid object parameter.`);

  if(!props.type)
    throw new TypeError(`Missing "type" property for CountedArrayElem.`);
  if(elemType && typeof props.type !== elemType)
    throw new TypeError(`CountedArrayElem "type" property must be a "${elemType}", instead found "${typeof props.type}".`);

  if(!props.count)
    throw new TypeError(`Missing "count" property for CountedArrayElem.`);
  if(typeof props.count !== 'number')
    throw new TypeError(`CountedArrayElem "count" property must be a number, instead found "${typeof props.count}".`);
}

/**
 * Contains an array of objects. Each object
 * has a "type" property of type provided,
 * and a count number. The type property
 * is expected to be an enum.
 */
export type CountedArray<Type> = Array<CountedArrayElem<Type>>;

export function strictValidateCountedArray(props:Array<any>, elemType?:string):void {
  if(!props || typeof props !== 'object' || Array.isArray(props) === false)
    throw new TypeError(`StrictValidateCountedArray requires a valid array object parameter.`);
    
  props.forEach((ent:unknown) => strictValidateCountedArrayElem(ent, elemType));
}
