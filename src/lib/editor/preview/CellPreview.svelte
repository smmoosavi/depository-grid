<script lang="ts">
  import type { Cell } from '$lib/editor/state/print-items';

  export let cell: Cell;
</script>

<div class="flex h-full items-center justify-center gap-1 overflow-hidden font-extrabold">
  <span class="inline-block">
    {cell.table}
  </span>
  <span class="inline-block">
    {cell.row}
  </span>
  <span class="inline-block">
    {cell.cell}
  </span>
</div>
