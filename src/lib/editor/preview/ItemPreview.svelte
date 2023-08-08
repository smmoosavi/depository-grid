<script lang="ts">
  import CellPreview from '$lib/editor/preview/CellPreview.svelte';
  import type { Positioned, PrintItem } from '$lib/editor/state/print-items';

  export let item: Positioned<PrintItem>;
</script>

{#if item.item.kind === 'cell'}
  <CellPreview cell={item.item} />
{:else}
  <div class="bg-red-500 p-2 text-white print:hidden">
    {item.item.kind} not implemented
  </div>
{/if}
