import Resource from '../resource';
import Reference, { ReferenceAbilityScore, ReferenceClass, ReferenceDamageType, ReferenceMagicSchool, } from '../reference';
import { ResourceType } from '../resource-type';
import { enumHas, isPlainObject, validateArray, validateArrayOfObjects, validateBoolean, validateEnum, validateInteger, validateObject, validateString, } from '../utils';
import { Shape } from '../shape';
import { Rarity } from '../rarity';
import { strictValidateOptionalArrayProp, strictValidateOptionalObjectProp, strictValidateOptionalProp, strictValidatePropsParameter, strictValidateRequiredObjectProp, strictValidateRequiredProp, } from '../utils/errors';
/**
 * Declares the range of the spell
 */
export var SpellRangeType;
(function (SpellRangeType) {
    /**
     * This spell is a melee, or touch spell.
     */
    SpellRangeType["MELEE"] = "MELEE";
    /**
     * This spell has a range, the distance should accompany this type.
     */
    SpellRangeType["RANGED"] = "RANGED";
})(SpellRangeType || (SpellRangeType = {}));
;
export const spellRangeTypeHas = (key) => enumHas(SpellRangeType, key);
;
;
;
;
export default class Spell extends Resource {
    constructor(props) {
        super(props, {
            type: ResourceType.SPELL,
            uriBase: '/spell',
        });
        /**
         * The base level that this spell can be cast at. This is the slot level,
         * and not character level.
         */
        this.level = -1;
        /**
         * A description on what happens if this spell is cast using a higher spell
         * slot than the base level.
         */
        this.higherLevels = null;
        /**
         * The range of the spell, or if it's just melee, then the enum denoting that.
         */
        this.range = { type: SpellRangeType.MELEE };
        /**
         * The components required to cast this spell.
         */
        this.components = {
            verbal: false,
            semantic: false,
            material: false,
        };
        /**
         * How long this spell takes to cast.
         * Represented as a string since it may use actions.
         */
        this.castingTime = '';
        /**
         * How long this spell lasts.
         */
        this.duration = '';
        /**
         * Whether this spell can be cast as a ritual.
         */
        this.ritual = false;
        /**
         * Whether this spell requires concentration.
         */
        this.concentration = false;
        /**
         * Which school of magic is this spell from.
         */
        this.school = ReferenceMagicSchool.ZERO_VALUE;
        this.validate = () => {
            const errs = super.validate();
            validateInteger(errs, 'Spell', 'level', this.level, {
                positive: true,
                minValue: 1,
            });
            validateString(errs, 'Spell', 'higherLevels', this.higherLevels, null, true);
            validateObject(errs, 'Spell', 'range', this.range, this.validateRange);
            validateObject(errs, 'Spell', 'components', this.components, this.validateComponents);
            validateString(errs, 'Spell', 'castingTime', this.castingTime);
            validateString(errs, 'Spell', 'duration', this.duration);
            validateBoolean(errs, 'Spell', 'ritual', this.ritual);
            validateBoolean(errs, 'Spell', 'concentration', this.concentration);
            validateObject(errs, 'Spell', 'damage', this.damage, this.validateDamage, true);
            validateObject(errs, 'Spell', 'save', this.save, this.validateSave, true);
            validateArray(errs, 'Spell', 'healing', this.healing, (prop, ind) => {
                if (typeof prop === 'string') {
                    if (Spell.regexpDiceCalculation.test(prop) === false)
                        return [`Spell.healing[${ind}] "${prop}" does not pass the regular expression test "${Spell.regexpDiceCalculation.toString()}".`];
                }
                else {
                    return [`Spell.healing[${ind}] is not a string type, instead found "${typeof prop}".`];
                }
                return [];
            }, true);
            validateObject(errs, 'Spell', 'areaOfEffect', this.areaOfEffect, this.validateAreaOfEffect, true);
            validateObject(errs, 'Spell', 'school', this.school, this.school.validate);
            validateArrayOfObjects(errs, 'Spell', 'classes', this.classes, (prop) => {
                if (prop instanceof ReferenceClass)
                    return prop.validate();
                return [`supplied object is not a ReferenceClass object.`];
            });
            validateObject(errs, 'Spell', 'scroll', this.scroll, this.validateScroll, true);
            validateObject(errs, 'Spell', 'enchanting', this.enchanting, this.validateEnchanting, true);
            return errs;
        };
        this.validateRange = (range) => {
            const errs = [];
            validateEnum(errs, 'Spell::Range', 'type', range.type, SpellRangeType);
            validateInteger(errs, 'Spell::Range', 'distance', range.distance, {
                positive: true,
                minValue: 5,
                multiple: 5,
            }, (range.type !== SpellRangeType.RANGED));
            return errs;
        };
        this.validateComponents = (comps) => {
            const errs = [];
            validateBoolean(errs, 'Spell::Components', 'verbal', comps.verbal);
            validateBoolean(errs, 'Spell::Components', 'semantic', comps.semantic);
            validateBoolean(errs, 'Spell::Components', 'material', comps.material);
            validateString(errs, 'Spell::Components', 'cost', comps.cost, null, true);
            validateInteger(errs, 'Spell:Components', 'goldValue', comps.goldValue, { positive: true }, true);
            return errs;
        };
        this.validateDamage = (dmg) => {
            const errs = [];
            validateObject(errs, 'Spell::Damage', 'type', dmg.type, dmg.type.validate);
            validateArrayOfObjects(errs, 'Spell::Damage', 'options', dmg.options, (prop) => {
                if (prop instanceof Reference)
                    return prop.validate();
                return ['supplied object is not a Reference object.'];
            }, true);
            validateString(errs, 'Spell::Damage', 'baseAmount', dmg.baseAmount, { regexp: Spell.regexpDiceCalculation });
            validateArray(errs, 'Spell::Damage', 'higherSlots', dmg.higherSlots, (prop, ind) => {
                if (typeof prop === 'string') {
                    if (Spell.regexpDiceCalculation.test(prop) === false)
                        return [`Spell::Damage.higherSlots[${ind}] "${prop}" does not pass the regular expression test "${Spell.regexpDiceCalculation.toString()}".`];
                }
                else {
                    return [`Spell::Damage.higherSlots[${ind}] is not a string type, instead found "${typeof prop}".`];
                }
                return [];
            }, true);
            validateArray(errs, 'Spell::Damage', 'characterLevel', dmg.characterLevel, (prop, ind) => {
                if (typeof prop === 'string') {
                    if (Spell.regexpDiceCalculation.test(prop) === false)
                        return [`Spell::Damage.characterLevel[${ind}] "${prop}" does not pass the regular expression test "${Spell.regexpDiceCalculation.toString()}".`];
                }
                else {
                    return [`Spell::Damage.characterLevel[${ind}] is not a string type, instead found "${typeof prop}".`];
                }
                return [];
            }, true);
            if (dmg.characterLevel && Array.isArray(dmg.characterLevel)) {
                if (dmg.characterLevel.length !== 20)
                    errs.push(`Spell::Damage.characterLevel needs to be exactly 20 items in length, instead it has a size of ${dmg.characterLevel.length}.`);
            }
            return errs;
        };
        this.validateSave = (save) => {
            const errs = [];
            validateObject(errs, 'Spell::Save', 'ability', save.ability, save.ability.validate);
            validateString(errs, 'Spell::Save', 'success', save.success, null, true);
            validateString(errs, 'Spell::Save', 'failure', save.failure, null, true);
            return errs;
        };
        this.validateAreaOfEffect = (aoe) => {
            const errs = [];
            validateEnum(errs, 'Spell::AreaOfEffect', 'shape', aoe.shape, Shape);
            validateInteger(errs, 'Spell::AreaOfEffect', 'size', aoe.size, {
                positive: true,
                minValue: 5,
                multiple: 5,
            });
            validateBoolean(errs, 'Spell::AreaOfEffect', 'diameter', aoe.diameter, true);
            validateBoolean(errs, 'Spell::AreaOfEffect', 'centered', aoe.centered, true);
            return errs;
        };
        this.validateScroll = (scroll) => {
            const errs = [];
            validateEnum(errs, 'Spell::Scroll', 'rarity', scroll.rarity, Rarity);
            validateInteger(errs, 'Spell::Scroll', 'attackBonus', scroll.attackBonus, { positive: true });
            validateInteger(errs, 'Spell::Scroll', 'saveDC', scroll.saveDC, { positive: true });
            validateInteger(errs, 'Spell::Scroll', 'suggestedValue', scroll.suggestedValue, { positive: true }, true);
            return errs;
        };
        this.validateEnchanting = (ench) => {
            const errs = [];
            validateInteger(errs, 'Spell::Enchanting', 'minLevel', ench.minLevel, { positive: true });
            validateInteger(errs, 'Spell::Enchanting', 'cost', ench.cost, { positive: true });
            validateInteger(errs, 'Spell::Enchanting', 'days', ench.days, { positive: true });
            return errs;
        };
        this.isValid = () => (this.validate().length === 0);
        if (props) {
            if (isPlainObject(props) || props instanceof Spell) {
                Spell.strictValidateProps(props);
                this.level = props.level;
                if (props.higherLevels)
                    this.higherLevels = props.higherLevels;
                this.range = Object.assign({}, props.range);
                this.components = Object.assign({}, props.components);
                this.castingTime = props.castingTime;
                this.duration = props.duration;
                this.ritual = props.ritual;
                this.concentration = props.concentration;
                if (props.damage)
                    this.damage = Object.assign({}, props.damage);
                if (props.save)
                    this.save = Object.assign({}, props.save);
                if (props.healing)
                    this.healing = [...props.healing];
                if (props.areaOfEffect)
                    this.areaOfEffect = Object.assign({}, props.areaOfEffect);
                this.school = new ReferenceMagicSchool(props.school);
                if (props.classes)
                    this.classes = props.classes.map((ent) => new ReferenceMagicSchool(ent));
                if (props.scroll)
                    this.scroll = Object.assign({}, props.scroll);
                if (props.enchanting)
                    this.enchanting = Object.assign({}, props.enchanting);
            }
            else {
                console.warn(`Attempting to instantiate an Spell object with an invalid parameter. Expected either an Spell object, or JSON object of properties. Instead encountered a "${typeof props}".`);
            }
        }
    }
}
Spell.regexpDiceCalculation = /^[0-9]{1,2}[d][012468]{1,3}(?:\\s?\\+\\s?[0-9a-z]+)?$/i;
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
Spell.strictValidateProps = (props) => {
    strictValidatePropsParameter(props, 'Spell');
    strictValidateRequiredProp(props, 'Spell', 'level', 'number');
    strictValidateOptionalProp(props, 'Spell', 'higherLevels', 'string');
    strictValidateRequiredObjectProp(props, 'Spell', 'range', Spell.strictValidateRangeProps);
    strictValidateRequiredObjectProp(props, 'Spell', 'components', Spell.strictValidateComponentsProps);
    strictValidateRequiredProp(props, 'Spell', 'castingTime', 'string');
    strictValidateRequiredProp(props, 'Spell', 'duration', 'string');
    strictValidateRequiredProp(props, 'Spell', 'ritual', 'boolean');
    strictValidateRequiredProp(props, 'Spell', 'concentration', 'boolean');
    strictValidateOptionalObjectProp(props, 'Spell', 'damage', Spell.strictValidateDamageProps);
    strictValidateOptionalObjectProp(props, 'Spell', 'save', Spell.strictValidateSaveProps);
    strictValidateOptionalArrayProp(props, 'Spell', 'healing', 'string');
    strictValidateOptionalObjectProp(props, 'Spell', 'areaOfEffect', Spell.strictValidateAreaOfEffectProps);
    strictValidateRequiredObjectProp(props, 'Spell', 'school', ReferenceMagicSchool.strictValidateProps);
    strictValidateOptionalArrayProp(props, 'Spell', 'classes', ReferenceClass.strictValidateProps);
    strictValidateOptionalObjectProp(props, 'Spell', 'scroll', Spell.strictValidateScrollProps);
    strictValidateOptionalObjectProp(props, 'Spell', 'enchanting', Spell.strictValidateEnchantingProps);
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
Spell.strictValidateRangeProps = (props) => {
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
Spell.strictValidateComponentsProps = (props) => {
    strictValidatePropsParameter(props, 'Spell::Components');
    strictValidateRequiredProp(props, 'Spell::Components', 'verbal', 'boolean');
    strictValidateRequiredProp(props, 'Spell::Components', 'semantic', 'boolean');
    strictValidateRequiredProp(props, 'Spell::Components', 'material', 'boolean');
    strictValidateOptionalProp(props, 'Spell::Components', 'cost', 'string');
    strictValidateOptionalProp(props, 'Spell::Components', 'goldValue', 'number');
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
Spell.strictValidateDamageProps = (props) => {
    strictValidatePropsParameter(props, 'Spell::Damage');
    strictValidateRequiredObjectProp(props, 'Spell::Damage', 'type', ReferenceDamageType.strictValidateProps);
    strictValidateOptionalArrayProp(props, 'Spell::Damage', 'options', Reference.strictValidateProps);
    strictValidateRequiredProp(props, 'Spell::Damage', 'baseAmount', 'string');
    strictValidateOptionalArrayProp(props, 'Spell::Damage', 'higherSlots', 'string');
    strictValidateOptionalArrayProp(props, 'Spell::Damage', 'characterLevel', 'string');
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
Spell.strictValidateSaveProps = (props) => {
    strictValidatePropsParameter(props, 'Spell::Save');
    strictValidateRequiredObjectProp(props, 'Spell::Save', 'ability', ReferenceAbilityScore.strictValidateProps);
    strictValidateOptionalProp(props, 'Spell::Save', 'description', 'string');
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
Spell.strictValidateAreaOfEffectProps = (props) => {
    strictValidatePropsParameter(props, 'Spell::AreaOfEffect');
    strictValidateRequiredProp(props, 'Spell::AreaOfEffect', 'shape', 'string');
    strictValidateRequiredProp(props, 'Spell::AreaOfEffect', 'size', 'number');
    strictValidateOptionalProp(props, 'Spell::AreaOfEffect', 'diameter', 'boolean');
    strictValidateOptionalProp(props, 'Spell::AreaOfEffect', 'centered', 'boolean');
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
Spell.strictValidateScrollProps = (props) => {
    strictValidatePropsParameter(props, 'Spell::Scroll');
    strictValidateRequiredProp(props, 'Spell::Scroll', 'rarity', 'string');
    strictValidateRequiredProp(props, 'Spell::Scroll', 'attackBonus', 'number');
    strictValidateRequiredProp(props, 'Spell::Scroll', 'saveDC', 'number');
    strictValidateRequiredProp(props, 'Spell::Scroll', 'suggestedValue', 'number');
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
Spell.strictValidateEnchantingProps = (props) => {
    strictValidatePropsParameter(props, 'Spell::Enchanting');
    strictValidateRequiredProp(props, 'Spell::Enchanting', 'minLevel', 'number');
    strictValidateRequiredProp(props, 'Spell::Enchanting', 'cost', 'number');
    strictValidateRequiredProp(props, 'Spell::Enchanting', 'days', 'number');
};
//# sourceMappingURL=spell.js.map