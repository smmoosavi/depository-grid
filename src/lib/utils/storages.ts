import { browser } from '$app/environment';
import { readable, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export type Storage = {
  load(key: string): string | null;
  save(key: string, value: string): void;
  remove(key: string): void;
};

export function createSessionStorage(key: string) {
  if (!browser) {
    return writable(null);
  }
  const initialValue = sessionStorage.getItem(key);
  const store = writable(initialValue);
  store.subscribe((value) => {
    if (value !== null) {
      sessionStorage.setItem(key, value);
    } else {
      sessionStorage.removeItem(key);
    }
  });
  return store;
}
export function createLocalStorage(key: string): Writable<null | string> {
  if (!browser) {
    return writable(null);
  }
  let setFn: null | ((value: string | null) => void) = null;
  const initialValue = localStorage.getItem(key);
  const store = readable(initialValue, (set) => {
    setFn = set;
    const onStorage = (event: StorageEvent) => {
      if (event.key === key) {
        set(event.newValue);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('storage', onStorage);
    };
  });
  return {
    subscribe: store.subscribe,
    set(value: string) {
      setFn?.(value);
      localStorage.setItem(key, value);
    },
    update(updater) {
      const value = localStorage.getItem(key);
      const newValue = updater(value);
      setFn?.(newValue);
      if (newValue !== null) {
        localStorage.setItem(key, newValue);
      } else {
        localStorage.removeItem(key);
      }
    },
  };
}
