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
export default class TextBlock {
    constructor(props) {
        this.assign = (props) => {
            if (props.plainText && Array.isArray(props.plainText)) {
                /*
                 * The filter should handle the case of ensuring strings,
                 * so I will explicitly cast the results
                 */
                this.plainText = props.plainText.filter(ent => (ent && typeof ent === 'string'));
            }
            if (props.markdown && Array.isArray(props.markdown)) {
                /*
                 * The filter should handle the case of ensuring strings,
                 * so I will explicitly cast the results
                 */
                this.markdown = props.markdown.filter(ent => (ent && typeof ent === 'string'));
            }
            if (props.html && Array.isArray(props.html)) {
                /*
                 * The filter should handle the case of ensuring strings,
                 * so I will explicitly cast the results
                 */
                this.html = props.html.filter(ent => (ent && typeof ent === 'string'));
            }
        };
        this.validate = () => {
            const errs = [];
            if (this.plainText.length === 0)
                errs.push(`TextBlock.plainText requires at least one entry, none found.`);
            this.plainText.forEach((ent, ind) => {
                if (!ent || typeof ent !== 'string')
                    errs.push(`TextBlock.plainText[${ind}] is a "${typeof ent}", expected a string.`);
            });
            this.markdown.forEach((ent, ind) => {
                if (!ent || typeof ent !== 'string')
                    errs.push(`TextBlock.markdown[${ind}] is a "${typeof ent}", expected a string.`);
            });
            this.html.forEach((ent, ind) => {
                if (!ent || typeof ent !== 'string')
                    errs.push(`TextBlock.html[${ind}] is a "${typeof ent}", expected a string.`);
            });
            return errs;
        };
        this.isValid = () => (this.validate().length === 0);
        /**
         * Checks if this object is at the class's zero value.
         * @returns True if the this has the default values
         */
        this.isZeroValue = () => (TextBlock.isZeroValue(this));
        this.plainText = [];
        this.markdown = [];
        this.html = [];
        // Check if props have been provided
        if (typeof props !== 'undefined' && props !== null) {
            if (props instanceof TextBlock) {
                /*
                 * If this is another TextBlock,
                 * Copy the properties in.
                 */
                this.plainText = [...props.plainText];
                this.markdown = [...props.markdown];
                this.html = [...props.html];
            }
            else if (isPlainObject(props)) {
                /*
                 * If this is a JSON object (plain JS object),
                 * Attempt to assign the properties.
                 */
                TextBlock.strictValidateProps(props);
                this.assign(props);
            }
            else {
                console.warn(`Attempting to instantiate a TextBody object with an invalid parameter. Expected either a TextBody object, or a plain JSON Object of properties. Instead encountered a "${typeof props}"`);
            }
        }
    }
}
/**
 * Holds the "Zero" value (empty, null) for easy reference
 * and object instantiation.
 */
TextBlock.ZERO_VALUE = new TextBlock();
/**
 * Checks if the supplied object is at the class's zero value.
 * @param obj TextBlock object to check
 * @returns True if the object has the default values
 */
TextBlock.isZeroValue = (obj) => (obj.plainText.length === 0
    && obj.markdown.length === 0
    && obj.html.length === 0);
/**
 * Performs type checking and throws errors if the
 * properties needed are not the right types.
 * Does not fully validate the data within them,
 * but will check for emptyness, or incorrect Enums
 * @throws TypeErrors for invalid properties
 * @param props Incoming properties object
 */
TextBlock.strictValidateProps = (props) => {
    if (!props)
        throw new TypeError(`TextBlock.StrictValidateProps requires a valid parameter to check, none was given.`);
    if (!props.plainText)
        throw new TypeError(`Missing "plainText" property for TextBlock.`);
    if (typeof props.plainText !== 'object' || !Array.isArray(props.plainText))
        throw new TypeError(`TextBlock "plainText" property must be an array, instead found "${typeof props.plainText}"`);
    if (props.plainText.findIndex((ent) => typeof ent !== 'string') !== -1)
        throw new TypeError(`TextBlock "plainText" array contains non-string members.`);
    if (props.markdown) {
        if (typeof props.markdown !== 'object' || !Array.isArray(props.markdown))
            throw new TypeError(`TextBlock "markdown" property must be an array, instead found "${typeof props.markdown}"`);
        if (props.markdown.findIndex((ent) => typeof ent !== 'string') !== -1)
            throw new TypeError(`TextBlock "markdown" array contains non-string members.`);
    }
    if (props.html) {
        if (typeof props.html !== 'object' || !Array.isArray(props.html))
            throw new TypeError(`TextBlock "html" property must be an array, instead found "${typeof props.html}"`);
        if (props.html.findIndex((ent) => typeof ent !== 'string') !== -1)
            throw new TypeError(`TextBlock "html" array contains non-string members.`);
    }
};
//# sourceMappingURL=text-block.js.map