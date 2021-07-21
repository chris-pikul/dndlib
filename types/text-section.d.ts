import { IAssignable, IValidatable, JSONObject } from './interfaces';
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
    title: string;
    /**
     * The body of the text, represented as a TextBlock
     * for multi-format options.
     */
    body: TextBlock;
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
    static readonly ZERO_VALUE: TextSection;
    /**
     * Checks if the supplied object is at the class's zero value.
     * @param obj TextSection object to check
     * @returns True if the object has the default values
     */
    static isZeroValue: (obj: TextSection) => boolean;
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
     * The title of the section.
     * Expected to be plain text for proper heading formatting.
     */
    title: string;
    /**
     * The body of the text, represented as a TextBlock
     * for multi-format options.
     */
    body: TextBlock;
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
