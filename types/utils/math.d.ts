/**
 * Ensures a number is positive by maxing it against 0.
 *
 * @param value Number to clamp
 * @returns New number, that's positive
 */
export declare function positive(value: number): number;
/**
 * Clamps the given value to be within the given range.
 *
 * @param value Number to clamp
 * @param min Minimum value, defaults to 0
 * @param max Maximum value, defaults to Number.MAX_VALUE
 * @returns The number, clamped between min, and max.
 */
export declare function clampFloat(value: number, min?: number, max?: number): number;
/**
 * Clamps the given value to be within the given range.
 * Will truncate the value to the integral value (removing any fractionals)
 *
 * @param value Number to clamp
 * @param min Minimum value, defaults to 0
 * @param max Maximum value, defaults to Number.MAX_VALUE
 * @returns The number, clamped between min, and max.
 */
export declare function clampInt(value: number, min?: number, max?: number): number;
/**
 * Generates a random floating-point number within the range specified
 * @param min Minimum value, inclusive
 * @param max Maximum value, inclusive
 */
export declare function randomFloat(min?: number, max?: number): number;
/**
 * Generates a random integer within the range specified
 * @param min Minimum value, inclusive
 * @param max Maximum value, inclusive
 */
export declare function randomInt(min?: number, max?: number): number;
