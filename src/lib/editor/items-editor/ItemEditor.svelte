<script lang="ts">
  import GroupEditor from '$lib/editor/items-editor/GroupEditor.svelte';
  import type { Item } from '$lib/editor/state/items';

  export let item: Item;
</script>

{#if item.kind === 'group'}
  <GroupEditor group={item} />
{:else}
  <div>Unsupported item kind: {item.kind}</div>
{/if}
