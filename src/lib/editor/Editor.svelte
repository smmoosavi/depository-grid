<script lang="ts">
  import EditorSection from '$lib/editor/EditorSection.svelte';
  import ItemsEditor from '$lib/editor/items-editor/ItemsEditor.svelte';
  import LayoutEditor from '$lib/editor/layout-editor/LayoutEditor.svelte';
  import Paper from './Paper.svelte';
  import EditorLayout from './EditorLayout.svelte';
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
