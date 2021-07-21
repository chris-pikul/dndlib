import { DieSize, dieSizeHas } from './die-size';
import TextBlock from './text-block';
import { inPlaceConcat } from './utils/arrays';
import { isPlainObject } from './utils/json-object';
import { testIfPositiveInteger } from './utils/validation';
;
/**
 * An individual entry into a Roll-Table.
 *
 * Uses either a set value, or a range value (inclusive), to determine if a
 * given die roll matches this entry.
 */
export class RollTableEntry {
    constructor(props) {
        this.assign = (props) => {
            if (props.value && testIfPositiveInteger(props.value))
                this.value = props.value;
            if (props.minimumValue && testIfPositiveInteger(props.minimumValue))
                this.minimumValue = props.minimumValue;
            if (props.maximumProperty && typeof props.maximumProperty === 'number' && testIfPositiveInteger(props.maximumProperty))
                this.maximumValue = props.maximumProperty;
            if (props.title && typeof props.title === 'string' && props.title.length > 0)
                this.title = props.title;
            if (props.body && isPlainObject(props.body))
                this.body.assign(props.body);
        };
        this.validate = () => {
            const errs = [];
            if (this.value) {
                if (this.value < 0)
                    errs.push(`RollTableEntry.value is not a positive value.`);
                if (this.value > 100)
                    errs.push(`RollTableEntry.value is over the maximum of 100.`);
            }
            if (this.minimumValue) {
                if (this.minimumValue < 0)
                    errs.push(`RollTableEntry.minimumValue is not a positive value.`);
                if (this.minimumValue > 100)
                    errs.push(`RollTableEntry.minimumValue is over the maximum of 100.`);
            }
            if (this.maximumValue) {
                if (this.maximumValue < 0)
                    errs.push(`RollTableEntry.maximumValue is not a positive value.`);
                if (this.maximumValue > 100)
                    errs.push(`RollTableEntry.maximumValue is over the maximum of 100.`);
            }
            // Check for exclustivity
            if (this.value && this.value >= 0) {
                if (this.minimumValue)
                    errs.push(`RollTableEntry requires either value or minimum/maximum. Cannot use both, found minimumValue to be set.`);
                if (this.maximumValue)
                    errs.push(`RollTableEntry requires either value or minimum/maximum. Cannot use both, found maximumValue to be set.`);
            }
            else {
                if (!this.minimumValue)
                    errs.push(`RollTableEntry requires a minimumValue to be set if not using value.`);
                if (!this.maximumValue)
                    errs.push(`RollTableEntry requires a maximumValue to be set if not using value.`);
            }
            // Allow TextBlock to validate itself
            inPlaceConcat(errs, this.body.validate());
            return errs;
        };
        this.isValid = () => (this.validate().length === 0);
        /**
         * Checks if this object is at the class's zero value.
         * @returns True if the this has the default values
         */
        this.isZeroValue = () => (RollTableEntry.isZeroValue(this));
        /**
         * Checks if the supplied number satisfies the rules for
         * this Roll-Table Result entry.
         * Will return false if this result is not configured properly,
         * (ie. no value, or minimum/maximum created properly)
         * @param val Number to check
         * @returns True if the supplied number satisfies
         */
        this.check = (val) => {
            if (this.value)
                return (val === this.value);
            if (this.minimumValue && this.maximumValue)
                return (val >= this.minimumValue && val <= this.maximumValue);
            return false;
        };
        this.body = TextBlock.ZERO_VALUE;
        // Check if props have been provided
        if (typeof props !== 'undefined' && props !== null) {
            if (props instanceof RollTableEntry) {
                /*
                 * If this is another Resource,
                 * Copy the properties in.
                 */
                RollTableEntry.strictValidateProps(props);
                this.value = props.value;
                this.minimumValue = props.minimumValue;
                this.maximumValue = props.maximumValue;
                this.title = props.title;
                this.body = new TextBlock(props.body);
            }
            else if (isPlainObject(props)) {
                RollTableEntry.strictValidateProps(props);
                this.assign(props);
            }
            else {
                console.warn(`Attempting to instantiate a RollTableEntry object with an invalid parameter. Expected either a RollTableEntry object, or a plain JSON Object of properties. Instead encountered a "${typeof props}"`);
            }
        }
    }
}
/**
 * Holds the "Zero" value (empty, null) for easy reference
 * and object instantiation.
 */
RollTableEntry.ZERO_VALUE = new RollTableEntry();
/**
 * Checks if the supplied object is at the class's zero value.
 * @param obj TextBlock object to check
 * @returns True if the object has the default values
 */
RollTableEntry.isZeroValue = (obj) => (!obj.value
    && !obj.minimumValue
    && !obj.maximumValue
    && !obj.title
    && obj.body.isZeroValue());
