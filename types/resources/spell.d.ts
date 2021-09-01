import Resource from '../resource';
import Reference, { ReferenceAbilityScore, ReferenceClass, ReferenceDamageType, ReferenceMagicSchool } from '../reference';
import type { IValidatable, ValidationErrors } from '../interfaces';
import { Shape } from '../shape';
import { Rarity } from '../rarity';
/**
 * Declares the range of the spell
 */
export declare enum SpellRangeType {
    /**
     * This spell is a melee, or touch spell.
     */
    MELEE = "MELEE",
    /**
     * This spell has a range, the distance should accompany this type.
     */
    RANGED = "RANGED"
}
export declare const spellRangeTypeHas: (key: string) => boolean;
/**
 * Declares the range type of the spell.
 *
 * If it is a ranged spell, the distance property is required.
 */
export interface ISpellRange {
    /**
     * The type of spell range that is used.
     * ie. "MELEE", or "RANGED"
     */
    type: SpellRangeType;
    /**
     * The maximum distance the spell can effect.
     * This is in feet, and should be a multiple of 5.
     */
    distance?: number;
}
/**
 * The components required to cast this spell
 */
export interface ISpellComponents {
    /**
     * Does this spell require a verbal (spoken) component?
     */
    verbal: boolean;
    /**
     * Does this spell require a semantic (gesture) component?
     */
    semantic: boolean;
    /**
     * Does this spell require materials?
     */
    material: boolean;
    /**
     * The text describing the list of material components.
     * This is required if the matieral property is true.
     */
    cost?: string;
    /**
     * The total gold cost of materials to cast this spell.
     *
     * Components with no written gold cost can be covered by "focuses/focii",
     * this property is for convienience to help denote spells that do require
     * a specific item to be consumed; in which the focus will not cover.
     */
    goldValue?: number;
}
/**
 * A description of the damage a spell delivers, if it does.
 */
export interface ISpellDamage {
    /**
     * The type of damage that is dealt.
     *
     * Ie. force, cold, fire, etc.
     */
    type: ReferenceDamageType;
    options?: Array<Reference>;
    /**
     * The damage calculation for dice rolling.
     *
     * This does not describe the damage if cast at higher levels.
     *
     * Examples:
     *  - "3D6"
     *  - "10D12 + 8"
     *
     * Should validate against the regex:
     *  /^[0-9]{1,2}[d][012468]{1,3}(?:\\s?\\+\\s?[0-9a-z]+)?$/i
     */
    baseAmount: string;
    /**
     * An array of damage calculation strings. Each index is considered 1 slot
     * above the base level. For instance, a 3rd level spell cast using a 5th
     * level slot would reference array index 1 for this. A 2nd level spell cast
     * at 3rd level would reference array index 0.
     *
     * Should validate against the regex:
     *  /^[0-9]{1,2}[d][012468]{1,3}(?:\\s?\\+\\s?[0-9a-z]+)?$/i
     */
    higherSlots?: Array<string>;
    /**
     * Some spells use character level instead of slot levels. This should be an
     * array of 20 entries, each entry being a damage calculation string. Each
     * index\ then represents the character level with index 0 being level 1.
     *
     * Should validate against the regex:
     *  /^[0-9]{1,2}[d][012468]{1,3}(?:\\s?\\+\\s?[0-9a-z]+)?$/i
     */
    characterLevel?: Array<string>;
}
/**
 * Describes the save that a creature affected by this spell might have to make.
 */
export interface ISpellSave {
    /**
     * The ability score used
     */
    ability: ReferenceAbilityScore;
    /**
     * A description of the save process
     */
    description?: string;
    /**
     * A description of what happens if the creature succeeds the save.
     */
    success?: string;
    /**
     * A description of what happens if the creature fails the save.
     */
    failure?: string;
}
/**
 * Describes the area of affect the spell has
 */
export interface ISpellAOE {
    /**
     * The shape of the area
     */
    shape: Shape;
    /**
     * The size of the area in feet. Should be multiples of 5.
     */
    size: number;
    /**
     * Whether the size specified is the diameter. If not, then radius is
     * implied.
     */
    diameter?: boolean;
    /**
     * Whether the area of effect is centered on the creature casting.
     * If this is false, then it is implied that the spell is placable.
     */
    centered?: boolean;
}
/**
 * Describes the properties if this spell is written as a scroll item.
 * Most of these are convenience properties.
 */
