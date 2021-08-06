import { expect } from 'chai';
import { describe } from 'mocha';

import {
  testIfInteger,
  testIfPositiveInteger,
  testKabob,
  testURI,
} from '../../src/utils/validation';

describe('Validation Utilities', () => {
  describe('testURI()', () => {
    it('disallows empty', () => expect(testURI('')).to.be.false);
    it('allows empty with switch', () => expect(testURI('', true)).to.be.true);
    it('disallows malformed', () => {
      expect(testURI('/')).to.be.false;
      expect(testURI('some/path')).to.be.false;
      expect(testURI('/some/bad$path ')).to.be.false;
    });
    it('allows proper URIs', () => {
      expect(testURI('/some/v4lu3s-go/here')).to.be.true;
    });
  });

  describe('testKabob()', () => {
    it('disallows empty', () => expect(testKabob('')).to.be.false);
    it('allows empty with switch', () => expect(testKabob('', true)).to.be.true);
    it('disallows malformed', () => {
      expect(testKabob('Caps_and-symbols')).to.be.false;
    });
    it('allows proper Kabobs', () => {
      expect(testKabob('any-values01-here')).to.be.true;
    });
  });

  describe('testIfInteger()', () => {
    it('disallows non-numbers', () => {
      expect(testIfInteger('str')).to.be.false;
      expect(testIfInteger(null)).to.be.false;
      expect(testIfInteger(undefined)).to.be.false;
      expect(testIfInteger(true)).to.be.false;
    });
    it('disallows floats', () => expect(testIfInteger(3.1415)).to.be.false);
    it('allows integers', () => {
      expect(testIfInteger(-123)).to.be.true;
      expect(testIfInteger(0)).to.be.true;
      expect(testIfInteger(123)).to.be.true;
    });
  });

  describe('testIfPositiveInteger()', () => {
    it('disallows non-numbers', () => {
      expect(testIfPositiveInteger('str')).to.be.false;
      expect(testIfPositiveInteger(null)).to.be.false;
      expect(testIfPositiveInteger(undefined)).to.be.false;
      expect(testIfPositiveInteger(true)).to.be.false;
    });
    it('disallows floats', () => expect(testIfPositiveInteger(3.1415)).to.be.false);
    it('disallows negatives', () => expect(testIfPositiveInteger(-123)).to.be.false);
    it('allows integers', () => {
      expect(testIfPositiveInteger(0)).to.be.true;
      expect(testIfPositiveInteger(123)).to.be.true;
    });
  });
});