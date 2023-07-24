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

export type UpdateItemAction = {
  type: 'update-item';
  id: string;
  item: Item;
};

export type Action = AddAction | RemoveAction | UpdateItemAction;

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

export function updateItem(id: string, item: Item): UpdateItemAction {
  return {
    type: 'update-item',
    id,
    item,
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
    case 'update-item': {
      return {
        items: state.items.map((item) => {
          if (item.id === action.id) {
            return action.item;
          }
          return item;
        }),
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
