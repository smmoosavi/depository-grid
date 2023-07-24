declare type DndItem = import('svelte-dnd-action').Item;
declare type DndEvent<ItemType = DndItem> = import('svelte-dnd-action').DndEvent<ItemType>;
declare type DnDEventHandler<T, ItemType> = (
  event: CustomEvent<DndEvent<ItemType>> & { target: EventTarget & T },
) => void;
declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    'on:consider'?: DnDEventHandler<T>;
    'on:finalize'?: DnDEventHandler<T>;
  }
}
