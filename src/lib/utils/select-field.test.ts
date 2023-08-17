import { selectField } from '$lib/utils/select-field';
import { get, writable } from 'svelte/store';

describe('select field', () => {
  describe('as readable', () => {
    it('should select field', () => {
      const o = writable({ a: 1, b: 2 });
      const a = selectField(o, 'a');
      expect(get(a)).toBe(1);
    });
    it('should work nested', () => {
      const o = writable({ a: { b: 2 } });
      const b = selectField(selectField(o, 'a'), 'b');
      expect(get(b)).toBe(2);
    });
  });
  describe('as writable', () => {
    it('should set uplink store', () => {
      const o = writable({ a: 1, b: 2 });
      const a = selectField(o, 'a');
      a.set(3);
      expect(get(o)).toEqual({ a: 3, b: 2 });
    });
  });
  it('should work nested', () => {
    const o = writable({ a: { b: 2 } });
    const b = selectField(selectField(o, 'a'), 'b');
    b.set(3);
    expect(get(o)).toEqual({ a: { b: 3 } });
  });
});
