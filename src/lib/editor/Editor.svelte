<script lang="ts">
  import { createStore, setStore } from './state/store';
  import ItemsEditor from './items-editor/ItemsEditor.svelte';
  import LayoutEditor from './layout-editor/LayoutEditor.svelte';
  import EditorLayout from './layout/EditorLayout.svelte';
  import EditorSection from './layout/EditorSection.svelte';
  import Paper from './preview/Paper.svelte';

  const store = createStore();
  setStore(store);
</script>

<EditorLayout>
  <svelte:fragment slot="preview">
    <Paper>page 1</Paper>
    <Paper>page 2</Paper>
  </svelte:fragment>
  <svelte:fragment slot="editor">
    <EditorSection>
      <svelte:fragment slot="title">Items</svelte:fragment>
      <ItemsEditor />
    </EditorSection>
    <EditorSection>
      <svelte:fragment slot="title">Layout</svelte:fragment>
      <LayoutEditor />
    </EditorSection>
  </svelte:fragment>
</EditorLayout>