/**
 * Performs type checking and throws errors if the
 * properties needed are not the right types.
 * Does not fully validate the data within them,
 * but will check for emptyness, or incorrect Enums
 * @throws TypeErrors for invalid properties
 * @param props Incoming properties object
 */
RollTableEntry.strictValidateProps = (props, ind = 0) => {
    if (!props)
        throw new TypeError(`RollTableEntry.StrictValidateProps requires a valid parameter to check, none was given.`);
    if (!props.body)
        throw new TypeError(`RollTableEntry[${ind}] requires a "body" object, none was found.`);
    if (typeof props.body !== 'object' || Array.isArray(props.body))
        throw new TypeError(`RollTableEntry[${ind}] requires an object for "body", but ${typeof props.body} was found instead.`);
    TextBlock.strictValidateProps(props.body);
    if (props.value) {
        if (!testIfPositiveInteger(props.value))
            throw new TypeError(`RollTableEntry[${ind}] "value" property must be a positive integer.`);
    }
    if (props.minimumValue) {
        if (!testIfPositiveInteger(props.minimumValue))
            throw new TypeError(`RollTableEntry[${ind}] "minimumValue" property must be a positive integer.`);
    }
    if (props.maximumValue) {
        if (!testIfPositiveInteger(props.maximumValue))
            throw new TypeError(`RollTableEntry[${ind}] "maximumValue" property must be a positive integer.`);
    }
};
;
/**
 * A Roll-Table, in which a specified die
 * size should be rolled to produce a
 * random result.
 *
 * Schema: /roll-table.schema.json
 */
export default class RollTable {
    constructor(props) {
        this.assign = (props) => {
            if (props.results && typeof props.results === 'object' && Array.isArray(props.results))
                this.results = props.results.map((ent) => new RollTableEntry(ent));
        };
        this.validate = () => {
            const errs = [];
            if (!dieSizeHas(this.die))
                errs.push(`RollTable.die is not a valid DieSize.`);
            if (this.results.length === 0)
                errs.push(`RollTable.results should not be empty.`);
            this.results.forEach((ent) => {
                const eErrs = ent.validate();
                errs.push(...eErrs);
            });
            return errs;
        };
        this.isValid = () => (this.validate().length === 0);
        /**
         * Searches the results array for the first RollTableEntry to satisfy
         * the check using the provided number.
         *
         * @param val Die result to check
         * @returns RollTableEntry if one satisfies or undefined if none do
         */
        this.get = (val) => this.results.find((ent) => ent.check(val));
        this.die = DieSize.UNKNOWN;
        this.results = [];
        // Check if props have been provided
        if (typeof props !== 'undefined' && props !== null) {
            if (props instanceof RollTable) {
                /*
                 * If this is another Resource,
                 * Copy the properties in.
                 */
                RollTable.strictValidateProps(props);
            }
            else if (isPlainObject(props)) {
                RollTable.strictValidateProps(props);
                this.assign(props);
            }
            else {
                console.warn(`Attempting to instantiate a RollTable object with an invalid parameter. Expected either a RollTable object, or a plain JSON Object of properties. Instead encountered a "${typeof props}"`);
            }
        }
    }
}
/**
 * Holds the "Zero" value (empty, null) for easy reference
 * and object instantiation.
 */
RollTable.ZERO_VALUE = new RollTable();
/**
 * Checks if the supplied object is at the class's zero value.
 * @param obj TextBlock object to check
 * @returns True if the object has the default values
 */
RollTable.isZeroValue = (obj) => (obj.die === DieSize.UNKNOWN
    && obj.results.length === 0);
/**
 * Performs type checking and throws errors if the
 * properties needed are not the right types.
 * Does not fully validate the data within them,
 * but will check for emptyness, or incorrect Enums
 * @throws TypeErrors for invalid properties
 * @param props Incoming properties object
 */
RollTable.strictValidateProps = (props) => {
    if (!props)
        throw new TypeError(`RollTable.StrictValidateProps requires a valid parameter to check, none was given.`);
    if (!props.die)
        throw new TypeError(`Missing "die" property for RollTable.`);
    if (typeof props.die !== 'string')
        throw new TypeError(`RollTable.die should be a string, instead found "${typeof props.die}".`);
    if (!dieSizeHas(props.die))
        throw new TypeError(`RollTable.die property must be a valid die size enum, "${props.die}" is not one.`);
    if (!props.results)
        throw new TypeError(`Missing "results" property for RollTable.`);
    if (typeof props.results !== 'object' || Array.isArray(props.results) === false)
        throw new TypeError(`RollTable.results should be an array, instead found "${typeof props.results}"`);
    props.results.forEach(RollTableEntry.strictValidateProps);
};
//# sourceMappingURL=roll-table.js.map