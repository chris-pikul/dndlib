/**
 * Ensures a number is positive by maxing it against 0.
 * 
 * @param value Number to clamp
 * @returns New number, that's positive
 */
export function positive(value:number):number {
  return Math.max(value, 0);
}

/**
 * Clamps the given value to be within the given range.
 * 
 * @param value Number to clamp
 * @param min Minimum value, defaults to 0
 * @param max Maximum value, defaults to Number.MAX_VALUE
 * @returns The number, clamped between min, and max.
 */
export function clampFloat(value:number, min = 0, max:number = Number.MAX_VALUE):number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Clamps the given value to be within the given range.
 * Will truncate the value to the integral value (removing any fractionals)
 * 
 * @param value Number to clamp
 * @param min Minimum value, defaults to 0
 * @param max Maximum value, defaults to Number.MAX_VALUE
 * @returns The number, clamped between min, and max.
 */
export function clampInt(value:number, min = 0, max:number = Number.MAX_VALUE):number {
  return Math.trunc(clampFloat(value, min, max));
}

/**
 * Generates a random floating-point number within the range specified
 * @param min Minimum value, inclusive
 * @param max Maximum value, inclusive
 */
export function randomFloat(min = 0, max:number = Number.MAX_VALUE):number {
  return (Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random integer within the range specified
 * @param min Minimum value, inclusive
 * @param max Maximum value, inclusive
 */
export function randomInt(min = 0, max:number = Number.MAX_SAFE_INTEGER):number {
  return Math.floor(randomFloat(min, max));
}
