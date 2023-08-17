import { select } from './select-store';
import { get, writable } from 'svelte/store';
import { vi } from 'vitest';
describe('select', () => {
  describe('as readable', () => {
    it('should have correct values', () => {
      const a = writable(1);
      const b = writable(2);
      const s = select(
        [a, b],
        ([a, b]) => a + b,
        () => {},
      );
      expect(get(s)).toBe(3);
    });
    it('should have updated value', () => {
      const a = writable(1);
      const b = writable(2);
      const s = select(
        [a, b],
        ([a, b]) => a + b,
        () => {},
      );
      a.set(2);
      expect(get(s)).toBe(4);
    });
    it('should call subscribe function', () => {
      const a = writable(1);
      const b = writable(2);
      const s = select(
        [a, b],
        ([a, b]) => a + b,
        () => {},
      );
      const fn = vi.fn();
      s.subscribe(fn);
      expect(fn).toBeCalledWith(3);
      a.set(2);
      expect(fn).toBeCalledWith(4);
    });
  });
  describe('as writable', () => {
    it('should set uplink store', () => {
      const a = writable(1);
      const s = select(
        [a],
        ([a]) => a + 1,
        (value: number) => {
          a.set(value - 1);
        },
      );
      s.set(3);
      expect(get(a)).toBe(2);
      expect(get(s)).toBe(3);
    });
    it('should update uplink store', () => {
      const a = writable(1);
      const s = select(
        [a],
        ([a]) => a + 1,
        (value: number) => {
          a.set(value - 1);
        },
      );
      s.update((value) => value + 1);
      expect(get(a)).toBe(2);
      expect(get(s)).toBe(3);
    });
    it('should call subscribe function', () => {
      const a = writable(1);
      const s = select(
        [a],
        ([a]) => a + 1,
        (value: number) => {
          a.set(value - 1);
        },
      );
      const fnA = vi.fn();
      const fnS = vi.fn();
      a.subscribe(fnA);
      s.subscribe(fnS);
      expect(fnA).toBeCalledWith(1);
      expect(fnS).toBeCalledWith(2);

      s.set(3);
      expect(fnA).toBeCalledWith(2);
      expect(fnS).toBeCalledWith(3);
    });
  });
  describe('as field selector', () => {
    it('should select field correctly', () => {
      const o = writable({ a: 1, b: 2 });
      const a = select(
        [o],
        ([o]) => o.a,
        (value: number) => {
          o.update((o) => ({ ...o, a: value }));
        },
      );
      expect(get(a)).toBe(1);
      a.set(2);
      expect(get(a)).toBe(2);
      expect(get(o)).toEqual({ a: 2, b: 2 });
    });
  });
});
