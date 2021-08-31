/*
 * Copyright(C) 2021 Chris Pikul. Under MIT license. 
 * See "LICENSE" in the root project folder.
 */
import {
  IAssignable,
  IValidatable,
  JSONObject,
} from './interfaces';

import { isPlainObject, inPlaceConcat } from './utils';

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
export default class TextSection implements ITextSection, IAssignable, IValidatable {
    /**
     * Holds the "Zero" value (empty, null) for easy reference
     * and object instantiation.
     */
    public static readonly ZERO_VALUE:TextSection = new TextSection();

    /**
     * Checks if the supplied object is at the class's zero value.
     * @param obj TextSection object to check
     * @returns True if the object has the default values
     */
    public static isZeroValue = (obj:TextSection):boolean => !!(
      obj.title.length === 0
        && obj.body.isZeroValue()
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
      if(typeof props !== 'undefined' && props !== null) {
        if(isPlainObject(props) || props instanceof TextSection) {
          TextSection.strictValidateProps(props);
          this.title = props.title;
          this.body = new TextBlock(props.body);
        } else {
          console.warn(`Attempting to instantiate a TextSection object with an invalid parameter. Expected either a TextSection object, or a plain JSON Object of properties. Instead encountered a "${typeof props}"`);
        }
      }
    }

    assign = (props:JSONObject):void => {
      if(props.title && typeof props.title === 'string')
        this.title = props.title;

      if(props.body && isPlainObject(props.body)) {
        // The IsPlainObject() function satisfies type checking for us
        this.body.assign(props.body as JSONObject);
      }
    }

    validate = ():Array<string> => {
      const errs:Array<string> = [];

      if(!this.title || typeof this.title !== 'string')
        errs.push(`TextSection.title is expected to be a string, instead found "${typeof this.title}".`);

      inPlaceConcat(errs, this.body.validate());

      return errs;
    }

    isValid = ():boolean => (this.validate().length === 0);

    /**
     * Checks if this object is at the class's zero value.
     * @returns True if the this has the default values
     */
     isZeroValue = ():boolean => (TextSection.isZeroValue(this));
}
