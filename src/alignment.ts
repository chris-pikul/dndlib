/*
 * Copyright(C) 2021 Chris Pikul. Under MIT license. 
 * See "LICENSE" in the root project folder.
 */
import { enumHas, isPlainObject } from './utils';

/**
 * Holds enumerated values for alignment
 * 
 * The "UNKNOWN" enum maps to 0 for null values and should
 * not be treated as valid.
 * 
 * This maps to the scema "/Alignments.schema.json"
 */
export const Alignments = {
  UNKNOWN: 'UNKNOWN',
  CHAOTIC_GOOD: 'CHAOTIC_GOOD',
  GOOD: 'GOOD',
  LAWFUL_GOOD: 'LAWFUL_GOOD',
  CHAOTIC_NEUTRAL: 'CHAOTIC_NEUTRAL',
  NEUTRAL: 'NEUTRAL',
  LAWFUL_NEUTRAL: 'LAWFUL_NEUTRAL',
  CHAOTIC_EVIL: 'CHAOTIC_EVIL',
  EVIL: 'EVIL',
  LAWFUL_EVIL: 'LAWFUL_EVIL',
} as const;
export type EAlignment = typeof Alignments[keyof typeof Alignments];

export const alignmentHas = (key:string):boolean => enumHas(Alignments, key);

/**
 * The entropy axis of the Alignments.
 * Can be either chaotic, neutral, or lawful.
 */
export const AlignmentEntropies = {
  CHAOTIC: 'CHAOTIC',
  NEUTRAL: 'NEUTRAL',
  LAWFUL: 'LAWFUL',
} as const;
export type EAlignmentEntropy = typeof AlignmentEntropies[keyof typeof AlignmentEntropies];

export const alignmentEntropyHas = (key:string):boolean => enumHas(AlignmentEntropies, key);

/**
 * The morality axis of the Alignments.
 * Can be either good, neutral, or evil.
 */
export const AlignmentMoralities = {
  GOOD: 'GOOD',
  NEUTRAL: 'NEUTRAL',
  EVIL: 'EVIL',
} as const;
export type EAlignmentMorality = typeof AlignmentMoralities[keyof typeof AlignmentMoralities];

export const alignmentMoralityHas = (key:string):boolean => enumHas(AlignmentMoralities, key);

/**
 * Holds the two axes of alignment as one value.
 * These are entropy, and morality.
 */
export interface IAlignmentAxes {
  entropy : EAlignmentEntropy;
  morality : EAlignmentMorality;
};

/**
 * An alternative class for holding Alignments.
 * Instead of singular enums, this can be used to break apart the axes used.
 * 
 * Allows easier testing and equating as well.
 */
export class AlignmentAxes implements IAlignmentAxes {
  entropy : EAlignmentEntropy = AlignmentEntropies.NEUTRAL;

  morality : EAlignmentMorality = AlignmentMoralities.NEUTRAL;

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
        if(props.entropy && typeof props.entropy === 'string' && alignmentEntropyHas(props.entropy))
          this.entropy = props.entropy;
        
        if(props.morality && typeof props.morality === 'string' && alignmentMoralityHas(props.morality))
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
  assignFromEnum = (value : EAlignment|string):(TypeError|undefined) => {
    switch(value) {
      case Alignments.CHAOTIC_GOOD:
        this.entropy = AlignmentEntropies.CHAOTIC;
        this.morality = AlignmentMoralities.GOOD;
        break;
      case Alignments.GOOD:
        this.entropy = AlignmentEntropies.NEUTRAL;
        this.morality = AlignmentMoralities.GOOD;
        break;
      case Alignments.LAWFUL_GOOD:
        this.entropy = AlignmentEntropies.CHAOTIC;
        this.morality = AlignmentMoralities.GOOD;
        break;
      case Alignments.CHAOTIC_NEUTRAL:
        this.entropy = AlignmentEntropies.CHAOTIC;
        this.morality = AlignmentMoralities.NEUTRAL;
        break;
      case Alignments.NEUTRAL:
        this.entropy = AlignmentEntropies.NEUTRAL;
        this.morality = AlignmentMoralities.NEUTRAL;
        break;
      case Alignments.LAWFUL_NEUTRAL:
        this.entropy = AlignmentEntropies.CHAOTIC;
        this.morality = AlignmentMoralities.NEUTRAL;
        break;
      case Alignments.CHAOTIC_EVIL:
        this.entropy = AlignmentEntropies.CHAOTIC;
        this.morality = AlignmentMoralities.EVIL;
        break;
      case Alignments.EVIL:
        this.entropy = AlignmentEntropies.NEUTRAL;
        this.morality = AlignmentMoralities.EVIL;
        break;
      case Alignments.LAWFUL_EVIL:
        this.entropy = AlignmentEntropies.CHAOTIC;
        this.morality = AlignmentMoralities.EVIL;
        break;
      default:
        return new TypeError(`The alignment enumerated value "${value}" does not map to a valid Alignments.`);
    }
  }

  get isChaotic():boolean {
    return this.entropy === AlignmentEntropies.CHAOTIC;
  }

  get isLawful():boolean {
    return this.entropy === AlignmentEntropies.LAWFUL;
  }

  get isGood():boolean {
    return this.morality === AlignmentMoralities.GOOD;
  }

  get isEvil():boolean {
    return this.morality === AlignmentMoralities.EVIL;
  }

  /**
   * Converts this axis alignment object into an Alignment enum
   * 
   * @returns Alignment enum, or undefined
   */
  toEnum = ():(EAlignment|undefined) => {
    if(this.entropy === AlignmentEntropies.CHAOTIC) {
      if(this.morality === AlignmentMoralities.GOOD)
        return Alignments.CHAOTIC_GOOD;
      else if(this.morality === AlignmentMoralities.NEUTRAL)
        return Alignments.CHAOTIC_NEUTRAL;
      else if(this.morality === AlignmentMoralities.EVIL)
        return Alignments.CHAOTIC_EVIL;
    } else if(this.entropy === AlignmentEntropies.NEUTRAL) {
      if(this.morality === AlignmentMoralities.GOOD)
        return Alignments.GOOD;
      else if(this.morality === AlignmentMoralities.NEUTRAL)
        return Alignments.NEUTRAL;
      else if(this.morality === AlignmentMoralities.EVIL)
        return Alignments.EVIL;
    } else if(this.entropy === AlignmentEntropies.LAWFUL) {
      if(this.morality === AlignmentMoralities.GOOD)
        return Alignments.LAWFUL_GOOD;
      else if(this.morality === AlignmentMoralities.NEUTRAL)
        return Alignments.LAWFUL_NEUTRAL;
      else if(this.morality === AlignmentMoralities.EVIL)
        return Alignments.LAWFUL_EVIL;
    }
  }

  toString = ():string => this.toEnum()?.toString() || 'UNKNOWN'
}
