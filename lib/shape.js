import { enumHas } from './utils';
/**
 * Describes a shape.
 * Commonly used for area-of-effects.
 */
export var Shape;
(function (Shape) {
    Shape["LINE"] = "LINE";
    Shape["CUBE"] = "CUBE";
    Shape["CONE"] = "CONE";
    Shape["CYLINDER"] = "CYLINDER";
    Shape["SPHERE"] = "SPHERE";
})(Shape || (Shape = {}));
export const shapeHas = (key) => enumHas(Shape, key);
//# sourceMappingURL=shape.js.map