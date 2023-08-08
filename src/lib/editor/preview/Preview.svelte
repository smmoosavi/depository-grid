<script lang="ts">
  import ItemBox from '$lib/editor/preview/ItemBox.svelte';
  import Paper from '$lib/editor/preview/Paper.svelte';
  import ItemPreview from '$lib/editor/preview/ItemPreview.svelte';
  import { getCellOfItems } from '$lib/editor/state/editor-items';
  import { placeItems } from '$lib/editor/state/print-items';
  import { getStore, type State } from '$lib/editor/state/store';

  function getPages(state: State) {
    const items = state.items;
    const layout = state.layout;
    const cells = getCellOfItems(items);
    return placeItems(cells, layout);
  }

  const store = getStore();
  const { state } = store;
  $: pages = getPages($state);
</script>

{#each pages as page}
  <Paper>
    {#each page.items as item}
      <ItemBox {item}>
        <ItemPreview {item} />
      </ItemBox>
    {/each}
  </Paper>
{/each}
