import { pattern, range, single } from '$lib/editor/state/pattern/pattern';

describe('single', () => {
  describe('string', () => {
    it('should create string single', () => {
      expect(single('A')).toEqual({
        kind: 'single',
        type: 'string',
        value: 'A',
      });
    });
  });
  describe('number', () => {
    it('should create number single', () => {
      expect(single(1)).toEqual({
        kind: 'single',
        type: 'number',
        value: 1,
      });
    });
  });
});

describe('range', () => {
  describe('string', () => {
    it('should create string range', () => {
      expect(range('A', 'C')).toEqual({
        kind: 'range',
        type: 'string',
        start: 'A',
        end: 'C',
      });
    });
  });
  describe('number', () => {
    it('should create number range', () => {
      expect(range(1, 3)).toEqual({
        kind: 'range',
        type: 'number',
        start: 1,
        end: 3,
      });
    });
  });
});

describe('pattern', () => {
  describe('string', () => {
    it('should create single string pattern', () => {
      expect(pattern<string>([single('A'), single('B')])).toEqual({
        value: 'AB',
        type: 'string',
        items: [single('A'), single('B')],
        expanded: ['A', 'B'],
      });
    });
    it('should create range string pattern', () => {
      expect(pattern<string>([range('A', 'C')])).toEqual({
        value: 'A-C',
        type: 'string',
        items: [range('A', 'C')],
        expanded: ['A', 'B', 'C'],
      });
    });
    it('should create mixed string pattern', () => {
      expect(pattern<string>([range('A', 'C'), single('D')])).toEqual({
        value: 'A-CD',
        type: 'string',
        items: [range('A', 'C'), single('D')],
        expanded: ['A', 'B', 'C', 'D'],
      });
    });
  });
});