export interface ISpellScroll {
    /**
     * The rarity of this spell scroll.
     */
    rarity: Rarity;
    /**
     * If there is an attack roll to be made to use this scroll, this
     * is the provided bonus.
     */
    attackBonus: number;
    /**
     * The spell save required to cast this spell.
     */
    saveDC: number;
    /**
     * The suggested (MSRP) gold value of this scroll.
     * This can be used to either buy, sell, or make the scroll.
     */
    suggestedValue: number;
}
/**
 * Helpful values for if you wish to have this spell enchanted into an item.
 */
export interface ISpellEnchanting {
    /**
     * The minimum caster level required to enchant using this spell.
     */
    minLevel: number;
    /**
     * The gold cost for performing the enchantment.
     * This value includes labor and materials (if there are any).
     */
    cost: number;
    /**
     * How many days will this enchantment require to produce.
     */
    days: number;
}
/**
 * Describes a Spell and all it's properties.
 */
export interface ISpell {
    /**
     * The base level that this spell can be cast at. This is the slot level,
     * and not character level.
     */
    level: number;
    /**
     * A description on what happens if this spell is cast using a higher spell
     * slot than the base level.
     */
    higherLevels?: string;
    /**
     * The range of the spell, or if it's just melee, then the enum denoting that.
     */
    range: ISpellRange;
    /**
     * The components required to cast this spell.
     */
    components: ISpellComponents;
    /**
     * How long this spell takes to cast.
     * Represented as a string since it may use actions.
     */
    castingTime: string;
    /**
     * How long this spell lasts.
     */
    duration: string;
    /**
     * Whether this spell can be cast as a ritual.
     */
    ritual: boolean;
    /**
     * Whether this spell requires concentration.
     */
    concentration: boolean;
    /**
     * If this spell causes damage, what type and how much.
     */
    damage?: ISpellDamage;
    /**
     * The save a creature affected by this spell must make.
     */
    save?: ISpellSave;
    /**
     * If this spell provides healing, this is an array of the healing provided.
     * The 0 index is used for the spell at it's base level, and each index beyond
     * that is each level above the base.
     *
     * Should pass the regex:
     *  /^[0-9]{1,2}[d][012468]{1,3}(?:\\s?\\+\\s?[0-9a-z]+)?$/i
     */
    healing?: Array<string>;
    /**
     * If this spell causes an area-of-effect this describes the shape, size,
     * and properties.
     */
    areaOfEffect?: ISpellAOE;
    /**
     * Which school of magic is this spell from.
     */
    school: ReferenceMagicSchool;
    /**
     * Which classes can use this spell natively.
     */
    classes?: Array<ReferenceClass>;
    /**
     * If this spell if scribed onto a scroll, the suggested properties of it.
     */
    scroll?: ISpellScroll;
    /**
     * If this spell is used to enchant an item, the suggested properties of that
     * process.
     */
    enchanting?: ISpellEnchanting;
}
export default class Spell extends Resource implements ISpell, IValidatable {
    private static readonly regexpDiceCalculation;
    /**
     * Performs type checking and throws errors if the
     * properties needed are not the right types.
     *
     * Does not fully validate the data within them,
     * but will check for emptyness, or incorrect Enums
     *
     * @throws TypeErrors for invalid properties
     * @param props Incoming properties object
     */
    static readonly strictValidateProps: (props: any) => void;
    /**
     * Performs type checking and throws errors if the
     * properties needed are not the right types.
     *
     * Does not fully validate the data within them,
     * but will check for emptyness, or incorrect Enums
     *
     * @throws TypeErrors for invalid properties
     * @param props Incoming properties object
     */
    static readonly strictValidateRangeProps: (props: any) => void;
    /**
     * Performs type checking and throws errors if the
     * properties needed are not the right types.
     *
     * Does not fully validate the data within them,
     * but will check for emptyness, or incorrect Enums
     *
     * @throws TypeErrors for invalid properties
     * @param props Incoming properties object
     */
    static readonly strictValidateComponentsProps: (props: any) => void;
    /**
     * Performs type checking and throws errors if the
     * properties needed are not the right types.
     *
     * Does not fully validate the data within them,
     * but will check for emptyness, or incorrect Enums
     *
     * @throws TypeErrors for invalid properties
     * @param props Incoming properties object
     */
    static readonly strictValidateDamageProps: (props: any) => void;
    /**
     * Performs type checking and throws errors if the
     * properties needed are not the right types.
     *
     * Does not fully validate the data within them,
     * but will check for emptyness, or incorrect Enums
     *
     * @throws TypeErrors for invalid properties
     * @param props Incoming properties object
     */
    static readonly strictValidateSaveProps: (props: any) => void;
    /**
     * Performs type checking and throws errors if the
     * properties needed are not the right types.
     *
     * Does not fully validate the data within them,
     * but will check for emptyness, or incorrect Enums
     *
     * @throws TypeErrors for invalid properties
     * @param props Incoming properties object
     */
    static readonly strictValidateAreaOfEffectProps: (props: any) => void;
    /**
     * Performs type checking and throws errors if the
     * properties needed are not the right types.
     *
     * Does not fully validate the data within them,
     * but will check for emptyness, or incorrect Enums
     *
     * @throws TypeErrors for invalid properties
     * @param props Incoming properties object
     */
    static readonly strictValidateScrollProps: (props: any) => void;
    /**
     * Performs type checking and throws errors if the
     * properties needed are not the right types.
     *
     * Does not fully validate the data within them,
     * but will check for emptyness, or incorrect Enums
     *
     * @throws TypeErrors for invalid properties
     * @param props Incoming properties object
     */
    static readonly strictValidateEnchantingProps: (props: any) => void;
    /**
     * The base level that this spell can be cast at. This is the slot level,
     * and not character level.
     */
    level: number;
    /**
     * A description on what happens if this spell is cast using a higher spell
     * slot than the base level.
     */
    higherLevels?: string;
    /**
     * The range of the spell, or if it's just melee, then the enum denoting that.
     */
    range: ISpellRange;
    /**
     * The components required to cast this spell.
     */
    components: ISpellComponents;
    /**
     * How long this spell takes to cast.
     * Represented as a string since it may use actions.
     */
    castingTime: string;
    /**
     * How long this spell lasts.
     */
    duration: string;
    /**
     * Whether this spell can be cast as a ritual.
     */
    ritual: boolean;
    /**
     * Whether this spell requires concentration.
     */
    concentration: boolean;
    /**
     * If this spell causes damage, what type and how much.
     */
    damage?: ISpellDamage;
    /**
     * The save a creature affected by this spell must make.
     */
    save?: ISpellSave;
    /**
     * If this spell provides healing, this is an array of the healing provided.
     * The 0 index is used for the spell at it's base level, and each index beyond
     * that is each level above the base.
     *
     * Should pass the regex:
     *  /^[0-9]{1,2}[d][012468]{1,3}(?:\\s?\\+\\s?[0-9a-z]+)?$/i
     */
    healing?: Array<string>;
    /**
     * If this spell causes an area-of-effect this describes the shape, size,
     * and properties.
     */
    areaOfEffect?: ISpellAOE;
    /**
     * Which school of magic is this spell from.
     */
    school: ReferenceMagicSchool;
    /**
     * Which classes can use this spell natively.
     */
    classes?: Array<ReferenceClass>;
    /**
     * If this spell if scribed onto a scroll, the suggested properties of it.
     */
    scroll?: ISpellScroll;
    /**
     * If this spell is used to enchant an item, the suggested properties of that
     * process.
     */
    enchanting?: ISpellEnchanting;
    constructor(props?: any);
    validate: () => ValidationErrors;
    validateRange: (range: ISpellRange) => ValidationErrors;
    validateComponents: (comps: ISpellComponents) => ValidationErrors;
    validateDamage: (dmg: ISpellDamage) => ValidationErrors;
    validateSave: (save: ISpellSave) => ValidationErrors;
    validateAreaOfEffect: (aoe: ISpellAOE) => ValidationErrors;
    validateScroll: (scroll: ISpellScroll) => ValidationErrors;
    validateEnchanting: (ench: ISpellEnchanting) => ValidationErrors;
    isValid: () => boolean;
}
