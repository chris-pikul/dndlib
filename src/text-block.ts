/*
 * Copyright(C) 2021 Chris Pikul. Under MIT license. 
 * See "LICENSE" in the root project folder.
 */
import {
  IValidatable,
  PromiseValidation,
  StringArray,
  ValidationErrors,
} from './interfaces';
import { validateArray } from './utils';

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
export default class TextBlock implements ITextBlock, IValidatable {
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

          this.plainText = props.plainText.filter((ent:any) => (ent && typeof ent === 'string'));

          if(props.markdown)
            this.markdown = props.markdown.filter((ent:any) => (ent && typeof ent === 'string'));
          
          if(props.html)
            this.html = props.html.filter((ent:any) => (ent && typeof ent === 'string'));
        } else {
          console.warn(`Attempting to instantiate a TextBody object with an invalid parameter. Expected either a TextBody object, or a plain JSON Object of properties. Instead encountered a "${typeof props}"`);
        }
      }
    }

    validate = ():PromiseValidation => new Promise<ValidationErrors>(resolve => {
      resolve(this.validateSync());
    });

    validateSync = ():ValidationErrors => {
      const errs:ValidationErrors = [];

      if(this.plainText.length === 0) {
        errs.push(`TextBlock.plainText requires at least one entry, none found.`);
      } else {
        validateArray(errs, 'TextBlock', 'plainText', this.plainText, (ent:any, ind:number) => {
          if(!ent || typeof ent !== 'string')
            return [ `TextBlock.plainText[${ind}] is a "${typeof ent}", expected a string.` ];
          return [];
        });
      }

      validateArray(errs, 'TextBlock', 'markdown', this.markdown, (ent:any, ind:number) => {
        if(!ent || typeof ent !== 'string')
          return [ `TextBlock.markdown[${ind}] is a "${typeof ent}", expected a string.` ];
        return [];
      }, true);

      validateArray(errs, 'TextBlock', 'html', this.html, (ent:any, ind:number) => {
        if(!ent || typeof ent !== 'string')
          return [ `TextBlock.html[${ind}] is a "${typeof ent}", expected a string.` ];
        return [];
      }, true);

      return errs;
    }

    isValid = async():Promise<boolean> => ((await this.validate()).length === 0);

    isValidSync = ():boolean => (this.validateSync().length === 0);
}
