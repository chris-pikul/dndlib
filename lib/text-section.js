import { isPlainObject } from './utils/json-object';
import { inPlaceConcat } from './utils/arrays';
import TextBlock from './text-block';
/**
 * TextSection represents a titled section of text.
 * Essentially, it is a title string, followed by
 * a body text (in the form of a TextBlock object).
 *
 * Schema: /text-section.schema.json
 */
export default class TextSection {
    constructor(props) {
        this.assign = (props) => {
            if (props.title && typeof props.title === 'string')
                this.title = props.title;
            if (props.body && isPlainObject(props.body)) {
                // The IsPlainObject() function satisfies type checking for us
                this.body.assign(props.body);
            }
        };
        this.validate = () => {
            const errs = [];
            if (!this.title || typeof this.title !== 'string')
                errs.push(`TextSection.title is expected to be a string, instead found "${typeof this.title}".`);
            inPlaceConcat(errs, this.body.validate());
            return errs;
        };
        this.isValid = () => (this.validate().length === 0);
        /**
         * Checks if this object is at the class's zero value.
         * @returns True if the this has the default values
         */
        this.isZeroValue = () => (TextSection.isZeroValue(this));
        this.title = '';
        this.body = new TextBlock();
        // Check if props have been provided
        if (typeof props !== 'undefined' && props !== null) {
            if (props instanceof TextSection) {
                /*
                 * If this is another TextSection,
                 * Copy the properties in.
                 */
                this.title = props.title;
                this.body = props.body;
            }
            else if (isPlainObject(props)) {
                /*
                 * If this is a JSON object (plain JS object),
                 * Attempt to assign the properties.
                 */
                TextSection.strictValidateProps(props);
                this.assign(props);
            }
            else {
                console.warn(`Attempting to instantiate a TextSection object with an invalid parameter. Expected either a TextSection object, or a plain JSON Object of properties. Instead encountered a "${typeof props}"`);
            }
        }
    }
}
/**
 * Holds the "Zero" value (empty, null) for easy reference
 * and object instantiation.
 */
TextSection.ZERO_VALUE = new TextSection();
/**
 * Checks if the supplied object is at the class's zero value.
 * @param obj TextSection object to check
 * @returns True if the object has the default values
 */
TextSection.isZeroValue = (obj) => !!(obj.title.length === 0
    && obj.body.isZeroValue());
/**
 * Performs type checking and throws errors if the
 * properties needed are not the right types.
 * Does not fully validate the data within them,
 * but will check for emptyness, or incorrect Enums
 * @throws TypeErrors for invalid properties
 * @param props Incoming properties object
 */
TextSection.strictValidateProps = (props) => {
    if (!props)
        throw new TypeError(`TextSection.StrictValidateProps requires a valid parameter to check, none was given.`);
    if (props.title && typeof props.title !== 'string')
        throw new TypeError(`TextSection "title" property must be a string, instead found "${typeof props.title}".`);
    if (!props.body)
        throw new TypeError(`Missing "body" property for TextSection.`);
    TextBlock.strictValidateProps(props.body);
};
//# sourceMappingURL=text-section.js.map