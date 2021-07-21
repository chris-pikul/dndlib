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

import { ResourceType, resourceTypeHas } from './resource-type';
import TextBlock from './text-block';
import Source, { ISource } from './source';

import {
  inPlaceConcat,
  testURI,
  testKabob,
  isPlainObject,
} from './utils';

/**
 * Schema: /resource.schema.json
 */
export interface IResource {

    /**
     * The enumerated type string that this resource represents
     */
    readonly type : ResourceType;

    /**
     * A unique ID (within the scope of the resource's type)
     * representing this resource.
     * Should be formatted as a lowercase kabob string.
     * 
     * ex: "some-object"
     */
    id : string;

    /**
     * The unique URI for this resource.
     * This path should be relative to the root and include
     * the folder of the resource type.
     * Additionally, it is expected to start with the forward
     * slash.
     * 
     * ex: "/example/some-object"
     */
    uri : string;

    /**
     * The name of this object, in human readable format.
     * 
     * ex: "Some Object"
     */
    name : string;

    /**
     * A decription of the resource, as would be displayed
     * to the user.
     * 
     * This is a TextBlock type, meaning it's an object
     * with keys for plainText, markdown, and html to help
     * formatting.
     */
    description : TextBlock;

    /**
     * Declares the publication sources for this resource
     */
    source : ISource;

    /**
     * An array(set) of tags for searchability.
     * 
     * Each tag should be lowercase kabob format,
     * and no duplicates should be included.
     * The id does not need to be supplied as a tag.
     */
    tags : Array<string>;
}

/**
 * An abstract class representing the basis of any resource.
 * 
 * Schema: /resource.schema.json
 */
export default abstract class Resource implements IResource, IAssignable, IValidatable {
    /**
     * Performs type checking and throws errors if the
     * properties needed are not the right types.
     * Does not fully validate the data within them,
     * but will check for emptyness, or incorrect Enums
     * @throws TypeErrors for invalid properties
     * @param props Incoming properties object
     */
    public static strictValidateProps = (props:any):void => {
      if(!props)
        throw new TypeError(`Resource.StrictValidateProps requires a valid parameter to check, none was given.`);

      if(!props.type)
        throw new TypeError(`Missing "type" property for Resource.`);
      if(typeof props.type !== 'string')
        throw new TypeError(`Resource "type" property must be a string, instead found "${typeof props.type}".`);
      if(!resourceTypeHas(props.type))
        throw new TypeError(`Resource "type" property must be a valid ResourceType enum, "${props.type}" is not one.`);

      if(!props.id)
        throw new TypeError(`Missing "id" property for Resource.`);
      if(typeof props.id !== 'string')
        throw new TypeError(`Resource "id" property must be a string, instead found "${typeof props.id}".`);
      if(props.id.length === 0)
        throw new TypeError(`Resource "id" property must not be an empty string.`);

      if(!props.name)
        throw new TypeError(`Missing "name" property for Resource.`);
      if(typeof props.name !== 'string')
        throw new TypeError(`Resource "name" property must be a string, instead found "${typeof props.name}".`);
      if(props.name.length === 0)
        throw new TypeError(`Resource "name" property must not be an empty string.`);

      if(!props.description)
        throw new TypeError(`Missing "description" property for Resource.`);
      TextBlock.strictValidateProps(props.description);

      if(!props.source)
        throw new TypeError(`Missing "source" property for Resource.`);

      // Source.StrictValidateProps(props.description);

      if(!props.tags)
        throw new TypeError(`Missing "tags" property for Resource.`);
      if(typeof props.tags !== 'object' || !Array.isArray(props.tags))
        throw new TypeError(`Resource "tags" property must be an array, instead found "${typeof props.tags}"`);
      if(props.tags.findIndex((ent:any) => typeof ent !== 'string') !== -1)
        throw new TypeError(`Resource "tags" array contains non-string members.`);
    };

    /**
     * The enumerated type string that this resource represents
     */
     readonly type : ResourceType;

    /**
     * A unique ID (within the scope of the resource's type)
     * representing this resource.
     * Should be formatted as a lowercase kabob string.
     * 
     * ex: "some-object"
     */
    id : string;

    /**
     * The unique URI for this resource.
     * This path should be relative to the root and include
     * the folder of the resource type.
     * Additionally, it is expected to start with the forward
     * slash.
     * 
     * ex: "/example/some-object"
     */
    uri : string;

    /**
     * The name of this object, in human readable format.
     * 
     * ex: "Some Object"
     */
    name : string;

