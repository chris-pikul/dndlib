/*
 * Copyright(C) 2021 Chris Pikul. Under MIT license.
 * See "LICENSE" in the root project folder.
 */
import {
    IValidatable,
    JSONObject,
    PromiseValidation,
    ValidationErrors,
} from './interfaces';
import {
    enumHas,
    isPlainObject,
    validateArrayOfObjects,
    validateBoolean,
    validateEnum,
    validateInteger,
    validateString,
} from './utils';
import {
    strictValidateOptionalObjectProp,
    strictValidateOptionalProp,
    strictValidatePropsParameter,
    strictValidateRequiredProp,
} from './utils/errors';

/**
 * Enumeration of the standard Publication IDs
 */
export const PublicationIDs = {
    // Homebrew
    HB: 'HB',

    // Unearthed Arcana
    UA: 'UA',

    PHB: 'PHB',
    MM: 'MM',
    DMG: 'DMG',
    SCAG: 'SCAG',
    AL: 'AL',
    VGM: 'VGM',
    XGE: 'XGE',
    MTF: 'MTF',
    GGR: 'GGR',
    SAC: 'SAC',
    AI: 'AI',
    ERLW: 'ERLW',
    RMR: 'RMR',
    EGW: 'EGW',
    MOT: 'MOT',
    IDRotF: 'IDRotF',
    TCE: 'TCE',
} as const;
export type EPublicationID =
    (typeof PublicationIDs)[keyof typeof PublicationIDs];

export const publicationIDHas = (key: string): boolean =>
    enumHas(PublicationIDs, key);

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
    readonly publicationID: EPublicationID | string;

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
    readonly publicationID: EPublicationID | string;

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
export default class Source implements ISource, IValidatable {
    /**
     * A string-string map of publication ID enums to their respective
     * human-readable titles.
     */
    public static readonly PublicationMap: Record<EPublicationID, string> = {
        HB: 'Homebrew',
        UA: 'Unearthed Arcana',

        PHB: "Player's Handbook",
        MM: 'Monter Manual',
        DMG: "Dungeon Master's Guide",
        SCAG: "Sword Coast Adventurer's Guide",
        AL: "Adventurer's League",
        VGM: "Volo's Guide to Monsters",
        XGE: "Xanthar's Guide to Everything",
        MTF: "Mordenkainen's Tome of Foes",
        GGR: "Guildmaster's Guide to Ravnica",
        SAC: 'Sage Advice Compendium',
        AI: 'Aquisitions Incorperated',
        ERLW: 'Eberron: Rising from the Last War',
        RMR: 'Dungeons & Dragons vs. Rick and Morty: Basic Rules',
        EGW: "Explorer's Guide to Wildemount",
        MOT: 'Mythic Odysseys of Theros',
        IDRotF: 'Icewind Dale: Rime of the Frostmaiden',
        TCE: "Tasha's Cauldron of Everything",
    } as const;

    /**
     * Retrieves the full publication title from a given ID Enum.
     * If the value is invalid "Unknown" is returned instead.
     * @param publicationID Publication ID Enum
     * @returns The full publication title string
     */
    public static getPublicationTitle = (
        publicationID: EPublicationID,
    ): string => Source.PublicationMap[publicationID as string] || 'Unknown';

    /**
     * Performs type checking and throws errors if the
     * properties needed are not the right types.
     * Does not fully validate the data within them,
     * but will check for emptyness, or incorrect Enums
     * @throws TypeErrors for invalid properties
     * @param props Incoming properties object
     */
    public static strictValidateProps = (props: any): void => {
        strictValidatePropsParameter(props, 'Source');

        strictValidateRequiredProp(props, 'Source', 'publicationID', 'string');
        strictValidateRequiredProp(props, 'Source', 'title', 'string');
        strictValidateOptionalProp(props, 'Source', 'page', 'number');
        strictValidateOptionalProp(props, 'Source', 'isUA', 'boolean');
        strictValidateOptionalProp(props, 'Source', 'isSRD', 'boolean');
        strictValidateOptionalObjectProp(
            props,
            'Source',
            'additional',
            Source.strictValidatePropsAdditional,
        );
    };

    public static strictValidatePropsAdditional = (props: any): void => {
        strictValidatePropsParameter(props, 'Source::Additional');

        strictValidateRequiredProp(
            props,
            'Source::Additional',
            'publicationID',
            'string',
        );
        strictValidateRequiredProp(
            props,
            'Source::Additional',
            'title',
            'string',
        );
        strictValidateOptionalProp(
            props,
            'Source::Additional',
            'page',
            'number',
        );
        strictValidateOptionalProp(
            props,
            'Source::Additional',
            'isUA',
            'boolean',
        );
        strictValidateOptionalProp(
            props,
            'Source::Additional',
            'isSRD',
            'boolean',
        );
    };

