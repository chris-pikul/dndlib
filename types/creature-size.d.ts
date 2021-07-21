/**
 * Holds enumerated values for die sizes.
 *
 * The "UNKNOWN" enum maps to 0 for null values and should
 * not be treated as valid.
 *
 * This maps to the scema "/size.schema.json"
 */
export declare enum CreatureSize {
    UNKNOWN = "UNKNOWN",
    /**
     * Roughly 2.5 x 2.5 feet
     */
    TINY = "TINY",
    /**
     * Roughly under 5 x 5 feet
     */
    SMALL = "SMALL",
    /**
     * Roughly around 5 x 5 feet
     */
    MEDIUM = "MEDIUM",
    /**
     * Roughly 10 x 10 feet
     */
    LARGE = "LARGE",
    /**
     * Roughly 15 x 15 feet
     */
    HUGE = "HUGE",
    /**
     * Roughly 20 x 20 feet or larger
     */
    GARGANTUAN = "GARGANTUAN"
}
export declare const creatureSizeHas: (key: string) => boolean;
/**
 * Get's the suggested width of a given side for a creature size in feet.
 *
 * Returns 0 if the value is unknown or incorrect.
 *
 * @param size Given creature size
 * @returns Number representing a single sides suggested width in feet
 */
export declare const creatureSizeAsFeet: (size: CreatureSize) => number;