    /**
     * A decription of the resource, as would be displayed
     * to the user.
     * 
     * This is a TextBlock type, meaning it's an object
     * with keys for plainText, markdown, and html to help
     * formatting.
     */
    description : TextBlock;

    /**
     * Declares the publication sources for this resource
     */
    source : Source;

    /**
     * An array(set) of tags for searchability.
     * 
     * Each tag should be lowercase kabob format,
     * and no duplicates should be included.
     * The id does not need to be supplied as a tag.
     */
    tags : Array<string>;

    constructor(props?:any, classProps?:JSONObject) {
      this.type = ResourceType.UNKNOWN;
      this.id = 'unknown';
      this.uri = '/';
      this.name = 'Unknown Resource';
      this.description = TextBlock.ZERO_VALUE;
      this.source = Source.ZERO_VALUE;
      this.tags = [];

      // Check if props have been provided
      if(typeof props !== 'undefined' && props !== null) {
        if(props instanceof Resource) {
          /*
           * If this is another Resource,
           * Copy the properties in.
           */
          Resource.strictValidateProps(props);
          this.type = props.type;
          this.id = props.id;
          this.uri = props.uri;
          this.name = props.name;
          this.description = new TextBlock(props.description);
          this.source = props.source;
          this.tags = [ ...props.tags ];
        } else if(isPlainObject(props)) {
          /*
           * If this is a JSON object (plain JS object),
           * Attempt to assign the properties.
           */
          Resource.strictValidateProps(props);

          // Assign the private properties here
          if(props.type && typeof props.type === 'string' && resourceTypeHas(props.type))
            this.type = props.type as ResourceType;

          this.assign(props);
        } else {
          console.warn(`Attempting to instantiate a Resource object with an invalid parameter. Expected either a Resource object, or a plain JSON Object of properties. Instead encountered a "${typeof props}"`);
        }
      }

      if(classProps && typeof classProps === 'object') {
        // Assign the class provided properties here
        if(classProps.type && typeof classProps.type === 'string' && resourceTypeHas(classProps.type))
          this.type = classProps.type as ResourceType;

        /*
         * Try to generate a URI using the classes base.
         * Only if one was not already provided.
         */
        if(classProps.uriBase && typeof classProps.uriBase === 'string') {
          if(props && !props.uri && props.id)
            this.uri = `${classProps.uriBase}/${props.id}`;
        }
      }
    }

    assign = (props:JSONObject):void => {
      if(props.id && typeof props.id === 'string' && props.id.length > 0)
        this.id = props.id;

      if(props.uri && typeof props.uri === 'string' && props.uri.length > 0)
        this.uri = props.uri;

      if(props.name && typeof props.name === 'string' && props.name.length > 0)
        this.name = props.name;
            
      if(props.description && props.description)
        this.description.assign(props.description as JSONObject);

      if(props.source && props.source)
        this.source.assign(props.source as JSONObject);

      if(props.tags && props.tags && Array.isArray(props.tags))
        this.tags = props.tags.filter((ent:any) => (typeof ent === 'string' && ent.length > 0)) as StringArray;
    }

    validate = ():Array<string> => {
      const errs:Array<string> = [];

      // Make sure there is a valid type
      if(!resourceTypeHas(this.type))
        errs.push(`Resource requires a valid "type" ResourceType enum. "${this.type}" is not one of them.`);
      else if(this.type === ResourceType.UNKNOWN)
        errs.push(`Resource should have a valid ResourceType, it is currently "UNKNOWN".`);

      // Ensure the ID is filled
      if(this.id.length < 1)
        errs.push(`Resource expected "id" to be a string of at least 1 character long.`);

      /*
       * URI's need to be valid and filled out, the starting
       * character should be a forward slash to help declare the type
       */
      if(this.uri.length < 1)
        errs.push(`Resource requires a valid (non-empty) URI string.`);
      else if(!testURI(this.uri))
        errs.push(`Resource URI format is invalid. Check that it starts with a forward slash, and is only alphanumeric path segments`);

      // Check that the name is at least filled out
      if(this.name.length < 1)
        errs.push(`Resource requires a valid (non-empty) "name" string`);

      // Pass on validation of description
      inPlaceConcat(errs, this.description.validate());

      // Pass on validation of source
      inPlaceConcat(errs, this.source.validate());

      // Check the tag formats
      this.tags.forEach((tag:string, ind:number) => {
        if(typeof tag !== 'string' || tag.length === 0)
          errs.push(`Resource tag[${ind}] should be a non-empty string.`);
        else if(!testKabob(tag))
          errs.push(`Resource tag[${ind}] should be a kabob-case string.`);
      });

      return errs;
    }

    isValid = ():boolean => (this.validate().length === 0);
}
