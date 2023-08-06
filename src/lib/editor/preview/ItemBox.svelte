<script lang="ts">
  import type { Positioned, PrintItem } from '$lib/editor/state/print-items';

  export let item: Positioned<PrintItem>;
</script>

<div
  class="absolute border border-dashed border-gray-300"
  style="
          left: {item.x}mm;
          top: {item.y}mm;
          width: {item.width}mm;
          height: {item.height}mm;
        "
>
  <slot />
</div>
