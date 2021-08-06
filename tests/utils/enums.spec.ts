import { expect } from 'chai';
import { describe } from 'mocha';

import { enumHas } from '../../src/utils/enums';

enum ETest {
  SOME,
  GOOD,
  VALUES,
};

enum ETestStr {
  SOME = "SOME",
  GOOD = "GOOD",
  VALUES = "VALUES",
};

describe('Enum Utilities', () => {
  describe('Utility: enumHas()', () => {
    it('returns true for valid TS enum', () => {
      expect(enumHas(ETest, 'GOOD')).to.be.true;
    });

    it('returns false for invalid TS enum', () => {
      expect(enumHas(ETest, 'BAD')).to.be.false;
    });
  });
});