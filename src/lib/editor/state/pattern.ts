export type Range<T> = {
  kind: 'range';
  start: T;
  end: T;
};

export type Single<T> = {
  kind: 'single';
  value: T;
};

export type Pattern<T> = {
  value: string;
  parsed: Array<Range<T> | Single<T>>;
  expanded: Array<T>;
};
