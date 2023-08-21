<script lang="ts">
  import { deleteLayout, layouts } from '$lib/editor/layout-editor/layout-store';
  import { defaultPageLayout, type PageLayout } from '$lib/editor/state/page-layout';
  import { getStore } from '$lib/editor/state/store';
  import TrashIcon from '$lib/icnos/TrashIcon.svelte';
  import { selectField } from '$lib/utils/select-field';

  let modal: HTMLDialogElement | null = null;
  const store = getStore();
  const { state } = store;
  const layout = selectField(state, 'layout');

  const openModal = () => {
    modal?.showModal();
  };
  const onSubmit = (e: Event) => {
    e.preventDefault();
  };

  const onClose = () => {
    modal?.close();
  };

  const onLoad = (newLayout: PageLayout) => (e: Event) => {
    e.preventDefault();
    layout.set(newLayout);
    modal?.close();
  };

  const onDelete = (id: string) => (e: Event) => {
    e.preventDefault();
    deleteLayout(id);
  };
</script>

<button class="btn btn-md" on:click={openModal}>Load layout</button>
<dialog class="modal" bind:this={modal}>
  <form method="dialog" class="modal-box" on:submit={onSubmit}>
    <button
      class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
      type="button"
      on:click={onClose}
      >✕
    </button>
    <h3 class="text-lg font-bold">Load layout</h3>
    {#each $layouts as layout}
      <div class="mt-4 flex rounded bg-gray-300 p-2">
        {layout.name}
        <button on:click={onLoad(layout.layout)} class="btn btn-neutral ml-auto">load</button>
        <button on:click={onDelete(layout.id)} class="btn btn-square btn-error ml-2">
          <span class="h-6 w-6">
            <TrashIcon />
          </span>
        </button>
      </div>
    {/each}
    <div class="mt-4 flex rounded bg-gray-300 p-2">
      Default
      <button on:click={onLoad(defaultPageLayout)} class="btn btn-neutral ml-auto">load</button>
    </div>
  </form>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
