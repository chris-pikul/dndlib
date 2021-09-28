/*
 * Copyright(C) 2021 Chris Pikul. Under MIT license. 
 * See "LICENSE" in the root project folder.
 */
import {
  IValidatable,
  PromiseValidation,
  ValidationErrors,
} from './interfaces';

import { DieSize } from './die-size';
import TextBlock from './text-block';

import {
  isPlainObject,
  validateArrayOfObjects,
  validateEnum,
  validateInteger,
  validateIntegerOptionsD100,
  validateObject,
} from './utils';

import {
  strictValidateOptionalProp,
  strictValidatePropsParameter,
  strictValidateRequiredArrayProp,
  strictValidateRequiredObjectProp,
  strictValidateRequiredProp,
} from './utils/errors';

/**
 * An individual result from a roll-table.
 * Each value can be marked with optional
 * minimum, maximum, and absolute values to
 * help determine the results.
 */
export interface IRollTableEntry {
    value ?: number;
    minimumValue ?: number;
    maximumValue ?: number;

    title ?: string;

    body : TextBlock;
};

/**
 * An individual entry into a Roll-Table.
 * 
 * Uses either a set value, or a range value (inclusive), to determine if a
 * given die roll matches this entry.
 */
export class RollTableEntry implements IRollTableEntry, IValidatable {
    /**
     * Performs type checking and throws errors if the
     * properties needed are not the right types.
     * Does not fully validate the data within them,
     * but will check for emptyness, or incorrect Enums
     * @throws TypeErrors for invalid properties
     * @param props Incoming properties object
     */
    public static strictValidateProps = (props:any):void => {
      strictValidatePropsParameter(props, 'RollTableEntry');

      strictValidateRequiredObjectProp(props, 'RollTableEntry', 'body', TextBlock.strictValidateProps);
      strictValidateRequiredProp(props, 'RollTableEntry', 'value', 'number');
      strictValidateOptionalProp(props, 'RollTableEntry', 'minimumValue', 'number');
      strictValidateOptionalProp(props, 'RollTableEntry', 'maximumValue', 'number');
      strictValidateOptionalProp(props, 'RollTableEntry', 'title', 'string');
    }

    /**
     * A specific value to match against during checking.
     * This is the prefered method if provided.
     */
    value ?: number;

    /**
     * The minimumm value (inclusive) for a die roll to check against.
     * A given value must be equal to or above this value.
     * In order to use the ranged check feature both minimumValue and
     * maximumValue must be supplied.
     */
    minimumValue ?: number;

    /**
     * The maximum value (inclusive) for a die roll to check against.
     * A given value must be equal to or below this value.
     * In order to use the ranged check feature both minimumValue and
     * maximumValue must be supplied.
     */
    maximumValue ?: number;

    /**
     * An optional title for this entry.
     */
    title ?: string;

    /**
     * A TextBlock representing the contents of this entry.
     */
    body : TextBlock;

    constructor(props?:any) {
      this.body = new TextBlock();

      if(props) {
        if(isPlainObject(props) || props instanceof RollTableEntry) {
          // Copy over the properties
          RollTableEntry.strictValidateProps(props);

          this.body = new TextBlock(props.body);

          if(props.value)
            this.value = props.value;
          
          if(props.minimumValue)
            this.minimumValue = props.minimumValue;
          
          if(props.maximumValue)
            this.maximumValue = props.maximumValue;
          
          if(props.title)
            this.title = props.title;
        } else {
          // Console a warning
          console.warn(`Attempting to instantiate a RollTableEntry object with an invalid parameter. Expected either a RollTableEntry object, or a plain JSON Object of properties. Instead encountered a "${typeof props}"`);
        }
      }
    }

    validate = ():PromiseValidation => new Promise<ValidationErrors>(resolve => {
      resolve(this.validateSync());
    });

    validateSync = ():ValidationErrors => {
      const errs:ValidationErrors = [];

      validateInteger(errs, 'RollTableEntry', 'value', this.value, validateIntegerOptionsD100, true);
      validateInteger(errs, 'RollTableEntry', 'minValue', this.minimumValue, validateIntegerOptionsD100, true);
      validateInteger(errs, 'RollTableEntry', 'maxValue', this.maximumValue, validateIntegerOptionsD100, true);
      
      // Check for exclustivity
      if(this.value && this.value >= 0) {
        if(this.minimumValue)
          errs.push(`RollTableEntry requires either value or minimum/maximum. Cannot use both, found minimumValue to be set.`);
        if(this.maximumValue)
          errs.push(`RollTableEntry requires either value or minimum/maximum. Cannot use both, found maximumValue to be set.`);
      } else {
        if(!this.minimumValue)
          errs.push(`RollTableEntry requires a minimumValue to be set if not using value.`);
        if(!this.maximumValue)
          errs.push(`RollTableEntry requires a maximumValue to be set if not using value.`);
      }

      validateObject(errs, 'RollTableEntry', 'body', this.body, this.body.validateSync);

      return errs;
    }

