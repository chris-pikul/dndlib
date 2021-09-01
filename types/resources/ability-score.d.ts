import Resource from '../resource';
import { ReferenceSkill } from '../reference';
import { IValidatable, ValidationErrors } from '../interfaces';
/**
 * Mechanical rule describing an ability that a character can have.
 *
 * Schema: /ability-score.schema.json
 */
export interface IAbilityScore {
    /**
     * A 3-letter string representing the the short-form abbreviation.
     */
    abbreviation: string;
    /**
     * An array of references pointing to skills that will use this ability score.
     */
    skills?: Array<ReferenceSkill>;
}
/**
 * Mechanical rule describing an ability that a character can have.
 *
 * Schema: /ability-score.schema.json
 */
export default class AbilityScore extends Resource implements IAbilityScore, IValidatable {
    /**
     * Performs type checking and throws errors if the
     * properties needed are not the right types.
     *
     * Does not fully validate the data within them,
     * but will check for emptyness, or incorrect Enums
     *
     * @throws TypeErrors for invalid properties
     * @param props Incoming properties object
     */
    static readonly strictValidateProps: (props: any) => void;
    /**
     * A 3-letter string representing the the short-form abbreviation.
     */
    abbreviation: string;
    /**
     * An array of references pointing to skills that will use this ability score.
     */
    skills: Array<ReferenceSkill>;
    /**
     * Constructs a new AbilityScore object.
     *
     * Will copy properties from `props` if used, otherwise a default
     * zero-value will be created.
     *
     * If a string is supplied for `props` it will be used as the `abbreviation`
     * property.
     *
     * @param props Resource | AbilityScore | Object | string
     */
    constructor(props?: any);
    validate: () => ValidationErrors;
    isValid: () => boolean;
}
