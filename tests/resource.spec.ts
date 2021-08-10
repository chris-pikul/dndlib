import { expect } from 'chai';
import { describe } from 'mocha';

import Resource from '../src/resource';

describe('Resource Class', () => {
  describe('Resource.strictValidateProps()', () => {
    it('requires a prop parameter', () => {
      expect(() => Resource.strictValidateProps(null)).to.throw(TypeError);
      expect(() => Resource.strictValidateProps(123)).to.throw();
    });

    it('validates valid example', () => {
      const props = {
        type: 'CLASS',
        id: 'some-id',
        name: 'Test Object',
        description: {
          plainText: [ 'Example object description' ],
        },
        source: {
          publicationID: 'HB',
          title: 'Test',
        },
        tags: [ 'tag1', 'tag2' ],
      };

      expect(() => Resource.strictValidateProps(props)).to.not.throw();
    });
  });
});