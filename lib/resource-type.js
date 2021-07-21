import { enumHas } from './utils/enums';
/**
 * Enumeration for the type of resource an object is.
 * This is required within any resource object.
 *
 * Schema: /resource-type.schema.json
 */
export var ResourceType;
(function (ResourceType) {
    ResourceType["UNKNOWN"] = "UNKNOWN";
    ResourceType["ANY"] = "ANY";
    ResourceType["ABILITY_SCORE"] = "ABILITY_SCORE";
    ResourceType["ACTION"] = "ACTION";
    ResourceType["BACKGROUND"] = "BACKGROUND";
    ResourceType["CLASS"] = "CLASS";
    ResourceType["CLASS_FEATURE"] = "CLASS_FEATURE";
    ResourceType["CONDITION"] = "CONDITION";
    ResourceType["DAMAGE_TYPE"] = "DAMAGE_TYPE";
    ResourceType["DEITY"] = "DEITY";
    ResourceType["DISEASE"] = "DISEASE";
    ResourceType["EQUIPMENT_PACK"] = "EQUIPMENT_PACK";
    ResourceType["FEAT"] = "FEAT";
    ResourceType["HAZARD"] = "HAZARD";
    ResourceType["ITEM"] = "ITEM";
    ResourceType["ITEM_CATEGORY"] = "ITEM_CATEGORY";
    ResourceType["LANGUAGE"] = "LANGUAGE";
    ResourceType["MAGIC_SCHOOL"] = "MAGIC_SCHOOL";
    ResourceType["MONSTER"] = "MONSTER";
    ResourceType["PROFICIENCY"] = "PROFICIENCY";
    ResourceType["RACE"] = "RACE";
    ResourceType["SKILL"] = "SKILL";
    ResourceType["SPELL"] = "SPELL";
    ResourceType["SUB_RACE"] = "SUB_RACE";
    ResourceType["TRAIT"] = "TRAIT";
    ResourceType["TRAP"] = "TRAP";
    ResourceType["VEHICLE"] = "VEHICLE";
    ResourceType["WEAPON_PROPERTY"] = "WEAPON_PROPERTY";
})(ResourceType || (ResourceType = {}));
;
export const resourceTypeHas = (key) => enumHas(ResourceType, key);
//# sourceMappingURL=resource-type.js.map