export type Value = string | number;
export type TypeOf<T> = T extends string ? 'string' : T extends number ? 'number' : never;

export type Range<T> = {
  kind: 'range';
  type: TypeOf<T>;
  start: T;
  end: T;
};

export type Single<T> = {
  kind: 'single';
  type: TypeOf<T>;
  value: T;
};

export type PatternItem<T> = Range<T> | Single<T>;
export type PatternItems<T> = Array<PatternItem<T>>;

export type Pattern<T> = {
  value: string;
  type: TypeOf<T>;
  items: PatternItems<T>;
  expanded: Array<T>;
};

export function single<T>(value: T): Single<T> {
  const type = getType(value);
  return { kind: 'single', value, type };
}

export function range<T>(start: T, end: T): Range<T> {
  const type = getType(start);
  return { kind: 'range', start, end, type };
}

export function getType<T>(value: T): TypeOf<T> {
  const type = typeof value;
  if (type === 'string') {
    return 'string' as any;
  }
  if (type === 'number') {
    return 'number' as any;
  }
  throw new Error(`Invalid type: ${type}`);
}

export function pattern<T>(items: PatternItems<T>): Pattern<T> {
  const value = itemsToString(items);
  const type = getItemType(items[0]);
  const expanded = expandItems(items);
  return { value, items, expanded, type };
}

export function getItemsType<T>(items: PatternItems<T>): TypeOf<T> {
  if (items.length === 0) {
    throw new Error('Invalid pattern: empty');
  }
  return getItemType(items[0]);
}

export function getItemType<T>(item: PatternItem<T>): TypeOf<T> {
  return item.type;
}

export function itemsToString<T>(items: PatternItems<T>): string {
  const type = getItemsType(items);
  switch (type) {
    case 'string':
      return stringItemsToString(items as PatternItems<string>);
    case 'number':
      return numberItemsToString(items as PatternItems<number>);
    default:
      throw new Error(`Invalid type: ${type}`);
  }
}

export function stringItemsToString(items: PatternItems<string>): string {
  return items.map(itemToString).join('');
}

export function numberItemsToString(items: PatternItems<number>): string {
  return items.map(itemToString).join(',');
}

export function itemToString<T extends Value>(item: PatternItem<T>): string {
  switch (item.kind) {
    case 'range':
      return rangeToString(item);
    case 'single':
      return singleToString(item);
  }
}

export function singleToString<T extends Value>(single: Single<T>): string {
  return single.value.toString();
}

export function rangeToString<T extends Value>(range: Range<T>): string {
  return `${range.start}-${range.end}`;
}

export function expandItems<T>(items: PatternItems<T>): Array<T> {
  const type = getItemsType(items);
  switch (type) {
    case 'string':
      return expandStringItems(items as PatternItems<string>) as Array<T>;
    case 'number':
      return expandNumberItems(items as PatternItems<number>) as Array<T>;
    default:
      throw new Error(`Invalid type: ${type}`);
  }
}

export function expandNumberItems(items: PatternItems<number>): Array<number> {
  return items.flatMap((item) => {
    switch (item.kind) {
      case 'range':
        return expandNumberRange(item);
      case 'single':
        return expandSingle(item);
    }
  });
}

export function expandNumberRange(range: Range<number>): Array<number> {
  const result: number[] = [];
  if (range.start > range.end) {
    throw new Error('Invalid range: start > end');
  }
  for (let i = range.start; i <= range.end; i++) {
    result.push(i);
  }
  return result;
}

function expandSingle<T>(single: Single<T>): Array<T> {
  return [single.value];
}

function expandStringRange(range: Range<string>): Array<string> {
  const result: string[] = [];
  const startChar = range.start.charCodeAt(0);
  const endChar = range.end.charCodeAt(0);
  if (startChar > endChar) {
    throw new Error('Invalid range: start > end');
  }
  for (let i = startChar; i <= endChar; i++) {
    result.push(String.fromCharCode(i));
  }
  return result;
}

function expandStringItems(items: PatternItems<string>): Array<string> {
  return items.flatMap((item) => {
    switch (item.kind) {
      case 'range':
        return expandStringRange(item);
      case 'single':
        return expandSingle(item);
    }
  });
}
