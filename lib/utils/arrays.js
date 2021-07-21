/**
 * Performs an in-place concatenation using Array.prototype.push.
 * This is useful for constant array variables.
 * Accepts multiple parameters, each array will be added
 * @param target The "this" or target array
 * @params argArr Array of values to concat
 * @returns New length of the target array
 */
export function inPlaceConcat(target, ...argArr) {
    return Math.max.apply(null, argArr.map((arr) => (Array.prototype.push.apply(target, arr))));
}
export function strictValidateCountedArrayElem(props, elemType) {
    if (!props || typeof props !== 'object')
        throw new TypeError(`StrictValidateCountedArrayElem requires a valid object parameter.`);
    if (!props.type)
        throw new TypeError(`Missing "type" property for CountedArrayElem.`);
    if (elemType && typeof props.type !== elemType)
        throw new TypeError(`CountedArrayElem "type" property must be a "${elemType}", instead found "${typeof props.type}".`);
    if (!props.count)
        throw new TypeError(`Missing "count" property for CountedArrayElem.`);
    if (typeof props.count !== 'number')
        throw new TypeError(`CountedArrayElem "count" property must be a number, instead found "${typeof props.count}".`);
}
export function strictValidateCountedArray(props, elemType) {
    if (!props || typeof props !== 'object' || Array.isArray(props) === false)
        throw new TypeError(`StrictValidateCountedArray requires a valid array object parameter.`);
    props.forEach((ent) => strictValidateCountedArrayElem(ent, elemType));
}
//# sourceMappingURL=arrays.js.map