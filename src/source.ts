/*
 * Copyright(C) 2021 Chris Pikul. Under MIT license. 
 * See "LICENSE" in the root project folder.
 */
import {
  IAssignable,
  IValidatable,
  JSONObject,
} from './interfaces';

import {
  StringEnum,
  enumHas,
  isPlainObject,
  testIfPositiveInteger,
} from './utils';

import {
  strictValidateOptionalObjectProp,
  strictValidateOptionalProp,
  strictValidatePropsParameter,
  strictValidateRequiredProp,
} from './utils/errors';

/**
 * Enumeration of the standard Publication IDs
 */
export enum PublicationID {
  
  // Homebrew
  HB = 'HB',

  // Unearthed Arcana
  UA = 'UA',

  PHB = 'PHB',
  MM = 'MM',
  DMG = 'DMG',
  SCAG = 'SCAG',
  AL = 'AL',
  VGM = 'VGM',
  XGE = 'XGE',
  MTF = 'MTF',
  GGR = 'GGR',
  SAC = 'SAC',
  AI = 'AI',
  ERLW = 'ERLW',
  RMR = 'RMR',
  EGW = 'EGW',
  MOT = 'MOT',
  IDRotF = 'IDRotF',
  TCE = 'TCE',
};

export const publicationIDHas = (key:string):boolean => enumHas(PublicationID, key);

/**
 * Used to describe an additonal source (outside of the primary)
 * that this resource is also printed on.
 */
export interface IAdditionalSource {

    /**
     * A short abbreviated name of the publication.
     * used as an enum.
     * REQUIRED
     */
    readonly publicationID : PublicationID | string;

    /**
     * The real publication name, as displayed to the user.
     * REQUIRED
     */
    readonly title : string;
 
    /**
     * The page number that the resource is on
     */
    page ?: number;
 
    /**
     * Is this resource part of the Unearthed Arcana (beta)?
     */
    isUA ?: boolean;
 
    /**
     * Is this part of the System Resource Document (open source)?
     */
    isSRD ?: boolean;
}

/**
 * Describes the written work, or source body that the resource
 * originates from.
 * 
 * Schema: /source.schema.json
 */
export interface ISource {

    /**
     * A short abbreviated name of the publication.
     * used as an enum.
     * REQUIRED
     */
    readonly publicationID : PublicationID | string;

    /**
     * The real publication name, as displayed to the user.
     * REQUIRED
     */
    readonly title : string;

    /**
     * The page number that the resource is on
     */
    page ?: number;

    /**
     * Is this resource part of the Unearthed Arcana (beta)?
     */
    isUA ?: boolean;

    /**
     * Is this part of the System Resource Document (open source)?
     */
    isSRD ?: boolean;

    /**
     * Any additional publications this is featured on
     */
    additional ?: Array<IAdditionalSource>;
}

/**
 * Describes the written work, or source body that the resource
 * originates from.
 * 
 * Schema: /source.schema.json
 */
export default class Source implements ISource, IAssignable, IValidatable {
    /**
     * A string-string map of publication ID enums to their respective 
     * human-readable titles.
     */
    public static readonly PublicationMap:StringEnum = {
      HB: 'Homebrew',
      UA: 'Unearthed Arcana',
    
      PHB: "Player's Handbook",
      MM: 'Monter Manual',
      DMG: "Dungeon Master's Guide",
      SCAG: "Sword Coast Adventurer's Guide",
      AL: "Adventurer's League",
      VGM: "Volo's Guide to Monsters",
      XGE: "Xanthar's Guide to Everything",
      MTF: "Mordenkainen's Tome of Foes",
      GGR: "Guildmaster's Guide to Ravnica",
      SAC: 'Sage Advice Compendium',
      AI: 'Aquisitions Incorperated',
      ERLW: 'Eberron: Rising from the Last War',
      RMR: 'Dungeons & Dragons vs. Rick and Morty: Basic Rules',
      EGW: "Explorer's Guide to Wildemount",
      MOT: 'Mythic Odysseys of Theros',
      IDRotF: 'Icewind Dale: Rime of the Frostmaiden',
      TCE: "Tasha's Cauldron of Everything",
    };

    /**
     * Retrieves the full publication title from a given ID Enum.
     * If the value is invalid "Unknown" is returned instead.
     * @param publicationID Publication ID Enum
     * @returns The full publication title string
     */
    public static getPublicationTitle = (publicationID:PublicationID):string => (Source.PublicationMap[publicationID as string] || 'Unknown');

    /**
     * Holds the "Zero" value (empty, null) for easy reference
     * and object instantiation.
     */
    public static readonly ZERO_VALUE:Source = new Source();

