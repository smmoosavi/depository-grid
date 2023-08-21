<script lang="ts">
  import { saveLayout } from '$lib/editor/layout-editor/layout-store';
  import { getStore } from '$lib/editor/state/store';

  let modal: HTMLDialogElement | null = null;
  let name = '';
  const store = getStore();
  const { state } = store;

  const openModal = () => {
    modal?.showModal();
  };
  const onSubmit = (e: Event) => {
    e.preventDefault();
    const layout = $state.layout;
    const name = (e.target as HTMLFormElement).querySelector('input')?.value;
    if (name) {
      saveLayout(name, layout);
      modal?.close();
    }
  };

  const onClose = () => {
    modal?.close();
  };
</script>

<button class="btn btn-md" on:click={openModal}>Save layout</button>
<dialog class="modal" bind:this={modal}>
  <form method="dialog" class="modal-box" on:submit={onSubmit}>
    <button
      class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
      type="button"
      on:click={onClose}>✕</button
    >
    <h3 class="text-lg font-bold">Save layout</h3>
    <!-- svelte-ignore a11y-autofocus -->
    <input
      type="text"
      class="input input-bordered"
      placeholder="Name"
      required
      autofocus
      bind:value={name}
    />
    <div class="modal-action">
      <button class="btn btn-primary">Save</button>
    </div>
  </form>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
