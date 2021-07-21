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
export enum Alignment {
    UNKNOWN = 'UNKNOWN',

    CHAOTIC_GOOD = 'CHAOTIC_GOOD',

    GOOD = 'GOOD',

    LAWFUL_GOOD = 'LAWFUL_GOOD',

    CHAOTIC_NEUTRAL = 'CHAOTIC_NEUTRAL',

    NEUTRAL = 'NEUTRAL',

    LAWFUL_NEUTRAL = 'LAWFUL_NEUTRAL',

    CHAOTIC_EVIL = 'CHAOTIC_EVIL',

    EVIL = 'EVIL',

    LAWFUL_EVIL = 'LAWFUL_EVIL',
};

export const alignmentHas = (key:string):boolean => enumHas(Alignment, key);

/**
 * The entropy axis of the alignment.
 * Can be either chaotic, neutral, or lawful.
 */
export enum AlignmentEntropy {
  CHAOTIC = 'CHAOTIC',
  NEUTRAL = 'NEUTRAL',
  LAWFUL = 'LAWFUL',
};

/**
 * The morality axis of the alignment.
 * Can be either good, neutral, or evil.
 */
export enum AlignmentMorality {
  GOOD = 'GOOD',
  NEUTRAL = 'NEUTRAL',
  EVIL = 'EVIL',
};

/**
 * Holds the two axes of alignment as one value.
 * These are entropy, and morality.
 */
export interface IAlignmentAxes {
  entropy : AlignmentEntropy;
  morality : AlignmentMorality;
};

/**
 * An alternative class for holding alignment.
 * Instead of singular enums, this can be used to break apart the axes used.
 * 
 * Allows easier testing and equating as well.
 */
export class AlignmentAxes implements IAlignmentAxes {
  entropy : AlignmentEntropy = AlignmentEntropy.NEUTRAL;

  morality : AlignmentMorality = AlignmentMorality.NEUTRAL;

  constructor(props?:any) {
    if(typeof props !== 'undefined' && props !== null) {
      if(props instanceof AlignmentAxes) {
        this.entropy = props.entropy;
        this.morality = props.morality;
      } else if(typeof props === 'string') {
        if(alignmentHas(props)) {
          const err = this.assignFromEnum(props);
          if(err)
            console.warn(err.message);
        }
      } else if(isPlainObject(props)) {
        if(props.entropy && typeof props.entropy === 'string')
          this.entropy = props.entropy;
        
        if(props.morality && typeof props.morality === 'string')
          this.morality = props.morality;
      } else {
        console.warn(`Attemnpting to instantiate AlignmentAxes with invalid property.`);
      }
    }
  }

  /**
   * Attempts to apply the given enum into it's two-axis alignment 
   * representation and applies it to this object.
   * 
   * @param value Alignment or string enum
   * @returns TypeError if the enum is invalid
   */
  assignFromEnum = (value : Alignment|string):(TypeError|undefined) => {
    switch(value) {
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
  }

  get isChaotic():boolean {
    return this.entropy === AlignmentEntropy.CHAOTIC;
  }

  get isLawful():boolean {
    return this.entropy === AlignmentEntropy.LAWFUL;
  }

  get isGood():boolean {
    return this.morality === AlignmentMorality.GOOD;
  }

  get isEvil():boolean {
    return this.morality === AlignmentMorality.EVIL;
  }

  /**
   * Converts this axis alignment object into an Alignment enum
   * 
   * @returns Alignment enum, or undefined
   */
  toEnum = ():(Alignment|undefined) => {
    if(this.entropy === AlignmentEntropy.CHAOTIC) {
      if(this.morality === AlignmentMorality.GOOD)
        return Alignment.CHAOTIC_GOOD;
      else if(this.morality === AlignmentMorality.NEUTRAL)
        return Alignment.CHAOTIC_NEUTRAL;
      else if(this.morality === AlignmentMorality.EVIL)
        return Alignment.CHAOTIC_EVIL;
    } else if(this.entropy === AlignmentEntropy.NEUTRAL) {
      if(this.morality === AlignmentMorality.GOOD)
        return Alignment.GOOD;
      else if(this.morality === AlignmentMorality.NEUTRAL)
        return Alignment.NEUTRAL;
      else if(this.morality === AlignmentMorality.EVIL)
        return Alignment.EVIL;
    } else if(this.entropy === AlignmentEntropy.LAWFUL) {
      if(this.morality === AlignmentMorality.GOOD)
        return Alignment.LAWFUL_GOOD;
      else if(this.morality === AlignmentMorality.NEUTRAL)
        return Alignment.LAWFUL_NEUTRAL;
      else if(this.morality === AlignmentMorality.EVIL)
        return Alignment.LAWFUL_EVIL;
    }
  }

  toString = ():string => this.toEnum()?.toString() || 'UNKNOWN'
}
