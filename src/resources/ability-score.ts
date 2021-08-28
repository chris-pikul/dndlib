import Resource from '../resource';
import { ReferenceSkill } from '../reference';
import { ResourceType } from '../resource-type';
import { isPlainObject } from '../utils';
import {
  IAssignable,
  IValidatable,
  JSONObject,
} from '../interfaces';

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
export default class AbilityScore extends Resource implements IAbilityScore, IAssignable, IValidatable {
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
    if(!props)
      throw new TypeError(`AbilityScore.StrictValidateProps requires a valid parameter to check, none was given.`);
    
    if(!props.abbreviation)
      throw new TypeError(`Missing "abbreviation" property for AbilityScore.`);
    if(typeof props.abbreviation !== 'string')
      throw new TypeError(`AbilityScore "abbreviation" property must be a string, instead found "${typeof props.abbreviation}".`);
    
    if(props.skills) {
      if(!Array.isArray(props.skills))
        throw new TypeError(`AbilityScore "skills" property must be an array, instead found "${typeof props.skills}".`);
      
      props.skills.forEach(ReferenceSkill.strictValidateProps);
    }
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
      if(props instanceof AbilityScore) {
        // Copy over the properties
        AbilityScore.strictValidateProps(props);
        this.abbreviation = props.abbreviation;
        this.skills = [ ...props.skills ];
      } else if(isPlainObject(props)) {
        // JSON object
        AbilityScore.strictValidateProps(props);

        if(props.abbreviation && typeof props.abbreviation === 'string')
          this.abbreviation = props.abbreviation;

        if(props.skills && Array.isArray(props.skills))
          this.skills = [ ...props.skills ];
      } else if(typeof props === 'string') {
        this.abbreviation = props.toLocaleUpperCase().trim();
      } else {
        console.warn(`Attempting to instantiate an AbilityScore object with an invalid parameter. Expected either an AbilityScore object, JSON object of properties, or a string. Instead encountered a "${typeof props}".`);
      }
    }
  }

  assign = (props:JSONObject):void => {
    if(props.abbreviation && typeof props.abbreviation === 'string')
      this.abbreviation = props.abbreviation;

    if(props.skills && Array.isArray(props.skills))
      this.skills = props.skills.map((ent:any) => new ReferenceSkill(ent));
  }

  validate = ():Array<string> => {
    const errs:Array<string> = super.validate();

    // Check the abbreviation
    if(this.abbreviation.length !== 3)
      errs.push(`AbilityScore should have a 3-letter abbreviation. Instead found a string of "${this.abbreviation.length}".`);

    // Validate each reference and hoist the errors into this validation
    this.skills.forEach((ent:ReferenceSkill, ind:number) => {
      ent.validate().forEach((err:string) => {
        errs.push(`AbilityScore skill[${ind}]: ${err}`);
      });
    });

    return errs;
  }

  isValid = ():boolean => (this.validate().length === 0);
}
