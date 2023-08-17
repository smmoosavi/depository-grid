import { select } from './select-store';
import type { StoresValues, Writable } from 'svelte/store';

export function selectField<S extends Writable<any>, F extends keyof StoresValues<S>>(
  store: S,
  field: F,
): Writable<StoresValues<S>[F]> {
  return select(
    store,
    (value) => value[field],
    (value) => {
      store.update((state) => ({ ...state, [field]: value }));
    },
  );
}