    /**
     * A short abbreviated name of the publication.
     * used as an enum.
     * REQUIRED
     */
    readonly publicationID: EPublicationID | string;

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

    constructor(props?: any) {
        this.publicationID = PublicationIDs.HB;
        this.title = 'Unknown Source';
        this.page = 0;
        this.isUA = false;
        this.isSRD = false;
        this.additional = [];

        // Check if props have been provided
        if (props) {
            if (isPlainObject(props) || props instanceof Source) {
                /*
                 * If this is another Source,
                 * Copy the properties in.
                 */
                Source.strictValidateProps(props);
                this.publicationID = props.publicationID;
                this.title = props.title;
                this.page = props.page;
                this.isUA = !!props.isUA;
                this.isSRD = !!props.isSRD;

                if (props.additional) {
                    this.additional = props.additional.map(
                        this.createAdditional,
                    );
                }
            } else {
                console.warn(
                    `Attempting to instantiate a TextSection object with an invalid parameter. Expected either a Source object, or a plain JSON Object of properties. Instead encountered a "${typeof props}"`,
                );
            }
        }
    }

    createAdditional = (props: JSONObject): IAdditionalSource => {
        const obj: Record<string, unknown> = {
            publicationID: PublicationIDs.HB,
            title: 'Unknown Source',
            page: 0,
            isUA: false,
            isSRD: false,
        };

        if (isPlainObject(props)) {
            Source.strictValidatePropsAdditional(props);

            obj.publicationID = props.publicationID as EPublicationID;
            obj.title = props.title as string;
            obj.page = props.page as number;
            obj.isUA = !!props.isUA;
            obj.isSRD = !!props.isSRD;
        }

        return obj as unknown as IAdditionalSource;
    };

    validate = (): PromiseValidation =>
        new Promise<ValidationErrors>((resolve) => {
            const errs: ValidationErrors = this.validateSync();

            if (this.additional && Array.isArray(this.additional)) {
                const proms = this.additional.map(this.validateAdditional);

                // Run each validation async using Promise.all
                Promise.all(proms).then((promErrs: Array<ValidationErrors>) => {
                    // Take each promise's results and get ready to map them
                    promErrs.forEach(
                        (resErrs: ValidationErrors, ind: number) => {
                            /*
                             * Iterate the individual results and conform them to better
                             * error messages
                             */
                            const indErrs: ValidationErrors = resErrs.map(
                                (err: string) =>
                                    `Source.additional[${ind}] ${err}`,
                            );
                            errs.push(...indErrs);
                        },
                    );

                    // All errors should be accounted for, return now
                    resolve(errs);
                });
            } else {
                // There are no additionals, so go ahead and return
                resolve(errs);
            }
        });

    validateSync = (): ValidationErrors => {
        const errs: ValidationErrors = [];

        validateEnum(
            errs,
            'Source',
            'publicationID',
            this.publicationID,
            PublicationIDs,
        );
        validateString(errs, 'Source', 'title', this.title);
        validateInteger(
            errs,
            'Source',
            'page',
            this.page,
            { positive: true },
            true,
        );
        validateBoolean(errs, 'Source', 'isUA', this.isUA, true);
        validateBoolean(errs, 'Source', 'isSRD', this.isSRD, true);

        validateArrayOfObjects(
            errs,
            'Source',
            'additional',
            this.additional,
            this.validateAdditionalSync,
            true,
        );

        return errs;
    };

    validateAdditional = (obj: IAdditionalSource): PromiseValidation =>
        new Promise<ValidationErrors>((resolve) => {
            resolve(this.validateAdditionalSync(obj));
        });

    validateAdditionalSync = (obj: IAdditionalSource): ValidationErrors => {
        const errs: ValidationErrors = [];

        validateEnum(
            errs,
            'Source::Additional',
            'publicationID',
            obj.publicationID,
            PublicationIDs,
        );
        validateString(errs, 'Source::Additional', 'title', obj.title);
        validateInteger(
            errs,
            'Source::Additional',
            'page',
            obj.page,
            { positive: true },
            true,
        );
        validateBoolean(errs, 'Source::Additional', 'isUA', obj.isUA, true);
        validateBoolean(errs, 'Source::Additional', 'isSRD', obj.isSRD, true);

        return errs;
    };

    isValid = async (): Promise<boolean> =>
        (await this.validate()).length === 0;

    isValidSync = (): boolean => this.validateSync().length === 0;
}
