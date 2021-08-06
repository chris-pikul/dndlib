import { expect } from 'chai';
import { describe } from 'mocha';

import { 
  positive,
  clampFloat,
  clampInt,
  randomFloat,
} from '../../src/utils/math';

describe('Math Utilities', () => {
  describe('positive()', () => {
    it('returns correct value for positive', () => {
      expect(positive(123)).to.eq(123);
      expect(positive(3.1415)).to.eq(3.1415);
    });

    it('returns correct value for negative', () => {
      expect(positive(-123)).to.eq(0);
      expect(positive(-3.1415)).to.eq(0);
    });
  });

  describe('clampFloat()', () => {
    it('clamps value up', () => {
      expect(clampFloat(-3.1415)).to.eq(0);
      expect(clampFloat(-3.1415, 2.5)).to.eq(2.5);
    });

    it('clamps value down', () => {
      expect(clampFloat(123.456, 0, 10)).to.eq(10.0);
      expect(clampFloat(123.456, 2, 5)).to.eq(5.0);
    });
  });

  describe('clampInt()', () => {
    it('clamps value up', () => {
      expect(clampInt(-3.1415)).to.eq(0);
      expect(clampInt(-3.1415, 2.5)).to.eq(2);
    });

    it('clamps value down', () => {
      expect(clampInt(123.456, 0, 10)).to.eq(10);
      expect(clampInt(123.456, 2, 5)).to.eq(5);
    });
  });

  describe('randomFloat()', () => {
    it('returns within range (100 attempts)', () => {
      for(let i=0; i < 100; i++) {
        expect(randomFloat(1,12.3)).to.be.within(1, 12.3);
      };
    });
  });

  describe('randomInt()', () => {
    it('returns within range (100 attempts)', () => {
      for(let i=0; i < 100; i++) {
        expect(randomFloat(1,10)).to.be.within(1, 10);
      };
    });
  });
});