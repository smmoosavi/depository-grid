<script lang="ts">
  import AddItem from '$lib/editor/items-editor/AddItem.svelte';
  import ItemEditor from '$lib/editor/items-editor/ItemEditor.svelte';
  import type { EditorItem } from '$lib/editor/state/editor-items';
  import { getStore, updateItems } from '$lib/editor/state/store';
  import { flip } from 'svelte/animate';
  import { type DndEvent, dndzone } from 'svelte-dnd-action';

  const store = getStore();
  const { state, dispatch } = store;
  let items = $state.items;
  $: items = $state.items;

  const onConsider = (e: CustomEvent<DndEvent<EditorItem>>) => {
    items = e.detail.items;
  };
  const onFinalize = (e: CustomEvent<DndEvent<EditorItem>>) => {
    items = e.detail.items;
    dispatch(updateItems(e.detail.items));
  };
  const dropTargetStyle = {
    background: 'rgb(243 244 246 / var(--tw-bg-opacity))',
    'box-shadow': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    'border-radius': '0.25rem',
  };
</script>

<div>
  <div use:dndzone={{ items, dropTargetStyle }} on:consider={onConsider} on:finalize={onFinalize}>
    {#each items as item (item.id)}
      <div animate:flip class="mt-5">
        <ItemEditor {item} />
      </div>
    {/each}
  </div>
  <div class="mt-4">
    <AddItem />
  </div>
</div>
