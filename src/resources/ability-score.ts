import Resource from '../resource';
import { ReferenceSkill } from '../reference';
import { ResourceType } from '../resource-type';
import { isPlainObject } from '../utils';
import { JSONObject } from '../interfaces';

export interface IAbilityScore {
  abbreviation : string;
  skills ?: Array<ReferenceSkill>;
};

export default class AbilityScore extends Resource implements IAbilityScore {
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
  
  abbreviation = 'UNK';

  skills : Array<ReferenceSkill> = null;

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
