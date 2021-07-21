/*
 * Copyright(C) 2021 Chris Pikul. Under MIT license. 
 * See "LICENSE" in the root project folder.
 */
// IMPORTANT NOTE: This should be changed over to classes
import { JSONObject, JSONValue } from './interfaces/json';

import { isPlainObject, testIfPositiveInteger } from './utils';

/**
 * Provides an alotment of choices that may be
 * chosen from.
 * 
 * The provided "amount" describes how many objects
 * may be chosen from the choices provided.
 * 
 * Each "choices" entry is an array itself that must
 * contain 1 or more objects. In most cases there is
 * only 1. In the case of more than one per the entry,
 * it is treated as an "OR" option.
 * Example:
 *      amount: 2,
 *      choices: [
 *          [ "sword" ],
 *          [ "axe" ],
 *          [ "longbow", "crossbow" ]
 *      ],
 * In this example, 2 options can be chosen. The items
 * "sword", and "axe" can be chosen and the options are
 * satisfied. Or "axe", and "crossbow" can be chosen.
 * But! "longbow" and "crossbow" is not allowed, since
 * the multi-entry array specifies an "OR" condition.
 * 
 */
export interface IOptions<Type> {

    /**
     * The amount of objects that may be chosen from
     * the "choices" array.
     */
    amount : number;

    /**
     * The available choices, each index in the parent
     * array being a single choice. It's child objects
     * being treated as an "OR" statement within the
     * sub-array.
     * 
     * @see IOptions definition for an example
     */
    choices ?: Array<Type>

    /**
     * NOTE: Remember what this was for.
     * My guess is, I was planning on this being for
     * usage with "categories" or generic items such
     * as "melee weapon" meaning any within the category.
     */
    fromAny ?: boolean
}

/**
 * Easy to reference object for empty or "null" data.
 */
export const NullOptions:IOptions<any> = {
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
export function makeOptions<Type>(input:JSONObject):IOptions<Type> {
  if(!isPlainObject(input))
    return NullOptions;

  const obj:IOptions<Type> = NullOptions;

  if(input.amount && testIfPositiveInteger(input.amount))
    obj.amount = input.amount as number;

  if(input.choices !== null && Array.isArray(input.choices))
    obj.choices = input.choices.filter(ent => (ent && isPlainObject(ent))) as unknown as Array<Type>;
    
  if(input.fromAny && typeof input.fromAny === 'boolean')
    obj.fromAny = !!input.fromAny;

  return obj;
}

/**
 * Type alias for an array of options. Usually when used
 * for equipment and character building there is a few
 * choices that combine to build the "loadout".
 * Ex. 2 weapons, 3 trinkets, 1 magic item, etc.
 */
export type OptionsArray<Type> = Array<IOptions<Type>>

/**
 * Easy to reference object for empty or "null" data.
 */
export const NullOptionsArray:OptionsArray<any> = [];

/**
 * Factory function for creating OptionsArrays of a given
 * type using the provided JSONValue (array).
 * @param input JSONValue (expected array)
 * @returns OptionsArray of given types
 */
export function makeOptionsArray<Type>(input:JSONValue):OptionsArray<Type> {
  if(input === null || typeof input !== 'object' || !Array.isArray(input))
    return NullOptionsArray;

  return input.map((ent:any) => makeOptions<Type>(ent))
    .filter((ent:IOptions<Type>) => (ent && ent.amount !== 0));
}
