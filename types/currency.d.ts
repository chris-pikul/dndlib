/**
 * Describes the value of something, or a general ammount of monetary
 * treasure.
 */
export interface ICurrency {
    copper?: number;
    silver?: number;
    electrum?: number;
    gold?: number;
    platinum?: number;
}
/**
 * Describes an amount of money, or currency. Breaks the values down between
 * the denominations copper, silver, electrum, gold, and platinum.
 */
export default class Currency implements ICurrency {
    /**
     * Generates a new Currency object with a random gold value applied, and
     * balanced.
     *
     * @param min Minimum gold value, inclusive
     * @param max Maximum gold value, inclusive
     * @returns New Currency object representing the balanced value
     */
    static random: (min: number, max: number) => Currency;
    /**
     * Reduces an incoming value by the divisor supplied.
     * Returns an array of 2 integers.
     *  1. The remaining value after division in the current denomination.
     *  2. The amount of the next denomination that was exchanged.
     *
     * Used for calculating exchanges up to the next denomination.
     *
     * @param value Input value to reduce
     * @param div The divisor to the next denomination (default 10)
     * @returns [ remainder, next ]
     */
    static reduce: (value: number, div?: number) => Array<number>;
    copper?: number;
    silver?: number;
    electrum?: number;
    gold?: number;
    platinum?: number;
    /**
     * Constructs a new Currency object.
     *
     * The first parameter `props` can be supplied with either a Currency object,
     * a JSON object resembling a Currency object, or a number.
     *
     * If an object is provided, the properties will be copied into the new
     * object, essentially a hard-copy.
     *
     * If a number is provided, it is treated as a Gold Value and the needed
     * denominations are calculated using it. The object created will have this
     * value broken down into all the denominations using Currency.fromGold().
     * With this option, the remaining properties determine how this gold value
     * is handled. As in, should we calculate the platinum equivelents, or the
     * electrum values as well.
     *
     * The resulting Currency object will only hold the properties needed and
     * will not assign empty denominations.
     *
     * @param props Either an object, or a number
     * @param usePlatinum If a number was provided, whether to use platinum
     * @param useElectrum If a number was provided, whether to use electrum
     */
    constructor(props?: any, usePlatinum?: boolean, useElectrum?: boolean);
    /**
     * Converts this value into a string for printing. Comes in the form of:
     * "[5CP 10SP 3EP 100GP 1PP]"
     *
     * NOTE: Only uses the values present in this object, will not print 0
     * values.
     */
    toString: () => string;
    /**
     * Converts this object into a singular "Gold Value". This is done by
     * converting each denomination to it's GP equivelent.
     *
     * The parameter `truncate` decides whether a whole integer is returned,
     * or a floating-point value (default).
     *
     * @param truncate Whether to return an integer, or a floating point number
     * @returns Number relating to the gold value
     */
    toGold: (truncate?: boolean) => number;
    /**
     * Adds the given value to this object.
     *
     * If `balanceAfter` is true, this object will have it's values exchanged
     * to balance the denominations using the default parameters (using platinum,
     * excluding electrum).
     *
     * @param value Currency object, or Gold Value number
     * @param balanceAfter Whether to balance the currency after adding.
     */
    add: (value: (Currency | number), balanceAfter?: boolean) => void;
    /**
     * Subtracts the given value to this object.
     *
     * If `balanceAfter` is true, this object will have it's values exchanged
     * to balance the denominations using the default parameters (using platinum,
     * excluding electrum).
     *
     * @param value Currency object, or Gold Value number
     * @param balanceAfter Whether to balance the currency after subtracting.
     */
    subtract: (value: (Currency | number), balanceAfter?: boolean) => void;
    /**
     * Replaces all monetary values with their balanced values from the given gold
     * input. This breaks down and exchanges all the gold for each minimum value.
     *
     * Examples:
     * ```
     *  assignFromGold(123) -> {
     *    copper: 0,
     *    silver: 0,
     *    gold: 3,
     *    platinum: 12,
     *  };
     *
     *  assignFromGold(123.567, false, true) -> {
     *    copper: 6,
     *    silver: 0,
     *    electrum: 1,
     *    gold: 123,
     *  };
     * ```
     *
     * @param gp Numerical (floating) gold value
     * @returns any remaining value not exchanged
     */
    fromGold: (goldValue: number, usePlatinum?: boolean, useElectrum?: boolean) => number;
    /**
     * Attempts to balance the values by exchanging each value upwords
     * towards the highest next denomination.
     *
     * If the `usePlatinum` switch is true (default), then gold will be reduced
     * as well up to the platinum value. If false, then it will stop at gold and
     * the existing platinum will be enlarged to it's gold value.
     *
     * If the `useElectrum` switch is true, electrum will be used as well. If
     * false (default), then electrum will be enlarged to silver.
     *
     * @param usePlatinum boolean (default: true)
     * @param useElectrum boolean (default: false)
     */
    balance: (usePlatinum?: boolean, useElectrum?: boolean) => void;
}
