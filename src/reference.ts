/*
 * Copyright(C) 2021 Chris Pikul. Under MIT license. 
 * See "LICENSE" in the root project folder.
 */
import {
  IValidatable,
  IAssignable,
  JSONObject,
  PromiseValidation,
  ValidationErrors,
} from './interfaces';

import { ResourceType, resourceTypeHas } from './resource-type';

import {
  isPlainObject,
  RegexpURI,
  validateEnum,
  validateString,
} from './utils';

import {
  strictValidateOptionalProp,
  strictValidatePropsParameter,
  strictValidateRequiredProp,
} from './utils/errors';

/**
 * References are used to link resources between each other
 * by providing the type, the uri, and the name for display.
 */
export interface IReference {

    /**
     * The given resource type that this reference points to.
     * Must be of the valid ResourceType enums.
     */
    readonly type : ResourceType;

    /**
     * The relative URI that points to the object in reference.
     */
    readonly uri : string;

    /**
     * An displayable name, should be copied from the referenced
     * object. Used for soft-links so the proper anchor title
     * can be displayed.
     */
    name : string;
}

/**
 * Holds a reference to another resource.
 * Used to link between different objects.
 * 
 * @throws Error if the required values are not fullfilled
 */
export default class Reference implements IReference, IAssignable, IValidatable {
    /**
     * Holds the "Zero" value (empty, null) for easy reference
     * and object instantiation.
     */
    public static readonly ZERO_VALUE:Reference = new Reference();

    /**
     * Checks if the supplied object is at the class's zero value.
     * @param obj Reference object to check
     * @returns True if the object has the default values
     */
    public static isZeroValue = (obj:Reference):boolean => (
      obj.type === ResourceType.UNKNOWN
        && obj.uri === '/'
        && obj.name === 'Unknown Reference'
    );

    /**
     * Performs type checking and throws errors if the
     * properties needed are not the right types.
     * Does not fully validate the data within them,
     * but will check for emptyness, or incorrect Enums
     * @throws TypeErrors for invalid properties
     * @param props Incoming properties object
     */
    public static strictValidateProps = (props:any):void => {
      strictValidatePropsParameter(props, 'Reference');

      strictValidateRequiredProp(props, 'Reference', 'type', 'string');
      strictValidateRequiredProp(props, 'Reference', 'uri', 'string');
      strictValidateOptionalProp(props, 'Reference', 'name', 'string');
    }
    
    /**
     * The given resource type that this reference points to.
     * Must be of the valid ResourceType enums.
     */
    readonly type : ResourceType;

    /**
     * The relative URI that points to the object in reference.
     */
    readonly uri : string;

    /**
     * An displayable name, should be copied from the referenced
     * object. Used for soft-links so the proper anchor title
     * can be displayed.
     */
    name : string;

    /**
     * Construct a new Reference object.
     * Will copy from an existing Reference object if one is supplied.
     * Otherwise, will take JSON data and type check it before applying
     * the properties.
     * @throws TypeErrors if JSON object is used and there are type errors.
     * @param props Reference | JSON Object
     */
    constructor(props?:any) {
      this.type = ResourceType.UNKNOWN;
      this.uri = '/';
      this.name = 'Unknown Reference';

      if(typeof props !== 'undefined' && props !== null) {
        if(props instanceof Reference) {
          this.type = props.type;
          this.uri = props.uri;
          this.name = props.name;
        } else if(isPlainObject(props)) {
          /*
           * If this is a JSON object (plain JS object),
           * Attempt to assign the properties.
           */
          Reference.strictValidateProps(props);

          // Because of readonly attribute, got to do the others here
          if(props.type && typeof props.type === 'string' && resourceTypeHas(props.type))
            this.type = props.type as ResourceType;
                
          if(props.uri && typeof props.type === 'string')
            this.uri = props.uri;

          this.assign(props);
        } else {
          console.warn(`Attempting to instantiate a Reference object with an invalid parameter. Expected either a Reference object, or a plain JSON Object of properties. Instead encountered a "${typeof props}"`);
        }
      }
    }

    assign = (props:JSONObject):void => {
      if(props.name && typeof props.name === 'string' && props.name.length > 0)
        this.name = props.name;
    }

    validate = ():PromiseValidation => new Promise<ValidationErrors>(resolve => {
      resolve(this.validateSync());
    });

    validateSync = ():ValidationErrors => {
      const clsName = this.constructor.name;
      const errs:ValidationErrors = [];

      validateEnum(errs, clsName, 'type', this.type, ResourceType);
      if(this.type === ResourceType.UNKNOWN)
        errs.push(`${clsName}.type should not be "UNKNOWN", and instead should be a valid ResourceType enumeration.`);

      validateString(errs, clsName, 'uri', this.uri, { regexp: RegexpURI });

      validateString(errs, clsName, 'name', this.name);

      return errs;
    };

    isValid = async():Promise<boolean> => ((await this.validate()).length === 0);

    isValidSync = ():boolean => (this.validateSync().length === 0);

    isZeroValue = ():boolean => (Reference.isZeroValue(this));
}

export class ReferenceAbilityScore extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.ABILITY_SCORE,
    });
  }
}

export class ReferenceAction extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.ACTION,
    });
  }
}

export class ReferenceBackground extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.BACKGROUND,
    });
  }
}

export class ReferenceClass extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.CLASS,
    });
  }
}

export class ReferenceClassFeature extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.CLASS_FEATURE,
    });
  }
}

export class ReferenceCondition extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.CONDITION,
    });
  }
}

export class ReferenceDamageType extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.DAMAGE_TYPE,
    });
  }
}

export class ReferenceDeity extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.DEITY,
    });
  }
}

export class ReferenceDisease extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.DISEASE,
    });
  }
}

export class ReferenceEquipmentPack extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.EQUIPMENT_PACK,
    });
  }
}

export class ReferenceFeat extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.FEAT,
    });
  }
}

export class ReferenceHazard extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.HAZARD,
    });
  }
}

export class ReferenceItem extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.ITEM,
    });
  }
}

export class ReferenceItemCategory extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.ITEM_CATEGORY,
    });
  }
}

export class ReferenceLanguage extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.LANGUAGE,
    });
  }
}

export class ReferenceMagicSchool extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.MAGIC_SCHOOL,
    });
  }
}

export class ReferenceMonster extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.MONSTER,
    });
  }
}

export class ReferenceProficiency extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.PROFICIENCY,
    });
  }
}

export class ReferenceRace extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.RACE,
    });
  }
}

export class ReferenceSkill extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.SKILL,
    });
  }
}

export class ReferenceSpell extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.SPELL,
    });
  }
}

export class ReferenceSubRace extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.SUB_RACE,
    });
  }
}

export class ReferenceTrait extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.TRAIT,
    });
  }
}

export class ReferenceTrap extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.TRAP,
    });
  }
}

export class ReferenceVehicle extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.VEHICLE,
    });
  }
}

export class ReferenceWeaponProperty extends Reference {
  constructor(props?:any) {
    super({
      ...(props || {}),
      type: ResourceType.WEAPON_PROPERTY,
    });
  }
}
