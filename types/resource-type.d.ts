/**
 * Enumeration for the type of resource an object is.
 * This is required within any resource object.
 *
 * Schema: /resource-type.schema.json
 */
export declare enum ResourceType {
    UNKNOWN = "UNKNOWN",
    ANY = "ANY",
    ABILITY_SCORE = "ABILITY_SCORE",
    ACTION = "ACTION",
    BACKGROUND = "BACKGROUND",
    CLASS = "CLASS",
    CLASS_FEATURE = "CLASS_FEATURE",
    CONDITION = "CONDITION",
    DAMAGE_TYPE = "DAMAGE_TYPE",
    DEITY = "DEITY",
    DISEASE = "DISEASE",
    EQUIPMENT_PACK = "EQUIPMENT_PACK",
    FEAT = "FEAT",
    HAZARD = "HAZARD",
    ITEM = "ITEM",
    ITEM_CATEGORY = "ITEM_CATEGORY",
    LANGUAGE = "LANGUAGE",
    MAGIC_SCHOOL = "MAGIC_SCHOOL",
    MONSTER = "MONSTER",
    PROFICIENCY = "PROFICIENCY",
    RACE = "RACE",
    SKILL = "SKILL",
    SPELL = "SPELL",
    SUB_RACE = "SUB_RACE",
    TRAIT = "TRAIT",
    TRAP = "TRAP",
    VEHICLE = "VEHICLE",
    WEAPON_PROPERTY = "WEAPON_PROPERTY"
}
export declare const resourceTypeHas: (key: string) => boolean;
