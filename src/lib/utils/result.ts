import { FirmMap } from '$lib/utils/firm-map';
import { UnwrapError } from '$lib/utils/unwrap';

export const RESULT = Symbol('RESULT');

export type OkStruct<Value> = {
  [RESULT]: true;
  ok: Value;
};

export type ErrStruct<Error> = {
  [RESULT]: true;
  err: Error;
};

export type ResultStruct<Value, Error> = OkStruct<Value> | ErrStruct<Error>;

export type OkPojo<Value> = {
  ok: Value;
};

export type ErrPojo<Error> = {
  err: Error;
};

export type ResultPojo<Value, Error> = OkPojo<Value> | ErrPojo<Error>;

export type Ok<Value, Error> = OkStruct<Value> & ResultFns<Value, Error>;

export type Err<Value, Error> = ErrStruct<Error> & ResultFns<Value, Error>;

export type Result<Value, Error> = Ok<Value, Error> | Err<Value, Error>;

interface ResultFns<Value, Error> {
  readonly [RESULT]: true;

  unwrap(this: ResultStruct<Value, Error>): Value;
  unwrap_err(this: ResultStruct<Value, Error>): Error;

  unwrap_or(this: ResultStruct<Value, Error>, value: Value): Value;

  or(this: ResultStruct<Value, Error>, value: ResultStruct<Value, Error>): Result<Value, Error>;

  map<T>(this: ResultStruct<Value, Error>, fn: (value: Value) => T): Result<T, Error>;

  map_err<E>(this: ResultStruct<Value, Error>, fn: (error: Error) => E): Result<Value, E>;
  isOk(this: ResultStruct<Value, Error>): this is Ok<Value, Error>;
  isErr(this: ResultStruct<Value, Error>): this is Err<Value, Error>;
  pojo(this: OkStruct<Value>): OkPojo<Value>;
  pojo(this: ErrStruct<Error>): ErrPojo<Error>;
  pojo(this: ResultStruct<Value, Error>): ResultPojo<Value, Error>;
}

function getResultFns<Value, Error>(): ResultFns<Value, Error> {
  const fns: ResultFns<Value, Error> = {
    [RESULT]: true,

    unwrap(this: Result<Value, Error>): Value {
      return unwrap(this);
    },

    unwrap_err(this: Result<Value, Error>): Error {
      return unwrap_err(this);
    },

    unwrap_or(this: ResultStruct<Value, Error>, value: Value): Value {
      return unwrap_or(this, value);
    },

    or(this: ResultStruct<Value, Error>, value: ResultStruct<Value, Error>): Result<Value, Error> {
      return or(this, value);
    },
    map<T>(this: ResultStruct<Value, Error>, fn: (value: Value) => T): Result<T, Error> {
      return map(this, fn);
    },
    map_err<E>(this: ResultStruct<Value, Error>, fn: (error: Error) => E): Result<Value, E> {
      return map_err(this, fn);
    },
    // @ts-ignore TS2526
    isOk(this: ResultStruct<Value, Error>): this is Ok<Value, Error> {
      return isOk(this);
    },
    // @ts-ignore TS2526
    isErr(this: ResultStruct<Value, Error>): this is Err<Value, Error> {
      return isErr(this);
    },
    pojo,
  };

  Object.defineProperty(fns, RESULT, { enumerable: false });
  Object.defineProperty(fns, 'unwrap', { enumerable: false });
  Object.defineProperty(fns, 'unwrap_or', { enumerable: false });
  Object.defineProperty(fns, 'or', { enumerable: false });
  Object.defineProperty(fns, 'map', { enumerable: false });
  Object.defineProperty(fns, 'map_err', { enumerable: false });
  Object.defineProperty(fns, 'isOk', { enumerable: false });
  Object.defineProperty(fns, 'isErr', { enumerable: false });

  return fns;
}

const resultFns = getResultFns<any, any>();

function createOk<Value, Error>(value: Value): Ok<Value, Error> & ResultFns<Value, Error> {
  return Object.assign(Object.create(resultFns), { ok: value });
}

function createErr<Value, Error>(error: Error): Err<Value, Error> & ResultFns<Value, Error> {
  return Object.assign(Object.create(resultFns), { err: error });
}

const okCache = new FirmMap<any, any>();
const errCache = new FirmMap<any, any>();

export function ok<Value, Error = never>(value: Value): Ok<Value, Error> {
  if (!okCache.has(value)) {
    okCache.set(value, createOk(value));
  }
  return okCache.get(value);
}

export function err<Error, Value = never>(error: Error): Err<Value, Error> {
  if (!errCache.has(error)) {
    errCache.set(error, createErr(error));
  }
  return errCache.get(error);
}

export function result<Value, Error>(
  result: OkStruct<Value> | ErrStruct<Error>,
): Result<Value, Error> {
  if (isOk(result)) {
    return ok(result.ok);
  }
  if (isErr(result)) {
    return err(result.err);
  }
  throw new Error('Unreachable');
}

export function unwrap<Value, Error>(result: ResultStruct<Value, Error>): Value {
  if (isOk(result)) {
    return result.ok;
  }
  if (isErr(result)) {
    throw new UnwrapError<Error>('Called unwrap on an Err value', result.err);
  }
  throw new Error('Unreachable');
}

export function unwrap_err<Value, Error>(result: ResultStruct<Value, Error>): Error {
  if (isOk(result)) {
    throw new UnwrapError<Value>('Called unwrap_err on an Ok value', result.ok);
  }
  if (isErr(result)) {
    return result.err;
  }
  throw new Error('Unreachable');
}

export function unwrap_or<Value, Error>(result: ResultStruct<Value, Error>, value: Value): Value {
  if (isOk(result)) {
    return result.ok;
  }
  return value;
}

export function or<Value, Error>(
  _result: ResultStruct<Value, Error>,
  value: ResultStruct<Value, Error>,
): Result<Value, Error> {
  if (isOk(_result)) {
    return _result;
  }
  return result(value);
}

export function map<Value, Error, T>(
  result: ResultStruct<Value, Error>,
  fn: (value: Value) => T,
): Result<T, Error> {
  if (isOk(result)) {
    return ok(fn(result.ok));
  }
  if (isErr(result)) {
    return err(result.err);
  }
  throw new Error('Unreachable');
}

export function map_err<Value, Error, E>(
  result: ResultStruct<Value, Error>,
  fn: (error: Error) => E,
): Result<Value, E> {
  if (isErr(result)) {
    return err(fn(result.err));
  }
  if (isOk(result)) {
    return ok(result.ok);
  }
  throw new Error('Unreachable');
}

export function isResult<Value, Error>(value: any): value is Result<Value, Error> {
  return !!(value && value[RESULT]);
}
export function isOk<Value, Error>(result: ResultStruct<Value, Error>): result is Ok<Value, Error> {
  return isResult(result) && 'ok' in result;
}

export function isErr<Value, Error>(
  result: ResultStruct<Value, Error>,
): result is Err<Value, Error> {
  return isResult(result) && 'err' in result;
}

function pojo<Value>(this: OkStruct<Value>): OkPojo<Value>;
function pojo<Error>(this: ErrStruct<Error>): ErrPojo<Error>;
function pojo<Value, Error>(this: ResultStruct<Value, Error>): ResultPojo<Value, Error>;
function pojo<Value, Error>(this: ResultStruct<Value, Error>): ResultPojo<Value, Error> {
  return { ...this };
}
