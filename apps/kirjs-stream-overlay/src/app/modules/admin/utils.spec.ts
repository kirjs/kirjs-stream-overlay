import 'zone.js/testing';
import { normalizeSpaces } from './utils';

fdescribe('normalizeSpaces', () => {
  it('keeps simple inputs as is', () => {
    const value = 'pirojok';
    expect(normalizeSpaces(value)).toBe(value);
  });
});
