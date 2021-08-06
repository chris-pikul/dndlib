import { expect } from 'chai';
import { describe } from 'mocha';

import {
  alignmentHas,
  alignmentEntropyHas,
  alignmentMoralityHas,
  AlignmentAxes,
  AlignmentEntropy,
  Alignment,
  AlignmentMorality,
} from '../src/alignment';

describe('Alignment', () => {
  describe('Alignment Enums', () => {
    it('works for alignmentHas()', () => expect(alignmentHas('GOOD')).to.be.true);
    it('fails for alignmentHas() garbage', () => expect(alignmentHas('GARBAGE')).to.be.false);

    it('works for alignmentEntropyHas()', () => expect(alignmentEntropyHas('NEUTRAL')).to.be.true);
    it('fails for alignmentEntropyHas() garbage', () => expect(alignmentEntropyHas('GARBAGE')).to.be.false);
  
    it('works for alignmentMoralityHas()', () => expect(alignmentMoralityHas('NEUTRAL')).to.be.true);
    it('fails for alignmentMoralityHas() garbage', () => expect(alignmentMoralityHas('GARBAGE')).to.be.false);
  });

  describe('AlignmentAxes class', () => {
    it('constructs empty', () => {
      const obj = new AlignmentAxes();
      expect(obj).to.exist.and.to.be.a('object');
    });
    it('constructs from another object of class', () => {
      const objA = new AlignmentAxes();
      objA.entropy = AlignmentEntropy.CHAOTIC;
      const objB = new AlignmentAxes(objA);
      expect(objB).to.exist.and.to.be.a('object').and.to.have.property('entropy', AlignmentEntropy.CHAOTIC);
    });
    it('constructs from an alignment string', () => {
      const obj = new AlignmentAxes(Alignment.CHAOTIC_GOOD);
      expect(obj).to.exist.and.to.be.a('object');
      expect(obj).to.have.property('entropy', AlignmentEntropy.CHAOTIC, 'bad entropy value');
      expect(obj).to.have.property('morality', AlignmentMorality.GOOD, 'bad morality value');
    });
    it('constructs from POJSO', () => {
      const obj = new AlignmentAxes({
        entropy: 'CHAOTIC',
        morality: 'GOOD',
      });
      expect(obj).to.exist.and.to.be.a('object');
      expect(obj).to.have.property('entropy', AlignmentEntropy.CHAOTIC, 'bad entropy value');
      expect(obj).to.have.property('morality', AlignmentMorality.GOOD, 'bad morality value');
    });

    it('converts to enum', () => {
      const obj = new AlignmentAxes(Alignment.CHAOTIC_GOOD);
      const enm = obj.toEnum();
      expect(enm).to.be.a('string').that.equals(Alignment.CHAOTIC_GOOD);
    });
  });
});