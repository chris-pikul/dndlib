import { enumHas } from './utils';

/**
 * Describes a shape.
 * Commonly used for area-of-effects.
 */
export enum Shape {
  LINE = 'LINE',
  CUBE = 'CUBE',
  CONE = 'CONE',
  CYLINDER = 'CYLINDER',
  SPHERE = 'SPHERE',
}

export const shapeHas = (key:string):boolean => enumHas(Shape, key);
