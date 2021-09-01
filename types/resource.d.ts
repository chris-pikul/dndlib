import { IValidatable } from './interfaces';
import { ResourceType } from './resource-type';
import TextBlock from './text-block';
import Source, { ISource } from './source';
/**
 * Schema: /resource.schema.json
 */
export interface IResource {
    /**
     * The enumerated type string that this resource represents
     */
    readonly type: ResourceType;
    /**
     * A unique ID (within the scope of the resource's type)
     * representing this resource.
     * Should be formatted as a lowercase kabob string.
     *
     * ex: "some-object"
     */
    id: string;
    /**
     * The unique URI for this resource.
     * This path should be relative to the root and include
     * the folder of the resource type.
     * Additionally, it is expected to start with the forward
     * slash.
     *
     * ex: "/example/some-object"
     */
    uri: string;
    /**
     * The name of this object, in human readable format.
     *
     * ex: "Some Object"
     */
    name: string;
    /**
     * A decription of the resource, as would be displayed
     * to the user.
     *
     * This is a TextBlock type, meaning it's an object
     * with keys for plainText, markdown, and html to help
     * formatting.
     */
    description: TextBlock;
    /**
     * Declares the publication sources for this resource
     */
    source: ISource;
    /**
     * An array(set) of tags for searchability.
     *
     * Each tag should be lowercase kabob format,
     * and no duplicates should be included.
     * The id does not need to be supplied as a tag.
     */
    tags: Array<string>;
}
export interface IResourceClassProps {
    type?: ResourceType;
    uriBase?: string;
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
    static strictValidateProps: (props: any) => void;
    /**
     * The enumerated type string that this resource represents
     */
    readonly type: ResourceType;
    /**
     * A unique ID (within the scope of the resource's type)
     * representing this resource.
     * Should be formatted as a lowercase kabob string.
     *
     * ex: "some-object"
     */
    id: string;
    /**
     * The unique URI for this resource.
     * This path should be relative to the root and include
     * the folder of the resource type.
     * Additionally, it is expected to start with the forward
     * slash.
     *
     * ex: "/example/some-object"
     */
    uri: string;
    /**
     * The name of this object, in human readable format.
     *
     * ex: "Some Object"
     */
    name: string;
    /**
     * A decription of the resource, as would be displayed
     * to the user.
     *
     * This is a TextBlock type, meaning it's an object
     * with keys for plainText, markdown, and html to help
     * formatting.
     */
    description: TextBlock;
    /**
     * Declares the publication sources for this resource
     */
    source: Source;
    /**
     * An array(set) of tags for searchability.
     *
     * Each tag should be lowercase kabob format,
     * and no duplicates should be included.
     * The id does not need to be supplied as a tag.
     */
    tags: Array<string>;
    /**
     * Constructs a new Resource object.
     *
     * The optional classProps parameter allows for child classes to
     * set up the base properties for their own types.
     *
     * @param props Resource|Object properties to copy
     * @param classProps IResourceClassProps additional properties to override
     */
    constructor(props?: any, classProps?: IResourceClassProps);
    validate: () => Array<string>;
    isValid: () => boolean;
}
