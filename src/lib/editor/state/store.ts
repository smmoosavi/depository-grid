import { getContext, setContext } from 'svelte';
import { type Writable, writable } from 'svelte/store';
import type { Item } from './items';

export type State = {
  items: Array<Item>;
};

export type AddAction = {
  type: 'add';
  item: Item;
};

export type RemoveAction = {
  type: 'remove';
  id: string;
};

export type Action = AddAction | RemoveAction;

export function addItem(item: Item): AddAction {
  return {
    type: 'add',
    item,
  };
}

export function removeItem(id: string): RemoveAction {
  return {
    type: 'remove',
    id,
  };
}

function reduce(state: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      return {
        items: [...state.items, action.item],
      };
    }
    case 'remove': {
      return {
        items: state.items.filter((item) => item.id !== action.id),
      };
    }
  }
}

export type Store = {
  state: Writable<State>;
  dispatch: (action: Action) => void;
};
export function createStore(): Store {
  const init: State = {
    items: [],
  };
  const state = writable(init);
  const dispatch = (action: Action) => {
    state.update((state) => reduce(state, action));
  };
  return {
    state,
    dispatch,
  };
}

export function getStore(): Store {
  return getContext('store');
}

export function setStore(store: Store) {
  return setContext('store', store);
}
