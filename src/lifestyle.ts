/*
 * Copyright(C) 2021 Chris Pikul. Under MIT license. 
 * See "LICENSE" in the root project folder.
 */
import { enumHas } from './utils/enums';

/**
 * Holds enumerated values for lifestyle.
 * 
 * Lifestyle is used in some parts (such as Background) to describe the economic
 * lifestyle a character is used to, or expects.
 */
export enum Lifestyle {
    UNKNOWN = 'UNKNOWN',

    /**
     * The poorest option. Explains homeless, unemployed characters with no
     * value to their name.
     */
    WRETCHED = 'WRETCHED',

    /**
     * The second-poorest option. Might not be homeless, but nearly is. Money
     * is hard to come by and has been for a long time.
     */
    SQUALID = 'SQUALID',

    /**
     * The third-poorest option. General peasentry, with no real comforts, but
     * maybe enough to get by.
     */
    POOR = 'POOR',

    /**
     * Enough to pay the rent and feed yourself. Your clothing and equipment
     * are maintained, but nothing fancy.
     */
    MODEST = 'MODEST',

    /**
     * The third-richest option. You may own your own cottage or home in the
     * suburbs of towns. Clothing and equipment are a bit nicer, and comforts
     * of life are enjoyed.
     */
    COMFORTABLE = 'COMFORTABLE',

    /**
     * The second-richest option. Luxury and social status are achieved for you.
     * Worries for money are not on your mind.
     */
    WEALTHY = 'WEALTHY',

    /**
     * The richest option. Powerful social connections. You probably own, or
     * at least inheritted a major company. Money is no object for you. 
     */
    ARISTOCRATIC = 'ARISTOCRATIC',
};

export const lifestyleHas = (key:string):boolean => enumHas(Lifestyle, key);
