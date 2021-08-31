import { enumHas } from './utils';

/**
 * Describes the rarity of an item.
 */
export enum Rarity {
  COMMON = 'COMMON',
  UNCOMMON = 'UNCOMMON',
  RARE = 'RARE',
  VERY_RARE = 'VERY_RARE',
  LEGENDARY = 'LEGENDARY',
  ARTIFACT = 'ARTIFACT',
};

export const rarityHas = (key:string):boolean => enumHas(Rarity, key);