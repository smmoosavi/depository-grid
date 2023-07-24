<script lang="ts">
  import AddItem from '$lib/editor/items-editor/AddItem.svelte';
  import ItemEditor from '$lib/editor/items-editor/ItemEditor.svelte';
  import { getStore } from '$lib/editor/state/store';
  import { flip } from 'svelte/animate';
  import { slide } from 'svelte/transition';

  const store = getStore();
  const { state } = store;
</script>

<div>
  {#each $state.items as item (item.id)}
    <div animate:flip in:slide out:slide class="mt-5">
      <ItemEditor {item} />
    </div>
  {/each}
  <div class="mt-4">
    <AddItem />
  </div>
</div>
