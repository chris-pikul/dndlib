import { expect } from 'chai';
import { describe } from 'mocha';

import {
  creatureSizeHas,
  creatureSizeAsFeet,
  CreatureSize,
} from '../src/creature-size';

describe('Creature Size', () => {
  describe('createSizeHas()', () => {
    it('works for creatureSizeHas()', () => expect(creatureSizeHas('LARGE')).to.be.true);
    it('fails for creatureSizeHas() garbage', () => expect(creatureSizeHas('GARBAGE')).to.be.false);
  });

  describe('creatureSizeAsFeet()', () => {
    it('returns correct for known', () => expect(creatureSizeAsFeet(CreatureSize.MEDIUM)).to.equal(5));
    it('returns 0 on garbage', () => expect(creatureSizeAsFeet('GARBAGE' as CreatureSize)).to.equal(0));
  });
});