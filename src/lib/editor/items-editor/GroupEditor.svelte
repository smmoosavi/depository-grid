<script lang="ts">
  import EditGroupForm from '$lib/editor/items-editor/EditGroupForm.svelte';
  import type { Group } from '$lib/editor/state/items';
  import { getStore, removeItem } from '$lib/editor/state/store';
  import TrashIcon from '$lib/icnos/TrashIcon.svelte';

  export let group: Group;

  const store = getStore();
  const { dispatch } = store;

  const onRemove = () => {
    dispatch(removeItem(group.id));
  };
</script>

<div class="flex rounded bg-gray-200 p-2 shadow-lg">
  <EditGroupForm {group} />

  <button on:click={onRemove} class="btn btn-square btn-error ml-auto">
    <span class="h-6 w-6">
      <TrashIcon />
    </span>
  </button>
</div>
