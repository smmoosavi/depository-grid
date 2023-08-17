import { derived, get } from 'svelte/store';
import type { Stores, StoresValues, Unsubscriber, Updater, Writable } from 'svelte/store';

export function select<S extends Stores, T>(
  stores: S,
  getFn: (
    values: StoresValues<S>,
    set: (value: T) => void,
    update: (fn: Updater<T>) => void,
  ) => Unsubscriber | void,
  setFn: (value: T) => void,
  initial_value?: T | undefined,
): Writable<T>;
export function select<S extends Stores, T>(
  stores: S,
  getFn: (values: StoresValues<S>) => T,
  setFn: (value: T) => void,
  initial_value?: T | undefined,
): Writable<T>;
export function select<S extends Stores, T>(
  stores: S,
  getFn:
    | ((values: StoresValues<S>) => T)
    | ((
        values: StoresValues<S>,
        set: (value: T) => void,
        update: (fn: Updater<T>) => void,
      ) => Unsubscriber | void),
  setFn: (value: T) => void,
  initial_value?: T | undefined,
): Writable<T> {
  const derivedStore = derived(stores, getFn as any, initial_value);
  return {
    subscribe: derivedStore.subscribe,
    set: setFn,
    update: (fn: Updater<T>) => {
      const value = get(derivedStore);
      setFn(fn(value));
    },
  };
}
