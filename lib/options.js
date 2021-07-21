// IMPORTANT NOTE: This should be changed over to classes
import { isPlainObject, } from './utils/json-object';
import { testIfPositiveInteger } from './utils/validation';
/**
 * Easy to reference object for empty or "null" data.
 */
export const NullOptions = {
    amount: 0,
    choices: [],
    fromAny: false,
};
/**
 * Factory function for creating an Options object
 * from the given JSON object.
 *
 * This does not ensure that the Types of the options
 * conforms, it only insures they are valid objects.
 *
 * @param input JSONObject
 * @returns Options
 */
export function makeOptions(input) {
    if (!isPlainObject(input))
        return NullOptions;
    const obj = NullOptions;
    if (input.amount && testIfPositiveInteger(input.amount))
        obj.amount = input.amount;
    if (input.choices !== null && Array.isArray(input.choices))
        obj.choices = input.choices.filter(ent => (ent && isPlainObject(ent)));
    if (input.fromAny && typeof input.fromAny === 'boolean')
        obj.fromAny = !!input.fromAny;
    return obj;
}
/**
 * Easy to reference object for empty or "null" data.
 */
export const NullOptionsArray = [];
/**
 * Factory function for creating OptionsArrays of a given
 * type using the provided JSONValue (array).
 * @param input JSONValue (expected array)
 * @returns OptionsArray of given types
 */
export function makeOptionsArray(input) {
    if (input === null || typeof input !== 'object' || !Array.isArray(input))
        return NullOptionsArray;
    return input.map((ent) => makeOptions(ent))
        .filter((ent) => (ent && ent.amount !== 0));
}
//# sourceMappingURL=options.js.map