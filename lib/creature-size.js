import { enumHas } from './utils/enums';
/**
 * Holds enumerated values for die sizes.
 *
 * The "UNKNOWN" enum maps to 0 for null values and should
 * not be treated as valid.
 *
 * This maps to the scema "/size.schema.json"
 */
export var CreatureSize;
(function (CreatureSize) {
    CreatureSize["UNKNOWN"] = "UNKNOWN";
    /**
     * Roughly 2.5 x 2.5 feet
     */
    CreatureSize["TINY"] = "TINY";
    /**
     * Roughly under 5 x 5 feet
     */
    CreatureSize["SMALL"] = "SMALL";
    /**
     * Roughly around 5 x 5 feet
     */
    CreatureSize["MEDIUM"] = "MEDIUM";
    /**
     * Roughly 10 x 10 feet
     */
    CreatureSize["LARGE"] = "LARGE";
    /**
     * Roughly 15 x 15 feet
     */
    CreatureSize["HUGE"] = "HUGE";
    /**
     * Roughly 20 x 20 feet or larger
     */
    CreatureSize["GARGANTUAN"] = "GARGANTUAN";
})(CreatureSize || (CreatureSize = {}));
;
export const creatureSizeHas = (key) => enumHas(CreatureSize, key);
/**
 * Get's the suggested width of a given side for a creature size in feet.
 *
 * Returns 0 if the value is unknown or incorrect.
 *
 * @param size Given creature size
 * @returns Number representing a single sides suggested width in feet
 */
export const creatureSizeAsFeet = (size) => {
    switch (size) {
        case CreatureSize.TINY:
            return 2.5;
        case CreatureSize.SMALL:
        case CreatureSize.MEDIUM:
            return 5;
        case CreatureSize.LARGE:
            return 10;
        case CreatureSize.HUGE:
            return 15;
        case CreatureSize.GARGANTUAN:
            return 20;
        default:
            return 0;
    }
};
//# sourceMappingURL=creature-size.js.map