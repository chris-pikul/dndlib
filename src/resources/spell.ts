import type {
    IValidatable,
    PromiseValidation,
    ValidationErrors,
} from '../interfaces';
import { Rarity } from '../rarity';
import Reference, {
    ReferenceAbilityScore,
    ReferenceClass,
    ReferenceDamageType,
    ReferenceMagicSchool,
} from '../reference';
import Resource from '../resource';
import { ResourceType } from '../resource-type';
import { Shape } from '../shape';
import {
    enumHas,
    isPlainObject,
    validateArray,
    validateArrayOfObjects,
    validateBoolean,
    validateEnum,
    validateInteger,
    validateObject,
    validateString,
} from '../utils';
import {
    strictValidateOptionalArrayProp,
    strictValidateOptionalObjectProp,
    strictValidateOptionalProp,
    strictValidatePropsParameter,
    strictValidateRequiredObjectProp,
    strictValidateRequiredProp,
} from '../utils/errors';

/**
 * Declares the range of the spell
 */
export enum SpellRangeType {
    /**
     * This spell is a melee, or touch spell.
     */
    MELEE = 'MELEE',

    /**
     * This spell has a range, the distance should accompany this type.
     */
    RANGED = 'RANGED',
}
export const spellRangeTypeHas = (key: string): boolean =>
    enumHas(SpellRangeType, key);

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

/**
 * The rules for calculating the spell scroll properties
 */
export type ScrollRules = {
    rarity: Array<Rarity>;
    attackBonus: Array<number>;
    saveDC: Array<number>;
    value: (spell: ISpell) => number;
};

export type RarityMap<Type> = {
    [K in Rarity]: Type;
};

export type EnchantmentRules = {
    rarity: Array<Rarity>;
    minLevel: RarityMap<number>;
    days: RarityMap<number>;
    cost: (spell: ISpell) => number;
};

