import { enumHas } from './utils';

/**
 * Describes a shape.
 * Commonly used for area-of-effects.
 */
export const Shapes = {
  LINE: 'LINE',
  CUBE: 'CUBE',
  CONE: 'CONE',
  CYLINDER: 'CYLINDER',
  SPHERE: 'SPHERE',
} as const;

export const shapeHas = (key:string):boolean => enumHas(Shapes, key);
