import { enumHas } from './utils';
/**
 * Describes the rarity of an item.
 */
export var Rarity;
(function (Rarity) {
    Rarity["COMMON"] = "COMMON";
    Rarity["UNCOMMON"] = "UNCOMMON";
    Rarity["RARE"] = "RARE";
    Rarity["VERY_RARE"] = "VERY_RARE";
    Rarity["LEGENDARY"] = "LEGENDARY";
    Rarity["ARTIFACT"] = "ARTIFACT";
})(Rarity || (Rarity = {}));
;
export const rarityHas = (key) => enumHas(Rarity, key);
//# sourceMappingURL=rarity.js.map