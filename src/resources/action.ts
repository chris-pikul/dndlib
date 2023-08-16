import { ISource, ResourceType } from '..';
import type {
    IValidatable,
    PromiseValidation,
    ValidationErrors,
} from '../interfaces';
import Resource from '../resource';
import Source from '../source';
import {
    isPlainObject,
    positive,
    validateBoolean,
    validateEnum,
    validateInteger,
    validateObject,
} from '../utils';
import {
    strictValidateOptionalObjectProp,
    strictValidatePropsParameter,
    strictValidateRequiredObjectProp,
    strictValidateRequiredProp,
} from '../utils/errors';

/**
 * Enumeration for the types of timings that can be performed. Can be considered
 * the "meter" for action timing calculations.
 *
 * In the "action economy" these are described better as per the SRD/PHB/DMG
 * rulebooks.
 */
export enum TimingType {
    FREE = 'FREE',
    BONUS_ACTION = 'BONUS_ACTION',
    ACTION = 'ACTION',
    REACTION = 'REACTION',
    VARIES = 'VARIES',
}

/**
 * Each action contains a timing element listing the type, and the amount of
 * those action types required.
 */
export interface IActionTiming {
    /**
     * The "meter" or type that the action requires.
     */
    type: TimingType;

    /**
     * How many of those types are used in this action.
     */
    count: number;
}

/**
 * An action describes something a character or creature can do on their turn in
 * a measured fashion. Each action requires some amount of time from the
 * "action economy" and is thus described in the `timing` property.
 *
 * Schema: /action.schema.json
 */
export interface IAction {
    /**
     * Specifies whether this action is a variant (optional) ruling.
     */
    isVariant: boolean;

    /**
     * If this ruling is a variant, then this specifies the source material
     * for it.
     *
     * It is required if the `isVariant` flag is true.
     */
    variantSource?: ISource;

    /**
     * The timing component of this action, or "how long" it takes to perform.
     */
    timing: IActionTiming;
}

/**
 * An action describes something a character or creature can do on their turn in
 * a measured fashion. Each action requires some amount of time from the
 * "action economy" and is thus described in the `timing` property.
 *
 * Schema: /action.schema.json
 */
export default class Action extends Resource implements IAction, IValidatable {
    protected static readonly strictValidateProps = (props: any): void => {
        strictValidatePropsParameter(props, 'Action');

        strictValidateRequiredProp(props, 'Action', 'isVariant', 'boolean');
        strictValidateOptionalObjectProp(
            props,
            'Action',
            'variantSource',
            Source.strictValidateProps,
        );
        strictValidateRequiredObjectProp(
            props,
            'Action',
            'timing',
            Action.strictValidateTimingProps,
        );
    };

    protected static readonly strictValidateTimingProps = (
        props: any,
    ): void => {
        strictValidatePropsParameter(props, 'Action::Timing');

        strictValidateRequiredProp(props, 'Action::Timing', 'type', 'string');
        strictValidateRequiredProp(props, 'Action::Timing', 'count', 'number');
    };

    /**
     * Specifies whether this action is a variant (optional) ruling.
     */
    isVariant: boolean;

    /**
     * If this ruling is a variant, then this specifies the source material
     * for it.
     *
     * It is required if the `isVariant` flag is true.
     */
    variantSource?: Source;

    /**
     * The timing component of this action, or "how long" it takes to perform.
     */
    timing: IActionTiming;

    constructor(props?: any) {
        super(props, {
            type: ResourceType.ACTION,
            uriBase: '/action',
        });

        if (props) {
            if (isPlainObject(props) || props instanceof Action) {
                Action.strictValidateProps(props);

                this.isVariant = !!props.isVariant;

                if (props.isVariant && props.variantSource)
                    this.variantSource = new Source(props.variantSource);

                this.timing = {
                    type: props.type,
                    count: positive(props.count),
                };
            } else {
                console.warn(
                    `Attempting to instantiate an Action object with an invalid parameter. Expected either an Action object, or JSON object of properties. Instead encountered a "${typeof props}".`,
                );
            }
        }
    }

    validate = (): PromiseValidation =>
        new Promise<ValidationErrors>((resolve) => {
            super.validate().then((supErrs: ValidationErrors) => {
                /*
                 * Use the validateSync option and combine with the super errors.
                 * We use the parameter here to let the super validation be async and then
                 * feed that into this version of validateSync().
                 */
                resolve(this.validateSync(supErrs));
            });
        });

    validateSync = (parentErrs?: ValidationErrors): ValidationErrors => {
        const errs: ValidationErrors = parentErrs ?? super.validateSync();

        validateBoolean(errs, 'Action', 'isVariant', this.isVariant);

        if (this.isVariant) {
            if (this.variantSource) {
                validateObject(
                    errs,
                    'Action',
                    'variantSource',
                    this.variantSource,
                    (prop: any): ValidationErrors => {
                        if (prop instanceof Source) {
                            const subErrs = prop.validateSync();
                            return subErrs.map(
                                (err: string) => `Action.variantSource: ${err}`,
                            );
                        }

                        return [
                            `Action.variantSource should be a Source object, instead found "${typeof prop}"."`,
                        ];
                    },
                );
            } else {
                errs.push(
                    `Action.variantSource is required if this action is marked as "isVariant".`,
                );
            }
        }

        validateObject(
            errs,
            'Action',
            'timing',
            this.timing,
            (prop: any): ValidationErrors => {
                if (isPlainObject(prop)) {
                    const subErrs: ValidationErrors = [];
                    validateEnum(
                        subErrs,
                        'Action::Timing',
                        'type',
                        prop.type,
                        TimingType,
                    );
                    validateInteger(
                        subErrs,
                        'Action::Timing',
                        'count',
                        prop.count,
                        {
                            positive: true,
                            minValue: 1,
                        },
                    );
                    return subErrs;
                }

                return [
                    `Action.timing should be an object, instead found "${typeof prop}".`,
                ];
            },
        );

        return errs;
    };
}
