import { strictValidateOptionalArrayProp, strictValidatePropsParameter, strictValidateRequiredArrayProp, } from './utils/errors';
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
        /**
         * The plain text (no formatting markers) version
         * This is required
         */
        this.plainText = [];
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
        // Check if props have been provided
        if (props) {
            if (isPlainObject(props) || props instanceof TextBlock) {
                TextBlock.strictValidateProps(props);
                this.plainText = [...props.plainText];
                if (props.markdown)
                    this.markdown = [...props.markdown];
                if (props.html)
                    this.html = [...props.html];
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
    && !obj.markdown.length
    && !obj.html.length);
/**
 * Performs type checking and throws errors if the
 * properties needed are not the right types.
 * Does not fully validate the data within them,
 * but will check for emptyness, or incorrect Enums
 * @throws TypeErrors for invalid properties
 * @param props Incoming properties object
 */
TextBlock.strictValidateProps = (props) => {
    strictValidatePropsParameter(props, 'TextBlock');
    strictValidateRequiredArrayProp(props, 'TextBlock', 'plainText', 'string');
    strictValidateOptionalArrayProp(props, 'TextBlock', 'markdown', 'string');
    strictValidateOptionalArrayProp(props, 'TextBlock', 'html', 'string');
};
//# sourceMappingURL=text-block.js.map