export default class Spell extends Resource implements ISpell, IValidatable {
    private static readonly regexpDiceCalculation =
        /^[0-9]{1,2}[d][012468]{1,3}(?:\\s?\\+\\s?[0-9a-z]+)?$/i;

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
    protected static readonly strictValidateProps = (props: any): void => {
        strictValidatePropsParameter(props, 'Spell');

        strictValidateRequiredProp(props, 'Spell', 'level', 'number');
        strictValidateOptionalProp(props, 'Spell', 'higherLevels', 'string');
        strictValidateRequiredObjectProp(
            props,
            'Spell',
            'range',
            Spell.strictValidateRangeProps,
        );
        strictValidateRequiredObjectProp(
            props,
            'Spell',
            'components',
            Spell.strictValidateComponentsProps,
        );
        strictValidateRequiredProp(props, 'Spell', 'castingTime', 'string');
        strictValidateRequiredProp(props, 'Spell', 'duration', 'string');
        strictValidateRequiredProp(props, 'Spell', 'ritual', 'boolean');
        strictValidateRequiredProp(props, 'Spell', 'concentration', 'boolean');
        strictValidateOptionalObjectProp(
            props,
            'Spell',
            'damage',
            Spell.strictValidateDamageProps,
        );
        strictValidateOptionalObjectProp(
            props,
            'Spell',
            'save',
            Spell.strictValidateSaveProps,
        );
        strictValidateOptionalArrayProp(props, 'Spell', 'healing', 'string');
        strictValidateOptionalObjectProp(
            props,
            'Spell',
            'areaOfEffect',
            Spell.strictValidateAreaOfEffectProps,
        );
        strictValidateRequiredObjectProp(
            props,
            'Spell',
            'school',
            ReferenceMagicSchool.strictValidateProps,
        );
        strictValidateOptionalArrayProp(
            props,
            'Spell',
            'classes',
            ReferenceClass.strictValidateProps,
        );
        strictValidateOptionalObjectProp(
            props,
            'Spell',
            'scroll',
            Spell.strictValidateScrollProps,
        );
        strictValidateOptionalObjectProp(
            props,
            'Spell',
            'enchanting',
            Spell.strictValidateEnchantingProps,
        );
    };

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
    private static readonly strictValidateRangeProps = (props: any): void => {
        strictValidatePropsParameter(props, 'Spell::Range');

        strictValidateRequiredProp(props, 'Spell::Range', 'type', 'string');
        strictValidateOptionalProp(props, 'Spell::Range', 'distance', 'number');
    };

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
    private static readonly strictValidateComponentsProps = (
        props: any,
    ): void => {
        strictValidatePropsParameter(props, 'Spell::Components');

        strictValidateRequiredProp(
            props,
            'Spell::Components',
            'verbal',
            'boolean',
        );
        strictValidateRequiredProp(
            props,
            'Spell::Components',
            'semantic',
            'boolean',
        );
        strictValidateRequiredProp(
            props,
            'Spell::Components',
            'material',
            'boolean',
        );
        strictValidateOptionalProp(
            props,
            'Spell::Components',
            'cost',
            'string',
        );
        strictValidateOptionalProp(
            props,
            'Spell::Components',
            'goldValue',
            'number',
        );
    };

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
    private static readonly strictValidateDamageProps = (props: any): void => {
        strictValidatePropsParameter(props, 'Spell::Damage');

        strictValidateRequiredObjectProp(
            props,
            'Spell::Damage',
            'type',
            ReferenceDamageType.strictValidateProps,
        );
        strictValidateOptionalArrayProp(
            props,
            'Spell::Damage',
            'options',
            Reference.strictValidateProps,
        );
        strictValidateRequiredProp(
            props,
            'Spell::Damage',
            'baseAmount',
            'string',
        );
        strictValidateOptionalArrayProp(
            props,
            'Spell::Damage',
            'higherSlots',
            'string',
        );
        strictValidateOptionalArrayProp(
            props,
            'Spell::Damage',
            'characterLevel',
            'string',
        );
    };

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
    private static readonly strictValidateSaveProps = (props: any): void => {
        strictValidatePropsParameter(props, 'Spell::Save');

        strictValidateRequiredObjectProp(
            props,
            'Spell::Save',
            'ability',
            ReferenceAbilityScore.strictValidateProps,
        );
        strictValidateOptionalProp(
            props,
            'Spell::Save',
            'description',
            'string',
        );
        strictValidateOptionalProp(props, 'Spell::Save', 'success', 'string');
        strictValidateOptionalProp(props, 'Spell::Save', 'failure', 'string');
    };

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
    private static readonly strictValidateAreaOfEffectProps = (
        props: any,
    ): void => {
        strictValidatePropsParameter(props, 'Spell::AreaOfEffect');

        strictValidateRequiredProp(
            props,
            'Spell::AreaOfEffect',
            'shape',
            'string',
        );
        strictValidateRequiredProp(
            props,
            'Spell::AreaOfEffect',
            'size',
            'number',
        );
        strictValidateOptionalProp(
            props,
            'Spell::AreaOfEffect',
            'diameter',
            'boolean',
        );
        strictValidateOptionalProp(
            props,
            'Spell::AreaOfEffect',
            'centered',
            'boolean',
        );
    };

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
    private static readonly strictValidateScrollProps = (props: any): void => {
        strictValidatePropsParameter(props, 'Spell::Scroll');

        strictValidateRequiredProp(props, 'Spell::Scroll', 'rarity', 'string');
        strictValidateRequiredProp(
            props,
            'Spell::Scroll',
            'attackBonus',
            'number',
        );
        strictValidateRequiredProp(props, 'Spell::Scroll', 'saveDC', 'number');
        strictValidateRequiredProp(
            props,
            'Spell::Scroll',
            'suggestedValue',
            'number',
        );
    };

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
    private static readonly strictValidateEnchantingProps = (
        props: any,
    ): void => {
        strictValidatePropsParameter(props, 'Spell::Enchanting');

        strictValidateRequiredProp(
            props,
            'Spell::Enchanting',
            'minLevel',
            'number',
        );
        strictValidateRequiredProp(
            props,
            'Spell::Enchanting',
            'cost',
            'number',
        );
        strictValidateRequiredProp(
            props,
            'Spell::Enchanting',
            'days',
            'number',
        );
    };

