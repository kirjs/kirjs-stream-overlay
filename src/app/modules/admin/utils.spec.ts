import {normalizeSpaces} from './utils';
import 'zone.js/testing';

fdescribe('normalizeSpaces', () => {
  it('keeps simple inputs as is', () => {
    const value = 'pirojok';
    expect(normalizeSpaces(value)).toBe(value);
  });
});

