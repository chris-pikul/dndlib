import { enumHas } from './utils/enums';
/**
 * Holds enumerated values for die sizes.
 *
 * The "UNKNOWN" enum maps to 0 for null values and should
 * not be treated as valid.
 */
export var DieSize;
(function (DieSize) {
    DieSize["UNKNOWN"] = "UNKNOWN";
    DieSize["D2"] = "D2";
    DieSize["D4"] = "D4";
    DieSize["D6"] = "D6";
    DieSize["D8"] = "D8";
    DieSize["D10"] = "D10";
    DieSize["D12"] = "D12";
    DieSize["D20"] = "D20";
    DieSize["D100"] = "D100";
})(DieSize || (DieSize = {}));
;
export const dieSizeHas = (key) => enumHas(DieSize, key);
//# sourceMappingURL=die-size.js.map