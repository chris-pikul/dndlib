/* eslint-disable no-shadow */
// The above rule is to stop VSCode from complaining un-necessarily
import { enumHas } from './utils/enums';
import { isPlainObject } from './utils/json-object';
/**
 * Holds enumerated values for alignment
 *
 * The "UNKNOWN" enum maps to 0 for null values and should
 * not be treated as valid.
 *
 * This maps to the scema "/alignment.schema.json"
 */
export var Alignment;
(function (Alignment) {
    Alignment["UNKNOWN"] = "UNKNOWN";
    Alignment["CHAOTIC_GOOD"] = "CHAOTIC_GOOD";
    Alignment["GOOD"] = "GOOD";
    Alignment["LAWFUL_GOOD"] = "LAWFUL_GOOD";
    Alignment["CHAOTIC_NEUTRAL"] = "CHAOTIC_NEUTRAL";
    Alignment["NEUTRAL"] = "NEUTRAL";
    Alignment["LAWFUL_NEUTRAL"] = "LAWFUL_NEUTRAL";
    Alignment["CHAOTIC_EVIL"] = "CHAOTIC_EVIL";
    Alignment["EVIL"] = "EVIL";
    Alignment["LAWFUL_EVIL"] = "LAWFUL_EVIL";
})(Alignment || (Alignment = {}));
;
export const alignmentHas = (key) => enumHas(Alignment, key);
/**
 * The entropy axis of the alignment.
 * Can be either chaotic, neutral, or lawful.
 */
export var AlignmentEntropy;
(function (AlignmentEntropy) {
    AlignmentEntropy["CHAOTIC"] = "CHAOTIC";
    AlignmentEntropy["NEUTRAL"] = "NEUTRAL";
    AlignmentEntropy["LAWFUL"] = "LAWFUL";
})(AlignmentEntropy || (AlignmentEntropy = {}));
;
/**
 * The morality axis of the alignment.
 * Can be either good, neutral, or evil.
 */
export var AlignmentMorality;
(function (AlignmentMorality) {
    AlignmentMorality["GOOD"] = "GOOD";
    AlignmentMorality["NEUTRAL"] = "NEUTRAL";
    AlignmentMorality["EVIL"] = "EVIL";
})(AlignmentMorality || (AlignmentMorality = {}));
;
;
/**
 * An alternative class for holding alignment.
 * Instead of singular enums, this can be used to break apart the axes used.
 *
 * Allows easier testing and equating as well.
 */
export class AlignmentAxes {
    constructor(props) {
        this.entropy = AlignmentEntropy.NEUTRAL;
        this.morality = AlignmentMorality.NEUTRAL;
        /**
         * Attempts to apply the given enum into it's two-axis alignment
         * representation and applies it to this object.
         *
         * @param value Alignment or string enum
         * @returns TypeError if the enum is invalid
         */
        this.assignFromEnum = (value) => {
            switch (value) {
                case Alignment.CHAOTIC_GOOD:
                    this.entropy = AlignmentEntropy.CHAOTIC;
                    this.morality = AlignmentMorality.GOOD;
                    break;
                case Alignment.GOOD:
                    this.entropy = AlignmentEntropy.NEUTRAL;
                    this.morality = AlignmentMorality.GOOD;
                    break;
                case Alignment.LAWFUL_GOOD:
                    this.entropy = AlignmentEntropy.CHAOTIC;
                    this.morality = AlignmentMorality.GOOD;
                    break;
                case Alignment.CHAOTIC_NEUTRAL:
                    this.entropy = AlignmentEntropy.CHAOTIC;
                    this.morality = AlignmentMorality.NEUTRAL;
                    break;
                case Alignment.NEUTRAL:
                    this.entropy = AlignmentEntropy.NEUTRAL;
                    this.morality = AlignmentMorality.NEUTRAL;
                    break;
                case Alignment.LAWFUL_NEUTRAL:
                    this.entropy = AlignmentEntropy.CHAOTIC;
                    this.morality = AlignmentMorality.NEUTRAL;
                    break;
                case Alignment.CHAOTIC_EVIL:
                    this.entropy = AlignmentEntropy.CHAOTIC;
                    this.morality = AlignmentMorality.EVIL;
                    break;
                case Alignment.EVIL:
                    this.entropy = AlignmentEntropy.NEUTRAL;
                    this.morality = AlignmentMorality.EVIL;
                    break;
                case Alignment.LAWFUL_EVIL:
                    this.entropy = AlignmentEntropy.CHAOTIC;
                    this.morality = AlignmentMorality.EVIL;
                    break;
                default:
                    return new TypeError(`The alignment enumerated value "${value}" does not map to a valid Alignment.`);
            }
        };
        /**
         * Converts this axis alignment object into an Alignment enum
         *
         * @returns Alignment enum, or undefined
         */
        this.toEnum = () => {
            if (this.entropy === AlignmentEntropy.CHAOTIC) {
                if (this.morality === AlignmentMorality.GOOD)
                    return Alignment.CHAOTIC_GOOD;
                else if (this.morality === AlignmentMorality.NEUTRAL)
                    return Alignment.CHAOTIC_NEUTRAL;
                else if (this.morality === AlignmentMorality.EVIL)
                    return Alignment.CHAOTIC_EVIL;
            }
            else if (this.entropy === AlignmentEntropy.NEUTRAL) {
                if (this.morality === AlignmentMorality.GOOD)
                    return Alignment.GOOD;
                else if (this.morality === AlignmentMorality.NEUTRAL)
                    return Alignment.NEUTRAL;
                else if (this.morality === AlignmentMorality.EVIL)
                    return Alignment.EVIL;
            }
            else if (this.entropy === AlignmentEntropy.LAWFUL) {
                if (this.morality === AlignmentMorality.GOOD)
                    return Alignment.LAWFUL_GOOD;
                else if (this.morality === AlignmentMorality.NEUTRAL)
                    return Alignment.LAWFUL_NEUTRAL;
                else if (this.morality === AlignmentMorality.EVIL)
                    return Alignment.LAWFUL_EVIL;
            }
        };
        this.toString = () => { var _a; return ((_a = this.toEnum()) === null || _a === void 0 ? void 0 : _a.toString()) || 'UNKNOWN'; };
        if (typeof props !== 'undefined' && props !== null) {
            if (props instanceof AlignmentAxes) {
                this.entropy = props.entropy;
                this.morality = props.morality;
            }
            else if (typeof props === 'string') {
                if (alignmentHas(props)) {
                    const err = this.assignFromEnum(props);
                    if (err)
                        console.warn(err.message);
                }
            }
            else if (isPlainObject(props)) {
                if (props.entropy && typeof props.entropy === 'string')
                    this.entropy = props.entropy;
                if (props.morality && typeof props.morality === 'string')
                    this.morality = props.morality;
            }
            else {
                console.warn(`Attemnpting to instantiate AlignmentAxes with invalid property.`);
            }
        }
    }
    get isChaotic() {
        return this.entropy === AlignmentEntropy.CHAOTIC;
    }
    get isLawful() {
        return this.entropy === AlignmentEntropy.LAWFUL;
    }
    get isGood() {
        return this.morality === AlignmentMorality.GOOD;
    }
    get isEvil() {
        return this.morality === AlignmentMorality.EVIL;
    }
}
//# sourceMappingURL=alignment.js.map