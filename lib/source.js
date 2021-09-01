import { enumHas, isPlainObject, testIfPositiveInteger, } from './utils';
import { strictValidateOptionalObjectProp, strictValidateOptionalProp, strictValidatePropsParameter, strictValidateRequiredProp, } from './utils/errors';
/**
 * Enumeration of the standard Publication IDs
 */
export var PublicationID;
(function (PublicationID) {
    // Homebrew
    PublicationID["HB"] = "HB";
    // Unearthed Arcana
    PublicationID["UA"] = "UA";
    PublicationID["PHB"] = "PHB";
    PublicationID["MM"] = "MM";
    PublicationID["DMG"] = "DMG";
    PublicationID["SCAG"] = "SCAG";
    PublicationID["AL"] = "AL";
    PublicationID["VGM"] = "VGM";
    PublicationID["XGE"] = "XGE";
    PublicationID["MTF"] = "MTF";
    PublicationID["GGR"] = "GGR";
    PublicationID["SAC"] = "SAC";
    PublicationID["AI"] = "AI";
    PublicationID["ERLW"] = "ERLW";
    PublicationID["RMR"] = "RMR";
    PublicationID["EGW"] = "EGW";
    PublicationID["MOT"] = "MOT";
    PublicationID["IDRotF"] = "IDRotF";
    PublicationID["TCE"] = "TCE";
})(PublicationID || (PublicationID = {}));
;
export const publicationIDHas = (key) => enumHas(PublicationID, key);
/**
 * Describes the written work, or source body that the resource
 * originates from.
 *
 * Schema: /source.schema.json
 */
export default class Source {
    constructor(props) {
        this.assign = (props) => {
            if (props.additional && props.additional && Array.isArray(props.additional)) {
                this.additional = props.additional.map((ent) => {
                    if (!isPlainObject(ent))
                        return null;
                    const obj = {
                        publicationID: PublicationID.HB,
                        title: 'Unknown Source',
                        page: 0,
                        isUA: false,
                        isSRD: false,
                    };
                    if (props.publicationID && typeof props.publicationID === 'string' && publicationIDHas(props.publicationID))
                        obj.publicationID = props.publicationID;
                    else
                        return null;
                    if (props.title && typeof props.title === 'string' && props.title.length > 0)
                        obj.title = props.title;
                    else
                        return null;
                    if (props.page && typeof props.page === 'number' && testIfPositiveInteger(props.page))
                        obj.page = props.page;
                    if (props.isUA && typeof props.isUA === 'boolean')
                        obj.isUA = !!props.isUA;
                    if (props.isSRD && typeof props.isSRD === 'boolean')
                        obj.isSRD = !!props.isSRD;
                    return obj;
                }).filter((ent) => (ent && ent !== null));
            }
        };
        this.validate = () => {
            const errs = [];
            if (!publicationIDHas(this.publicationID))
                errs.push(`Source publicationID is not a valid enum.`);
            if (this.title.length === 0)
                errs.push(`Source title must be a non-empty string.`);
            if (this.page < 0)
                errs.push(`Source page must be a positive (0 and above) integer.`);
            else if (Number.isInteger(this.page))
                errs.push(`Source page cannot be a fraction, must be an integer.`);
            this.additional.forEach((ent, ind) => {
                if (!publicationIDHas(ent.publicationID))
                    errs.push(`Source additional[${ind}] publicationID is not a valid enum.`);
                if (ent.title.length === 0)
                    errs.push(`Source additional[${ind}] title must be a non-empty string.`);
                if (ent.page) {
                    if (ent.page < 0)
                        errs.push(`Source additional[${ind}] page must be a positive (0 and above) integer.`);
                    else if (Number.isInteger(ent.page))
                        errs.push(`Source additional[${ind}] page cannot be a fraction, must be an integer.`);
                }
            });
            return errs;
        };
        this.isValid = () => (this.validate().length === 0);
        this.isZeroValue = () => (Source.isZeroValue(this));
        this.publicationID = PublicationID.HB;
        this.title = 'Unknown Source';
        this.page = 0;
        this.isUA = false;
        this.isSRD = false;
        this.additional = [];
        // Check if props have been provided
        if (typeof props !== 'undefined' && props !== null) {
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
                if (props.additional)
                    this.additional = [...props.additional];
            }
            else {
                console.warn(`Attempting to instantiate a TextSection object with an invalid parameter. Expected either a Source object, or a plain JSON Object of properties. Instead encountered a "${typeof props}"`);
            }
        }
    }
}
/**
 * A string-string map of publication ID enums to their respective
 * human-readable titles.
 */
Source.PublicationMap = {
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
};
/**
 * Retrieves the full publication title from a given ID Enum.
 * If the value is invalid "Unknown" is returned instead.
 * @param publicationID Publication ID Enum
 * @returns The full publication title string
 */
Source.getPublicationTitle = (publicationID) => (Source.PublicationMap[publicationID] || 'Unknown');
/**
 * Holds the "Zero" value (empty, null) for easy reference
 * and object instantiation.
 */
Source.ZERO_VALUE = new Source();
/**
 * Checks if the supplied object is at the class's zero value.
 * @param obj Source object to check
 * @returns True if the object has the default values
 */
Source.isZeroValue = (obj) => (obj.publicationID === PublicationID.HB
    && obj.title === 'Unknown Source'
    && obj.page === 0
    && obj.isUA === false
    && obj.isSRD === false
    && obj.additional.length === 0);
/**
 * Performs type checking and throws errors if the
 * properties needed are not the right types.
 * Does not fully validate the data within them,
 * but will check for emptyness, or incorrect Enums
 * @throws TypeErrors for invalid properties
 * @param props Incoming properties object
 */
Source.strictValidateProps = (props) => {
    strictValidatePropsParameter(props, 'Source');
    strictValidateRequiredProp(props, 'Source', 'publicationID', 'string');
    strictValidateRequiredProp(props, 'Source', 'title', 'string');
    strictValidateOptionalProp(props, 'Source', 'page', 'number');
    strictValidateOptionalProp(props, 'Source', 'isUA', 'boolean');
    strictValidateOptionalProp(props, 'Source', 'isSRD', 'boolean');
    strictValidateOptionalObjectProp(props, 'Source', 'additional', Source.strictValidatePropsAdditional);
};
Source.strictValidatePropsAdditional = (props) => {
    strictValidatePropsParameter(props, 'Source::Additional');
    strictValidateRequiredProp(props, 'Source::Additional', 'publicationID', 'string');
    strictValidateRequiredProp(props, 'Source::Additional', 'title', 'string');
    strictValidateOptionalProp(props, 'Source::Additional', 'page', 'number');
    strictValidateOptionalProp(props, 'Source::Additional', 'isUA', 'boolean');
    strictValidateOptionalProp(props, 'Source::Additional', 'isSRD', 'boolean');
};
//# sourceMappingURL=source.js.map