<script lang="ts">
  import Preview from '$lib/editor/preview/Preview.svelte';
  import { createStore, setStore } from './state/store';
  import ItemsEditor from './items-editor/ItemsEditor.svelte';
  import LayoutEditor from './layout-editor/LayoutEditor.svelte';
  import EditorLayout from './layout/EditorLayout.svelte';
  import EditorSection from './layout/EditorSection.svelte';

  const store = createStore();
  setStore(store);
</script>

<EditorLayout>
  <svelte:fragment slot="preview">
    <Preview />
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
