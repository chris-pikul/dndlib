/*
 * Copyright(C) 2021 Chris Pikul. Under MIT license.
 * See "LICENSE" in the root project folder.
 */
import { enumHas } from './utils/enums';

/**
 * Holds enumerated values for die sizes.
 *
 * The "UNKNOWN" enum maps to 0 for null values and should
 * not be treated as valid.
 *
 * This maps to the scema "/size.schema.json"
 */
export const CreatureSizes = {
    UNKNOWN: 'UNKNOWN',

    /**
     * Roughly 2.5 x 2.5 feet
     */
    TINY: 'TINY',

    /**
     * Roughly under 5 x 5 feet
     */
    SMALL: 'SMALL',

    /**
     * Roughly around 5 x 5 feet
     */
    MEDIUM: 'MEDIUM',

    /**
     * Roughly 10 x 10 feet
     */
    LARGE: 'LARGE',

    /**
     * Roughly 15 x 15 feet
     */
    HUGE: 'HUGE',

    /**
     * Roughly 20 x 20 feet or larger
     */
    GARGANTUAN: 'GARGANTUAN',
} as const;
export type ECreatureSize = (typeof CreatureSizes)[keyof typeof CreatureSizes];

export const creatureSizeHas = (key: string): boolean =>
    enumHas(CreatureSizes, key);

/**
 * Get's the suggested width of a given side for a creature size in feet.
 *
 * Returns 0 if the value is unknown or incorrect.
 *
 * @param size Given creature size
 * @returns Number representing a single sides suggested width in feet
 */
export const creatureSizeAsFeet = (size: ECreatureSize): number => {
    switch (size) {
        case CreatureSizes.TINY:
            return 2.5;
        case CreatureSizes.SMALL:
        case CreatureSizes.MEDIUM:
            return 5;
        case CreatureSizes.LARGE:
            return 10;
        case CreatureSizes.HUGE:
            return 15;
        case CreatureSizes.GARGANTUAN:
            return 20;
        default:
            return 0;
    }
};
