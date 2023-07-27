<script lang="ts">
  import GroupEditor from '$lib/editor/items-editor/GroupEditor.svelte';
  import type { EditorItem } from '$lib/editor/state/editor-items';

  export let item: EditorItem;
</script>

{#if item.kind === 'group'}
  <GroupEditor group={item} />
{:else}
  <div>Unsupported item kind: {item.kind}</div>
{/if}
