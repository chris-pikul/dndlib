import { expect } from 'chai';
import { describe } from 'mocha';

import {
  isPlainObject, isPlainObjectMember,
} from '../../src/utils/json-object';

describe('JSON Utilities', () => {
  describe('Utility: isPlainObjectMember()', () => {
    it('returns true on primitives', () => {
      expect(isPlainObjectMember(123)).to.be.true;
      expect(isPlainObjectMember('string')).to.be.true;
      expect(isPlainObjectMember(true)).to.be.true;
    });

    it('returns true on null', () => expect(isPlainObjectMember(null)).to.be.true);
    it('returns false on undefined', () => expect(isPlainObjectMember(undefined)).to.be.false);
    it('returns false on functions', () => expect(isPlainObjectMember(() => {})).to.be.false);
    it('returns true on objects', () => {
      const obj = {
        some: 'keys',
        here: 123,
        and: [ 'there' ],
      };
      expect(isPlainObjectMember(obj)).to.be.true;
    });
    it('returns false on standard lib', () => {
      expect(isPlainObjectMember(new Date())).to.be.false;
    });
  });

  describe('Utility: isPlainObject()', () => {
    it('returns true on a POJSO', () => {
      const obj = {
        some: 'keys',
        here: 123,
        and: [ 'there' ],
      };

      expect(isPlainObject(obj)).to.be.true;
    });

    it('returns false on standard libs', () => {
      expect(isPlainObject(new Date())).to.be.false;
    });

    it('returns false on functions', () => {
      expect(isPlainObject(() => {})).to.be.false;
    });

    it('returns false on arrays', () => {
      expect(isPlainObject([ 1, 2, 3])).to.be.false;
    });

    it('returns false on primitives', () => {
      expect(isPlainObject(123)).to.be.false;
      expect(isPlainObject('string')).to.be.false;
      expect(isPlainObject(true)).to.be.false;
    });

    it('returns false on null/undefined', () => {
      expect(isPlainObject(null)).to.be.false;
      expect(isPlainObject(undefined)).to.be.false;
    });

    it('rejects function props', () => {
      const obj = {
        some: 'key',
        bad: () => {},
      };

      expect(isPlainObject(obj)).to.be.false;
    });

    it('recursively searches', () => {
      const obj = {
        some: 'key',
        another: {
          object: 'with',
          keys: 123,
          and: {
            more: 'objects',
          },
        },
      };

      expect(isPlainObject(obj)).to.be.true;

      const obj2 = {
        some: 'key',
        another: {
          object: 'with',
          keys: 123,
          and: {
            more: 'objects',
            bad: new Date(),
            also: () => {},
          },
        },
      };

      expect(isPlainObject(obj2)).to.be.false;
    });
  });
});