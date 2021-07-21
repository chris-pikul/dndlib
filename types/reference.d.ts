import { IValidatable } from './interfaces/validatable';
import { IAssignable } from './utils/assignable';
import { JSONObject } from './utils/json-object';
import { ResourceType } from './resource-type';
/**
 * References are used to link resources between each other
 * by providing the type, the uri, and the name for display.
 */
export interface IReference {
    /**
     * The given resource type that this reference points to.
     * Must be of the valid ResourceType enums.
     */
    readonly type: ResourceType;
    /**
     * The relative URI that points to the object in reference.
     */
    readonly uri: string;
    /**
     * An displayable name, should be copied from the referenced
     * object. Used for soft-links so the proper anchor title
     * can be displayed.
     */
    name: string;
}
/**
 * Holds a reference to another resource.
 * Used to link between different objects.
 *
 * @throws Error if the required values are not fullfilled
 */
export default class Reference implements IReference, IAssignable, IValidatable {
    /**
     * Holds the "Zero" value (empty, null) for easy reference
     * and object instantiation.
     */
    static readonly ZERO_VALUE: Reference;
    /**
     * Checks if the supplied object is at the class's zero value.
     * @param obj Reference object to check
     * @returns True if the object has the default values
     */
    static isZeroValue: (obj: Reference) => boolean;
    /**
     * Performs type checking and throws errors if the
     * properties needed are not the right types.
     * Does not fully validate the data within them,
     * but will check for emptyness, or incorrect Enums
     * @throws TypeErrors for invalid properties
     * @param props Incoming properties object
     */
    static strictValidateProps: (props: any) => void;
    /**
     * The given resource type that this reference points to.
     * Must be of the valid ResourceType enums.
     */
    readonly type: ResourceType;
    /**
     * The relative URI that points to the object in reference.
     */
    readonly uri: string;
    /**
     * An displayable name, should be copied from the referenced
     * object. Used for soft-links so the proper anchor title
     * can be displayed.
     */
    name: string;
    /**
     * Construct a new Reference object.
     * Will copy from an existing Reference object if one is supplied.
     * Otherwise, will take JSON data and type check it before applying
     * the properties.
     * @throws TypeErrors if JSON object is used and there are type errors.
     * @param props Reference | JSON Object
     */
    constructor(props?: any);
    assign: (props: JSONObject) => void;
    validate: () => string[];
    isValid: () => boolean;
    isZeroValue: () => boolean;
}
export declare class ReferenceAbilityScore extends Reference {
    constructor(props?: any);
}
export declare class ReferenceAction extends Reference {
    constructor(props?: any);
}
export declare class ReferenceBackground extends Reference {
    constructor(props?: any);
}
export declare class ReferenceClass extends Reference {
    constructor(props?: any);
}
export declare class ReferenceClassFeature extends Reference {
    constructor(props?: any);
}
export declare class ReferenceCondition extends Reference {
    constructor(props?: any);
}
export declare class ReferenceDamageType extends Reference {
    constructor(props?: any);
}
export declare class ReferenceDeity extends Reference {
    constructor(props?: any);
}
export declare class ReferenceDisease extends Reference {
    constructor(props?: any);
}
export declare class ReferenceEquipmentPack extends Reference {
    constructor(props?: any);
}
export declare class ReferenceFeat extends Reference {
    constructor(props?: any);
}
export declare class ReferenceHazard extends Reference {
    constructor(props?: any);
}
export declare class ReferenceItem extends Reference {
    constructor(props?: any);
}
export declare class ReferenceItemCategory extends Reference {
    constructor(props?: any);
}
export declare class ReferenceLanguage extends Reference {
    constructor(props?: any);
}
export declare class ReferenceMagicSchool extends Reference {
    constructor(props?: any);
}
export declare class ReferenceMonster extends Reference {
    constructor(props?: any);
}
export declare class ReferenceProficiency extends Reference {
    constructor(props?: any);
}
export declare class ReferenceRace extends Reference {
    constructor(props?: any);
}
export declare class ReferenceSkill extends Reference {
    constructor(props?: any);
}
export declare class ReferenceSpell extends Reference {
    constructor(props?: any);
}
export declare class ReferenceSubRace extends Reference {
    constructor(props?: any);
}
export declare class ReferenceTrait extends Reference {
    constructor(props?: any);
}
export declare class ReferenceTrap extends Reference {
    constructor(props?: any);
}
export declare class ReferenceVehicle extends Reference {
    constructor(props?: any);
}
export declare class ReferenceWeaponProperty extends Reference {
    constructor(props?: any);
}
