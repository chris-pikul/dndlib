/*
 * Copyright(C) 2021 Chris Pikul. Under MIT license. 
 * See "LICENSE" in the root project folder.
 */
import {
  IValidatable,
  PromiseValidation,
  ValidationErrors,
} from './interfaces';

import {
  isPlainObject,
  validateString,
  validateObject,
} from './utils';

import {
  strictValidatePropsParameter,
  strictValidateRequiredObjectProp,
  strictValidateRequiredProp,
} from './utils/errors';

import TextBlock from './text-block';

/**
 * TextSection represents a titled section of text.
 * Essentially, it is a title string, followed by
 * a body text (in the form of a TextBlock object).
 * 
 * Schema: /text-section.schema.json
 */
export interface ITextSection {

  /**
   * The title of the section.
   * Expected to be plain text for proper heading formatting.
   */
  title : string

  /**
   * The body of the text, represented as a TextBlock
   * for multi-format options.
   */
  body : TextBlock
}

/**
 * TextSection represents a titled section of text.
 * Essentially, it is a title string, followed by
 * a body text (in the form of a TextBlock object).
 * 
 * Schema: /text-section.schema.json
 */
export default class TextSection implements ITextSection, IValidatable {
    /**
     * Performs type checking and throws errors if the
     * properties needed are not the right types.
     * Does not fully validate the data within them,
     * but will check for emptyness, or incorrect Enums
     * @throws TypeErrors for invalid properties
     * @param props Incoming properties object
     */
    public static strictValidateProps = (props:any):void => {
      strictValidatePropsParameter(props, 'TextSection');

      strictValidateRequiredProp(props, 'TextSection', 'title', 'string');
      strictValidateRequiredObjectProp(props, 'TextSection', 'body', TextBlock.strictValidateProps);
    };

    /**
     * The title of the section.
     * Expected to be plain text for proper heading formatting.
     */
    title : string;

    /**
     * The body of the text, represented as a TextBlock
     * for multi-format options.
     */
    body : TextBlock;

    constructor(props?:any) {
      this.title = '';
      this.body = new TextBlock();

      // Check if props have been provided
      if(props) {
        if(isPlainObject(props) || props instanceof TextSection) {
          // Copy the properties from the other object
          TextSection.strictValidateProps(props);
          this.title = props.title;
          this.body = new TextBlock(props.body);
        } else {
          console.warn(`Attempting to instantiate a TextSection object with an invalid parameter. Expected either a TextSection object, or a plain JSON Object of properties. Instead encountered a "${typeof props}"`);
        }
      }
    }

    validate = ():PromiseValidation => new Promise<ValidationErrors>(resolve => {
      resolve(this.validateSync());
    });

    validateSync = ():ValidationErrors => {
      const errs:ValidationErrors = [];

      validateString(errs, 'TextSection', 'title', this.title);
      validateObject(errs, 'TextSection', 'body', this.body, (ent:TextBlock) => ent.validateSync().map((err:string) => `TextSection.body -> ${err}`));

      return errs;
    }

    isValid = async():Promise<boolean> => ((await this.validate()).length === 0);

    isValidSync = ():boolean => (this.validateSync().length === 0);
}
