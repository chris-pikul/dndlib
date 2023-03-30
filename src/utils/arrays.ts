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
 * Attempts to flatten an array of sub-arrays into a single flat array.
 * This is mostly a polyfill for the Array.flat() function.
 * @param arr Parent array
 * @param depth How far in depth should we flatten
 * @returns New array
 */
export function flattenArray<Type>(arr:Array<any>, depth = 1):Array<Type> {
  if(Array.isArray(arr) === false)
    return [];

  if(depth > 0) {
    return arr.reduce((acc:Array<Type>, val:unknown) => {
      if(Array.isArray(val))
        return acc.concat(flattenArray<Type>(val, depth - 1));
      return val;
    }, [] as Array<Type>);
  }
  return arr.slice();
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

export function strictValidateCountedArray(props:Array<any>, elemType?:string):void {
  if(!props || typeof props !== 'object' || Array.isArray(props) === false)
    throw new TypeError(`StrictValidateCountedArray requires a valid array object parameter.`);
    
  props.forEach((ent:unknown) => strictValidateCountedArrayElem(ent, elemType));
}
