/**
 * Describes a shape.
 * Commonly used for area-of-effects.
 */
export declare enum Shape {
    LINE = "LINE",
    CUBE = "CUBE",
    CONE = "CONE",
    CYLINDER = "CYLINDER",
    SPHERE = "SPHERE"
}
export declare const shapeHas: (key: string) => boolean;
