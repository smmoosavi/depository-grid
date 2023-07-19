import { parseNumerPattern } from '$lib/editor/state/pattern/numer-pattern';
import { range, single } from '$lib/editor/state/pattern/pattern';

describe('pattern', () => {
  describe('single', () => {
    it('should expand to a single value', () => {
      const pattern = parseNumerPattern('1').unwrap();
      expect(pattern.expanded).toEqual([1]);
      expect(pattern.items).toEqual([single(1)]);
    });
    it('should expand multiple single item', () => {
      const pattern = parseNumerPattern('1,2').unwrap();
      expect(pattern.expanded).toEqual([1, 2]);
      expect(pattern.items).toEqual([single(1), single(2)]);
    });
  });
  describe('range', () => {
    it('should expand to a range of values', () => {
      const pattern = parseNumerPattern('1-3').unwrap();
      expect(pattern.expanded).toEqual([1, 2, 3]);
      expect(pattern.items).toEqual([range(1, 3)]);
    });
    it('should expand multiple ranges', () => {
      const pattern = parseNumerPattern('1-3,5-6').unwrap();
      expect(pattern.expanded).toEqual([1, 2, 3, 5, 6]);
      expect(pattern.items).toEqual([range(1, 3), range(5, 6)]);
    });
    it('should return error when start is larger than end', () => {
      const err = parseNumerPattern('3-1').unwrap_err();
      expect(err.message).toEqual('Start must be less than end');
      expect(err.location.start.offset).toEqual(0);
      expect(err.location.end.offset).toEqual(3);
    });
  });
  describe('mixed', () => {
    it('should expand to a range of values', () => {
      const pattern = parseNumerPattern('1-3,5').unwrap();
      expect(pattern.expanded).toEqual([1, 2, 3, 5]);
      expect(pattern.items).toEqual([range(1, 3), single(5)]);
    });
  });
});
