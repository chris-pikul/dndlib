/*
 * Copyright(C) 2021 Chris Pikul. Under MIT license. 
 * See "LICENSE" in the root project folder.
 */
import { enumHas } from './utils/enums';

/**
 * Holds enumerated values for die sizes.
 * 
 * The "UNKNOWN" enum maps to 0 for null values and should
 * not be treated as valid.
 */
export enum DieSize {
    UNKNOWN = 'UNKNOWN',

    D2 = 'D2',
    D4 = 'D4',
    D6 = 'D6',
    D8 = 'D8',
    D10 = 'D10',
    D12 = 'D12',
    D20 = 'D20',
    D100= 'D100',
};

export const dieSizeHas = (key:string):boolean => enumHas(DieSize, key);