    /**
     * Specifies the default rule set for calculating scroll values.
     * These are based on the DMG and Xanthar's Guide.
     *
     * The major modification is for the value calculation. Here the values from
     * Xanthar's have been used with a modification to the 9th level slot. The
     * values are then added with the total material cost, and then doubled. The
     * doubling is intented as a "labor" cost for resale. It can be denoted as:
     *
     * `value = (levelBasedValue + componentCost) * 2`
     */
    public static readonly defaultScrollRules: ScrollRules = {
        rarity: [
            Rarity.COMMON,
            Rarity.COMMON,
            Rarity.UNCOMMON,
            Rarity.UNCOMMON,
            Rarity.RARE,
            Rarity.RARE,
            Rarity.VERY_RARE,
            Rarity.VERY_RARE,
            Rarity.VERY_RARE,
            Rarity.LEGENDARY,
        ],
        attackBonus: [5, 5, 5, 7, 7, 9, 9, 10, 10, 11],
        saveDC: [13, 13, 13, 15, 15, 17, 17, 18, 18, 19],
        value: (spl: ISpell): number => {
            const baseCost = [
                15, 25, 250, 500, 2500, 5000, 15000, 25000, 50000, 100000,
            ];
            return (baseCost[spl.level] + spl.components.goldValue) * 2;
        },
    };

    /**
     * Specifies the default rules for calculating enchantment properties.
     * These are taken from the DMG directly. The "Artifact" rarity was added
     * to support the Rarity enum.
     *
     * Yes, that does say 109 years for an artifact.
     */
    public static readonly defaultEnchantmentRules: EnchantmentRules = {
        rarity: [
            Rarity.COMMON,
            Rarity.COMMON,
            Rarity.UNCOMMON,
            Rarity.UNCOMMON,
            Rarity.RARE,
            Rarity.RARE,
            Rarity.VERY_RARE,
            Rarity.VERY_RARE,
            Rarity.VERY_RARE,
            Rarity.LEGENDARY,
        ],
        minLevel: {
            COMMON: 3,
            UNCOMMON: 3,
            RARE: 6,
            VERY_RARE: 11,
            LEGENDARY: 17,
            ARTIFACT: 20,
        },
        days: {
            COMMON: 4,
            UNCOMMON: 20,
            RARE: 200,
            VERY_RARE: 2000,
            LEGENDARY: 20000,
            ARTIFACT: 40000,
        },
        cost: (spl: ISpell): number => {
            const baseCost = {
                COMMON: 100,
                UNCOMMON: 500,
                RARE: 5000,
                VERY_RARE: 50000,
                LEGENDARY: 500000,
                ARTIFACT: 1000000,
            };
            const rarity = Spell.defaultEnchantmentRules.rarity[spl.level];
            const days = Spell.defaultEnchantmentRules.days[rarity];
            return baseCost[rarity] + spl.components.goldValue * days;
        },
    };

    /**
     * The base level that this spell can be cast at. This is the slot level,
     * and not character level.
     */
    level = -1;

    /**
     * A description on what happens if this spell is cast using a higher spell
     * slot than the base level.
     */
    higherLevels?: string = null;

    /**
     * The range of the spell, or if it's just melee, then the enum denoting that.
     */
    range: ISpellRange = { type: SpellRangeType.MELEE };

    /**
     * The components required to cast this spell.
     */
    components: ISpellComponents = {
        verbal: false,
        semantic: false,
        material: false,
    };

    /**
     * How long this spell takes to cast.
     * Represented as a string since it may use actions.
     */
    castingTime = '';