    isValid = async():Promise<boolean> => ((await this.validate()).length === 0);

    isValidSync = ():boolean => (this.validateSync().length === 0);

    /**
     * Checks if the supplied number satisfies the rules for
     * this Roll-Table Result entry.
     * Will return false if this result is not configured properly,
     * (ie. no value, or minimum/maximum created properly)
     * @param val Number to check
     * @returns True if the supplied number satisfies
     */
    check = (val:number):boolean => {
      if(this.value)
        return (val === this.value);
      if(this.minimumValue && this.maximumValue)
        return (val >= this.minimumValue && val <= this.maximumValue);
      return false;
    }
}

/**
 * A roll-table, in which a specified die
 * size should be rolled to produce a
 * random result.
 * 
 * Schema: /roll-table.schema.json
 */
export interface IRollTable {
    die : DieSize

    results : Array<IRollTableEntry>
};

/**
 * A Roll-Table, in which a specified die
 * size should be rolled to produce a
 * random result.
 * 
 * Schema: /roll-table.schema.json
 */
export default class RollTable implements IRollTable, IValidatable {
    /**
     * Performs type checking and throws errors if the
     * properties needed are not the right types.
     * Does not fully validate the data within them,
     * but will check for emptyness, or incorrect Enums
     * @throws TypeErrors for invalid properties
     * @param props Incoming properties object
     */
    public static strictValidateProps = (props:any):void => {
      strictValidatePropsParameter(props, 'RollTable');

      strictValidateRequiredProp(props, 'RollTable', 'die', 'string');
      strictValidateRequiredArrayProp(props, 'RollTable', 'results', RollTableEntry.strictValidateProps);
    }
 
    /**
     * The size of the die that should be used to roll on this table.
     */
    readonly die : DieSize;

    /**
     * An array of RollTableEntry objects, used to map the results.
     * Any checks will be done from index 0 onwards.
     */
    results : Array<RollTableEntry>;

    constructor(props?:any) {
      this.die = DieSize.UNKNOWN;
      this.results = [];

      // Check if props have been provided
      if(props) {
        if(isPlainObject(props) || props instanceof RollTableEntry) {
          /*
           * If this is another Resource,
           * Copy the properties in.
           */
          RollTable.strictValidateProps(props);

          this.die = props.die;
          this.results = props.results.map((ent:any) => new RollTableEntry(ent));
        } else {
          console.warn(`Attempting to instantiate a RollTable object with an invalid parameter. Expected either a RollTable object, or a plain JSON Object of properties. Instead encountered a "${typeof props}"`);
        }
      }
    }

    validate = ():PromiseValidation => new Promise<ValidationErrors>(resolve => {
      const errs:ValidationErrors = [];

      validateEnum(errs, 'RollTable', 'die', this.die, DieSize);

      if(this.results.length === 0) {
        errs.push(`RollTable.results should not be empty.`);
        resolve(errs);
      } else {
        const proms = this.results.map((ent:RollTableEntry) => ent.validate());

        // Run each validation async using Promise.all
        Promise.all(proms).then((promErrs:Array<ValidationErrors>) => {
          // Take each promise's results and get ready to map them
          promErrs.forEach((resErr:ValidationErrors, ind:number) => {
            /*
             * Iterate the individual results and conform them to better 
             * error messages
             */
            const indErrs:ValidationErrors = resErr.map((err:string) => `RollTable.results[${ind}] ${err}`);
            errs.push(...indErrs);
          });

          // This marks the end of this process, push the results
          resolve(errs);
        });
      }
    });

    validateSync = ():ValidationErrors => {
      const errs:ValidationErrors = [];

      validateEnum(errs, 'RollTable', 'die', this.die, DieSize);
      
      if(this.results.length === 0)
        errs.push(`RollTable.results should not be empty.`);
      else
        validateArrayOfObjects(errs, 'RollTable', 'results', this.results, (ent:RollTableEntry) => ent.validateSync());

      return errs;
    }

    isValid = async():Promise<boolean> => ((await this.validate()).length === 0);

    isValidSync = ():boolean => (this.validateSync().length === 0);

    /**
     * Searches the results array for the first RollTableEntry to satisfy
     * the check using the provided number.
     * 
     * @param val Die result to check
     * @returns RollTableEntry if one satisfies or undefined if none do
     */
    get = (val:number):(RollTableEntry|undefined) => this.results.find((ent:RollTableEntry) => ent.check(val));
}
