import { IAssignable } from './interfaces/assignable';
import { IValidatable } from './interfaces/validatable';
import { JSONObject } from './interfaces/json';
import { StringArray } from './interfaces/arrays';
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
    plainText: StringArray;
    /**
     * A markdown (commonmark) formatted version.
     */
    markdown?: StringArray;
    /**
     * An HTML version. The text should be escapped
     * properly for JSON. And should only contain
     * formatting elements such as B, I, U, Em, etc.
     */
    html?: StringArray;
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
    static readonly ZERO_VALUE: TextBlock;
    /**
     * Checks if the supplied object is at the class's zero value.
     * @param obj TextBlock object to check
     * @returns True if the object has the default values
     */
    static isZeroValue: (obj: TextBlock) => boolean;
    /**
     * Performs type checking and throws errors if the
     * properties needed are not the right types.
     * Does not fully validate the data within them,
     * but will check for emptyness, or incorrect Enums
     * @throws TypeErrors for invalid properties
     * @param props Incoming properties object
     */
    static strictValidateProps: (props: any) => void;
    /**
     * The plain text (no formatting markers) version
     * This is required
     */
    plainText: StringArray;
    /**
     * A markdown (commonmark) formatted version.
     */
    markdown: StringArray;
    /**
     * An HTML version. The text should be escapped
     * properly for JSON. And should only contain
     * formatting elements such as B, I, U, Em, etc.
     */
    html: StringArray;
    constructor(props?: any);
    assign: (props: JSONObject) => void;
    validate: () => Array<string>;
    isValid: () => boolean;
    /**
     * Checks if this object is at the class's zero value.
     * @returns True if the this has the default values
     */
    isZeroValue: () => boolean;
}