    /**
     * Checks if the supplied object is at the class's zero value.
     * @param obj Source object to check
     * @returns True if the object has the default values
     */
    public static isZeroValue = (obj:Source):boolean => (
      obj.publicationID === PublicationID.HB
        && obj.title === 'Unknown Source'
        && obj.page === 0
        && obj.isUA === false
        && obj.isSRD === false
        && obj.additional.length === 0
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
      strictValidatePropsParameter(props, 'Source');

      strictValidateRequiredProp(props, 'Source', 'publicationID', 'string');
      strictValidateRequiredProp(props, 'Source', 'title', 'string');
      strictValidateOptionalProp(props, 'Source', 'page', 'number');
      strictValidateOptionalProp(props, 'Source', 'isUA', 'boolean');
      strictValidateOptionalProp(props, 'Source', 'isSRD', 'boolean');
      strictValidateOptionalObjectProp(props, 'Source', 'additional', Source.strictValidatePropsAdditional);
    };

    public static strictValidatePropsAdditional = (props:any):void => {
      strictValidatePropsParameter(props, 'Source::Additional');

      strictValidateRequiredProp(props, 'Source::Additional', 'publicationID', 'string');
      strictValidateRequiredProp(props, 'Source::Additional', 'title', 'string');
      strictValidateOptionalProp(props, 'Source::Additional', 'page', 'number');
      strictValidateOptionalProp(props, 'Source::Additional', 'isUA', 'boolean');
      strictValidateOptionalProp(props, 'Source::Additional', 'isSRD', 'boolean');
    };

    /**
     * A short abbreviated name of the publication.
     * used as an enum.
     * REQUIRED
     */
    readonly publicationID : PublicationID | string;

    /**
     * The real publication name, as displayed to the user.
     * REQUIRED
     */
    readonly title : string;

    /**
     * The page number that the resource is on
     */
    readonly page : number;

    /**
     * Is this resource part of the Unearthed Arcana (beta)?
     */
    readonly isUA : boolean;

    /**
     * Is this part of the System Resource Document (open source)?
     */
    readonly isSRD : boolean;

    /**
     * Any additional publications this is featured on
     */
    additional : Array<IAdditionalSource>;

    constructor(props?:any) {
      this.publicationID = PublicationID.HB;
      this.title = 'Unknown Source';
      this.page = 0;
      this.isUA = false;
      this.isSRD = false;
      this.additional = [];

      // Check if props have been provided
      if(typeof props !== 'undefined' && props !== null) {
        if(isPlainObject(props) || props instanceof Source) {
          /*
           * If this is another Source,
           * Copy the properties in.
           */
          Source.strictValidateProps(props);
          this.publicationID = props.publicationID;
          this.title = props.title;
          this.page = props.page;
          this.isUA = !!props.isUA;
          this.isSRD = !!props.isSRD;

          if(props.additional)
            this.additional = [ ...props.additional ];
        } else {
          console.warn(`Attempting to instantiate a TextSection object with an invalid parameter. Expected either a Source object, or a plain JSON Object of properties. Instead encountered a "${typeof props}"`);
        }
      }
    }

    assign = (props:JSONObject):void => {
      if(props.additional && props.additional && Array.isArray(props.additional)) {
        this.additional = props.additional.map((ent:any) => {
          if(!isPlainObject(ent))
            return null;

          const obj = {
            publicationID: PublicationID.HB,
            title: 'Unknown Source',
            page: 0,
            isUA: false,
            isSRD: false,
          };

          if(props.publicationID && typeof props.publicationID === 'string' && publicationIDHas(props.publicationID))
            obj.publicationID = props.publicationID as PublicationID;
          else
            return null;

          if(props.title && typeof props.title === 'string' && props.title.length > 0)
            obj.title = props.title;
          else
            return null;

          if(props.page && typeof props.page === 'number' && testIfPositiveInteger(props.page))
            obj.page = props.page as number;
                
          if(props.isUA && typeof props.isUA === 'boolean')
            obj.isUA = !!props.isUA;

          if(props.isSRD && typeof props.isSRD === 'boolean')
            obj.isSRD = !!props.isSRD;

          return obj as IAdditionalSource;
        }).filter((ent:IAdditionalSource|null) => (ent && ent !== null)) as Array<IAdditionalSource>;
      }
    }

    validate = ():Array<string> => {
      const errs:Array<string> = [];

      if(!publicationIDHas(this.publicationID))
        errs.push(`Source publicationID is not a valid enum.`);
        
      if(this.title.length === 0)
        errs.push(`Source title must be a non-empty string.`);

      if(this.page < 0)
        errs.push(`Source page must be a positive (0 and above) integer.`);
      else if(Number.isInteger(this.page))
        errs.push(`Source page cannot be a fraction, must be an integer.`);

      this.additional.forEach((ent:IAdditionalSource, ind:number) => {
        if(!publicationIDHas(ent.publicationID))
          errs.push(`Source additional[${ind}] publicationID is not a valid enum.`);
            
        if(ent.title.length === 0)
          errs.push(`Source additional[${ind}] title must be a non-empty string.`);

        if(ent.page) {
          if(ent.page < 0)
            errs.push(`Source additional[${ind}] page must be a positive (0 and above) integer.`);
          else if(Number.isInteger(ent.page))
            errs.push(`Source additional[${ind}] page cannot be a fraction, must be an integer.`);
        }
      });

      return errs;
    }

    isValid = ():boolean => (this.validate().length === 0);

    isZeroValue = ():boolean => (Source.isZeroValue(this));
}
