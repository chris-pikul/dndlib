import { IAssignable, IValidatable, JSONObject } from './interfaces';
import { StringEnum } from './utils';
/**
 * Enumeration of the standard Publication IDs
 */
export declare enum PublicationID {
    HB = "HB",
    UA = "UA",
    PHB = "PHB",
    MM = "MM",
    DMG = "DMG",
    SCAG = "SCAG",
    AL = "AL",
    VGM = "VGM",
    XGE = "XGE",
    MTF = "MTF",
    GGR = "GGR",
    SAC = "SAC",
    AI = "AI",
    ERLW = "ERLW",
    RMR = "RMR",
    EGW = "EGW",
    MOT = "MOT",
    IDRotF = "IDRotF",
    TCE = "TCE"
}
export declare const publicationIDHas: (key: string) => boolean;
/**
 * Used to describe an additonal source (outside of the primary)
 * that this resource is also printed on.
 */
export interface IAdditionalSource {
    /**
     * A short abbreviated name of the publication.
     * used as an enum.
     * REQUIRED
     */
    readonly publicationID: PublicationID | string;
    /**
     * The real publication name, as displayed to the user.
     * REQUIRED
     */
    readonly title: string;
    /**
     * The page number that the resource is on
     */
    page?: number;
    /**
     * Is this resource part of the Unearthed Arcana (beta)?
     */
    isUA?: boolean;
    /**
     * Is this part of the System Resource Document (open source)?
     */
    isSRD?: boolean;
}
/**
 * Describes the written work, or source body that the resource
 * originates from.
 *
 * Schema: /source.schema.json
 */
export interface ISource {
    /**
     * A short abbreviated name of the publication.
     * used as an enum.
     * REQUIRED
     */
    readonly publicationID: PublicationID | string;
    /**
     * The real publication name, as displayed to the user.
     * REQUIRED
     */
    readonly title: string;
    /**
     * The page number that the resource is on
     */
    page?: number;
    /**
     * Is this resource part of the Unearthed Arcana (beta)?
     */
    isUA?: boolean;
    /**
     * Is this part of the System Resource Document (open source)?
     */
    isSRD?: boolean;
    /**
     * Any additional publications this is featured on
     */
    additional?: Array<IAdditionalSource>;
}
/**
 * Describes the written work, or source body that the resource
 * originates from.
 *
 * Schema: /source.schema.json
 */
export default class Source implements ISource, IAssignable, IValidatable {
    /**
     * A string-string map of publication ID enums to their respective
     * human-readable titles.
     */
    static readonly PublicationMap: StringEnum;
    /**
     * Retrieves the full publication title from a given ID Enum.
     * If the value is invalid "Unknown" is returned instead.
     * @param publicationID Publication ID Enum
     * @returns The full publication title string
     */
    static getPublicationTitle: (publicationID: PublicationID) => string;
    /**
     * Holds the "Zero" value (empty, null) for easy reference
     * and object instantiation.
     */
    static readonly ZERO_VALUE: Source;
    /**
     * Checks if the supplied object is at the class's zero value.
     * @param obj Source object to check
     * @returns True if the object has the default values
     */
    static isZeroValue: (obj: Source) => boolean;
    /**
     * Performs type checking and throws errors if the
     * properties needed are not the right types.
     * Does not fully validate the data within them,
     * but will check for emptyness, or incorrect Enums
     * @throws TypeErrors for invalid properties
     * @param props Incoming properties object
     */
    static strictValidateProps: (props: any) => void;
    static strictValidatePropsAdditional: (props: any) => void;
    /**
     * A short abbreviated name of the publication.
     * used as an enum.
     * REQUIRED
     */
    readonly publicationID: PublicationID | string;
    /**
     * The real publication name, as displayed to the user.
     * REQUIRED
     */
    readonly title: string;
    /**
     * The page number that the resource is on
     */
    readonly page: number;
    /**
     * Is this resource part of the Unearthed Arcana (beta)?
     */
    readonly isUA: boolean;
    /**
     * Is this part of the System Resource Document (open source)?
     */
    readonly isSRD: boolean;
    /**
     * Any additional publications this is featured on
     */
    additional: Array<IAdditionalSource>;
    constructor(props?: any);
    assign: (props: JSONObject) => void;
    validate: () => Array<string>;
    isValid: () => boolean;
    isZeroValue: () => boolean;
}
