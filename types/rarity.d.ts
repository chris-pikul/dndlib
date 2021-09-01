/**
 * Describes the rarity of an item.
 */
export declare enum Rarity {
    COMMON = "COMMON",
    UNCOMMON = "UNCOMMON",
    RARE = "RARE",
    VERY_RARE = "VERY_RARE",
    LEGENDARY = "LEGENDARY",
    ARTIFACT = "ARTIFACT"
}
export declare const rarityHas: (key: string) => boolean;
