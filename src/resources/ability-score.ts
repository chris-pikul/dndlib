import Resource from '../resource';
import { ReferenceSkill } from '../reference';
import { ResourceType } from '../resource-type';
import {
  isPlainObject,
  validateArray,
  validateString,
} from '../utils';
import { IValidatable, ValidationErrors } from '../interfaces';
import {
  strictValidateOptionalArrayProp,
  strictValidatePropsParameter,
  strictValidateRequiredProp,
} from '../utils/errors';

/**
 * Mechanical rule describing an ability that a character can have.
 * 
 * Schema: /ability-score.schema.json
 */
export interface IAbilityScore {

  /**
   * A 3-letter string representing the the short-form abbreviation.
   */
  abbreviation : string;

  /**
   * An array of references pointing to skills that will use this ability score.
   */
  skills ?: Array<ReferenceSkill>;
};

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
  public static readonly strictValidateProps = (props:any):void => {
    strictValidatePropsParameter(props, 'AbilityScore');

    strictValidateRequiredProp(props, 'AbilityScore', 'abbreviation', 'string');
    strictValidateOptionalArrayProp(props, 'AbilityScore', 'skills', ReferenceSkill.strictValidateProps);
  }
  
  /**
   * A 3-letter string representing the the short-form abbreviation.
   */
  abbreviation = 'UNK';

  /**
   * An array of references pointing to skills that will use this ability score.
   */
  skills : Array<ReferenceSkill> = null;

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
  constructor(props?:any) {
    super(props, {
      type: ResourceType.ABILITY_SCORE,
      uriBase: '/ability-score',
    });

    if(props) {
      if(isPlainObject(props) || props instanceof AbilityScore) {
        // Copy over the properties
        AbilityScore.strictValidateProps(props);

        this.abbreviation = props.abbreviation;
        
        if(props.skills)
          this.skills = props.skills.map((ent:ReferenceSkill) => new ReferenceSkill(ent));
      } else if(typeof props === 'string') {
        this.abbreviation = props.toLocaleUpperCase().trim();
      } else {
        console.warn(`Attempting to instantiate an AbilityScore object with an invalid parameter. Expected either an AbilityScore object, JSON object of properties, or a string. Instead encountered a "${typeof props}".`);
      }
    }
  }

  validate = ():ValidationErrors => {
    const errs:Array<string> = super.validate();

    validateString(errs, 'AbilityScore', 'abbreviation', this.abbreviation, { absLength: 3 });

    validateArray(errs, 'AbilityScore', 'skills', this.skills, (prop:any, ind:number):ValidationErrors => {
      if(prop) {
        if(prop instanceof ReferenceSkill)
          return prop.validate().map((err:string) => `AbilityScore.skills[${ind}]: ${err}`);
        
        return [ `AbilityScore.skills[${ind}] should be a ReferenceSkill object.` ];
      }

      return [ `AbilityScore.skills[${ind}] is null or undefined.` ];
    }, true);

    return errs;
  }

  isValid = ():boolean => (this.validate().length === 0);
}
