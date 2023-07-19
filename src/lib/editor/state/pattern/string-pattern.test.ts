import { range, single } from '$lib/editor/state/pattern/pattern';
import { parseStringPattern } from '$lib/editor/state/pattern/string-pattern';

describe('pattern', () => {
  describe('single', () => {
    it('should expand to a single value', () => {
      const pattern = parseStringPattern('A').unwrap();
      expect(pattern.expanded).toEqual(['A']);
      expect(pattern.items).toEqual([single('A')]);
    });

    it('should expand to a single persian value', () => {
      const pattern = parseStringPattern('آ').unwrap();
      expect(pattern.expanded).toEqual(['آ']);
      expect(pattern.items).toEqual([single('آ')]);
    });

    it('should expand multiple single item', () => {
      const pattern = parseStringPattern('A,B').unwrap();
      expect(pattern.expanded).toEqual(['A', 'B']);
      expect(pattern.items).toEqual([single('A'), single('B')]);
    });

    it('should parse values without comma', () => {
      const pattern = parseStringPattern('AB').unwrap();
      expect(pattern.expanded).toEqual(['A', 'B']);
      expect(pattern.items).toEqual([single('A'), single('B')]);
    });

    it('should parse persian values without comma', () => {
      const pattern = parseStringPattern('آبجد').unwrap();
      expect(pattern.expanded).toEqual(['آ', 'ب', 'ج', 'د']);
      expect(pattern.items).toEqual([single('آ'), single('ب'), single('ج'), single('د')]);
    });
  });
  describe('range', () => {
    it('should expand to a range of values', () => {
      const pattern = parseStringPattern('A-C').unwrap();
      expect(pattern.expanded).toEqual(['A', 'B', 'C']);
      expect(pattern.items).toEqual([range('A', 'C')]);
    });
    it('should expand multiple ranges', () => {
      const pattern = parseStringPattern('A-C,E-F').unwrap();
      expect(pattern.expanded).toEqual(['A', 'B', 'C', 'E', 'F']);
      expect(pattern.items).toEqual([range('A', 'C'), range('E', 'F')]);
    });
    it('should return error when start is larger than end', () => {
      const err = parseStringPattern('C-A').unwrap_err();
      expect(err.message).toEqual('Start must be less than end');
      expect(err.location.start.offset).toEqual(0);
      expect(err.location.end.offset).toEqual(3);
    });
  });
  describe('mixed', () => {
    it('should expand to a range of values', () => {
      const pattern = parseStringPattern('A-C,5').unwrap();
      expect(pattern.expanded).toEqual(['A', 'B', 'C', '5']);
      expect(pattern.items).toEqual([range('A', 'C'), single('5')]);
    });
    it('should expand range and values without comma', () => {
      const pattern = parseStringPattern('A-CF').unwrap();
      expect(pattern.expanded).toEqual(['A', 'B', 'C', 'F']);
      expect(pattern.items).toEqual([range('A', 'C'), single('F')]);
    });
  });
});
