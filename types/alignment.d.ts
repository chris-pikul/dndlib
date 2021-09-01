/**
 * Holds enumerated values for alignment
 *
 * The "UNKNOWN" enum maps to 0 for null values and should
 * not be treated as valid.
 *
 * This maps to the scema "/alignment.schema.json"
 */
export declare enum Alignment {
    UNKNOWN = "UNKNOWN",
    CHAOTIC_GOOD = "CHAOTIC_GOOD",
    GOOD = "GOOD",
    LAWFUL_GOOD = "LAWFUL_GOOD",
    CHAOTIC_NEUTRAL = "CHAOTIC_NEUTRAL",
    NEUTRAL = "NEUTRAL",
    LAWFUL_NEUTRAL = "LAWFUL_NEUTRAL",
    CHAOTIC_EVIL = "CHAOTIC_EVIL",
    EVIL = "EVIL",
    LAWFUL_EVIL = "LAWFUL_EVIL"
}
export declare const alignmentHas: (key: string) => boolean;
/**
 * The entropy axis of the alignment.
 * Can be either chaotic, neutral, or lawful.
 */
export declare enum AlignmentEntropy {
    CHAOTIC = "CHAOTIC",
    NEUTRAL = "NEUTRAL",
    LAWFUL = "LAWFUL"
}
export declare const alignmentEntropyHas: (key: string) => boolean;
/**
 * The morality axis of the alignment.
 * Can be either good, neutral, or evil.
 */
export declare enum AlignmentMorality {
    GOOD = "GOOD",
    NEUTRAL = "NEUTRAL",
    EVIL = "EVIL"
}
export declare const alignmentMoralityHas: (key: string) => boolean;
/**
 * Holds the two axes of alignment as one value.
 * These are entropy, and morality.
 */
export interface IAlignmentAxes {
    entropy: AlignmentEntropy;
    morality: AlignmentMorality;
}
/**
 * An alternative class for holding alignment.
 * Instead of singular enums, this can be used to break apart the axes used.
 *
 * Allows easier testing and equating as well.
 */
export declare class AlignmentAxes implements IAlignmentAxes {
    entropy: AlignmentEntropy;
    morality: AlignmentMorality;
    constructor(props?: any);
    /**
     * Attempts to apply the given enum into it's two-axis alignment
     * representation and applies it to this object.
     *
     * @param value Alignment or string enum
     * @returns TypeError if the enum is invalid
     */
    assignFromEnum: (value: Alignment | string) => (TypeError | undefined);
    get isChaotic(): boolean;
    get isLawful(): boolean;
    get isGood(): boolean;
    get isEvil(): boolean;
    /**
     * Converts this axis alignment object into an Alignment enum
     *
     * @returns Alignment enum, or undefined
     */
    toEnum: () => (Alignment | undefined);
    toString: () => string;
}
