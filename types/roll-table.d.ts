import { IAssignable, IValidatable, JSONObject } from './interfaces';
import { DieSize } from './die-size';
import TextBlock from './text-block';
/**
 * An individual result from a roll-table.
 * Each value can be marked with optional
 * minimum, maximum, and absolute values to
 * help determine the results.
 */
export interface IRollTableEntry {
    value?: number;
    minimumValue?: number;
    maximumValue?: number;
    title?: string;
    body: TextBlock;
}
/**
 * An individual entry into a Roll-Table.
 *
 * Uses either a set value, or a range value (inclusive), to determine if a
 * given die roll matches this entry.
 */
export declare class RollTableEntry implements IRollTableEntry, IAssignable, IValidatable {
    /**
     * Holds the "Zero" value (empty, null) for easy reference
     * and object instantiation.
     */
    static readonly ZERO_VALUE: RollTableEntry;
    /**
     * Checks if the supplied object is at the class's zero value.
     * @param obj TextBlock object to check
     * @returns True if the object has the default values
     */
    static isZeroValue: (obj: RollTableEntry) => boolean;
    /**
     * Performs type checking and throws errors if the
     * properties needed are not the right types.
     * Does not fully validate the data within them,
     * but will check for emptyness, or incorrect Enums
     * @throws TypeErrors for invalid properties
     * @param props Incoming properties object
     */
    static strictValidateProps: (props: any, ind?: number) => void;
    /**
     * A specific value to match against during checking.
     * This is the prefered method if provided.
     */
    value?: number;
    /**
     * The minimumm value (inclusive) for a die roll to check against.
     * A given value must be equal to or above this value.
     * In order to use the ranged check feature both minimumValue and
     * maximumValue must be supplied.
     */
    minimumValue?: number;
    /**
     * The maximum value (inclusive) for a die roll to check against.
     * A given value must be equal to or below this value.
     * In order to use the ranged check feature both minimumValue and
     * maximumValue must be supplied.
     */
    maximumValue?: number;
    /**
     * An optional title for this entry.
     */
    title?: string;
    /**
     * A TextBlock representing the contents of this entry.
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
    /**
     * Checks if the supplied number satisfies the rules for
     * this Roll-Table Result entry.
     * Will return false if this result is not configured properly,
     * (ie. no value, or minimum/maximum created properly)
     * @param val Number to check
     * @returns True if the supplied number satisfies
     */
    check: (val: number) => boolean;
}
/**
 * A roll-table, in which a specified die
 * size should be rolled to produce a
 * random result.
 *
 * Schema: /roll-table.schema.json
 */
export interface IRollTable {
    die: DieSize;
    results: Array<IRollTableEntry>;
}
/**
 * A Roll-Table, in which a specified die
 * size should be rolled to produce a
 * random result.
 *
 * Schema: /roll-table.schema.json
 */
export default class RollTable implements IRollTable, IAssignable, IValidatable {
    /**
     * Holds the "Zero" value (empty, null) for easy reference
     * and object instantiation.
     */
    static readonly ZERO_VALUE: RollTable;
    /**
     * Checks if the supplied object is at the class's zero value.
     * @param obj TextBlock object to check
     * @returns True if the object has the default values
     */
    static isZeroValue: (obj: RollTable) => boolean;
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
     * The size of the die that should be used to roll on this table.
     */
    readonly die: DieSize;
    /**
     * An array of RollTableEntry objects, used to map the results.
     * Any checks will be done from index 0 onwards.
     */
    results: Array<RollTableEntry>;
    constructor(props?: any);
    assign: (props: JSONObject) => void;
    validate: () => Array<string>;
    isValid: () => boolean;
    /**
     * Searches the results array for the first RollTableEntry to satisfy
     * the check using the provided number.
     *
     * @param val Die result to check
     * @returns RollTableEntry if one satisfies or undefined if none do
     */
    get: (val: number) => (RollTableEntry | undefined);
}
