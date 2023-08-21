<script lang="ts">
  import LoadButton from '$lib/editor/layout-editor/LoadButton.svelte';
  import SaveButton from '$lib/editor/layout-editor/SaveButton.svelte';
  import {
    getCellSize,
    getColsCount,
    getRowsCount,
    type PaddingAll,
  } from '$lib/editor/state/page-layout';
  import { getStore } from '$lib/editor/state/store';
  import { selectField } from '$lib/utils/select-field';
  import { select } from '$lib/utils/select-store';
  import { derived } from 'svelte/store';

  const store = getStore();
  const { state } = store;
  const layout = selectField(state, 'layout');
  const page = selectField(layout, 'page');
  const cell = selectField(layout, 'cell');
  const width = selectField(cell, 'width');
  const height = selectField(cell, 'height');
  const padding = selectField(page, 'padding');
  const cellSize = derived(layout, (l) => {
    return getCellSize(l);
  });
  const widthCols = select(
    layout,
    (l) => {
      return getColsCount(l);
    },
    (c: number | null) => {
      if (c !== null) {
        width.set({ cols: c });
      }
    },
  );
  const widthWidth = select(
    cellSize,
    (s) => s.width,
    (w: number | null) => {
      if (w !== null) {
        width.set({ width: w });
      }
    },
  );
  const heightRows = select(
    layout,
    (l) => {
      return getRowsCount(l);
    },
    (c: number | null) => {
      if (c !== null) {
        height.set({ rows: c });
      }
    },
  );
  const heightHeight = select(
    cellSize,
    (s) => s.height,
    (w: number | null) => {
      if (w !== null) {
        height.set({ height: w });
      }
    },
  );
  const paddingAll = select(
    padding,
    (p) => {
      return (p as PaddingAll).all;
    },
    (w: number | null) => {
      if (w !== null) {
        padding.set({ all: w });
      }
    },
  );

  const fontSize = selectField(page, 'fontSize');
  $: colsActive = 'cols' in $width;
  $: widthActive = 'width' in $width;
  $: rowsActive = 'rows' in $height;
  $: heightActive = 'height' in $height;
</script>

<div>
  <SaveButton />
  <LoadButton />
</div>
<div>
  <div class="x-input-group join max-w-sm" class:active={colsActive}>
    <div class="x-input-group--label join-item w-24">Columns</div>
    <input
      type="number"
      name="cols"
      class="x-input-group--input join-item"
      bind:value={$widthCols}
    />
  </div>
  OR
  <div class="x-input-group join max-w-sm" class:active={widthActive}>
    <div class="x-input-group--label join-item w-24">Width</div>
    <input
      type="number"
      name="width"
      class="x-input-group--input join-item"
      bind:value={$widthWidth}
    />
    <div class="x-input-group--label join-item">mm</div>
  </div>
</div>

<div>
  <div class="x-input-group join max-w-sm" class:active={rowsActive}>
    <div class="x-input-group--label join-item w-24">Rows</div>
    <input
      type="number"
      name="rows"
      class="x-input-group--input join-item"
      bind:value={$heightRows}
    />
  </div>
  OR
  <div class="x-input-group join max-w-sm" class:active={heightActive}>
    <div class="x-input-group--label join-item w-24">Height</div>
    <input
      type="number"
      name="height"
      class="x-input-group--input join-item"
      bind:value={$heightHeight}
    />
    <div class="x-input-group--label join-item">mm</div>
  </div>
</div>
<div>
  <div class="x-input-group active join max-w-sm">
    <div class="x-input-group--label join-item w-24">Font size</div>
    <input
      type="number"
      name="rows"
      class="x-input-group--input join-item"
      bind:value={$fontSize}
    />
    <div class="x-input-group--label join-item">mm</div>
  </div>
</div>
<div>
  <div class="x-input-group active join max-w-sm">
    <div class="x-input-group--label join-item w-24">Padding</div>
    <input
      type="number"
      name="padding"
      class="x-input-group--input join-item"
      bind:value={$paddingAll}
    />
    <div class="x-input-group--label join-item">mm</div>
  </div>
</div>

<style lang="postcss">
  .x-input-group {
  }
  .x-input-group--label {
    @apply flex items-center bg-gray-300 px-3;
  }
  .x-input-group--input {
    @apply input input-bordered flex-1;
  }
  .active .x-input-group--label {
    @apply bg-primary text-primary-content;
  }
  .active .x-input-group--input {
    @apply input-primary;
  }
</style>
