/*
 * Copyright(C) 2021 Chris Pikul. Under MIT license. 
 * See "LICENSE" in the root project folder.
 */
import { IValidatable } from './interfaces';

import { ResourceType, resourceTypeHas } from './resource-type';
import TextBlock from './text-block';
import Source, { ISource } from './source';

import {
  inPlaceConcat,
  testURI,
  testKabob,
  isPlainObject,
} from './utils';

import {
  strictValidatePropsParameter,
  strictValidateRequiredArrayProp,
  strictValidateRequiredObjectProp,
  strictValidateRequiredProp,
} from './utils/errors';

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

export interface IResourceClassProps {
  type ?: ResourceType;
  uriBase ?: string;
}

/**
 * An abstract class representing the basis of any resource.
 * 
 * Schema: /resource.schema.json
 */
export default abstract class Resource implements IResource, IValidatable {
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
    public static strictValidateProps = (props:any):void => {
      strictValidatePropsParameter(props, 'Resource');

      strictValidateRequiredProp(props, 'Resource', 'type', 'string');
      strictValidateRequiredProp(props, 'Resource', 'id', 'string');
      strictValidateRequiredProp(props, 'Resource', 'name', 'string');
      strictValidateRequiredObjectProp(props, 'Resource', 'description', TextBlock.strictValidateProps);
      strictValidateRequiredObjectProp(props, 'Resource', 'source', Source.strictValidateProps);
      strictValidateRequiredArrayProp(props, 'Resource', 'tags', 'string');
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

    /**
     * Constructs a new Resource object.
     * 
     * The optional classProps parameter allows for child classes to
     * set up the base properties for their own types.
     * 
     * @param props Resource|Object properties to copy
     * @param classProps IResourceClassProps additional properties to override
     */
    constructor(props?:any, classProps?:IResourceClassProps) {
      this.type = ResourceType.UNKNOWN;
      this.id = 'unknown';
      this.uri = '/';
      this.name = 'Unknown Resource';
      this.description = TextBlock.ZERO_VALUE;
      this.source = Source.ZERO_VALUE;
      this.tags = [];

      // Check if props have been provided
      if(props) {
        if(isPlainObject(props) || props instanceof Resource) {
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
