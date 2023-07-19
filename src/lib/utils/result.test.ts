import { stringify } from 'devalue';
import { err, isResult, ok, type Result } from '$lib/utils/result';
import { UnwrapError } from '$lib/utils/unwrap';

describe('result', () => {
  describe('ok', () => {
    it('should be ok', () => {
      expect(ok(5).isOk()).toBe(true);
      expect(ok(5).isErr()).toBe(false);
    });
    it('should returns same value', () => {
      expect(ok(5)).toBe(ok(5));
    });
  });
  describe('err', () => {
    it('should be err', () => {
      expect(err('bad').isOk()).toBe(false);
      expect(err('bad').isErr()).toBe(true);
    });
    it('should returns same value', () => {
      expect(err('bad')).toBe(err('bad'));
    });
    it('should not be cached to ok', () => {
      const ok5 = ok(5);
      const err5 = err('bad');
      expect(ok5).not.toBe(err5);
    });
  });
  describe('unwrap', () => {
    it('should return value', () => {
      expect(ok(5).unwrap()).toBe(5);
    });
    it('should throw error', () => {
      expect(() => err('bad').unwrap()).toThrow(UnwrapError);
    });
  });
  describe('unwrap_err', () => {
    it('should throw error', () => {
      expect(() => ok(5).unwrap_err()).toThrow(UnwrapError);
    });
    it('should return error', () => {
      expect(err('bad').unwrap_err()).toBe('bad');
    });
  });
  describe('unwrap_or', () => {
    it('should return value', () => {
      expect(ok(5).unwrap_or(6)).toBe(5);
    });
    it('should return default value', () => {
      expect(err<string, number>('5').unwrap_or(6)).toBe(6);
    });
  });
  describe('map', () => {
    const double = (o: Result<number, unknown>) => o.map((v) => v * 2);
    it('should map ok', () => {
      expect(double(ok(5))).toBe(ok(10));
    });
    it('should not map err', () => {
      expect(double(err('bad'))).toBe(err('bad'));
    });
  });
  describe('mapError', () => {
    it('should map err', () => {
      expect(err('bad').map_err((v) => 'very ' + v)).toBe(err('very bad'));
    });
    it('should not map ok', () => {
      expect(ok(5).map_err((v) => v * 2)).toBe(ok(5));
    });
  });
  describe('or', () => {
    it('should return ok', () => {
      expect(ok(5).or(ok(6))).toBe(ok(5));
    });
    it('should return err', () => {
      expect(err<string, number>('5').or(ok(6))).toBe(ok(6));
    });
  });
  describe('pojo', () => {
    it('should be devalue serializable', () => {
      expect(stringify(ok(5).pojo())).toBe('[{"ok":1},5]');
      expect(stringify(err('bad').pojo())).toBe('[{"err":1},"bad"]');
    });
  });
  it('should be json serializable', () => {
    expect(JSON.stringify(ok(5))).toBe('{"ok":5}');
    expect(JSON.stringify(err('bad'))).toBe('{"err":"bad"}');
  });
});

describe('isResult', () => {
  it('should return true for any result', () => {
    expect(isResult(ok(5))).toBe(true);
    expect(isResult(err('bad'))).toBe(true);
  });
  it('should return false for other objects', () => {
    expect(isResult(5)).toBe(false);
    expect(isResult(null)).toBe(false);
    expect(isResult(undefined)).toBe(false);

    expect(isResult({})).toBe(false);
    expect(isResult({ isOk: () => true, isErr: () => false })).toBe(false);

    it('should narrow types correctly', function () {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      function fn1(o: number | Result<number, string>) {
        if (isResult(o)) {
          const v: Result<number, string> = o;
        }
        if (isResult(o)) {
          // @ts-expect-error
          const s: Result<string, string> = o;
        }
      }

      function fn2(o: any) {
        if (isResult(o)) {
          const s: Result<unknown, unknown> = o;
        }
        if (isResult(o)) {
          // @ts-expect-error
          const v: Result<number, string> = o;
        }
      }
      /* eslint-enable */
    });
  });
});
