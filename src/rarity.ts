import { enumHas } from './utils';

/**
 * Describes the rarity of an item.
 */
export const Rarities = {
  COMMON: 'COMMON',
  UNCOMMON: 'UNCOMMON',
  RARE: 'RARE',
  VERY_RARE: 'VERY_RARE',
  LEGENDARY: 'LEGENDARY',
  ARTIFACT: 'ARTIFACT',
} as const;
export type ERarity = typeof Rarities[keyof typeof Rarities];

export const rarityHas = (key:string):boolean => enumHas(Rarities, key);
