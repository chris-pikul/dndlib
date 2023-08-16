import {
    IReference,
    Lifestyle,
    OptionsArray,
    ReferenceItem,
    ReferenceLanguage,
    ReferenceSkill,
    ResourceType,
    makeOptionsArray,
    strictValidateOptionsArray,
} from '..';
import {
    IValidatable,
    JSONObject,
    PromiseValidation,
    ValidationErrors,
} from '../interfaces';
import Reference from '../reference';
import Resource from '../resource';
import RollTable from '../roll-table';
import TextSection from '../text-section';
import { isPlainObject } from '../utils';
import {
    strictValidateOptionalObjectProp,
    strictValidatePropsParameter,
    strictValidateRequiredArrayProp,
    strictValidateRequiredProp,
} from '../utils/errors';

export interface IBackgroundStartingOptions<RefType extends IReference> {
    starting: Array<RefType>;
    options: OptionsArray<RefType>;
}

export interface IBackgroundStartingLanguages
    extends IBackgroundStartingOptions<ReferenceLanguage> {
    wildcard?: {
        amount: number;
        standard?: boolean;
        exotic?: boolean;
    };
}

export interface IBackgroundProficiencies {
    skills?: IBackgroundStartingOptions<ReferenceSkill>;
    tools?: IBackgroundStartingOptions<Reference>;
    languages?: IBackgroundStartingLanguages;
}

export interface IBackgroundEquipment {
    coinPouch: number;
    clothes: ReferenceItem;
    items: IBackgroundStartingOptions<ReferenceItem>;
}

export interface IBackground {
    proficiencies: IBackgroundProficiencies;
    equipment: IBackgroundEquipment;
    lifestyle?: Lifestyle;
    feature?: TextSection;
    traits?: RollTable;
    ideals?: RollTable;
    bonds?: RollTable;
    flaws?: RollTable;
}

export default class Background
    extends Resource
    implements IBackground, IValidatable
{
    protected static readonly strictValidateProps = (props: any): void => {
        strictValidatePropsParameter(props, 'Background');
    };

    constructor(props?: any) {
        super(props, {
            type: ResourceType.BACKGROUND,
            uriBase: '/background',
        });

        if (props) {
            if (isPlainObject(props) || props instanceof Background) {
                Background.strictValidateProps(props);
            } else {
                console.warn(
                    `Attempting to instantiate an Background object with an invalid parameter. Expected either a Background object, or JSON object of properties. Instead encountered a "${typeof props}".`,
                );
            }
        }
    }

    public static StartingLanguages = class
        implements IBackgroundStartingLanguages, IValidatable
    {
        static readonly strictValidateProps = (props: any): void => {
            strictValidatePropsParameter(props, 'Background.StartingLanguages');

            strictValidateRequiredArrayProp(
                props,
                'Background.StartingLanguages',
                'starting',
                ReferenceLanguage.strictValidateProps,
            );
            strictValidateOptionsArray(
                props.options,
                'Background.StartingLanguages.options',
            );
            strictValidateOptionalObjectProp(
                props,
                'Background.StartingLanguages',
                'wildcard',
                (prop: JSONObject): void => {},
            );
        };

        starting: Array<ReferenceLanguage>;

        options: OptionsArray<ReferenceLanguage>;

        wildcard?: {
            amount: number;
            standard?: boolean;
            exotic?: boolean;
        };

        constructor(props?: any) {
            if (props) {
                if (
                    isPlainObject(props) ||
                    props instanceof Background.StartingLanguages
                ) {
                    Background.StartingLanguages.strictValidateProps(props);

                    this.starting = [...props.starting];
                    this.options = makeOptionsArray(props.options);

                    if (props.wildcard) {
                        this.wildcard = { amount: props.amount };

                        if (props.wildcard.standard)
                            this.wildcard.standard = !!props.wildcard.standard;

                        if (props.wildcard.exotic)
                            this.wildcard.exotic = !!props.wildcard.exotic;
                    }
                } else {
                    console.warn(
                        `Attempting to instantiate an Background.StartingLanguages object with an invalid parameter. Expected either a Background.StartingLanguages object, or JSON object of properties. Instead encountered a "${typeof props}".`,
                    );
                }
            }
        }

        validate = (): PromiseValidation =>
            new Promise<ValidationErrors>((resolve) => {
                resolve(this.validateSync());
            });

        validateSync = (): ValidationErrors => {
            const errs: ValidationErrors = [];

            return errs;
        };

        isValid = async (): Promise<boolean> =>
            (await this.validate()).length === 0;

        isValidSync = (): boolean => this.validateSync().length === 0;
    };
}
