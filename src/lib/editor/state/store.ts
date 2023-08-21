import { defaultPageLayout } from '$lib/editor/state/page-layout';
import type { PageLayout } from '$lib/editor/state/page-layout';
import { getContext, setContext } from 'svelte';
import { type Writable, writable } from 'svelte/store';
import type { EditorItem } from './editor-items';

export type State = {
  items: Array<EditorItem>;
  layout: PageLayout;
};

export type AddAction = {
  type: 'add-item';
  item: EditorItem;
};

export type RemoveAction = {
  type: 'remove-item';
  id: string;
};

export type UpdateItemAction = {
  type: 'update-item';
  id: string;
  item: EditorItem;
};

export type UpdateItemsAction = {
  type: 'update-items';
  items: Array<EditorItem>;
};

export type Action = AddAction | RemoveAction | UpdateItemAction | UpdateItemsAction;

export function addItem(item: EditorItem): AddAction {
  return {
    type: 'add-item',
    item,
  };
}

export function removeItem(id: string): RemoveAction {
  return {
    type: 'remove-item',
    id,
  };
}

export function updateItem(id: string, item: EditorItem): UpdateItemAction {
  return {
    type: 'update-item',
    id,
    item,
  };
}

export function updateItems(items: Array<EditorItem>): UpdateItemsAction {
  return {
    type: 'update-items',
    items,
  };
}

function reduce(state: State, action: Action): State {
  switch (action.type) {
    case 'add-item': {
      return {
        ...state,
        items: [...state.items, action.item],
      };
    }
    case 'remove-item': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
    }
    case 'update-item': {
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.id) {
            return action.item;
          }
          return item;
        }),
      };
    }
    case 'update-items': {
      return {
        ...state,
        items: action.items,
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
    layout: defaultPageLayout,
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
