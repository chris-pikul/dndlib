/*
 * Copyright(C) 2021 Chris Pikul. Under MIT license. 
 * See "LICENSE" in the root project folder.
 */
import {
  IAssignable,
  IValidatable,
  JSONObject,
  StringArray,
} from './interfaces';

import {
  strictValidateOptionalArrayProp,
  strictValidatePropsParameter,
  strictValidateRequiredArrayProp,
} from './utils/errors';

import { isPlainObject } from './utils/json-object';

/**
 * Represents a block of text, with different
 * formatting options available.
 * 
 * Each format should effectively contain the same
 * text, but the formatting specifiers can be
 * different.
 * 
 * At bare minimum, the plain text version is required
 * 
 * Schema: /text-block.schema.json
 */
export interface ITextBlock {

    /**
     * The plain text (no formatting markers) version
     * This is required
     */
    plainText : StringArray

    /**
     * A markdown (commonmark) formatted version.
     */
    markdown ?: StringArray

    /**
     * An HTML version. The text should be escapped
     * properly for JSON. And should only contain
     * formatting elements such as B, I, U, Em, etc.
     */
    html ?: StringArray
}

/**
 * Represents a block of text, with different
 * formatting options available.
 * 
 * Each format should effectively contain the same
 * text, but the formatting specifiers can be
 * different.
 * 
 * At bare minimum, the plain text version is required
 * 
 * Schema: /text-block.schema.json
 */
export default class TextBlock implements ITextBlock, IAssignable, IValidatable {
    /**
     * Holds the "Zero" value (empty, null) for easy reference
     * and object instantiation.
     */
    public static readonly ZERO_VALUE:TextBlock = new TextBlock();

    /**
     * Checks if the supplied object is at the class's zero value.
     * @param obj TextBlock object to check
     * @returns True if the object has the default values
     */
    public static isZeroValue = (obj:TextBlock):boolean => (
      obj.plainText.length === 0
        && !obj.markdown.length
        && !obj.html.length
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
      strictValidatePropsParameter(props, 'TextBlock');

      strictValidateRequiredArrayProp(props, 'TextBlock', 'plainText', 'string');
      strictValidateOptionalArrayProp(props, 'TextBlock', 'markdown', 'string');
      strictValidateOptionalArrayProp(props, 'TextBlock', 'html', 'string');
    };

    /**
     * The plain text (no formatting markers) version
     * This is required
     */
    plainText : StringArray = [];

    /**
     * A markdown (commonmark) formatted version.
     */
    markdown ?: StringArray;

    /**
     * An HTML version. The text should be escapped
     * properly for JSON. And should only contain
     * formatting elements such as B, I, U, Em, etc.
     */
    html ?: StringArray;

    constructor(props?:any) {
      // Check if props have been provided
      if(props) {
        if(isPlainObject(props) || props instanceof TextBlock) {
          TextBlock.strictValidateProps(props);

          this.plainText = [ ...props.plainText ];

          if(props.markdown)
            this.markdown = [ ...props.markdown ];
          
          if(props.html)
            this.html = [ ...props.html ];
        } else {
          console.warn(`Attempting to instantiate a TextBody object with an invalid parameter. Expected either a TextBody object, or a plain JSON Object of properties. Instead encountered a "${typeof props}"`);
        }
      }
    }

    assign = (props:JSONObject):void => {
      if(props.plainText && Array.isArray(props.plainText)) {
        /*
         * The filter should handle the case of ensuring strings,
         * so I will explicitly cast the results
         */
        this.plainText = props.plainText.filter(ent => (ent && typeof ent === 'string')) as StringArray;
      }
    
      if(props.markdown && Array.isArray(props.markdown)) {
        /*
         * The filter should handle the case of ensuring strings,
         * so I will explicitly cast the results
         */
        this.markdown = props.markdown.filter(ent => (ent && typeof ent === 'string')) as StringArray;
      }
    
      if(props.html && Array.isArray(props.html)) {
        /*
         * The filter should handle the case of ensuring strings,
         * so I will explicitly cast the results
         */
        this.html = props.html.filter(ent => (ent && typeof ent === 'string')) as StringArray;
      }
    }

    validate = ():Array<string> => {
      const errs:Array<string> = [];

      if(this.plainText.length === 0)
        errs.push(`TextBlock.plainText requires at least one entry, none found.`);

      this.plainText.forEach((ent:string, ind:number) => {
        if(!ent || typeof ent !== 'string')
          errs.push(`TextBlock.plainText[${ind}] is a "${typeof ent}", expected a string.`);
      });

      this.markdown.forEach((ent:string, ind:number) => {
        if(!ent || typeof ent !== 'string')
          errs.push(`TextBlock.markdown[${ind}] is a "${typeof ent}", expected a string.`);
      });

      this.html.forEach((ent:string, ind:number) => {
        if(!ent || typeof ent !== 'string')
          errs.push(`TextBlock.html[${ind}] is a "${typeof ent}", expected a string.`);
      });

      return errs;
    }

    isValid = ():boolean => (this.validate().length === 0);

    /**
     * Checks if this object is at the class's zero value.
     * @returns True if the this has the default values
     */
    isZeroValue = ():boolean => (TextBlock.isZeroValue(this));
}
