<script lang="ts">
  import type { Cell } from '$lib/editor/state/print-items';

  export let cell: Cell;
</script>

<div class="flex h-full items-center justify-center overflow-hidden font-extrabold">
  &#x202D;{cell.table}
  {cell.row}
  {cell.cell}
</div>