    /**
     * How long this spell lasts.
     */
    duration = '';

    /**
     * Whether this spell can be cast as a ritual.
     */
    ritual = false;

    /**
     * Whether this spell requires concentration.
     */
    concentration = false;

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
    school: ReferenceMagicSchool = ReferenceMagicSchool.ZERO_VALUE;

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

    constructor(props?: any) {
        super(props, {
            type: ResourceType.SPELL,
            uriBase: '/spell',
        });

        if (props) {
            if (isPlainObject(props) || props instanceof Spell) {
                Spell.strictValidateProps(props);

                this.level = props.level;
                if (props.higherLevels) this.higherLevels = props.higherLevels;
                this.range = { ...props.range };
                this.components = { ...props.components };
                this.castingTime = props.castingTime;
                this.duration = props.duration;
                this.ritual = props.ritual;
                this.concentration = props.concentration;
                if (props.damage) this.damage = { ...props.damage };
                if (props.save) this.save = { ...props.save };
                if (props.healing) this.healing = [...props.healing];
                if (props.areaOfEffect)
                    this.areaOfEffect = { ...props.areaOfEffect };
                this.school = new ReferenceMagicSchool(props.school);
                if (props.classes) {
                    this.classes = props.classes.map(
                        (ent: ReferenceMagicSchool) =>
                            new ReferenceMagicSchool(ent),
                    );
                }
                if (props.scroll) this.scroll = { ...props.scroll };
                if (props.enchanting) this.enchanting = { ...props.enchanting };
            } else {
                console.warn(
                    `Attempting to instantiate an Spell object with an invalid parameter. Expected either an Spell object, or JSON object of properties. Instead encountered a "${typeof props}".`,
                );
            }
        }
    }

    /**
     * Generates the scroll property values using some rules.
     * The provided defaults are suggested by the DMG, with slight modification.
     *
     * @param rules dictates a list of calculation rules
     * @returns ISpellScroll object of the newly assigned values
     */
    calculateScroll = (
        rules: ScrollRules = Spell.defaultScrollRules,
    ): ISpellScroll => {
        this.scroll = {
            rarity: rules.rarity[this.level],
            attackBonus: rules.attackBonus[this.level],
            saveDC: rules.saveDC[this.level],
            suggestedValue: rules.value(this),
        };

        return this.scroll;
    };

    /**
     * Calculates and assigns the enchantment property based on this spells
     * information. The results are returned.
     *
     * @param rules dictates a list of calculation rules
     * @returns this objects `enchanting` property after setting
     */
    calculateEnchantment = (
        rules: EnchantmentRules = Spell.defaultEnchantmentRules,
    ): ISpellEnchanting => {
        const rarity = rules.rarity[this.level];

        this.enchanting = {
            minLevel: rules.minLevel[rarity],
            cost: rules.cost(this),
            days: rules.days[rarity],
        };

        return this.enchanting;
    };

    validate = (): PromiseValidation =>
        new Promise<ValidationErrors>((resolve) => {
            super.validate().then((supErrs: ValidationErrors) => {
                /*
                 * Use the validateSync option and combine with the super errors.
                 * We use the parameter here to let the super validation be async and then
                 * feed that into "this" version of validateSync().
                 */
                resolve(this.validateSync(supErrs));

                /*
                 * TODO: Move some of the logic for validation into better async versions.
                 * This may require "Sub-classes" within this one to better handle the
                 * parts within spells like Components, Damage, Healing, etc.
                 */
            });
        });

