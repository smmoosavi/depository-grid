import { FirmMap } from '$lib/utils/firm-map';

const OPTION = Symbol('OPTION');
// eslint-disable-next-line @typescript-eslint/ban-types
export type Defined = {} | null;
export type Some<Value extends Defined> = {
  some: Value;
} & OptionFns<Value>;
export type None<Value extends Defined> = {
  none: void;
} & OptionFns<Value>;
export type Option<Value extends Defined> = Some<Value> | None<Value>;

interface OptionFns<Value extends Defined> {
  readonly [OPTION]: true;

  unwrap(this: Option<Value>): Value;

  unwrap_or(this: Option<Value>, value: Value): Value;

  or(this: Option<Value>, value: Option<Value>): Option<Value>;

  map<T>(this: Option<Value>, fn: (value: Value) => T): Option<T & Defined>;

  isSome(this: Option<Value>): this is Some<Value>;

  isNone(this: Option<Value>): this is None<Value>;
}

function getOptionFns<Value extends Defined>(): OptionFns<Value> {
  return {
    [OPTION]: true,
    unwrap(this: Option<Value>) {
      return unwrap(this);
    },
    unwrap_or(this: Option<Value>, value: Value): Value {
      return unwrap_or(this, value);
    },
    or(this: Option<Value>, value: Option<Value>) {
      return or(this, value);
    },
    map<T>(this: Option<Value>, fn: (value: Value) => T) {
      return mapOption(this, fn);
    },
    // @ts-ignore TS2526
    isSome(this: Option<Value>): this is Some<Value> {
      return isSome(this);
    },
    // @ts-ignore TS2526
    isNone(this: Option<Value>): this is None<Value> {
      return isNone(this);
    },
  };
}

const optionFns = getOptionFns<any>();

function createSome<Value extends Defined>(value: Value): Some<Value> & OptionFns<Value> {
  if (value === undefined) {
    throw new Error("some value can't be undefined");
  }
  return Object.assign(Object.create(optionFns), { some: value });
}

function createNone<Value extends Defined>(): None<Value> {
  return Object.assign(Object.create(optionFns), { none: true });
}

const theNone = createNone<any>();

const cache = new FirmMap<any, Some<any>>();

export function some<Value extends Defined>(value: Value): Some<Value> & OptionFns<Value> {
  if (!cache.has(value)) {
    cache.set(value, createSome(value));
  }
  return cache.get(value)!;
}

export function none<Value extends Defined>(): None<Value> {
  return theNone;
}

export function isOption(value: any): value is Option<unknown & Defined> {
  return !!(value && value[OPTION]);
}

function isSome<Value extends Defined>(
  option: Option<Value>,
): option is Some<Value> & OptionFns<Value> {
  return isOption(option) && 'some' in option;
}

function isNone<Value extends Defined>(option: Option<Value>): option is None<Value> {
  return isOption(option) && 'none' in option;
}

export class NoneError extends Error {
  constructor() {
    super(`value is None.`) /* istanbul ignore next */;

    this.name = 'NoneError';
    Object.setPrototypeOf(this, NoneError.prototype);
  }
}

function unwrap<Value extends Defined>(option: Option<Value>): Value {
  if (isSome(option)) {
    return option.some;
  }
  throwNoneError();
}

function unwrap_or<Value extends Defined>(option: Option<Value>, value: Value): Value {
  if (isSome(option)) {
    return option.some;
  }
  return value;
}

function or<Value extends Defined>(option: Option<Value>, value: Option<Value>): Option<Value> {
  if (isSome(option)) {
    return option;
  }
  return value;
}

export function isNoneError(e: any): e is NoneError {
  return e instanceof NoneError;
}

export function throwNoneError(): never {
  throw new NoneError();
}

export function catchNoneError<R>(fn: () => R): Option<R & Defined> {
  try {
    return intoOption(fn());
  } catch (e) {
    if (isNoneError(e)) {
      return none();
    }
    throw e;
  }
}

function mapOption<V extends Defined, T>(option: Option<V>, fn: (v: V) => T): Option<T & Defined> {
  if (isSome(option)) {
    return intoOption(fn(option.some));
  }
  return none();
}

export function intoOption<Value>(value: Value | undefined): Option<Value & Defined> {
  if (value === undefined) {
    return none();
  }
  return some(value);
}

export function fromOption<Value extends Defined>(option: Option<Value>): Value | undefined {
  return option.isSome() ? option.some : undefined;
}
