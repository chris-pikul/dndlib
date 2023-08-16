/*
 * Copyright(C) 2021 Chris Pikul. Under MIT license.
 * See "LICENSE" in the root project folder.
 */
// IMPORTANT NOTE: This should be changed over to classes
import type {
    IValidatable,
    JSONObject,
    JSONValue,
    PromiseValidation,
    ValidationErrors,
} from './interfaces';
import {
    flattenArray,
    inPlaceConcat,
    isPlainObject,
    validateArray,
    validateBoolean,
    validateInteger,
} from './utils';
import {
    strictValidateOptionalArrayProp,
    strictValidateOptionalProp,
    strictValidatePropsParameter,
    strictValidateRequiredArrayProp,
    strictValidateRequiredProp,
} from './utils/errors';

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
    amount: number;

    /**
     * The available choices, each index in the parent
     * array being a single choice. It's child objects
     * being treated as an "OR" statement within the
     * sub-array.
     *
     * @see IOptions definition for an example
     */
    choices?: Array<Type>;

    /**
     * NOTE: Remember what this was for.
     * My guess is, I was planning on this being for
     * usage with "categories" or generic items such
     * as "melee weapon" meaning any within the category.
     */
    fromAny?: boolean;
}

export default class Options<Type> implements IValidatable {
    public static readonly strictValidateProps = (props: any): void => {
        strictValidatePropsParameter(props, 'Options');

        strictValidateRequiredProp(props, 'Options', 'amount', 'number');
        strictValidateOptionalArrayProp(
            props,
            'Options',
            'choices',
            (ent: any) => {
                if (!Array.isArray(ent)) {
                    throw new TypeError(
                        `First level of Options.choices must be Arrays. Instead encounted "${typeof ent}".`,
                    );
                }
            },
        );
        strictValidateOptionalProp(props, 'Options', 'fromAny', 'boolean');
    };

    /**
     * The amount of objects that may be chosen from
     * the "choices" array.
     */
    amount: number;

    /**
     * The available choices, each index in the parent
     * array being a single choice. It's child objects
     * being treated as an "OR" statement within the
     * sub-array.
     *
     * @see IOptions definition for an example
     */
    choices?: Array<Type>;

    /**
     * NOTE: Remember what this was for.
     * My guess is, I was planning on this being for
     * usage with "categories" or generic items such
     * as "melee weapon" meaning any within the category.
     */
    fromAny?: boolean;

    constructor(props?: any) {
        if (props) {
            if (isPlainObject(props) || props instanceof Options) {
                Options.strictValidateProps(props);

                this.amount = props.amount;

                if (props.choices) this.choices = [...props.choices];

                if (props.fromAny) this.fromAny = !!props.fromAny;
            } else {
                console.warn(
                    `Attempting to instantiate an Options object with an invalid parameter. Expected either an Options object, or JSON object of properties. Instead encountered a "${typeof props}".`,
                );
            }
        }
    }

    validate = (): PromiseValidation =>
        new Promise<ValidationErrors>((resolve) => {
            resolve(this.validateSync());
        });

    validateSync = (): ValidationErrors => {
        const errs: ValidationErrors = [];

        validateInteger(errs, 'Options', 'amount', this.amount, {
            positive: true,
        });
        validateArray(
            errs,
            'Options',
            'choices',
            this.choices,
            (ent: any, ind: number): ValidationErrors => {
                if (!Array.isArray(ent)) {
                    return [
                        `Options.choices[${ind}] should be an array, instead found "${typeof ent}".`,
                    ];
                }
                return [];
            },
            true,
        );
        validateBoolean(errs, 'Options', 'fromAny', this.fromAny, true);

        return errs;
    };

    isValid = async (): Promise<boolean> =>
        (await this.validate()).length === 0;

    isValidSync = (): boolean => this.validateSync().length === 0;
}

/**
 * Type alias for an array of options. Usually when used
 * for equipment and character building there is a few
 * choices that combine to build the "loadout".
 * Ex. 2 weapons, 3 trinkets, 1 magic item, etc.
 */
export type OptionsArray<Type> = Array<Options<Type>>;

/**
 * Easy to reference object for empty or "null" data.
 */
export const NullOptionsArray: OptionsArray<any> = [];

/**
 * Factory function for creating OptionsArrays of a given
 * type using the provided JSONValue (array).
 * @param input JSONValue (expected array)
 * @returns OptionsArray of given types
 */
export function makeOptionsArray<Type>(input: JSONValue): OptionsArray<Type> {
    if (input === null || typeof input !== 'object' || !Array.isArray(input))
        return NullOptionsArray;

    return input
        .map((ent: any) => new Options<Type>(ent))
        .filter((ent: IOptions<Type>) => ent && ent.amount !== 0);
}

export function strictValidateOptionsArray<Type>(
    input: OptionsArray<Type>,
    optPrefix?: string,
): void {
    if (Array.isArray(input)) {
        input.forEach((ent: Options<Type>, ind: number) => {
            if (ent instanceof Options) {
                try {
                    Options.strictValidateProps(ent);
                } catch (err: any) {
                    let msg: string;
                    if (typeof err === 'string') msg = err;
                    else if (err instanceof Error) msg = err.message;
                    else msg = 'Unknown error';

                    throw new TypeError(
                        `${optPrefix ?? 'OptionsArray'}[${ind}] ${msg}`,
                    );
                }
            } else {
                throw new TypeError(
                    `${
                        optPrefix ?? 'OptionsArray'
                    }[${ind}] Entry must be made of Options objects. Instead found "${typeof ent}".`,
                );
            }
        });
    }
    throw new TypeError(
        `${
            optPrefix ?? 'OptionsArray'
        }.strictValidateProps() requires a valid Array input. Instead found "${typeof input}".`,
    );
}

export function validateOptionsArray<Type>(
    input: OptionsArray<Type>,
): PromiseValidation {
    return new Promise<ValidationErrors>((resolve) => {
        if (Array.isArray(input) === false) {
            resolve([
                `OptionsArray must be an array, instead found "${typeof input}".`,
            ]);
        } else {
            const proms = input.map(
                (ent: Options<Type>, ind: number): PromiseValidation => {
                    if (
                        ent instanceof Options ||
                        typeof (ent as JSONObject).validateSync === 'function'
                    )
                        return ent.validate();
                    return Promise.resolve([
                        `OptionsArray[${ind}] is not a validatable Object, or Options object. Instead found "${typeof ent}".`,
                    ]);
                },
            );

            Promise.all(proms).then((promErrs: Array<ValidationErrors>) => {
                const errs: Array<ValidationErrors> = promErrs.map(
                    (optErrs: ValidationErrors, ind: number) =>
                        optErrs.map(
                            (err: string) => `OptionsArray[${ind}] ${err}`,
                        ),
                );
                resolve(flattenArray<string>(errs, 2));
            });
        }
    });
}

export function validateOptionsArraySync<Type>(
    input: OptionsArray<Type>,
): ValidationErrors {
    const errs: ValidationErrors = [];

    if (Array.isArray(input) === false) {
        errs.push(
            `OptionsArray must be an array, instead found "${typeof input}".`,
        );
    } else {
        input.forEach((ent: Options<Type>, ind: number) => {
            if (
                ent instanceof Options ||
                typeof (ent as JSONObject).validateSync === 'function'
            ) {
                inPlaceConcat(errs, ent.validateSync());
            } else {
                errs.push(
                    `OptionsArray[${ind}] is not a validatable Object, or Options object. Instead found "${typeof ent}".`,
                );
            }
        });
    }

    return errs;
}