    validateSync = (parentErrs?: ValidationErrors): ValidationErrors => {
        const errs = parentErrs ?? super.validateSync();

        validateInteger(errs, 'Spell', 'level', this.level, {
            positive: true,
            minValue: 1,
        });

        validateString(
            errs,
            'Spell',
            'higherLevels',
            this.higherLevels,
            null,
            true,
        );
        validateObject(errs, 'Spell', 'range', this.range, this.validateRange);
        validateObject(
            errs,
            'Spell',
            'components',
            this.components,
            this.validateComponents,
        );
        validateString(errs, 'Spell', 'castingTime', this.castingTime);
        validateString(errs, 'Spell', 'duration', this.duration);
        validateBoolean(errs, 'Spell', 'ritual', this.ritual);
        validateBoolean(errs, 'Spell', 'concentration', this.concentration);
        validateObject(
            errs,
            'Spell',
            'damage',
            this.damage,
            this.validateDamage,
            true,
        );
        validateObject(
            errs,
            'Spell',
            'save',
            this.save,
            this.validateSave,
            true,
        );
        validateArray(
            errs,
            'Spell',
            'healing',
            this.healing,
            (prop: any, ind: number): ValidationErrors => {
                if (typeof prop === 'string') {
                    if (Spell.regexpDiceCalculation.test(prop) === false) {
                        return [
                            `Spell.healing[${ind}] "${prop}" does not pass the regular expression test "${Spell.regexpDiceCalculation.toString()}".`,
                        ];
                    }
                } else {
                    return [
                        `Spell.healing[${ind}] is not a string type, instead found "${typeof prop}".`,
                    ];
                }
                return [];
            },
            true,
        );
        validateObject(
            errs,
            'Spell',
            'areaOfEffect',
            this.areaOfEffect,
            this.validateAreaOfEffect,
            true,
        );
        validateObject(
            errs,
            'Spell',
            'school',
            this.school,
            this.school.validateSync,
        );
        validateArrayOfObjects(
            errs,
            'Spell',
            'classes',
            this.classes,
            (prop: any): ValidationErrors => {
                if (prop instanceof ReferenceClass) return prop.validateSync();
                return [`supplied object is not a ReferenceClass object.`];
            },
        );
        validateObject(
            errs,
            'Spell',
            'scroll',
            this.scroll,
            this.validateScroll,
            true,
        );
        validateObject(
            errs,
            'Spell',
            'enchanting',
            this.enchanting,
            this.validateEnchanting,
            true,
        );

        return errs;
    };

    validateRange = (range: ISpellRange): ValidationErrors => {
        const errs: ValidationErrors = [];

        validateEnum(errs, 'Spell::Range', 'type', range.type, SpellRangeType);
        validateInteger(
            errs,
            'Spell::Range',
            'distance',
            range.distance,
            {
                positive: true,
                minValue: 5,
                multiple: 5,
            },
            range.type !== SpellRangeType.RANGED,
        );

        return errs;
    };

    validateComponents = (comps: ISpellComponents): ValidationErrors => {
        const errs: ValidationErrors = [];

        validateBoolean(errs, 'Spell::Components', 'verbal', comps.verbal);
        validateBoolean(errs, 'Spell::Components', 'semantic', comps.semantic);
        validateBoolean(errs, 'Spell::Components', 'material', comps.material);
        validateString(
            errs,
            'Spell::Components',
            'cost',
            comps.cost,
            null,
            true,
        );
        validateInteger(
            errs,
            'Spell:Components',
            'goldValue',
            comps.goldValue,
            { positive: true },
            true,
        );

        return errs;
    };

