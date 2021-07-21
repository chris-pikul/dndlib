/**
 * An acceptable JSON value
 */
export type JSONValue = string | number | boolean | null | JSONValue[] | Record<string, unknown>;

/**
 * Interface for plain ol' JSON objects.
 * This helps in typing JSON serializable data.
 */
export interface JSONObject {
     [key:string]:JSONValue;
};
