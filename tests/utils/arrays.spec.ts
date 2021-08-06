import { expect } from 'chai';
import { describe } from 'mocha';

import {
  inPlaceConcat,
  strictValidateCountedArrayElem,
  strictValidateCountedArray,
} from '../../src/utils/arrays';

describe('Utility: inPlaceConcat()', () => {
  it('concatenates in-place', () => {
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    inPlaceConcat(arr1, arr2);
    
    expect(arr1).to.have.ordered.members([1,2,3,4]);
  });
});

describe('Utility: strictValidateCountedArrayElem()', () => {
  it('ensures a property object parameter', () => {
    expect(() => strictValidateCountedArrayElem(null)).to.throw(TypeError);
    expect(() => strictValidateCountedArrayElem(123)).to.throw(TypeError);
  });

  it('ensures a type property in the parameter', () => {
    const props = {
      count: 10,
    };
    expect(() => strictValidateCountedArrayElem(props)).to.throw('Missing "type" property for CountedArrayElem.');
  });

  it('ensures a count property in the parameter', () => {
    const props = {
      type: 'TEST',
    };
    expect(() => strictValidateCountedArrayElem(props)).to.throw('Missing "count" property for CountedArrayElem.');
  });

  it('does not throw on valid object', () => {
    const props = {
      type: 'TEST',
      count: 10,
    };
    expect(() => strictValidateCountedArrayElem(props)).to.not.throw();
    expect(() => strictValidateCountedArrayElem(props, 'string')).to.not.throw();
  });
});

describe('Utility: strictValidateCountedArray()', () => {
  it('ensures a prop array parameter', () => {
    expect(() => strictValidateCountedArray(null)).to.throw(TypeError);
    expect(() => strictValidateCountedArray([])).to.not.throw();
  });

  it('does not throw on valid object', () => {
    const props = {
      type: 'TEST',
      count: 10,
    };
    expect(() => strictValidateCountedArray([props, props])).to.not.throw();
  });
});