    validateDamage = (dmg: ISpellDamage): ValidationErrors => {
        const errs: ValidationErrors = [];

        validateObject(
            errs,
            'Spell::Damage',
            'type',
            dmg.type,
            dmg.type.validateSync,
        );
        validateArrayOfObjects(
            errs,
            'Spell::Damage',
            'options',
            dmg.options,
            (prop: any): ValidationErrors => {
                if (prop instanceof Reference)
                    return (prop as Reference).validateSync();
                return ['supplied object is not a Reference object.'];
            },
            true,
        );
        validateString(errs, 'Spell::Damage', 'baseAmount', dmg.baseAmount, {
            regexp: Spell.regexpDiceCalculation,
        });
        validateArray(
            errs,
            'Spell::Damage',
            'higherSlots',
            dmg.higherSlots,
            (prop: any, ind: number): ValidationErrors => {
                if (typeof prop === 'string') {
                    if (Spell.regexpDiceCalculation.test(prop) === false) {
                        return [
                            `Spell::Damage.higherSlots[${ind}] "${prop}" does not pass the regular expression test "${Spell.regexpDiceCalculation.toString()}".`,
                        ];
                    }
                } else {
                    return [
                        `Spell::Damage.higherSlots[${ind}] is not a string type, instead found "${typeof prop}".`,
                    ];
                }
                return [];
            },
            true,
        );
        validateArray(
            errs,
            'Spell::Damage',
            'characterLevel',
            dmg.characterLevel,
            (prop: any, ind: number): ValidationErrors => {
                if (typeof prop === 'string') {
                    if (Spell.regexpDiceCalculation.test(prop) === false) {
                        return [
                            `Spell::Damage.characterLevel[${ind}] "${prop}" does not pass the regular expression test "${Spell.regexpDiceCalculation.toString()}".`,
                        ];
                    }
                } else {
                    return [
                        `Spell::Damage.characterLevel[${ind}] is not a string type, instead found "${typeof prop}".`,
                    ];
                }
                return [];
            },
            true,
        );
        if (dmg.characterLevel && Array.isArray(dmg.characterLevel)) {
            if (dmg.characterLevel.length !== 20) {
                errs.push(
                    `Spell::Damage.characterLevel needs to be exactly 20 items in length, instead it has a size of ${dmg.characterLevel.length}.`,
                );
            }
        }

        return errs;
    };

    validateSave = (save: ISpellSave): ValidationErrors => {
        const errs: ValidationErrors = [];

        validateObject(
            errs,
            'Spell::Save',
            'ability',
            save.ability,
            save.ability.validateSync,
        );
        validateString(
            errs,
            'Spell::Save',
            'success',
            save.success,
            null,
            true,
        );
        validateString(
            errs,
            'Spell::Save',
            'failure',
            save.failure,
            null,
            true,
        );

        return errs;
    };

    validateAreaOfEffect = (aoe: ISpellAOE): ValidationErrors => {
        const errs: ValidationErrors = [];

        validateEnum(errs, 'Spell::AreaOfEffect', 'shape', aoe.shape, Shape);
        validateInteger(errs, 'Spell::AreaOfEffect', 'size', aoe.size, {
            positive: true,
            minValue: 5,
            multiple: 5,
        });
        validateBoolean(
            errs,
            'Spell::AreaOfEffect',
            'diameter',
            aoe.diameter,
            true,
        );
        validateBoolean(
            errs,
            'Spell::AreaOfEffect',
            'centered',
            aoe.centered,
            true,
        );

        return errs;
    };

    validateScroll = (scroll: ISpellScroll): ValidationErrors => {
        const errs: ValidationErrors = [];

        validateEnum(errs, 'Spell::Scroll', 'rarity', scroll.rarity, Rarity);
        validateInteger(
            errs,
            'Spell::Scroll',
            'attackBonus',
            scroll.attackBonus,
            { positive: true },
        );
        validateInteger(errs, 'Spell::Scroll', 'saveDC', scroll.saveDC, {
            positive: true,
        });
        validateInteger(
            errs,
            'Spell::Scroll',
            'suggestedValue',
            scroll.suggestedValue,
            { positive: true },
            true,
        );

        return errs;
    };

    validateEnchanting = (ench: ISpellEnchanting): ValidationErrors => {
        const errs: ValidationErrors = [];

        validateInteger(errs, 'Spell::Enchanting', 'minLevel', ench.minLevel, {
            positive: true,
        });
        validateInteger(errs, 'Spell::Enchanting', 'cost', ench.cost, {
            positive: true,
        });
        validateInteger(errs, 'Spell::Enchanting', 'days', ench.days, {
            positive: true,
        });

        return errs;
    };
}
